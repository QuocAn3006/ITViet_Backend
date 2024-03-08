const express = require('express');
const routes = require('./src/routes/index');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
routes(app);

mongoose
	.connect(`${process.env.DATABASE_URL}`)
	.then(() => {
		console.log('connect to database successfully');
	})
	.catch(err => {
		console.log('error: ', err);
	});

app.listen(port, () => console.log(`server running at port: ${port}`));
