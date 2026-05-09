const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const servicesController = require('../controllers/services.controller');

const router = express.Router();

router.get('/services', servicesController.getPublicServices);
router.get('/services/:slug', servicesController.getPublicServiceBySlug);

router.get('/admin/services', adminAuth, servicesController.getAdminServices);
router.post('/admin/services', adminAuth, servicesController.createService);
router.put('/admin/services/:id', adminAuth, servicesController.updateService);
router.delete('/admin/services/:id', adminAuth, servicesController.deleteService);

module.exports = router;