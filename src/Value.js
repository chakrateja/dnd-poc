import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
const style = {
   
    marginLeft: '1.5rem',        
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    color: '000'
};
    const style2 ={  borderRadius: '10px', backgroundColor: '#fff',  height: '50px',  width: '150px',  margin: '10px auto',  display: 'flex',  justifyContent: 'center',  alignItems: 'center', boxShadow: '0px 0px 3px rgba(0,0,0,0.5)'}

export const Value = ({lastDroppedValue, onDrop}) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.VAL,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    console.log(lastDroppedValue);
    const isActive = canDrop && isOver;
    let backgroundColor;
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'grey';
    }
    return (<div ref={drop} style={{ ...style, backgroundColor }} className="valueAddition">
            {isActive ? 'Release to drop' : 'Add a Value'}
            {lastDroppedValue && (<p style={{ ...style2 }} className="condition">{lastDroppedValue.name}</p>)}
        </div>);
};