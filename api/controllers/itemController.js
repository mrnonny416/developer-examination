const Item = require('../models/item');

exports.get_items = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ status: '200', message: 'OK', data: items });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
};

exports.get_item_by_id = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json({ status: '200', message: 'OK', data: item });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
};

exports.insert_item = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.json({ status: '200', message: 'OK' });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
};

exports.update_item = async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    description: req.body.description,
                }
            }
        );
        if (!updatedItem) {
            return res.status(404).json({ status: 'error', message: 'Item not found' });
        }
        res.status(200).json({ status: '200', message: 'OK' });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
};
