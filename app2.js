const http = require('http');
var fs = require('fs');

const pages = JSON.parse(fs.readFileSync("./pages/pages.json", "utf-8"));

const requestListener = function(req, res) {
    url = req.url.split("/")[1]
    if (url in pages) {

        data = fs.readFileSync(pages[url][0], pages[url][2]);
        //data = fs.readFileSync("pdf.pdf", "binary");

        res.writeHead(200, { 'Content-Type': pages[url][1], 'Content-Length': data.length });
        //res.writeHead(200, { 'Content-Type': "application/pdf", 'Content-Length': data.length });


        res.end(data, pages[url][2]);
        //res.end(data, "binary")



    } else {
        console.log("only the shadow knows what darkness lies in the hearts of men")
    }

}
const server = http.createServer(requestListener);
const port = 80
const hostname = "localhost"
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});