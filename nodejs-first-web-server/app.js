const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (req, res) {
    // res.write('Hello im your first web server');
    // res.end();
    res.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('index.html', function (error, data) {
        if (error) {
            res.writeHead(400);
            res.write('Error: File Not Found!')
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function (error) {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log("Server is listening on port " + port)
    }
});
