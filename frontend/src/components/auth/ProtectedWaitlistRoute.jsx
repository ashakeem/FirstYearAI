import { Navigate } from 'react-router-dom';

const ProtectedWaitlistRoute = ({ children }) => {
  // Check if user completed the waitlist form
  const hasJoinedWaitlist = sessionStorage.getItem('waitlistCompleted');

  if (!hasJoinedWaitlist) {
    return <Navigate to="/waitlist" replace />;
  }

  return children;
};

export default ProtectedWaitlistRoute; 