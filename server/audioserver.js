const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.use(express.static(__dirname));

app.listen(port, 'localhost', () => {
  console.log(`Server is running on port ${port} with local ip`);
});
