// eslint-disable-next-line max-len
export const BASE_URL_IMG = 'https://raw.githubusercontent.com/fe-aug23-team5/product_catalog-static/main/';
const BASE_URL = 'https://product-catalog-backend-2ffw.onrender.com';

export function getData<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      throw new Error(`Fetch error: ${error.message}`);
    });
}
