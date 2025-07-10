// Since AdGaurdHome can bring out some cors error in the client, we'll use a custom reverse proxy
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const http = require("http");
const PORT = 55441


async function doRequest(method, url, auth, body = null) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Access-Control-Allow-Origin", "*");

    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: myHeaders,
        body: null
    })
}

/**
 * Do the HTTP response
 * @param {Object} res HTTPS response object
 * @param {int} status like 200/500
 * @param {Object} body body of response
 * @param {String} contentType the content type of our response
 */
function sendResponse(res, status, body, contentType = "application/json") {
    res.writeHead(status, {
        "Content-type": contentType,
        "Access-Control-Allow-Origin": "*"
    })
    if (contentType != "application/json") { //with export operation we send a file so we cant strinify the body
        res.write(body);
    } else {
        res.write(JSON.stringify(body));
    }
    res.end();
}

http.createServer((req, res) => {

    var body = ""
    req.on("data", (chunk) => {
        body += chunk
    });
    req.on("end", async () => {
        if (req.url == "/rrequest") {
            body = JSON.parse(body)
            console.log(body);
            let x = await doRequest(
                body?.METHOD,
                body.AdgBaseURI + body.PATH,
                body.Authorization
            )
            let dataJSON = null
            if (x.status == 200) {
                dataJSON = await x.json()
            }
            sendResponse(res, x.status, dataJSON)
        }
    })

}).listen(PORT)
console.log("Server started at port: " + PORT);