import './modal.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Usersprofile = ()=>{
    const [overalldetails,setoveralldetails] =useState([]);
    const Imgupload = ()=>{
        const formData = new FormData();
        formData.append("image",document.getElementById("file").files[0]);
        formData.append("details",JSON.stringify(currdetails));
        formData.append("editing",sessionStorage.getItem("editing"));
        axios.post('http://localhost:3001/upload',formData).
        then((result)=>{
            if(result.data.code=="200"){
                if(sessionStorage.getItem("editing")=="1"){
                    window.sessionStorage.setItem("user_details",JSON.stringify(result.data.current_user));
                    design();
                }
                else{
                    design();
                }
                document.querySelector(".close").click();
            }
        });
    }
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";
    const [designn, setdesignn] = useState('');
    const [currdetails, setcurrdetails] = useState({
        user_id:"",
        mobile:"",
        email:"",
        role:"",
        skills:"",
        photo:""
    });

    const View=(e)=>{
      let overalldetailss = [];
      overalldetailss = overalldetails;
      if(overalldetails.length===0){
        setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
        overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
      }
      setcurrdetails({

        user_id:overalldetailss[e].user_id,
        mobile:overalldetailss[e].mobile,
        email:overalldetailss[e].email,
        role:overalldetailss[e].role,
        skills:overalldetailss[e].skills,
        photo:overalldetailss[e].img_path
    })
        document.getElementById('viewdetail').classList.remove('hidden')
    }

    const Edit = (e)=>{
      let overalldetailss = [];
      overalldetailss = overalldetails;
      document.getElementById('viewdetail').classList.add('hidden');
      if(overalldetails.length===0){
        setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
        overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
      }
      console.log(overalldetails);
      sessionStorage.setItem("editing","");
      if(sessionStorage.getItem("edit")==='emp'){
        sessionStorage.setItem("editing","1");
          let details = JSON.parse(window.sessionStorage.user_details);
          console.log(details);
          setcurrdetails({

              user_id:details.user_id,
              mobile:details.mobile,
              email:details.email,
              role:details.role,
              skills:details.skills,
              photo:details.img_path
          })
      }
      else{
        console.log(overalldetailss);
        console.log(e);
          setcurrdetails({
            user_id:overalldetailss[e].user_id,
            mobile:overalldetailss[e].mobile,
            email:overalldetailss[e].email,
            role:overalldetailss[e].role,
            skills:overalldetailss[e].skills,
            photo:overalldetailss[e].img_path
          })
      }
      
      document.getElementById('myBtn').click();

  }
    const handlemodalchange = (e)=>{
        setcurrdetails({...currdetails,[e.target.name]:e.target.value});
        console.log(e.target.name);
    }
    const Update = ()=>{
        axios.put('https://crudcrud.com/api/5e77ffbdcf7344b7a7a5faa255264aca/reg',currdetails).
        then((result)=>{
        });
    }
    const Delete = (id)=>{
      let overalldetailss = [];
      overalldetailss = overalldetails;
      if(overalldetails.length===0){
        setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
        overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
      }
        let details = overalldetailss;
        console.log(details);
        details.splice(parseInt(id),1);
        console.log(details);
        axios.delete('https://crudcrud.com/api/5e77ffbdcf7344b7a7a5faa255264aca/reg',{details:details}).
        then((result)=>{
            if(result.data.code===200){
                if(result.data.users.length!==0){
                  localStorage.setItem("overalldetails",JSON.stringify(result.data.users));
                  console.log(result.data.users);
                  setoveralldetails(result.data.users);
                }
                design();
            }
        });
    }
    const design = ()=>{
        let details = JSON.parse(window.sessionStorage.user_details);
        console.log(details);
        if(details.role==="Employee"){
            setdesignn(()=>{
                return (
                    <div className='employee'>
                        <button className='btn btn-size' id='edit' onClick={()=>{Edit('emp');
                            document.getElementById('file').classList='hidden';
                            sessionStorage.setItem("edit","emp");}}><i  className="fa fa-edit"></i>Edit</button>
                            <div className="screen__content justify-content-center">
                            <br /> <br />
                            <div className='emp'>
                            
                            <img className='profile-pics1' src={'http://localhost:3001/'+details.img_path} />
                            
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>User_Id</div><div className='col lbl'>{details.user_id}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Email</div><div className='col lbl'>{details.email}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Mobile</div><div className='col lbl'>{details.mobile}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Role</div><div className='col lbl'>{details.role}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Skills</div><div className='col lbl'>{details.skills}</div></div> <br />                  
                            </div>
                            </div>
                            </div>
                )
            });
        }
        else if(details.role==="Manager"){
            sessionStorage.setItem("edit","");
            axios.get('https://crudcrud.com/api/5e77ffbdcf7344b7a7a5faa255264aca/reg',details).
            then((result)=>{
                let d = result.data.map((a,i)=>{ 
                    if(a.role==="Admin"){
                       
                        return(
                            <tbody><tr><td>{i+1}</td><td>{a.user_id}</td><td>{a.email}</td><td>{a.mobile}</td><td>{a.role}</td><td>{a.skills}</td><td ><i rowid={i} onClick={(e)=>View(e.target.getAttribute("rowid"))} className="fa fa-eye disable"></i></td><td ><i rowid={i} onClick={(e)=>Edit(e.target.getAttribute("rowid"))} className="fa fa-edit disable"></i></td><td><i rowid={i} onClick={(e)=>Delete(e.target.getAttribute("rowid"))} className="fa fa-trash-o disable"></i></td></tr></tbody>
                        )
                    }
                    else{
                       
                        return(
                            <tbody><tr><td>{i+1}</td><td>{a.user_id}</td><td>{a.email}</td><td>{a.mobile}</td><td>{a.role}</td><td>{a.skills}</td><td ><i rowid={i} onClick={(e)=>View(e.target.getAttribute("rowid"))} className="fa fa-eye"></i></td><td ><i rowid={i} onClick={(e)=>Edit(e.target.getAttribute("rowid"))} className="fa fa-edit"></i></td><td><i rowid={i} onClick={(e)=>Delete(e.target.getAttribute("rowid"))} className="fa fa-trash-o"></i></td></tr></tbody>
                        )
                    }

                });
                setdesignn(()=>{
                    return (
                        <table className='table table-striped'><thead><tr><th>Sno</th><th>User_Id</th><th>Email</th><th>Mobile</th><th>Role</th><th>Skills</th><th>View</th><th>Edit</th><th>Delete</th></tr></thead>
                        {d}
                        </table>
                    )
                });
                if(result.data.length!==0){
                  localStorage.setItem("overalldetails",JSON.stringify(result.data));
                  setoveralldetails(result.data);
                }
                //setoveralldetails(result);
                //console.log(overalldetails);
            })
           
        }
        else{
            sessionStorage.setItem("edit","");
            axios.post('http://localhost:3001/getdata',details).
            then((result)=>{
                let d = result.data.map((a,i)=>{
                    return (
                            <tbody><tr><td>{i+1}</td><td>{a.user_id}</td><td>{a.email}</td><td>{a.mobile}</td><td>{a.role}</td><td>{a.skills}</td><td ><i rowid={i} onClick={(e)=>View(e.target.getAttribute("rowid"))} className="fa fa-eye"></i></td><td ><i rowid={i} onClick={(e)=>Edit(e.target.getAttribute("rowid"))} className="fa fa-edit"></i></td><td><i rowid={i} onClick={(e)=>Delete(e.target.getAttribute("rowid"))} className="fa fa-trash-o"></i></td></tr></tbody>
                    )
                });
                setdesignn(()=>{
                    return (
                        <table className='table table-striped'><thead><tr><th>Sno</th><th>User_Id</th><th>Email</th><th>Mobile</th><th>Role</th><th>Skills</th><th>View</th><th>Edit</th><th>Delete</th></tr></thead>
                        {d}
                        </table>
                    )
                });
                if(result.data.length!==0){
                  localStorage.setItem("overalldetails",JSON.stringify(result.data));
                  setoveralldetails(result.data);
                }
                // setoveralldetails(result);
                // console.log(overalldetails);
            })
        }

    }
    useEffect(()=>{
        design();
    },[])
 

var modal = document.getElementById("myModal");
// var btn = document.getElementById("myBtn");
// var span = document.getElementsByClassName("close")[0];

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
const spann=()=>{
    modal.style.display = "none";
}
const btnn=()=>{
    modal.style.display = "block";
}
function openModal() {
    document.getElementById("viewdetail").style.display = "block";
  }
  
  // Function to close the modal
  function closeModal() {
    document.getElementById("viewdetail").style.display = "none";
  }

return(
    <div>
           <a className='right register' href='/'>Register</a>
        <a className='right login' href='/login'>Login</a>
        <div>
        <div className='users'>
        
        {designn}


        <button className='hidden' id="myBtn" onClick={btnn}>Open Modal</button>


<div id="myModal"  className="modal">

  <div className="modal-content">
    <div >   
         
 </div>
 <div className="modal-body">
 <span onClick={spann} className="close">&times;</span>
 <div className='alignment'>
    <div>
    <label htmlFor=""> Userid </label>&nbsp;
 <input className="right" type="text" id="user_id" name="user_id" onChange={(e)=>handlemodalchange(e)} value={currdetails.user_id} /> &nbsp;
 <label htmlFor=""> Mobile </label>&nbsp;
 <input className="right" type="text" name='mobile' onChange={(e)=>handlemodalchange(e)} value={currdetails.mobile} id="mobile"/><br></br><br></br>
    </div>
    <div>
    <label htmlFor=""> Email </label>&nbsp;&nbsp;
 <input className="right" type="text" id="email" name='email' onChange={(e)=>handlemodalchange(e)} value={currdetails.email} />&nbsp; 
 &nbsp;<label htmlFor=""> Role </label>&nbsp;
 <input className="right" onChange={(e)=>handlemodalchange(e)} value={currdetails.role} type="text" name='role' id="role"/><br></br><br></br>
    </div>
    <div>
    <label htmlFor=""> Skills </label>&nbsp;&nbsp;&nbsp;
 <input className="right" onChange={(e)=>handlemodalchange(e)} value={currdetails.skills} name='skills' type="text" id="skills"/>&nbsp;
 
    </div>
 </div>
 
 <input className='hidden' id='file' type="file" name="image" />
        {/* <button id='imggg' onClick={Imgupload} alt="Avatar" > Update </button> */}
 
 </div>
 <div className="modal-footer">
 <button  id='imggg' onClick={Imgupload} alt="Avatar" > Update </button>
 </div>
  </div>

</div>
    

    </div>
    </div>
    <br></br>
    
    <div id='viewdetail' className='employeee hidden'>
    <span onClick={()=>document.getElementById('viewdetail').classList.add('hidden')} id='viewclose' className='closee'>x</span>
                            <div className="screen__content justify-content-center">
                            <br /> <br />
                            <div className='emp'>
                            
                            <img className='profile-pics2' src={'http://localhost:3001/'+currdetails.photo} />
                            
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>User_Id</div><div className='col lbl'>{currdetails.user_id}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Email</div><div className='col lbl'>{currdetails.email}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Mobile</div><div className='col lbl'>{currdetails.mobile}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Role</div><div className='col lbl'>{currdetails.role}</div></div> <br />
                            <div className='row'><div className='col lbl'style={{fontWeight: "700",fontSize: "18px"}}>Skills</div><div className='col lbl'>{currdetails.skills}</div></div> <br />                  
                            </div>
                            </div>
                            </div>
       
        
    </div>
   
    
)
}

export default Usersprofile;