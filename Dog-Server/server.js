const express = require('express');
const cors = require('cors')
const usersRouter = require("./api/usersRouter");
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', usersRouter);
app.listen(3000);
console.log("running on port 3000");
