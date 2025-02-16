import { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';

import CardComponent from '../components/ui/CardComponent';
import CreateCardComponent from '../components/ui/CreateCardComponent';

const Roadmaps = () => {
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
    <div className=''>

      
      <div className='flex flex-wrap gap-4 '>
        <CreateCardComponent/>
        
        {[1, 2, 3, 4,5,6,7,8,9,10].map((item) => (
          <CardComponent className=' w-full' key={item} />

        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
