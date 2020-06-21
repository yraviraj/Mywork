/*
 create a file called API_helper.js. This will be wrapper for 
 request module that you are using to make API calls. 
 In future if you need to use any other module, 
 you simple need to modify the API_helper.js wrapper 
 and not every where inside the application

 Require the request module inside the API_helper.js.
 We’ll be returning a promise from the helper method, 
 so here is how the API_helper.js looks
 */

const request = require("request")

module.exports = {
    make_API_call: function (url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }
}

/**
 in the above code, the make_API_call method returns a promise 
 which gets resolved or rejected based on API response.
 https://codehandbook.org/how-to-make-rest-api-calls-in-express-web-app/#:~:text=Making%20REST%20API%20Calls%20In,return%20the%20response%20as%20JSON.&text=You'll%20be%20making%20use,REST%20API%20calls%20in%20express.
 */