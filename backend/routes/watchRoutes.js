const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const watchController = require('../controllers/watchController');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), watchController.createWatchItem);
router.get('/', watchController.getAllWatchItems);
router.get('/:id', watchController.getWatchItemById);
router.put('/:id', upload.single('image'), watchController.updateWatchItem);
router.delete('/:id', watchController.deleteWatchItem);

module.exports = router;
