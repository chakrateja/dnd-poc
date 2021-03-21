import React from 'react'
import { useDrag } from 'react-dnd'

export const Card = ({ name , type, classType}) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { name, type  },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
  return (
    <div className={classType} ref={dragRef} style={{ opacity }}>
      {name}
    </div>
  )
}