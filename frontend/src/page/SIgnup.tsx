import { LoginForm } from '@/components/login-form';
import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Signup = () => { 
  const navigate = useNavigate();
  const [skeletion , setSkeletion] = useState(true);
  const [response , setResponse] = useState()

  const [data , setData] = useState({ 
    username:'',
    password:''
  });
 
  const submitHandler: () => void = async (e: React.FormEvent) => { 
    e.preventDefault(); 
      console.log(data)
      
      await axios.post("http://localhost:3000/api/v1/signup" , { 
        username: data.username, 
        password: data.password
      }).then((response : any) => { 
         setResponse(response)
        if(response.status === 200){ 
          setSkeletion(false);
            setTimeout(() => { 
              navigate("/dashboard")
            }, 3000)
        }
      }).catch((error) => { 
        console.log(error.error)
      })
  }

  return (
    <div className="w-full h-screen bg-neutral-950 flex items-center justify-center">
        <LoginForm submitHandler={submitHandler} setData={setData} skeletion= {skeletion} />
    </div>
  )
}

export default Signup;
