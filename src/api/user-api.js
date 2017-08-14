import 'whatwg-fetch';
import getBaseUrl from './base-url';

const baseUrl = getBaseUrl();

export function getUsers() {
    return get('users');
}
export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });
  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}
