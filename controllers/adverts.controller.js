const Advert = require('../models/advert.model');
const fs = require('fs');

exports.getAllAdverts = async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json(adverts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdvertByID = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    res.json(advert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAdvert = async (req, res) => {
  const { title, description, price, pubDate, address, user } = req.body;
  try {
    const advert = new Advert({
      title,
      description,
      price,
      pubDate,
      image: req.file.filename,
      address,
      user,
    });
    await advert.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAdvert = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    await advert.remove();
    res.json({ message: 'Advert deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateAdvert = async (req, res, next) => {
  const { title, description, price, pubDate, address, user } = req.body;

  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    advert.title = title;
    advert.description = description;
    advert.price = price;
    advert.pubDate = pubDate;
    advert.address = address;
    advert.user = user;
    if (req.file) {
      advert.image = req.file.filename;
    }
    await advert.save();
    res.json({ message: 'Advert updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getAdvertBySearchPhase = async (req, res, next) => {
  try {
    const adverts = await Advert.find({
      $text: { $search: req.params.searchPhase },
    });
    res.json(adverts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
