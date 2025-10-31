import { Route, RouterProvider } from 'react-router-dom';
import router from './routes/route';
import HomeLayout from './layouts/HomeLayout';

function App() {
  return (
    <RouterProvider router={router}>
      <Route path="/" element={<HomeLayout />}></Route>
    </RouterProvider>
  );
}

export default App;