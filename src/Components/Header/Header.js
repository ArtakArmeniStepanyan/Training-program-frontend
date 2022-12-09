import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Navbar, 
    Container,
    Dropdown,
  } from 'react-bootstrap';
  
import { getIsAuth } from '../../Redux/Slices/CurrentUser/currentUserSelectors';
import { getCurrentUser } from '../../Redux/Slices/CurrentUser/currentUserSelectors';
import { logout } from '../../Redux/Slices/CurrentUser/currentUserReducer';
import { confirm } from "react-confirm-box";

const Header = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);

  const logoutHandler = async () => {
    const result = await confirm("Logout?");
    if (result) {
      dispatch(logout(currentUser.userId))
      return;
    }

  };

    return(
        <div className='header'>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand >
              <Link to='/' >
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' className='mainLogo' alt='...' />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>

              {isAuth?
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <img src={currentUser.image? 'http://server.am/storage/' + currentUser.image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className='smallAvatar' />
                    {currentUser.name} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item ><Link to='/my-profile' style={{'textDecoration': 'none'}}>My profile</Link></Dropdown.Item>
                    <Dropdown.Item onClick={() => { logoutHandler() }}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                :<div>
                  <Link to='/login' className='navLink'>Login</Link>
                  <Link to='/registration' className='navLink'>Registration</Link>
                </div>
                }
                
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
}

export default Header;