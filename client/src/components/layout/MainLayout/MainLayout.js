import MainMenu from './../MainMenu/MainMenu';
import Container from 'react-bootstrap/Container';

const MainLayout = ({ children }) => (
  <div>
    <MainMenu />
    <Container className="mt-3">{children}</Container>
  </div>
);

export default MainLayout;
