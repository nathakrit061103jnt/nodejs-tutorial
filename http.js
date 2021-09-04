const http = require("http");
http
  .createServer((req, res) => {
    const { headers, method, url } = req;
    console.log("method", method);
    if (method == "POST") {
      console.log("POST METHOD");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello Worldaaaaaa!");
    res.end();
  })
  .listen(8080);
