import React from 'react'
import { useReducer, useState } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };

        case 'decrement':
            return { ...state, count: state.count - 1 }
        case 'newUserInput':
            return { ...state, userInput: action.payload }
        case 'tgcol':
            return { ...state, color: !state.color }
        default:
            throw new Error()


    }
}

//const ACTION = not required but usefule probably

const UseReducer = () => {
    const [open, setOpen]=useState(false)
    const [state, dispatch] = useReducer(reducer, { count: 0, userInput: '', color: false })
    return (
        <>
           <button onClick={() => setOpen(!open)}>Toggle Dialog</button>


            <dialog open={open} >
                <p>Greetings, one and all!</p>
                <form method="dialog">
                    <button>OK</button>
                </form>
            </dialog>
            <div style={{ color: state.color ? 'red' : 'blue' }}>
                <input
                    type="text"
                    value={state.userInput}
                    onChange={(e) => dispatch({ type: 'newUserInput', payload: e.target.value })}
                />
                <p >{state.count}</p>
                <div>
                    <button onClick={(() => dispatch({ type: 'decrement' }))}>-</button>
                    <button onClick={(() => dispatch({ type: 'increment' }))}>+</button>
                    <button onClick={(() => dispatch({ type: 'tgcol' }))}>Color</button>

                    <br /><br />
                    <p >{state.userInput}</p>
                </div>
            </div >
        </>
    )
}

export default UseReducer