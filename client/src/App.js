import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
// import routes
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import AdvAdd from './components/features/AdvAdd/AdvAdd';
import AdvRemove from './components/features/AdvRemove/AdvRemove';
import AdvFull from './components/features/AdvFull/AdvFull';
import Search from './components/features/Search/Search';
import Login from './components/features/Login/Login';
import Register from './components/features/Register/Register';
import Logout from './components/features/Logout/Logout';
import { API_URL } from './config';
import { useDispatch } from 'react-redux';
import { fetchAdverts } from './redux/advertsRedux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  const options = {
    method: 'GET',
  };
  fetch(`${API_URL}/auth/user`, options).then((res) => {
    if (res.status === 200) {
      return console.log('You are logged in');
    }
  });

  useEffect(() => {
    dispatch(fetchAdverts());
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advert/:advertId" element={<AdvFull />} />
        <Route path="/advert/add" element={<AdvAdd />} />
        <Route path="/advert/edit/:advertId" element={<AdvAdd/>} />
        <Route path="/advert/remove/:advertId" element={<AdvRemove />} />
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
