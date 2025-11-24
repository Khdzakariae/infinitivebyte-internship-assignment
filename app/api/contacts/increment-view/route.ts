import { incrementContactView } from '@/lib/contact-limit'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await incrementContactView()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error incrementing contact view:', error)
    return NextResponse.json(
      { error: 'Failed to increment view' },
      { status: 500 }
    )
  }
}
