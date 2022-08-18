import MainMenu from './../MainMenu/MainMenu';
import Footer from './../Footer/Footer';
import Container from 'rsuite/Container';

const MainLayout = ({ children }) => (
  <div>
    <MainMenu />
    <Container>{children}</Container>
    <Footer />
  </div>
);

export default MainLayout;
