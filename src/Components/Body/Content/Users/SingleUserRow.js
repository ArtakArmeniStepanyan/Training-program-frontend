import { Link } from 'react-router-dom';
import { Card, Alert  } from 'react-bootstrap';
import style from './users.module.css';


const SingleUserRow = ({user}) => {

    return(
        <>
            <Card style={{ width: '10rem' }} className={style.card}>
                <Card.Img variant="top" src={user.image? 'http://server.am/storage/' + user.image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                <Card.Body className={style.cardBody}>
                    <Link to={'/user/' + user.id}>
                    <Card.Title>{user.name} {user.surname}</Card.Title>
                    <Card.Text>
                        {user.email}
                    </Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleUserRow;