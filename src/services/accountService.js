import http from './httpService';

export function getAccount() {
  return http.get('/account-info');
}
