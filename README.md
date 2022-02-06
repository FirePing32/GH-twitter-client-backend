# GH-Twitter Client Backend

Firebase function in Node.js for [GH-Twitter Client](https://github.com/FirePing32/GH-twitter-client).

## Install dependencies

```bash
cd functions && npm install
```

## Setup

To test the Firebase function locally -
```bash
$ firebase emulators:start
```

Deploy the function -
```bash
$ firebase deploy --only functions
```

Set Twitter credentials in `index.js` -
```javascript
var twitter_application_consumer_key = 'TWITTER_APPLICATION_CONSUMER_KEY';
var twitter_application_secret = 'TWITTER_APPLICATION_SECRET';
var twitter_user_access_token = 'TWITTER_USER_ACCESS_TOKEN';
var twitter_user_secret = 'TWITTER_USER_SECRET';
```
