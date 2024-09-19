import './App.css';
import { Route, Routes } from 'react-router-dom';
import HeroSection from './component/heroSection/index';
import Login from './component/login/index';
import SignUp from './component/signUp/index';
import Dashboard from './component/Dashboard/index';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const routes = [
  { path: '/', element: <HeroSection /> },
  { path: '/login', element: <Login /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/dashboard', element: <Dashboard/> }
];

const App = () => {
  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/* You can add a fallback route for unmatched paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      
      {/* ToastContainer for notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
