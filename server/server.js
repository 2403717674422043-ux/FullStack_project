const http = require("http");

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Welcome to ReLoop Backend!");
});

server.listen(PORT, () => {
  console.log(`ReLoop server running at http://localhost:${PORT}`);
});