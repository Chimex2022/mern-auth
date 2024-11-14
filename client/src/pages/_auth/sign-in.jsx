import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   const {loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch =useDispatch()

  const handleChange = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value})
     console.log(formData);     
  }

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
   dispatch(signInStart());
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(formData)
     } )
     const data = await res.json();
       dispatch(signInSuccess(data))
     navigate("/")
   } catch (error) {
     dispatch(signInFailure());
   }
  
  }

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className="text-3xl text-center 
      font-semibold my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email"  id="email"
        className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="Password"  id="password"
        className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white 
        rounded-lg p-3 uppercase hover:opacity-95
        disabled:opacity-80">{loading ? "Loading" : "Sign In"}</button>
      </form>
      <div className="flex gap-2 mt-5">
       <p>Don't have an account?</p>
       <Link to="/sign-up">
       <span className="text-blue-500">Sign up</span>
       </Link>
       <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      </div>
    </div>
  )
}

export default Signin
