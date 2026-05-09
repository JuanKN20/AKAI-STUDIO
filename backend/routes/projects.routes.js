const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const projectsController = require('../controllers/projects.controller');

const router = express.Router();

router.get('/projects', projectsController.getPublicProjects);
router.get('/projects/:slug', projectsController.getPublicProjectBySlug);

router.get('/admin/projects', adminAuth, projectsController.getAdminProjects);
router.post('/admin/projects', adminAuth, projectsController.createProject);
router.put('/admin/projects/:id', adminAuth, projectsController.updateProject);
router.delete('/admin/projects/:id', adminAuth, projectsController.deleteProject);

module.exports = router;