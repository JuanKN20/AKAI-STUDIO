const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const contactsController = require('../controllers/contacts.controller');

const router = express.Router();

router.post('/contacts', contactsController.createContact);

router.get('/admin/contacts', adminAuth, contactsController.getAdminContacts);
router.put('/admin/contacts/:id/status', adminAuth, contactsController.updateContactStatus);

module.exports = router;