import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import VideoGame from './pages/Dashboard/VideoGame.jsx'
import { Routes, Route } from "react-router-dom"

function App() {
  
  return (
    <>    
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/signin" element={ <SignIn />} />
      <Route path="/signup" element={ <SignUp/> }/>  
      <Route path="/dashboard" element={<Dashboard />} />      
      <Route path="/video_game" element={<VideoGame />} />
    </Routes>
    </>
  )
}

export default App
