const http = require("http");
const port = 3000;

const dataObject = { a: "a", b: "b" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/home") {
    req.on("data", (data) => {
      console.log("data === ", data);
      const stringfiedData = data.toString();
      console.log("stringfiedData === ", stringfiedData);
      Object.assign(dataObject, JSON.parse(stringfiedData));
    });
  } else {
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(dataObject));
    } else if (req.url === "/about") {
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<body>");
      res.write("<h1>About Page</h1>");
      res.write("</body>");
      res.write("</html>");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(dataObject));
    }
  }
});
server.listen(port, () => {
  console.log(`${port} started`);
});

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/plain",
//   });
//   res.end("hello world");
// });

// server.listen(port, () => {
//   console.log(`Listening server port ${port}`);
// });

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   res.end(
//     JSON.stringify({
//       a: "a",
//       b: "b",
//     })
//   );
// });

// server.listen(port, () => {
//   console.log(`Listening server port ${port}`);
// });
