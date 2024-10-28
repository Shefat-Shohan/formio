import { DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React from 'react'

export default function DragOverlayWrapper() {
    useDndMonitor({
        onDragStart:(event)=> {console.log("Drag Item", event)}
    })
    const node = <div>No drag overlay</div>
  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
