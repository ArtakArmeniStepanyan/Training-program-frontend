import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const SideBar = () => {
    return(
        <Nav defaultActiveKey="/" className="flex-column">
            <NavLink to='/' className='navLink'>Home</NavLink>
            <NavLink to='/todo' className='navLink'>Todo</NavLink>
            <NavLink to='/gallery' className='navLink'>Gallery</NavLink>
            <NavLink to='/weather' className='navLink'>Weather</NavLink>
            <NavLink to='/users' className='navLink'>Users</NavLink>
            <NavLink to='/chat' className='navLink'>Chat</NavLink>
        </Nav>
    )
}

export default SideBar;