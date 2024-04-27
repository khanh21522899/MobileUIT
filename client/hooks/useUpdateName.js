import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'


export const useUpdateName= () =>{

        const [namePending, setNamePending] = useState(false)
        const [nameError, setNameError] = useState('')

        

        const {user} = useAuthContext()
    
     


        const updateName = async (name) =>{
            if(!user){
                return
            }
            setNameError('')
            setNamePending(true)
            
            const response = await fetch('http://192.168.1.136:4567/auth/dashboard/updateuser/changename', {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body:JSON.stringify({name})
                })
    
            const jsonRes = await response.json()
            if(!response.ok){
                setNamePending(false)
                setNameError(jsonRes.error)
                
            }
            if(response.ok){
                setNamePending(false)
                setNameError(jsonRes.message)
            }
        }

        return {updateName, namePending, nameError}
}