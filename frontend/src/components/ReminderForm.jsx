import React, { useState } from 'react'

const ReminderForm = () => {
   
    const [reminder, setReminder] = useState("")

    const submitRemind =  async e =>  {
        e.preventDefault()
        try {
            const body = {reminder}
            const response = await fetch("http://localhost:5000/reminders",
            {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(body)

            })
            window.location="/"
         
        } catch (err) {
            console.error(err.message)
        }


        
    }
    console.log(reminder)


  return (
    <>
    <form onSubmit={submitRemind}>
        <input
        type="text"
        value={reminder}

         onChange= {(e)=>setReminder(e.target.value)}></input>
        <button type="submit">Submit</button>
    </form>
   
    </>
  )
}

export default ReminderForm