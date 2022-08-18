import { useSelector, useDispatch } from 'react-redux';
import { getAdverts, getRequest, fetchAdverts } from '../../../redux/advertsRedux';
import { useEffect } from 'react';
import { Loader } from 'rsuite';

import Adverts from '../../features/Adverts/Adverts';

const HomePage = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  if (request.pending) return <Loader />;
  else if (request.error) return <div>ERROR!!!</div>;
  else if (!request.success || !adverts.length) return <div>No adverts</div>;
  else if (request.success && adverts.length) return <Adverts adverts={adverts} />;
};

export default HomePage;
