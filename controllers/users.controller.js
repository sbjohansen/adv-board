const User = require('../models/user.model');

exports.getUserByLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ login: req.params.login });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    }
    
   