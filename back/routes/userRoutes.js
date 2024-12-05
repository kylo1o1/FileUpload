const { Router } = require('express')
const { register, sendOtp, verOtp, updateProfile, deleteProfile, } = require('../controller/userController')
const upload = require('../middleware/multer')
const { authentication } = require('../middleware/auth')
const router =  Router()


router.route('/register').post(upload.single('pfp'),register)
router.route('/sendOtp').post(sendOtp)
router.route('/verOtp').post(verOtp)
router.route('/profile/:pid').put(authentication,upload.single('pfp'),updateProfile).delete(authentication,deleteProfile)

module.exports  =   router