'use client'

import { memo } from 'react'

function BackgroundShapes({ opacity = '0.3' }: { opacity?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-${opacity}`}>
      <img 
        src="/Shape1.svg" 
        alt="" 
        className="w-full h-full object-cover"
        suppressHydrationWarning
      />
    </div>
  )
}

export default memo(BackgroundShapes)
