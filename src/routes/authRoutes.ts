const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Item = mongoose.model('Item');

const router = express.Router();

router.post('/items', async (req, res) => {
    const { title, description } = req.body;

    try {
        const item = new Item({
            title,
            description
        });

        await item.save();

        const token = jwt.sign({ title: item._id }, 'MY_SECRET_KEY');

        res.send(token);

    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.get('/items', async (req, res) => {
    const items = await Item.find({});

    res.send(items);
});

module.exports = router;
