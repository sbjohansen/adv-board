import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { createAdvert } from '../../../redux/advertsRedux';
import { useState } from 'react';

const AdvForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [pubDate, setPubDate] = useState(new Date());
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdvert({ title, description, price, image, address, pubDate, user }));
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              className="me-2"
              aria-label="Title"
              onChange={setTitle}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              className="me-2"
              aria-label="Description"
              onChange={setDescription}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              className="me-2"
              aria-label="Price"
              onChange={setPrice}
            />
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Image"
              className="me-2"
              aria-label="Image"
              onChange={setImage}
            />
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              className="me-2"
              aria-label="Address"
              onChane={setAddress}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {' '}
            Submit{' '}
          </Button>
        </Form>
      </Container>{' '}
    </div>
  );
};

export default AdvForm;
