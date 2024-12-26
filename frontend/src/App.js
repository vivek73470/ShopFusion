
import './App.css';
import AllRoutes from './Components/AllRoutes/AllRoutes';
import Loading from './Components/LoadingOverlay/Loading';
import { useSelector } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const fetching = useSelector((store) => store.ProductReducer.loading)

  return (
    <>
      {fetching && <Loading show={fetching} />}
      <ToastContainer />
      <AllRoutes />
    </>
  );
}

export default App;
