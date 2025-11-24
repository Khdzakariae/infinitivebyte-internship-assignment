import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length === 0) return []
  
  // Parse CSV properly handling quoted fields with commas
  function parseLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const nextChar = line[i + 1]
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }
  
  const headers = parseLine(lines[0])
  
  return lines.slice(1).map(line => {
    const values = parseLine(line)
    const obj: Record<string, string> = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] || ''
    })
    return obj
  })
}

function parseDate(dateString: string): Date | null {
  if (!dateString || dateString === '') return null
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.userContactView.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.agency.deleteMany()

  // Import agencies
  console.log('🏛️  Importing agencies...')
  const agenciesContent = readFileSync(
    join(process.cwd(), 'data', 'agencies_agency_rows.csv'),
    'utf-8'
  )
  const agenciesData = parseCSV(agenciesContent)

  // Create a map to store old ID to new ObjectId mapping
  const agencyIdMap = new Map<string, string>()

  let agencyCount = 0
  for (const row of agenciesData) {
    if (!row.id || !row.name) continue
    
    try {
      const agency = await prisma.agency.create({
        data: {
          name: row.name,
          state: row.state || null,
          stateCode: row.state_code || null,
          type: row.type || null,
          population: row.population ? parseInt(row.population) : null,
          website: row.website || null,
          county: row.county || null,
          createdAt: parseDate(row.created_at) || new Date(),
          updatedAt: parseDate(row.updated_at) || new Date(),
        },
      })
      // Store mapping of old UUID to new ObjectId
      agencyIdMap.set(row.id, agency.id)
      agencyCount++
      if (agencyCount % 100 === 0) {
        console.log(`   Imported ${agencyCount} agencies...`)
      }
    } catch (error) {
      console.error(`   Error importing agency ${row.name}:`, error)
    }
  }
  console.log(`✅ Imported ${agencyCount} agencies`)

  // Import contacts
  console.log('👥 Importing contacts...')
  const contactsContent = readFileSync(
    join(process.cwd(), 'data', 'contacts_contact_rows.csv'),
    'utf-8'
  )
  const contactsData = parseCSV(contactsContent)

  let contactCount = 0
  for (const row of contactsData) {
    if (!row.first_name || !row.last_name) continue
    
    try {
      // Map old agency UUID to new ObjectId
      const newAgencyId = row.agency_id ? agencyIdMap.get(row.agency_id) : null
      
      await prisma.contact.create({
        data: {
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email || null,
          phone: row.phone || null,
          title: row.title || null,
          emailType: row.email_type || null,
          contactFormUrl: row.contact_form_url || null,
          department: row.department || null,
          agencyId: newAgencyId || null,
          firmId: row.firm_id || null,
          createdAt: parseDate(row.created_at) || new Date(),
          updatedAt: parseDate(row.updated_at) || new Date(),
        },
      })
      contactCount++
      if (contactCount % 100 === 0) {
        console.log(`   Imported ${contactCount} contacts...`)
      }
    } catch (error) {
      console.error(`   Error importing contact ${row.first_name} ${row.last_name}:`, error)
    }
  }
  console.log(`✅ Imported ${contactCount} contacts`)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
