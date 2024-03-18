import { Navigate, Route, Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import LikesPage from "./pages/LikesPage"
import SideBar from "./components/SideBar"
import { useAuthContext } from "../context/AuthContext"


function App() {
  const{authUser,loading}= useAuthContext();
  console.log(authUser)
  if(loading)
  return null
  return (
    <>
      <div className="flex text-white">
        <SideBar />
        <div className="max-w-5xl my-5 text-white flex-1 mx-auto transition-all duration-300">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={!authUser?<LoginPage />:<Navigate to={"/"}/> }/>
            <Route  path="/signup" element={!authUser?<SignUpPage />:<Navigate to={"/"}/> }/>
            <Route  path="/explore" element={authUser?<ExplorePage />:<Navigate to={"/login"}/>}/>
            <Route  path="/likes" element={authUser?<LikesPage />:<Navigate to={"/login"}/>}/>
          </Routes>
          {/* <footer>Footer</footer> */}
          <Toaster />
        </div>
      </div>
    </>
  )
}

export default App
