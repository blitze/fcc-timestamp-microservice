const express = require('express');
const path = require('path');

const app = express();
const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/views/index.html')),
);

app.get('/api/timestamp/:dateString?', (req, res) => {
	const { dateString } = req.params;
	const timestamp = parseInt(dateString * 1, 10);
	const date = new Date(timestamp || dateString || Date.now());

	let result;
	if (isNaN(+date)) {
		result = { error: 'Invalid Date' };
	} else {
		result = {
			unix: date.getTime(),
			utc: date.toUTCString(),
		};
	}
	res.json(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
