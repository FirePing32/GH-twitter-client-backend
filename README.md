# GH-Twitter Client Backend

Firebase function in Node.js for [GH-Twitter Client](https://github.com/FirePing32/GH-twitter-client).

## Install dependencies

```bash
$ cd functions && npm install
```

## Setup

Set Twitter API credentials in `index.js` -
```javascript
var twitter_application_consumer_key = 'TWITTER_APPLICATION_CONSUMER_KEY';
var twitter_application_secret = 'TWITTER_APPLICATION_SECRET';
var twitter_user_access_token = 'TWITTER_USER_ACCESS_TOKEN';
var twitter_user_secret = 'TWITTER_USER_SECRET';
```

To secure the function endpoint, set the [`TOKEN`](https://github.com/FirePing32/GH-twitter-client-backend/blob/f7051467405ebd86040eb071210c9e75743e99dd/functions/index.js#L32) variable to any alphanumeric string. This token should match the token set in the [RN app](https://github.com/FirePing32/GH-twitter-client/blob/e19de98becde022985b2d6dd0a0dbb3c8ff82189/App.js#L27).

To test the function locally -

```bash
$ firebase emulators:start
```

Deploy the function -

```bash
$ firebase deploy --only functions
```
