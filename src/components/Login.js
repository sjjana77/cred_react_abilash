import React, {  useState, useContext, useEffect } from 'react';

import axios from 'axios';
import './Login.css';

const current_backendserver = "http://localhost:3001";
// const api_url = "https://crudcrud.com/api/059581f518d94a9d85bdb69e69353173/reg";

const WhichButton = ()=> {
    if((document.getElementById("userid") === document.activeElement)===false)  {
        if(document.getElementById("userid").value===""){
        document.querySelector("#useridd").classList.remove("focus-input")
    }
    }
    if((document.getElementById("psw") === document.activeElement)==false)  {
        if(document.getElementById("psw").value===""){
        document.querySelector("#psww").classList.remove("focus-input")
        }
    }
}
const WhichButtonPsd=  ()=>  {
    if((document.getElementById("enp") === document.activeElement)===false)  {
        if(document.getElementById("enp").value===""){
        document.querySelector("#enpp").classList.remove("focus-input")
    }
    }
    if((document.getElementById("rnp") === document.activeElement)===false)  {
        if(document.getElementById("rnp").value===""){
        document.querySelector("#rnpp").classList.remove("focus-input")
        }
    }
}

const Login = ({api_url})=>{
    const [user_details,updateuser_details] = useState('');
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";
    const [regdata,setregdata] = useState({
        userid:'',
        psw:'',
        enp:'',
        rnp:''
    });
    const[loginstatus,setloginstatus] = useState('');
    const[pswstatus,setpswstatus] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // Fetch data from the API
        axios.get(api_url)
          .then(response => {
            // Update the state with the data from the API response
            setUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
      
      useEffect(()=>{
        console.log('aaa',users);
      },[users])


    const handleChange = (e)=>{
        setregdata({...regdata,[e.target.name]:e.target.value});
    }
    const Update = ()=>{
        if(regdata.rnp!==regdata.enp){
            setpswstatus("Passwords doesn't match");
            setTimeout(()=>{
                setloginstatus("");
            },3000)
        }
        else if(regdata.rnp==="ab1234"){
            setpswstatus("Don't Enter Old Password");
            setTimeout(()=>{
                setloginstatus("");
            },3000)
        }
        else{
            const sendData = {
                user_id : regdata.userid,
                psw : btoa(regdata.rnp)
            }
            axios.post(current_backendserver+'/updatepassword',sendData).
            then((result)=>{
                if(result.data.code=="200"){
                    setpswstatus(result.data.msg);
                    let w=50;
                    const myInterval = setInterval(() => {
                        w-=5;
                        document.querySelectorAll(".login-box")[1].style.left=((w)+"%");
                        if(w==5){
                            clearInterval(myInterval);
                            document.querySelectorAll(".login-box")[1].classList+=" hidden";
                            document.querySelectorAll(".login-box")[1].style.left="50%";
                            window.location.href="/usersprofile";
                        }
                    },30);
                }
                else{
                    setpswstatus("Update Failed");
                    setTimeout(()=>{
                        setpswstatus("");
                    },3000)
                }
            })
        }
    }
    const Loginn = ()=>{
        if(regdata.userid===""){
            setloginstatus("Username Missing");
        }
        else if(regdata.psw===""){
            setloginstatus("Password Missing");
        }
        else{
            setloginstatus("");
            users.forEach((user) => {
                if (user['email'] === regdata.userid && user['password'] === regdata.psw) {
                    let user_get_detalils = {
                        'id':user['id'],
                        'user_id':user['user_id'],
                        'email':user['email'],
                        'mobile':user['mobile'],
                        'role':user['role'],
                        'skills':user['skills'],
                        'img_path':''
                    }
                    updateuser_details(user_get_detalils);
                    let str_user = user_get_detalils;
                    str_user = JSON.stringify(str_user);
                    sessionStorage.setItem("user_details",str_user);
    
                    setloginstatus("Successfully Logged In....");
                    window.location.href="/usersprofile";
                }
              });

            // setloginstatus("Incorrect Password");



            const sendData = {
            user_id : regdata.userid,
            psw : btoa(regdata.psw)
            }
        axios.post(current_backendserver+'/login',sendData).
        then((result)=>{
            if(result.data.msg==='Valid User'){
                let user_get_detalils = {
                    'id': result.data.user_details.id,
                    'user_id':result.data.user_details.user_id,
                    'email':result.data.user_details.email,
                    'mobile':result.data.user_details.mobile,
                    'role':result.data.user_details.role,
                    'skills':result.data.user_details.skills,
                    'img_path':result.data.user_details.img_path
                }
                updateuser_details(user_get_detalils);
                let str_user = user_get_detalils;
                str_user = JSON.stringify(str_user);
                sessionStorage.setItem("user_details",str_user);

                setloginstatus("Successfully Logged In....");
                let w=50;
                let w1=100;
                const myInterval = setInterval(() => {
                    w-=5;
                    w1-=5;
                    document.querySelector(".login-box").style.left=((w)+"%");
                    document.querySelectorAll(".login-box")[1].style.left=((w1)+"%");
                    if(result.data.reenter==="yes"){
                        document.querySelectorAll(".login-box")[1].classList.remove("hidden");
                        document.getElementById("enp").value="";
                        document.getElementById("rnp").value="";
                    }
                    if(w===5){
                        clearInterval(myInterval);
                        document.querySelector(".login-box").classList+=" hidden";
                        document.querySelector(".login-box").style.left="50%";
                        if(result.data.reenter==="yes"){
                            document.querySelectorAll(".login-box")[1].style.left="50%";
                        }
                        else{
                            window.location.href="/usersprofile";
                        }

                    }
                }, 30);
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }
            if(result.data.code==='300'){
                setloginstatus("Wrong Password");
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }
            
            else if(result.data.code==='400'){
                setloginstatus("Invalid Credantials");
                setTimeout(()=>{
                    setloginstatus("");
                },3000)
            }

        })
        }

    }
const Registerdirection=()=>{
    window.location.href = '/';
}


    return(
    <div>
<div onClick={WhichButton} className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input onFocus={()=>{document.querySelector("#useridd").classList="focus-input"}} type="text" name="userid" required="" id='userid' onChange={handleChange} value={regdata.user} />
      <label id='useridd'>Email</label>
    </div>
    <div className="user-box">
      <input onFocus={()=>{document.querySelector("#psww").classList="focus-input"}} type="password" name="psw" required="" id='psw' onChange={handleChange} value={regdata.psw} />
      <label id='psww'>Password</label>
    </div>
    <div className='status-msg' id='loginstatus'>{loginstatus}</div>
    <a onClick={Loginn} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a>&nbsp;&nbsp;
    <a onClick={Registerdirection} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
    </a>
  </form>
</div>
<div onClick={WhichButtonPsd} className="login-box hidden">
  <h2>Update Password</h2>
  <form>
    <div className="user-box">
      <input autoComplete="off" onFocus={()=>{document.querySelector("#enpp").classList="focus-input"}} type="password" name="enp" id='enp' onChange={handleChange} value={setregdata.enp} />
      <label id='enpp'>Enter New Password</label>
    </div>
    <div className="user-box">
      <input autoComplete="off" onFocus={()=>{document.querySelector("#rnpp").classList="focus-input"}} type="password" name="rnp" id='rnp' onChange={handleChange} value={setregdata.rnp} />
      <label id='rnpp'>Renter New Password</label>
    </div>
    <div className='status-msg' id='pswstatus'>{pswstatus}</div>
    <a onClick={Update} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Update
    </a>
  </form>
</div>
</div>
    )
}

export default Login;