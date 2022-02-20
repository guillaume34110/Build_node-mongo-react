import React, { useEffect } from 'react'


export default function Loby({stateDatas,setStateDatas,getSocket}) {
 
const socketInit = async() => { 
 //emit connction
 await getSocket()
 stateDatas.socket.emit("connection")
 //subscribe to socket event
 stateDatas.socket.on('connection' , () => { 
   console.log("conneted to socket")
 }) 
  }
  useEffect(() =>{
  socketInit()
  console.log(stateDatas,'stateDatas')
  },[])

  return (
    <div>your Private page here</div>
  )
}
