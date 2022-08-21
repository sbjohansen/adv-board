import Advert from '../Advert/Advert';
import Container from 'react-bootstrap/Container';

const Adverts = ({ adverts }) => {
  return (
    <div>
      <Container>
        {adverts.map((advert) => (
          <Advert key={advert._id} {...advert} />
        ))}
      </Container>
    </div>
  );
};

export default Adverts;
