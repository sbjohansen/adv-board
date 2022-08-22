import Advert from '../Advert/Advert';
import { Container, Col, Row } from 'react-bootstrap';

const Adverts = ({ adverts }) => {
  return (
    <div>
      <Container>
        <Row>
          {adverts.map((advert) => (
            <Col md={4} className="mb-3">
              <Advert key={advert._id} {...advert} advertId={advert._id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Adverts;
