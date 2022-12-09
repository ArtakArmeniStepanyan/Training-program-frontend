import style from '../profileStyles.module.css';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';





const MyProfile = () => {

    const currentUser = useSelector(getCurrentUser);

    return(
        <Container>

            <div className={style.editDiv}>
                <Button variant="outline-secondary">
                    <Link to='/edit-profile' className={style.editLink}>Edit Profile</Link>
                </Button>
            </div>
            <Row>
                <Col lg={5}>
                    <img src={currentUser.image? 'http://server.am/storage/' + currentUser.image :
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                    className={style.avatar} />
                </Col>
                <Col lg={7} className="ps-5">
                    <div>
                        <h1>{currentUser.name} {currentUser.surname}</h1>
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
                                    <li className={style.listRight}>{currentUser.name}</li>
                                    <li className={style.listRight}>{currentUser.surname}</li>
                                    <li className={style.listRight}>{currentUser.email}</li>
                                </ul>    
                            </Col>
                        </Row>
                        
                    </div>
                </Col>
            </Row>
        </Container>        
    )
}

export default MyProfile;
