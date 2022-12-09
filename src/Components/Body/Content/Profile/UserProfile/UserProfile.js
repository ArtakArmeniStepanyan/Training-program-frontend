import style from '../profileStyles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser, addToFriend, getIsFriend } from '../../../../../Redux/Slices/Users/usersReducer';
import { getSelectedUser, getIsFriendValue } from '../../../../../Redux/Slices/Users/usersSelectors';
import { getCurrentUserId } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';

const UserProfile = () => {
    const params = useParams();
    useEffect(() => {
        dispatch(getUser(params.id));
        dispatch(getIsFriend(authUserId, params.id));
    },[])

    const dispatch = useDispatch();

    const selectedUser = useSelector(getSelectedUser);
    const authUserId = useSelector(getCurrentUserId);
    const isFriend = useSelector(getIsFriendValue);

    const addToFriendHandler = (id) => {
        dispatch(addToFriend(authUserId, id));
    }

    return(
        <Container>
            <Row>
                <Col lg={5}>
                    <img src={selectedUser.image? 'http://server.am/storage/' + selectedUser.image :
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                    className={style.avatar} />
                </Col>
                <Col lg={7} className="ps-5">
                    <div>
                        <h1>{selectedUser.name} {selectedUser.surname}</h1>
                    </div>
                    <div>
                        <Row>
                            <Col lg={6}>
                                <ul>
                                    <li className={style.listLeft}>Name:</li>
                                    <li className={style.listLeft}>Surname:</li>
                                    <li className={style.listLeft}>Email:</li>
                                </ul>
                            </Col>
                            <Col lg={6}>
                                <ul>
                                    <li className={style.listRight}>{selectedUser.name}</li>
                                    <li className={style.listRight}>{selectedUser.surname}</li>
                                    <li className={style.listRight}>{selectedUser.email}</li>
                                </ul>    
                            </Col>
                        </Row> 
                    </div>
                </Col>
            </Row>
            {authUserId && !isFriend ?
            <div className={style.addFriendButtonDiv}>
                <Button variant="primary" onClick={ () => {addToFriendHandler(selectedUser.userId)} }>Add to friends</Button>
            </div> : ''}
            {authUserId && isFriend ?
            <div className={style.addFriendButtonDiv}>
                <Button variant="primary" onClick={ () => {addToFriendHandler(selectedUser.userId)} }>Remove from friends</Button>
            </div> : ''}
        </Container>    
    )
}

export default UserProfile;
