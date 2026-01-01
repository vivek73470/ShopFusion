
import './App.css';
import AllRoutes from './Components/AllRoutes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  );
}

export default App;
