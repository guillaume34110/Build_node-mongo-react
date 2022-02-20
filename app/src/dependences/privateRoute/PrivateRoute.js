import React ,{useEffect, useState} from 'react'
import { Navigate ,useNavigate} from 'react-router-dom'
import { location } from '../utilities/location';


export default function PrivateRoute({ children , stateDatas }) { //https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
   
    const navigate = useNavigate();
    const [isLoaded,setIsLoaded] = useState(false)
    let  currentUser = stateDatas.jwtToken 
    
    useEffect(() => {
        checkToken()
    }, [])
    
    /*auth*/
    
const checkToken = async () => {
    
    let userToken = stateDatas.jwtToken 
    if (!userToken) navigate("/");
    else {
        const response = await fetch(location + '/tokenCheck', {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + userToken
            },
        })
       let news
        try{ news = await response.json()}
        catch {news = false}
        console.log(news ,"news")
        if (news !== true)  {
            navigate("/") ; 
            return   
        }
        setIsLoaded(true)
    }
}

if (!isLoaded) return <h1>loadding</h1> 
return currentUser ? children : <Navigate to="/login" />;
    
}