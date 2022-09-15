const express = require('express');
const bodyParser = require('body-parser');
const db = require('./query');

const app = express();
const port = 4201;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
        extended: true
    })
);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
	if (req.method == "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.get('/orders/:id', db.getOrderInfo);
app.post('/orders', db.postOrderInfo);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
