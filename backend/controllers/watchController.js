const WatchItem = require('../models/WatchItem');

exports.createWatchItem = async (req, res) => {
  try {
    const { title, type, watchedDate, genre, rating, review, downloadlink } = req.body;
    const image = req.file ? req.file.filename : null;

    const newItem = new WatchItem({ title, type, watchedDate, genre, rating, review, downloadlink, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
};

exports.getAllWatchItems = async (req, res) => {
  try {
    const items = await WatchItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

exports.getWatchItemById = async (req, res) => {
  try {
    const item = await WatchItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};

exports.updateWatchItem = async (req, res) => {
  try {
    const { title, type, watchedDate, genre, rating, review, downloadlink } = req.body;
    const updateData = { title, type, watchedDate, genre, rating, review, downloadlink };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedItem = await WatchItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

exports.deleteWatchItem = async (req, res) => {
  try {
    await WatchItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};
