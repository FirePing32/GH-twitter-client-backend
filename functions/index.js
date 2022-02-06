const { timeStamp } = require('console');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const fs = require('fs');
var Twit = require('twit')

var twitter_application_consumer_key = 'TWITTER_APPLICATION_CONSUMER_KEY';  // API Key
var twitter_application_secret = 'TWITTER_APPLICATION_SECRET';  // API Secret
var twitter_user_access_token = 'TWITTER_USER_ACCESS_TOKEN';  // Access Token
var twitter_user_secret = 'TWITTER_USER_SECRET';  // Access Token Secret

var T = new Twit({
    consumer_key:         twitter_application_consumer_key,
    consumer_secret:      twitter_application_secret,
    access_token:         twitter_user_access_token,
    access_token_secret:  twitter_user_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {fs.mkdirSync('/tmp')} catch(err) {console.log(err)}

app.post('/', (req, res) => {
    const response = req.body
    tweetdata = response['status']
    content = response['content']
    token = response['token']
    if (token === 'TOKEN') {
        console.log("verified !")
        console.log('GETTING BLOB...')

        try {fs.unlinkSync('/tmp/code.jpg')} catch(err) {console.log(err)}
        var data = content.replace("data:application/octet-stream;base64", "")
        const buffer = Buffer.from(data, "base64");
        fs.writeFileSync("/tmp/code.jpg", buffer, (err) => {
            if(err){
                console("ERROR IS NOT GENErated")
                return err;
            }else{
                console.log("file was saved !")
            }
        })
        T.postMediaChunked({ file_path: '/tmp/code.jpg' }, (err, data, response) => {
            console.log(data)
            if (!err) {
                var mediaIdStr = data.media_id_string
                var altText = "Code image generated from Carbon API"
                var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

                T.post('media/metadata/create', meta_params, (err, data, response) => {
                    if (!err) {
                      // now we can reference the media and post a tweet (media will attach to the tweet)
                      var params = { status: tweetdata, media_ids: [mediaIdStr] }

                      T.post('statuses/update', params, (err, data, response) => {
                        if (!err) {
                            console.log(data)
                            try {fs.unlinkSync('/tmp/code.jpg')} catch(err) {console.log(err)}
                            res.json({status: 200})
                        }
                        else {
                            console.log(err)
                            try {fs.unlinkSync('/tmp/code.jpg')} catch(err) {console.log(err)}
                        }

                      })
                    }
                    else {
                        console.log(err)
                        try {fs.unlinkSync('/tmp/code.jpg')} catch(err) {console.log(err)}
                    }
                })
            }
            else {
                console.log(err)
                try {fs.unlinkSync('/tmp/code.jpg')} catch(err) {console.log(err)}
            }
          })

    }

  });

app.get('/', (req, res) => {
    res.json({'TYPE': 'GET',
              'ERROR': 'NOT ALLOWED'});
});


app.listen(3000, () => {
    console.info('Server is running on PORT:', 3000);
});

exports.app = functions.https.onRequest(app);
