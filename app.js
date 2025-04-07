const express = require('express');
const app = express();
const secureRoute = require('./routes/secure');

app.use(express.json());
app.use('/api', secureRoute);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
