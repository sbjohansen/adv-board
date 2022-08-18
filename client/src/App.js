import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Container from 'rsuite/Container';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Advert from './components/features/Advert/Advert';
import Adverts from './components/features/Adverts/Adverts';
// import routes
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';

function App() {

  return (
    <CustomProvider theme="dark">
      <MainLayout>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ads/:id" element={<Advert />} />
            <Route path="/ads" element={<Adverts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </MainLayout>
    </CustomProvider>
  );
}

export default App;
