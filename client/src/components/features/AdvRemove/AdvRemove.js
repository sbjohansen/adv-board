import { API_URL } from '../../../config';
import { deleteAdvert } from '../../../redux/advertsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

const AdvRemove = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { advertId } = useParams();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };
    fetch(`${API_URL}/ads/${advertId}`, options)
      .then(() => {
        dispatch(deleteAdvert(advertId));
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, navigate]);

  return null;
};

export default AdvRemove;
