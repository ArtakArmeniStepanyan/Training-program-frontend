import SideBar from './SideBar/SideBar';
import Content from './Content/Content';

import { 
    Container,
    Row,
    Col,
  } from 'react-bootstrap';

const Body = () => {
    return(
        <div className='body'>
            <Container>
                <Row>
                    <Col md={3}>
                    <div className='sideBar'>
                        <SideBar />
                    </div>
                    </Col>
                    <Col md={9}>
                    <div className='content'>
                        <Content />
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Body;