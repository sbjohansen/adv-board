import { Navbar, Nav, Input } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import AdminIcon from '@rsuite/icons/Admin';


const MainMenu = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#">AdvBoard</Navbar.Brand>
      <Nav>
        <Nav.Item icon={<HomeIcon />}>Home</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item>Company</Nav.Item>
          <Nav.Item>Team</Nav.Item>
          <Nav.Menu title="Contact">
            <Nav.Item>Via email</Nav.Item>
            <Nav.Item>Via telephone</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item>
          <Input placeholder="Login" />
        </Nav.Item>
        <Nav.Item>
          <Input placeholder="Password" type="password" />
        </Nav.Item>
        <Nav.Item icon={<AdminIcon />}>Login</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default MainMenu;
