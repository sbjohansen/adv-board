import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <div>
      <Navbar className="mb-2" sticky="top" bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            AdvBoard
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          {!user && (
            <Nav className="ml-auto">
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link to="/register" as={NavLink}>
                Register
              </Nav.Link>
            </Nav>
          )}
          {user && (
            <Nav className="ml-auto">
              <Nav.Link to="/logout" as={NavLink}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default MainMenu;
