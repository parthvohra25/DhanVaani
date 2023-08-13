const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; 
app.use(cors());

app.get('/mp3files', (req, res) => {
  const mp3Files = [];

  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).json({ error: 'Error reading directory' });
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.mp3')) {
        mp3Files.push(file);
      }
    });
    //console.log(mp3Files);
    res.json({ mp3Files });
  });
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port ${port} with ip 0.0.0.0`);
});
