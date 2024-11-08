import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Sample from './pages/Dashboard/Sample.jsx'
import Mainpage from './pages/Mainpage'
import { Routes, Route } from "react-router-dom" 

function App() {
  
  return (
    <>    
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/signin" element={ <SignIn />} />
      <Route path="/signup" element={ <SignUp/> }/>  
      <Route path="/dashboard" element={<Dashboard />} />      
      <Route path="/sample" element={<Sample />} />
      <Route path="/main" element={<Mainpage />} />
    </Routes>
    </>
  )
}

export default App
