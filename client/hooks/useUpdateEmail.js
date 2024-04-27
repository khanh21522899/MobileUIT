import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'
import { useLogout } from "./useLogout";



export const useUpdateEmail= ({navigation}) =>{

        const [emailPending, setEmailPending] = useState(false)
        const [emailError, setEmailError] = useState('')  

        const {user, setUser} = useAuthContext()
        const logout = useLogout()
    
        const updateEmail = async (email) =>{
            if(!user){
                return
            }
            setEmailError('')
            setEmailPending(true)

            
            const response = await fetch('http://192.168.1.136:4567/auth/dashboard/updateuser/changeemail', {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body:JSON.stringify({email})
                })
    
            const jsonRes = await response.json()
            if(!response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.error)
                
            }
            if(response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.message)
                logout({navigation})
            }
        }

        return {updateEmail, emailPending, emailError}
}