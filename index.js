const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger');

app.use;
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./route/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
