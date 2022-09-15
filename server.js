const express = require("express");
const cors = require("cors");
const app = express();

var corsConfig = {
    origin: "http://localhost:4201"
}

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({ msg: "Response Received." });
})

const port = process.env.PORT || 4201;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})