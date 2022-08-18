import { Sidenav, Nav, Form, ButtonToolbar, Button, Input } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

const SideBar = () => {
  return (
    <div style={{ width: 240 }}>
      <Sidenav defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav activeKey="1">
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Profile
            </Nav.Item>
            <Nav.Menu eventKey="3" title="Filter" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">
                Location <Input placeholder="Location" type="text" />
              </Nav.Item>
              <Nav.Item eventKey="3-2">Price</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideBar;
