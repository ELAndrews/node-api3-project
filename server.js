const express = require("express");
const userRouter = require("./users/userRouter");

const server = express();

//custom middleware

function logger(req, res, next) {
  console.log(
    `Time: `,
    Date.now(),
    `, Request Type: `,
    req.method,
    `, Request URL: `,
    req.originalUrl
  );
  next();
}

// function errorHandlingMiddleware(err, req, res, next) {
//   res.status(500).json(err.message);
// }

server.use(logger);
server.use(userRouter);

// server.use(errorHandlingMiddleware);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
