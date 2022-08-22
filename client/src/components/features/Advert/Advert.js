import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IMGS_URL } from '../../../config.js';
import { Link } from 'react-router-dom';

const Advert = ({ _id, title, description, pubDate, price, image, address, user }) => {

  return (
    <Card style={{ width: '18rem', height: '24rem' }}>
      <Card.Img variant="top" src={IMGS_URL + image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price {price}$</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Card.Link variant="outline-success" to={'/advert/' + _id } as={Link}>Read more</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Advert;
