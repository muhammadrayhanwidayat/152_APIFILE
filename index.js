const express = require('express');
const connectDatabase = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRoutes);

async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`🗿 Server is running on http://localhost:${PORT}`);
        console.log("Password:", process.env.DB_PASS);

    });
}

startServer();