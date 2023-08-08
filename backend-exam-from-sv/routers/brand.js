const router = require('express').Router();
const {register} = require('../controllers/brand/auth');

router.get('/', register);

module.exports = router;
