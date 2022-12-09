import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ getCurrentUser } from '../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../../Redux/Slices/Users/usersReducer';
import{ getAllUsers } from '../../../../Redux/Slices/Users/usersSelectors';
import SingleUserRow from './SingleUserRow';
import style from './users.module.css';


const Users = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(getCurrentUser);
    useEffect(() => {
        dispatch(getUsers(authUser.userId));
    },[])
    const allUsers = useSelector(getAllUsers);
    return(
        <Container>
            <Row>
                <Col lg={6}>
                    <h2>All Users</h2>
                    <div className={style.usersDiv}>
                        {allUsers.map(user => 
                            <SingleUserRow user={user} key={user.id}/>
                        )}       
                    </div>
                </Col>
                <Col lg={6}>
                    <h2>Friends</h2>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Artak</td>
                                <td>Stepanyan</td>
                                <td><Link to='/user/'>artak@mail.ru</Link></td>
                                <td><Button variant="outline-danger">Remove</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Users;