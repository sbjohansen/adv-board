import Advert from '../Advert/Advert';
import { FlexboxGrid, Divider, Container } from 'rsuite';

const Adverts = ({ adverts }) => {
  return (
    <div>
      <Container>
        <FlexboxGrid justify="space-around">
          {adverts.map((advert) => (
            <Advert key={advert._id} {...advert} />
          ))}
        </FlexboxGrid>
      </Container>
    </div>
  );
};

export default Adverts;
