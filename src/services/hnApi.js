import axios from 'axios';

const baseUrl = 'http://hn.algolia.com';

let storiesUrl = '';

export const getAllStories = async (pageNo) => {
  if (pageNo > 0) {
    storiesUrl = `${baseUrl}/api/v1/search?page=${pageNo}`
  } else {
    storiesUrl = `${baseUrl}/api/v1/search?tags=front_page`;
  }

  const request = await axios.get(storiesUrl);
  return request;
  //return stories;
}

