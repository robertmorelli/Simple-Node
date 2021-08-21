const http = require('http');
var fs = require('fs');

const pages = JSON.parse(fs.readFileSync("./pages/pages.json", "utf8"));

const requestListener = function(req, res) {
    url = req.url.split("/")[1]
    if (url in pages) {

        data = fs.readFileSync(pages[url][0], pages[url][2]);
        res.writeHead(200, { 'Content-Type': pages[url][1], 'Content-Length': data.length });
        res.end(data, pages[url][2])
    } else {
        console.log("only death awaits")
    }

}
const server = http.createServer(requestListener);
const port = 80
const hostname = "localhost"
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});