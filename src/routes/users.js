const router = require('express').Router();
const auth = require('../middleware/auth');
const { listUsers, getMe, updateMe, deleteMe } = require('../controllers/userController');

router.get('/', listUsers);
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.delete('/me', auth, deleteMe);

module.exports = router;
