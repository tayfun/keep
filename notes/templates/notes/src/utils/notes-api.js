import axios from 'axios';

export {getNotesData};

function getNotesData() {
  const url = '/notes';
  return axios.get(url).then(response => response.data);
}
