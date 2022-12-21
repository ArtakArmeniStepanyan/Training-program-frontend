import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ getCurrentUser } from '../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { getUsers } from '../../../../Redux/Slices/Users/usersReducer';
import { getFriends } from '../../../../Redux/Slices/Users/usersReducer';
import{ getAllUsers } from '../../../../Redux/Slices/Users/usersSelectors';
import{ getAllFriends } from '../../../../Redux/Slices/Users/usersSelectors';
import SingleUserRow from './SingleUserRow';
import style from './users.module.css';


const Users = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(getCurrentUser);
    useEffect(() => {
        dispatch(getUsers(authUser.userId));
        dispatch(getFriends(authUser.userId));
    },[])
    const allUsers = useSelector(getAllUsers);
    const friends = useSelector(getAllFriends);
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
                    <div className={style.usersDiv}>
                        {friends.map(friend => 
                            <SingleUserRow user={friend} key={friend.id}/>
                        )}       
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Users;