const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Grocery API');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
