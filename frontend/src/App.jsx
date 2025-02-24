import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
// import Dashboard from './pages/Dashboard';
// import Resources from './pages/Resources';
// import Resume from './pages/Resume';
// import Profile from './pages/Profile';
// import RoadmapView from './pages/RoadmapView';
import Waitlist from './pages/Waitlist';
import WaitlistSuccess from './pages/WaitlistSuccess';

// import ProtectedRoute from './components/auth/ProtectedRoute';
// import AppLayout from './layouts/AppLayout';
import { UserProvider } from './contexts/userContext';
import ProtectedWaitlistRoute from './components/auth/ProtectedWaitlistRoute';

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function SignupAndLogout() {
//   localStorage.clear();
//   return <Signup />;
// }

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupAndLogout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes wrapped with AppLayout */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/roadmap/:id"
            element={
              <ProtectedRoute>
                <RoadmapView />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Resources />
                </AppLayout>
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Resume />
                </AppLayout>
              </ProtectedRoute>
            }
          />  */}
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            }
          /> */}
          <Route path="/waitlist" element={<Waitlist />} />
          <Route 
            path="/waitlist-success" 
            element={
              <ProtectedWaitlistRoute>
                <WaitlistSuccess />
              </ProtectedWaitlistRoute>
            } 
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
