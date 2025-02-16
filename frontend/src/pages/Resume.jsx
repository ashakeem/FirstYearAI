import { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import CardComponent from '../components/ui/CardComponent';

const Resume = () => {
  const { selectedMenuItem, sharedData, setSharedData, user, setUser } = useUserContext();

  useEffect(() => {
    // Example: update shared data when Dashboard mounts.
    setSharedData({ dashboardLoaded: true, timestamp: Date.now() });

    // Optionally, set user information if not already set.
    if (!user) {
      setUser({ name: 'John Doe', email: 'john.doe@example.com' });
    }
  }, [setSharedData, user, setUser]);

  return (
    <div>
        
      
    </div>
  );
};

export default Resume;
