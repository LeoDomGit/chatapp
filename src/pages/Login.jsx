import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
function Login() {
    const [ user, setUser ] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(() => {
        if (user && user.length!=0) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    var email = res.data.email;
                    axios.post("https://students.trungthanhweb.com/api/checkLoginhtml1", {
                        email: email,
                        
                      })
                      .then((res) => {
                        console.log(res);
                        if(res.data.check===true){
                            localStorage.setItem('id',res.data.id);
                            window.location.replace('/chat');
                        }
                      });
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]);
  return (
    <>
    <div  style={{"width":'300px','backgroundColor':'#f2f2f2','border':'none','margin':'20% auto','border-radius':'7px','padding':'10px 10px'}}>
    <div style={{'width':'200px' ,'margin':'0px auto'}}>
        <button className='btn btn-primary w-100' onClick={() => login()}>Login</button>
    </div>
    </div>
    </>
  )
}

export default Login