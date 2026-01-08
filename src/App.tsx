import { Route, RouterProvider } from 'react-router-dom';
import router from './routes/route';
import HomeLayout from './layouts/HomeLayout';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

function App() {
  return (
    <AudioPlayerProvider>
      <RouterProvider router={router} />
    </AudioPlayerProvider>
  );
}

export default App;