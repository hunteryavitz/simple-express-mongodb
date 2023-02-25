const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth.ts');

const GeoPath = mongoose.model('GeoPath');

const router = express.Router();

router.use(requireAuth);

router.get('/geopaths', async (req, res) => {
    const geopaths = await GeoPath.find({ userId: req.user._id });

    res.send(geopaths);
});

router.post('/geopaths', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide a name and locations' });
    }

    try {
        const geopath = new GeoPath({
            name,
            locations,
            userId: req.user._id
        });

        await geopath.save();

        res.send(geopath);
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;
