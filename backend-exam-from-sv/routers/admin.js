const {saveAdmin} = require('../controllers/admin/auth');
const router = require('express').Router();

router.post('/saveAdmin', saveAdmin);

module.exports = router;
