import React, { useEffect, useState } from 'react'

    const RemindersList = () => {
        const [remindList, setRemindList]=useState([])
        
    
        const getReminders = async ()=> {
            try {

                //by default fetch makes get request
                const response= await fetch("http://localhost:5000/reminders")
                const jsonData = await response.json()
              
                setRemindList(jsonData)
            } catch (err) {
                console.error(err.message)
                
            }

        }
        const deleteRemind = async id=> {
            try {
                const deleteOneReminder = await fetch(`http://localhost:5000/reminders/${id}`,
                {
                    method: "DELETE",
                })
                setRemindList(remindList.filter((rem) => rem.remind_id !== id));
                
            } catch (errr) {
                console.error(errr.message)
                
            }
        }

        


       useEffect(()=> {
        getReminders()
       },[])
       
    
       console.log(remindList)
    return (
        <>
        {remindList.map(each=> (
    
            <div key = {each.remind_id}>
                <div>{each.reminder}</div>
            <button onClick={()=> deleteRemind(each.remind_id)}>Delete</button>
            </div>  
        ))}
        
        </>
    )
    }

    export default RemindersList