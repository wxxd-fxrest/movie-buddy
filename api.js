import {REACT_APP_API_KEY, REACT_BASE_URL} from '@env';

export const movieApi = { 
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
          `${REACT_BASE_URL}/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&page=1&query=${query}`
        ).then((res) => 
			  res.json()
		);
    },
};