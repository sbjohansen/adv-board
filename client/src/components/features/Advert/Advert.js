import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Advert = ({ _id, title, description, pubDate, price, image, address, user }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price {price}$</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Read more</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Advert;
