import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Profile from "./pages/profile"
import NotFound from "./pages/not-found"
import Signin from "./pages/_auth/sign-in"
import Signup from "./pages/_auth/sign-up"
import Header from "./common/header"

const App = () => {
  return (
    <>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
    </>
  )
}

export default App
