import React, { useState } from "react";
import "./App.css";

const BATCHES = [
"CSE-A","CSE-B","CSE-C","CSE-D","CSE-E","CSE-F",
"AIML-A","AIML-B","AIML-C","AIML-D","AIML-E","AIML-F"
];

function App() {

const [form,setForm]=useState({
name:"",
email:"",
regNo:"",
phNo:"",
college:"SRI INDU",
year:1,
batch:"CSE-A"
});

const [loading,setLoading]=useState(false);
const [status,setStatus]=useState({type:"",msg:""});

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();
setLoading(true);
setStatus({type:"",msg:""});

try{

const token=localStorage.getItem("token");

const response=await fetch("http://localhost:3000/recreateStudentWithMail",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(form)
});

const data=await response.json();

if(!response.ok){
throw new Error(data.message || "Something went wrong");
}

setStatus({
type:"success",
msg:"Student Registered Successfully 🎉"
});

setForm({
name:"",
email:"",
regNo:"",
phNo:"",
college:"SRI INDU",
year:1,
batch:"CSE-A"
});

}
catch(err){
setStatus({
type:"error",
msg:err.message
});
}
finally{
setLoading(false);
}

};

return(
<div className="page">

<div className="container">

<div className="header">
<div className="title">
Student Registration Portal
</div>

{/* <div style={styles.subtitle}>
SRI INDU Engineering College Admission Form
</div> */}
</div>


<form onSubmit={handleSubmit}>

<div className="form-grid">

<div className="input-group">
<label className="label">Full Name</label>

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter student name"
className="input"
required
/>
</div>


<div className="input-group">
<label className="label">Email</label>

<input
name="email"
type="email"
value={form.email}
onChange={handleChange}
placeholder="Enter email"
className="input"
required
/>
</div>


<div className="input-group">
<label className="label">
Registration Number
</label>

<input
name="regNo"
value={form.regNo}
onChange={handleChange}
placeholder="Enter reg no"
className="input"
required
/>
</div>


<div className="input-group">
<label className="label">
Phone Number
</label>

<input
name="phNo"
value={form.phNo}
onChange={handleChange}
placeholder="Enter mobile number"
className="input"
/>
</div>


<div className="input-group">
<label className="label">
College
</label>

<input
value={form.college}
disabled
className="input disabled-input"
/>
</div>


<div className="input-group">
<label className="label">
Year
</label>

<input
value={form.year}
disabled
className="input disabled-input"
/>
</div>


<div className="input-group">
<label className="label">
Batch
</label>

<select
name="batch"
value={form.batch}
onChange={handleChange}
className="input"
>
{
BATCHES.map((b)=>(
<option
key={b}
value={b}
>
{b}
</option>
))
}
</select>
</div>

</div>

<button
type="submit"
disabled={loading}
className="button"
>
{
loading
? "Registering..."
: "Create Student Account"
}
</button>

</form>


{
status.msg &&
<div className={`message ${status.type === 'error' ? 'error' : ''}`}>
{status.msg}
</div>
}

<div className="footer">
Secure Student Enrollment System © 2026
</div>

</div>

</div>
)

}

export default App;