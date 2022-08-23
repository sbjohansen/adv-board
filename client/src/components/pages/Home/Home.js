import { useSelector, useDispatch } from 'react-redux';
import { getAdverts, getRequest, fetchAdverts } from '../../../redux/advertsRedux';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Adverts from '../../features/Adverts/Adverts';
import { getUser } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const request = useSelector(getRequest);
  const user = useSelector(getUser);
  const [search, setSearch] = useState('');
  useEffect(() => {
    dispatch(fetchAdverts());
  }, []);

  return (
    <div>
      <Container>
        {user && (
          <Row className="mb-5 d-flex-end">
            <Col>
              <Button variant="outline-success" to="/advert/add" as={Link}>
                New Advert
              </Button>
            </Col>
            <Col>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" as={Link} to={'/search/' + search}>
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        )}
        {request.pending ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : request.error ? (
          <div>ERROR!!!</div>
        ) : request.success && adverts.length ? (
          <div>
              <Adverts adverts={adverts} />
          </div>
        ) : (
          <div>No adverts</div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
