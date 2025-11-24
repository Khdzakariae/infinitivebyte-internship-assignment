import { prisma } from './prisma'
import { auth } from '@clerk/nextjs/server'

const DAILY_CONTACT_LIMIT = 50

export async function checkContactViewLimit(): Promise<{
  canView: boolean
  remaining: number
  viewedToday: number
}> {
  const { userId } = await auth()
  
  if (!userId) {
    return { canView: false, remaining: 0, viewedToday: 0 }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const userView = await prisma.userContactView.findUnique({
    where: {
      userId_viewDate: {
        userId,
        viewDate: today,
      },
    },
  })

  const viewedToday = userView?.viewCount || 0
  const remaining = Math.max(0, DAILY_CONTACT_LIMIT - viewedToday)
  const canView = viewedToday < DAILY_CONTACT_LIMIT

  return { canView, remaining, viewedToday }
}

export async function incrementContactView(): Promise<void> {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.userContactView.upsert({
    where: {
      userId_viewDate: {
        userId,
        viewDate: today,
      },
    },
    update: {
      viewCount: {
        increment: 1,
      },
    },
    create: {
      userId,
      viewDate: today,
      viewCount: 1,
    },
  })
}
