require('./models/Item.ts');
require('./models/User.ts');
require('./models/GeoPath.ts');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.ts');
const geopathRoutes = require('./routes/geopathRoutes.ts');
const requireAuth = require('./middlewares/requireAuth.ts');
const Item = mongoose.model('Item');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(geopathRoutes);

const mongooseUri =
    'mongodb+srv://root:secretsauce@cluster0.akkpu8l.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

app.get('/users', requireAuth, (req, res) => {
    res.send(req.user.email); // req.user is set in requireAuth.ts
});

app.post('/items', async (req, res) => {
    const { title, description } = req.body;

    try {
        const item = new Item({
            title,
            description
        });

        await item.save();

        res.send(item);

    } catch (err) {
        return res.status(422).send(err.message);
    }
})

app.get('/items', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

