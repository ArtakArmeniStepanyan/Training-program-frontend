import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../../Redux/Slices/CurrentUser/currentUserSelectors';


import HomePage from './HomePage/HomePage';
import Chat from './Chat/Chat';
import Gallery from './Gallery/Gallery';
import Todo from './Todo/Todo';
import Users from './Users/Users';
import Weather from './Weather/Weather';
import NotFoundPage from '../../Common/NotFoundPage';
import Login from '../../Auth/Login';
import Registration from '../../Auth/Registration';
import MyProfile from './Profile/MyProfile/MyProfile';
import EditProfile from './Profile/EditProfile/EditProfile';
import UserProfile from './Profile/UserProfile/UserProfile';
import Folder from './Gallery/Folder';

const Content = () => {
    const isAuth = useSelector(getIsAuth);
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/todo' element={<Todo/>}/>
            <Route path='/gallery' element={<Gallery />}/>
            <Route path='/folder/:id' element={<Folder/>}/>
            <Route path='/weather' element={<Weather />}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/user/:id' element={<UserProfile/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route
                path="/login"
                element={ isAuth ? <Navigate to="/" /> : <Login /> }/>;
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/my-profile' 
                element={ !isAuth ? <Navigate to="/" /> : <MyProfile/> }/>
            <Route path='/edit-profile' 
                element={ !isAuth ? <Navigate to="/" /> : <EditProfile/> }/>
            <Route path='*' element={<NotFoundPage />}/>
        </Routes>
    )
    
}

export default Content;