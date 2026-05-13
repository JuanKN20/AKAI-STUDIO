const express = require('express');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');
const uploadsController = require('../controllers/uploads.controller');

const router = express.Router();

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
});

router.post('/admin/uploads/image', adminAuth, (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (!error) {
      return uploadsController.uploadAdminImage(req, res, next);
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        ok: false,
        error: 'Archivo muy pesado. El límite permitido es 5 MB.',
      });
    }

    return next(error);
  });
});

module.exports = router;
