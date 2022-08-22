import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getRequest, getAdvertById, fetchAdverts } from '../../../redux/advertsRedux';

import { fetchAdvert } from '../../../redux/advertsRedux';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import ListGroup from 'react-bootstrap/ListGroup';
import { IMGS_URL } from '../../../config.js';
import { getUser } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdvFull = (props) => {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const advert = useSelector(getAdverts);
  const request = useSelector(getRequest);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdvert(advertId));
  }, []);

  const advData = advert[0];
  const user = useSelector(getUser);
  
  return (
    <div>
      {request.pending ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : request.error ? (
        <div>ERROR!!!</div>
      ) : request.success && advert.length ? (
        <div>
          
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src={IMGS_URL + advData.image}
                  style={{ width: 'auto', height: '24rem', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{advData.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Price {advData.price}$</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <ListGroup className="list-group-flush">
                  <Card.Body>
                    <Card.Title>Description</Card.Title>
                    <Card.Text>{advData.description}</Card.Text>
                  </Card.Body>
                </ListGroup>
                <ListGroup className="list-group-flush">
                  <Card.Body>
                    <Card.Title>Address</Card.Title>
                    <Card.Text>{advData.address}</Card.Text>
                  </Card.Body>
                </ListGroup>
                <ListGroup className="list-group-flush">
                  <Card.Body>
                    <Card.Title>Published Date</Card.Title>
                    <Card.Text>{advData.pubDate}</Card.Text>
                  </Card.Body>
                </ListGroup>
                <ListGroup className="list-group-flush">
                  <Card.Body>
                    <Card.Title>Seller</Card.Title>
                    <Card.Text>{advData.user}</Card.Text>
                  </Card.Body>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {user !== null && user.login === advData.user &&  (
            <Row className="d-flex justify-content-end">
              <Button
                style={{ width: '100px' }}
                variant="outline-success"
                to={`/ads/edit/${advertId}`}
                as={Link}

              >
                {' '}
                Edit{' '}
              </Button>
              <Button
                style={{ width: '100px' }}
                variant="outline-danger"
                to={`/advert/remove/${advertId}`}
                as={Link}
              >
                {' '}
                Delete{' '}
              </Button>
            </Row>
          )}
        </div>
      ) : (
        <div>No adverts</div>
      )}
    </div>
  );
};

export default AdvFull;
