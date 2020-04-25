var path = require("path");
var http = require("http");
var find = require("find");

var resDir = __dirname;

http
  .createServer(function (req, res) {
    res.setHeader("content-type", "text/html");
    find.file(resDir, function (files) {
      res.write("<ul>");
      for (let i = 0; i < files.length; i++) {
        let fileRelative = path.relative(resDir, files[i]);
        res.write(
          '<li><a href="' + fileRelative + '">' + fileRelative + "</a></li>"
        );
      }
      res.write("</ul>");
      res.end();
    });
  })
  .listen(4000, function () {
    console.log("server start at port 4000");
  });
