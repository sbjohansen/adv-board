import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Advert from './components/features/Advert/Advert';
// import routes
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import AdvAdd from './components/features/AdvAdd/AdvAdd';
import AdvEdit from './components/features/AdvEdit/AdvEdit';
import AdvRemove from './components/features/AdvRemove/AdvRemove';
import Search from './components/features/Search/Search';
import Login from './components/features/Login/Login';
import Register from './components/features/Register/Register';
import Logout from './components/features/Logout/Logout';
import { fetchUser } from './redux/usersRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advert/:id" element={<Advert />} />
        <Route path="/advert/add" element={<AdvAdd />} />
        <Route path="/advert/edit/:id" element={<AdvEdit />} />
        <Route path="/advert/remove/:id" element={<AdvRemove />} />
        <Route path="/search/:searchPhase" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/NotFound" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
