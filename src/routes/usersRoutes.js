const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

router.post('/signup', UsersController.add);
router.post('/signin', UsersController.login);
router.get('/list/:id', UsersController.getId);
router.delete('/delete/:id', UsersController.deleteId);
router.put('/list/:id', UsersController.updateId);

module.exports = router;