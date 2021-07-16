

const http = require('http');
//var projectName = require("hammerjs")
var fs = require('fs');
const url = require('url');
const hostname = '10.0.0.17';//
const port = 80;
/*const pages={
  "animation":['./pages/animation.svg','text/html'],
  "home":['./pages/home.html','text/html'],
  "favicon":['./icon/favicon.ico','image/icon'],
  "mystyle":['./css/mystyles.css','text/css'],
  "homejs":['./pages/homejs.js','text/javascript'],
}
*/
const pages= JSON.parse(fs.readFileSync("./pages/pages.json", "utf8"));

const replacements=[
["app header","./replacements/app header.html"]



]





function getPage(url,res){
  urlpeices=url.split("/")
  urlpeices.shift()
  page=urlpeices[0]
  if (page in pages){
    dir=pages[page][0]
    type=pages[page][1]
    if(page=='favicon'){

      fs.readFile('./icon/favicon.ico',function (err, data){
        res.writeHead(200, {'Content-Type': 'image/icon','Content-Length':data.length});
        res.write(data);
        res.end();
      });
      return false
    }
    filedata=fs.readFileSync(dir, "utf8");
    res.writeHead(200, {'Content-Type': type,'Content-Length':filedata.length});
    outdata=replacements.reduce(function(finalstring,replacement){
    keyword=replacement[0]
    location=replacement[1]
    fullsearch=new RegExp('<!--'+keyword+'-->', "g");
    replacedata=fs.readFileSync(location, "utf8");
    if(finalstring.search('<!--'+keyword+'-->')!=-1){
      return finalstring.replace(fullsearch,replacedata)
    }
    return finalstring
    },filedata );

    res.write(outdata);
    res.end();

    return false
  }
  return true
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  var page = url.parse(req.url, true).path;
  var error=getPage(page,res)
  if(error){
    res.statusCode = 404
    fs.readFile('./pages/404/404.html',function (err, data){
      res.writeHead(404, {'Content-Type': 'text/html','Content-Length':data.length});
      res.write(data);
      res.end();
    });
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 

