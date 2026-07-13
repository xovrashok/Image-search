import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function getImagesByQuery(query, page, perPage) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '56652561-3c3afa13e53c98b396d0dbe19',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  });

  return response.data;
  // } catch (error) {
  //   iziToast.error({
  //     title: 'Error',
  //     message: 'Something went wrong. Please try again later.',
  //     position: 'topRight',
  //   });
  //   console.error(error);
  // }
}
