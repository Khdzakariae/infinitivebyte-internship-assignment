import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [agenciesCount, contactsCount, statesCount] = await Promise.all([
      prisma.agency.count(),
      prisma.contact.count(),
      prisma.agency.findMany({
        select: { stateCode: true },
        distinct: ['stateCode'],
      }),
    ])

    return NextResponse.json({
      agencies: agenciesCount,
      contacts: contactsCount,
      states: statesCount.length,
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        agencies: 0,
        contacts: 0,
        states: 0,
        error: 'Database unavailable - Configure MongoDB Atlas network access'
      },
      { status: 200 }
    )
  }
}
