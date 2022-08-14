const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAllAdverts);
router.get('/ads/:id', AdvertController.getAdvertByID);
router.post('/ads', authMiddleware, AdvertController.addAdvert);
router.delete('/ads/:id', authMiddleware, AdvertController.deleteAdvert);
router.put('/ads/:id', authMiddleware, AdvertController.updateAdvert);
router.get('/ads/search/:searchPhase', AdvertController.getAdvertBySearchPhase);

module.exports = router;
