import React, { useState, useCallback } from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend"
import { Card } from './Card';
import {Rule} from './Rule';
import {Value} from './Value';
import { ItemTypes } from './Constants';
import update from 'immutability-helper';

 const App = () => {

  const [rules, setRules] = useState([{lastDroppedItem: null }]);
  const [values, setValues] = useState([{lastDroppedValue: null }]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  const [conditions] = useState([{id:1, name:'Currencies', type:ItemTypes.COND}, {id:2, name:'Issuer Country', type:ItemTypes.COND},  {id:3, name:'Merchant Country', type:ItemTypes.COND}])
  const [currencies] = useState([{id:1, name:'GBP', type:ItemTypes.VAL}, {id:2, name:'USD', type:ItemTypes.VAL},  {id:3, name:'EUR', type:ItemTypes.VAL},  {id:4, name:'INR', type:ItemTypes.VAL}])
  const [issuerCountry] = useState([{id:1, name:'United Kingdom', type:ItemTypes.VAL}, {id:2, name:'United States', type:ItemTypes.VAL},  {id:3, name:'France', type:ItemTypes.VAL},  {id:4, name:'India', type:ItemTypes.VAL}])
  const [merchantCountry] = useState([{id:1, name:'United Kingdom', type:ItemTypes.VAL}, {id:2, name:'United States', type:ItemTypes.VAL},  {id:3, name:'France', type:ItemTypes.VAL},  {id:4, name:'India', type:ItemTypes.VAL}])
  
  let issuerStyle = {
    display:'none'
  }
  let merchantStyle = {
    display:'none'
  }
  let currenciesStyle = {
    display:'none'
  }

  let amountStyle ={
    display:'none'
  }


   const isDropped = (condition) => {  
     console.log(droppedBoxNames)

     if(droppedBoxNames.indexOf('Issuer Country')>-1){
        issuerStyle = {
          display:'block'
        }
        merchantStyle = {
          display:'none'
        }
        currenciesStyle = {
          display:'none'
        }
      
        amountStyle ={
          display:'none'
        }
     }

     if(droppedBoxNames.indexOf('Currencies')>-1){
      issuerStyle = {
        display:'none'
      }
      merchantStyle = {
        display:'none'
      }
      currenciesStyle = {
        display:'block'
      }
    
      amountStyle ={
        display:'none'
      }
   }
   if(droppedBoxNames.indexOf('Merchant Country')>-1){
    issuerStyle = {
      display:'none'
    }
    merchantStyle = {
      display:'block'
    }
    currenciesStyle = {
      display:'none'
    }
  
    amountStyle ={
      display:'none'
    }
  }

   

    if(droppedBoxNames.indexOf(condition) > -1){

    }
    return droppedBoxNames.indexOf(condition) > -1;
}

  const handleRule = useCallback((index, item) => {
    const { name } = item;
    setDroppedBoxNames(update(droppedBoxNames, conditions.find(item=>name===item.name) ? { $set: [name]} : {}));
    setRules(update(rules, {
        [index]: {
            lastDroppedItem: {
                $set: item,
            },
        },
    }));
}, [droppedBoxNames, rules, conditions]);

const handleValue = useCallback((index, item) => {
  const { name } = item;
  setDroppedBoxNames(update(droppedBoxNames, !conditions.find(item=>name===item.name) ? { $push: [name]} : {}));
  setValues(update(values, {
    [index]: {
        lastDroppedValue: {
            $set: item,
        },
    },
}));
}, [droppedBoxNames, conditions, values]);

  const isMobile = window.innerWidth < 600;
  return (
      <div className="container"> 
      <div className ='header'></div>
      <div className ='sidebar'></div>
      <div className ='body'>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>    
            <div className='column rule'>
            <h3>Rules</h3>
            {rules.map(({ lastDroppedItem }, index) => (<Rule lastDroppedItem={lastDroppedItem} onDrop={(item) => handleRule(index, item)} key={index} />))}
            <select className='operator'>
              <option value="=">=</option>
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="=">=</option>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value="And">AND</option>
              <option value="Or">OR</option>
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
              <option value="In">IN</option>
              <option value="Not In">NOT IN</option>              
            </select>
            {values.map(({ lastDroppedValue }, index) => (<Value lastDroppedValue={lastDroppedValue} onDrop={(item) => handleValue(index, item)} key={index}/>))}
            <input type='text' style ={{...amountStyle}}></input>
            </div>
            <div className='column conditions' >
              <h3>Conditions</h3>
              {conditions.map(({ id, name, type }) => (<Card name={name} type={type} key={id} isDropped={isDropped(name)} classType = 'card'/>))}
            </div>
            <div className='column currencies' style ={{...currenciesStyle}}>
              <h3>Currencies</h3>
              {currencies.map(({ id, name, type }) => (<Card name={name} type={type} key={id} isDropped={isDropped(name)} classType = 'card'/>))}
            </div>
            <div className='column issuerCountry' style ={{...issuerStyle}}>
              <h3>Issuer Country</h3>
              {issuerCountry.map(({ id, name, type }) => (<Card name={name} type={type} key={id} isDropped={isDropped(name)} classType = 'card'/>))}
            </div>
            <div className='column merchantCountry' style ={{...merchantStyle}}>
              <h3>Merchant Country</h3>
              {merchantCountry.map(({ id, name, type }) => (<Card name={name} type={type} key={id} isDropped={isDropped(name)} classType = 'card'/>))}
            </div>
        </DndProvider>
        </div>     
      </div>
  );
}

export default App;
