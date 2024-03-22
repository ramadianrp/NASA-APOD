const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const HomeController = require('../controllers/HomeController')
const { authen } = require("../middlewares/authen");
const { authorAdmin, authorPlain } = require('../middlewares/author')
const errHandler = require('../middlewares/errHandler')

// login-regis
router.post("/login", AuthController.login);
router.post("/google-login", AuthController.googleLogin)
router.use(authen);
router.post("/add-user", authorAdmin, AuthController.addUser);

// main
router.get('/asset', HomeController.showAssetEntity)
router.post('/asset', authorPlain, HomeController.addMainEntity)
router.put('/asset/:id', authorPlain, HomeController.editAssetById)
router.delete('/asset/:id', authorPlain,HomeController.deleteAssetById)

router.use(errHandler);

module.exports = router;