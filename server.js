const express = require('express');
const path = require('path');
const app = express();

// Serve files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root URL to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
