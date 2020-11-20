const http = require('http');

const host = '127.0.0.1';
const port = 3000;

const requestListener = (req, res) => {
    const contentType = req.headers['content-type'];

    // If content type is NOT an application/json, the request will not be accepted
    if(contentType !== 'application/json') {
        res.statusCode = 400;
        res.end();
        
        return;
    }

    // Handle request

    let data = "";

    // Every time we recieve data from the client, this will be called
    req.on('data', (chunk) => {
        data += chunk.toString('utf8');
    })

    // This will be executed when the request has been finished, and here we can handling the response
    req.on('end', () => {
        // Create response
        const jsonObject = JSON.parse(data); // Convert string to JSON object
        console.log(jsonObject.name)

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(jsonObject)); // Convert JSON object into JSON string
        res.end();

        console.log(jsonObject);
    })
} 

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})