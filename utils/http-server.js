const http = require('http');
const path = require('path');
const fs = require('fs');

const jsexp = /\.js$/;

const server = http.createServer(function(req, res) {
  let contentType = 'text/html';
  let filePath = req.url;

  if (filePath === '/') {
    filePath = 'index.html';
  }

  if (jsexp.test(filePath)) {
    contentType = 'application/javascript';
  }

  const realPath = path.join(__dirname, 'dist', filePath);

  console.table({url: req.url, contentType, realPath});

  fs.readFile(path.join(__dirname, 'dist', filePath), function(err, content) {
    if (err) {
      throw err;
    }
    res.writeHead('200', {'Content-Type': contentType});
    res.write(content);
    res.end();
  });
});

server.listen(8080, function() {
  console.log('server is listening on locahost:8080');
});
