import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/signin" element={ <SignIn />} />
      <Route path="/signup" element={ <SignUp/> }/> 
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
