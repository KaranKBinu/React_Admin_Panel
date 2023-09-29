const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const database = require('./utils/database'); // Import database configuration

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const store = new MongoDBStore({
    uri: database.connection._connectionString,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7,
    autoRemove: 'interval',
    autoRemoveInterval: 10,
});

app.use(
    session({
        secret: 'your-secret-key-here',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
const userRoutes = require('./routes/userRoutes'); // Import user routes
app.use('/api/users', userRoutes);
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
app.use('/api', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
