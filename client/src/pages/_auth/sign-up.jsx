import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] =useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value})
     console.log(formData);     
  }

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(formData)
     } )
     const data = await res.json();
     console.log(data);
     
      setLoading(false);
      setError(false)
      navigate("/sign-in")
     
   } catch (error) {
      setLoading(false);
      setError(true)
   }
  
  }

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className="text-3xl text-center 
      font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username"
        className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email"  id="email"
        className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="Password"  id="password"
        className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white 
        rounded-lg p-3 uppercase hover:opacity-95
        disabled:opacity-80">{loading ? "Loading" : "Sign Up"}</button>
      </form>
      <div className="flex gap-2 mt-5">
       <p>Have an account?</p>
       <Link to="/sign-in">
       <span className="text-blue-500">Sign in</span>
       </Link>
       <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      </div>
    </div>
  )
}

export default Signup
