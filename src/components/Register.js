import React,{useEffect, useState} from 'react';
import axios from 'axios';

const Register=()=>{
    document.getElementsByTagName("html")[0].style.height = "144%";
    document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";
   

    const[records,setrecords]=useState({
        username:'',
        mobile:'',
        image:'',
        role:'',
        skills:'',
        email:''
})
    const [status,setstatus]=useState('');
 //   const [selectedOption, setSelectedOption] = useState('');

    // const handleOptionChange = (event) => {
    //   setSelectedOption(event.target.value);
    // };
  

const handleimage = (e)=>{
    const formData = new FormData();
    formData.append("image",document.getElementById("image").files[0]);
    axios.post('http://localhost:3001/imageupload',formData).
    then((result)=>{
        console.log(result.data.img_name);
            setrecords({...records,image:result.data.img_name})
    });
}
const handleChange=(e)=>{
    setrecords({...records,[e.target.name]:e.target.value});
}
const registerForm=()=>{
    console.log(records);
    if(records.username===''){
      setstatus('Username is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else if(records.mobile===''){
      setstatus('Phone number is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else if(records.image===''){
      setstatus('image is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else if(records.role===''){
      setstatus('role  is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else if(records.skills===''){
      setstatus('skills is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else if(records.mobile===''){
      setstatus('email is missing..!')
      setTimeout(()=>{
        setstatus("");
    },3000)
    }
    else{
        
      axios.post('http://localhost:3001/reg',records).
      then((result)=>{
          if(result.data.code=="200"){
            setrecords([]);
            setstatus(result.data.msg);
            window.location.href="/login";
            setTimeout(()=>{
                setstatus("");
            },3000)
          }
          else{
            setstatus(result.data.msg);
            setTimeout(()=>{
                setstatus("");
            },3000)
          }
      });
    }
   
}
const WhichButton = ()=>{
  if((document.getElementById("username") === document.activeElement)===false)  {
      if(document.getElementById("username").value===""){
      document.querySelector("#usernamee").classList.remove("focus-input")}
      else{
          document.querySelector("#usernamee").classList = "focus-input";
      }
  }
  if((document.getElementById("mobile") === document.activeElement)===false)  {
      if(document.getElementById("mobile").value===""){
      document.querySelector("#mobilee").classList.remove("focus-input")}
      else{
          document.querySelector("#mobilee").classList = "focus-input";
      }
  }
 
  if((document.getElementById("email") === document.activeElement)===false)  {
      if(document.getElementById("email").value===""){
      document.querySelector("#emaill").classList.remove("focus-input")}
      else{
          document.querySelector("#emaill").classList = "focus-input";
      }
  }
  if((document.getElementById("skills") === document.activeElement)===false)  {
      if(document.getElementById("skills").value===""){
      document.querySelector("#skillsn").classList.remove("focus-input")}
      else{
          document.querySelector("#skillsn").classList = "focus-input";
      }
  }
  if((document.getElementById("image") === document.activeElement)===false)  {
      if(document.getElementById("image").value===""){
      document.querySelector("#imagee").classList.remove("focus-input")}
      else{
          document.querySelector("#imagee").classList = "focus-input";
      }
  }
 
}
const loginform=()=>{
  window.location.href = '/login';
}

    return(
      <div onClick={WhichButton} className="login-box-reg login-box">
      <h2>Register</h2>
      <form>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#usernamee").classList = "focus-input";
            }}
            type="text"
            name="username"
            required=""
            id='username'
            onChange={handleChange}
            value={setrecords.username}
          />
          <label id='usernamee'>User Name</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#mobilee").classList = "focus-input";
            }}
            type="text"
            name="mobile"
            required=""
            id='mobile'
            onChange={handleChange}
            value={setrecords.mobile}
          />
          <label id='mobilee'>Phone Number</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#emaill").classList = "focus-input";
            }}
            type="email"
            name="email"
            required=""
            id='email'
            onChange={handleChange}
            value={setrecords.email}
          />
          <label id='emaill'>Email</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#skillsn").classList = "focus-input";
            }}
            type="text"
            name="skills"
            required=""
            id='skills'
            onChange={handleChange}
            value={setrecords.skills}
          />
          <label id='skillsn'>Skills</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#imagee").classList = "focus-input";
            }}
            type="file"
            name="image"
            required=""
            id='image'
            onChange={handleimage}
            
          />
          <label id='imagee'>Image</label>
        </div>
        <div className="user-box">
        <select 
        name='role'
        id='rolee'
      //  value={selectedOption} 
        onChange={handleChange}>
        <option className='hidden'>Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
          </select>
        </div>
       
        
        <div className='status-msg' id='status'>{status}</div>
        <a onClick={registerForm}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Register
        </a>
        &nbsp;&nbsp;
        <a onClick={loginform}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </a>
      </form>
    </div>
    )
}

export default Register;