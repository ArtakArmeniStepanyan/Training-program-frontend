import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import { useEffect } from 'react';
import { getCurrentUser } from './Redux/Slices/CurrentUser/currentUserReducer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const currentUserToken = JSON.parse(localStorage.getItem("token"));
  
  useEffect(() => {
    dispatch(getCurrentUser(currentUserToken));
  },[])
  
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;


