const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

router.post('/signup', UsersController.add);
router.post('/signin', UsersController.signin);
router.get('/ranking', UsersController.ranking);
/*
router.get('/list/:id', UsersController.getId);
router.delete('/delete/:id', UsersController.deleteId);
*/
router.put('/user/:id', UsersController.updateId);
router.put('/user/:nick/score/:score', UsersController.score);


module.exports = router;