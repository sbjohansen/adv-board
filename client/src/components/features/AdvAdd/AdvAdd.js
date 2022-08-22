import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useState } from 'react';
import { API_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdvForm = ({ advert }) => {
  const advData = advert || '';
  const userName = useSelector(getUser);

  const [title, setTitle] = useState(advData.title || '');
  const [description, setDescription] = useState(advData.description || '');
  const [price, setPrice] = useState(advData.price || '');
  const [image, setImage] = useState(advData.image || '');
  const [address, setAddress] = useState(advData.address || '');
  const [pubDate, setPubDate] = useState(new Date().toJSON().slice(0,10).replace(/-/g,'/') || '');
  const [user, setUser] = useState(advData.user || userName.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('address', address);
    formData.append('pubDate', pubDate);
    formData.append('user', user);
  
    const options = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    };
   fetch(`${API_URL}/ads`, options)
   navigate('/');

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
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              className="me-2"
              aria-label="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              className="me-2"
              aria-label="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              className="me-2"
              aria-label="Image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              className="me-2"
              aria-label="Address"
              onChange={(e) => setAddress(e.target.value)}
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
