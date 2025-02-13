
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NoMatch from './pages/NoMatch'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function SignupAndLogout(){
  localStorage.clear()
  return <Signup/>
}

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupAndLogout/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    
    </>
  )
}

export default App
