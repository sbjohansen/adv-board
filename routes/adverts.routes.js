const express = require('express');
const router = express.Router();

const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAllAdverts);
router.get('/ads/:id', AdvertController.getAdvertByID);
router.post('/ads', AdvertController.addAdvert);
router.delete('/ads/:id', AdvertController.deleteAdvert);
router.put('/ads/:id', AdvertController.updateAdvert);
router.get('/ads/search/:searchPhase', AdvertController.getAdvertBySearchPhase);

module.exports = router;
