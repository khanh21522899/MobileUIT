
export const useVerifyToken = () =>{
 
    const verifyToken = async (token)=> {

        console.log(token)
        //making the http request that return a response from server
        const response = await fetch('http://192.168.1.136:4567/auth/verifyToken',{
        headers:{
            'authorization': `Bearer ${token}`
        }
        })

        if(!response.ok){
            return false
        }
        if(response.ok){
            return true;
        }

        
    }
    return {verifyToken}
}