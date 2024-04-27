import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'


export const useUpdatePassword= ({navigation}) =>{

        const [passwordPending, setPasswordPending] = useState(false)
        const [passwordError, setPasswordError] = useState('')

        

        const {user} = useAuthContext()
    
     


        const updatePassword = async (oldPassword, newPassword) =>{
            if(!user){
                return
            }
            setPasswordError('')
            setPasswordPending(true)
            
            const response = await fetch('http://192.168.1.136:4567/auth/dashboard/updateuser/changepassword', {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body:JSON.stringify({oldPassword, newPassword})
                })
    
            const jsonRes = await response.json()
            if(!response.ok){
                setPasswordPending(false)
                setPasswordError(jsonRes.error)
                
            }
            if(response.ok){
                setPasswordPending(false)
                setPasswordError(jsonRes.message)
                navigation.navigate('Register')
            }
        }

        return {updatePassword, passwordPending, passwordError}
}