
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

import Resources from './pages/Resources.jsx';
import Resume from './pages/Resume';
import Profile from './pages/Profile';

import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './layouts/AppLayout.jsx';
import { UserProvider } from './contexts/UserContext';
import Roadmaps from './pages/Roadmaps.jsx';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function SignupAndLogout() {
  localStorage.clear();
  return <Signup />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupAndLogout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes wrapped with AppLayout */}
          <Route
            path="/roadmaps"
            element={
              <ProtectedRoute>
                <AppLayout>
                 <Roadmaps />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Resources />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Resume />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            }
          />  
         
          

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
