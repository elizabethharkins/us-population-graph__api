

// import required essentials
const http = require("http");
const express = require("express");
var cors = require("cors");

// import items from routes folder 
// const itemsRouter = require("./routes/items");

// create new app
const app = express();
app.use(express.json());
// use before all route definitions, allowing below URL to access end-points
// can replace this URL(http://localhost:${port}) with 
// app URL from where APIs are called
app.use(cors({origin: "http://localhost:3000"}));

/* '/items' URL will have two end-points:
- localhost:9000/items/ (returns array of objects)
- localhost:9000/items/:id (returns single object)
*/
// app.use("/items", itemsRouter);
app.use('/items', require('./routes/items'));
app.use('/states', require('./routes/states'))

// default URL to API
// app.use("/", function(req, res) {
//     res.send("node api works :)");
// });

const server = http.createServer(app);
const port = 9000;
server.listen(port);
console.debug(`Server listening on port ${port}`);




