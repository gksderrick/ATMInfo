// https://testfinmapapi.kftc.or.kr/
// https://testapi.openbanking.or.kr/

// https://openapi.finmap.or.kr/v1.0/kftc/inquiry/env_lists
// https://openapi.finmap.or.kr/v1.0/kftc/inquiry/atm_lists

// https://openapi.openbanking.or.kr/oauth/2.0/token
// https://openapi.openbanking.or.kr/oauth/2.0/authorize

// https://developers.kftc.or.kr/finmap/oauth/2.0/token

const tokenURL = "https://openapi.openbanking.or.kr/oauth/2.0/token";
const authorizeURL = "https://testapi.openbanking.or.kr/oauth/2.0/authorize";
// const authorizeURL = "https://developers.kftc.or.kr/finmap/oauth/2.0/authorize";

const oauthTokenRequestBody = {
  "code": "M202401898",
  "client_id": "e9c15224-1682-446d-b12f-9456df7c4a17",
  "client_secret": "cecf3064-78a7-4390-985c-84cf408b8aed",
  "scope": "finmap",
  "grant_type": "authorization_code",
  "redirect_uri": "localhost:5500"
};
const oauthTokenRequestParams = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded, charset=UTF-8',
    },
    body: oauthTokenRequestBody,
    method: 'POST',
};

const oauthAuthorizeQuery = new URLSearchParams({
  "response_type": "code",
  "client_id": "e9c15224-1682-446d-b12f-9456df7c4a17",
  "redirect_uri": "https://developers.kftc.or.kr/dev/openapi/map/atm",
  "scope": "login inquiry transfer",
  "state": "1234567890123456789012",
  "auth_type": "0"
});
const authorizeURLwithParams = `${authorizeURL}?${oauthAuthorizeQuery}`;
const oauthAuthorizeRequestParams = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded, charset=UTF-8',
  },
  method: 'GET'
};


const URL = authorizeURL;
const PARAMS = oauthAuthorizeRequestParams;

fetch(URL, PARAMS)
.then((data) => {console.log(data); return data.json()})
.then((res) => {console.log(res)})
.catch((error) => console.log(error));