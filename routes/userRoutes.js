const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleWare');

const router = express.Router();

router.get('/', authMiddleware.authenticateToken, userController.getAllUsers);

router.post('/register',userController.registerUser);

router.get('/:id',authMiddleware.authenticateToken,userController.getUserById)

router.put('/:id',authMiddleware.authenticateToken,userController.updateUser)

router.delete('/:id',authMiddleware.authenticateToken,userController.deleteUser)

module.exports = router;
