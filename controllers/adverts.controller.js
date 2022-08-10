const Advert = require('../models/advert.model');

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
    else res.json(advert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAdvert = async (req, res, next) => {
  try {
    const advert = new Advert({
      title: req.body.title,
      description: req.body.description,
      pubDate: req.body.pubDate,
      address: req.body.address,
      price: req.body.price,
      image: req.body.image,
      user: req.body.user,
    });
    const newAdvert = await advert.save();
    res.json(newAdvert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAdvert = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    else {
      await advert.remove();
      res.json({ message: 'Advert deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAdvert = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    else {
      advert.title = req.body.title;
      advert.description = req.body.description;
      advert.price = req.body.price;
      advert.image = req.body.image;
      advert.user = req.body.user;
      const updatedAdvert = await advert.save();
      res.json(updatedAdvert);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdvertBySearchPhase = async (req, res, next) => {
  try {
    const adverts = await Advert.find({
      $text: {
        $search: req.params.searchPhase,
      },
    });
    res.json(adverts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
