import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Adverts from '../../features/Adverts/Adverts';
import { getUser } from '../../../redux/usersRedux';
import { getAdverts, getRequest, fetchAdvertBySearchPhase } from '../../../redux/advertsRedux';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Search = () => {
  const { searchPhase } = useParams();
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(fetchAdvertBySearchPhase(searchPhase));
  }, []);

  return (
    <div>
      <Container>
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
            <h2>Search results</h2>
            <Row className="mb-5 d-flex justify-content-center">
              <Adverts adverts={adverts} />
            </Row>
          </div>
        ) : (
          <div>No adverts</div>
        )}
      </Container>{' '}
    </div>
  );
};

export default Search;
