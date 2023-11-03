import React from 'react'
import { useState,useReducer } from 'react'
const UseReducer = () => {
    const [userInput, setUserInput] = useState('')
    const [count, setCount] = useState(0)
    const [color, setColor] = useState(false)
    return (
        <div style={{ color: color ? 'red' : 'blue' }}>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <p >{count}</p>
            <div>
                <button onClick={(() => setCount(prev=>prev-1))}>-</button>
                <button onClick={(() => setCount(prev=>prev+1))}>+</button>
                <button onClick={(() => setColor(!color))}>Color</button>
       
            <br /><br />
            <p >{userInput}</p>
        </div>
    </div >
  )
}

export default UseReducer