const { Signup, Login } = require('../controllers/AuthController');
const { userVerification } = require('../middlewares/AuthMiddleware');
const { Router } = require('express');
const router = Router();

router.post('/signup', Signup);
router.post('/login', Login);

// Use the userVerification middleware here
router.post('/', userVerification);

module.exports = router;
