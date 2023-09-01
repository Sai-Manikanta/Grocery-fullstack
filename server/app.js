const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');
const userTaskRouter = require('./routes/userTaskRouter');

// Connect to MongoDB (assuming you have MongoDB running on localhost)
mongoose.connect('mongodb+srv://Manichinnu:susheela@grocery.t0mfjf7.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.error('Error connecting to MongoDB:', err); });

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

app.use((req, res, next) => {
    if (req?.headers?.['x-auth-token']) {
        const decodedToken = jwt.verify(req?.headers?.['x-auth-token'], 'PSSMLKDP333');
        req.headers.user = decodedToken
    }

    next();
})

app.get('/', (req, res) => {
    res.send('Task assignment API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1', userTaskRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
