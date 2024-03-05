const express = require('express');
const routes = require('./routes/index');
const port = process.env.PORT || 3000;
const app = express();

routes(app);
app.get('/', (req, res) => {
	return res.send('hello word');
});

app.listen(port, () => console.log(`server running at port: ${port}`));
