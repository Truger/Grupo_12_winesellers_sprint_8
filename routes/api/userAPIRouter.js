const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../../controller/api/userAPIController');
const multer = require('multer');
const validations = require('../../middlewares/validationsMiddleware')
const getMulterStorageConfig = require('../../middlewares/multerMiddleware');
const storage = getMulterStorageConfig(('/Img/user','user'));
const guestMiddleware = require('../../middlewares/guestMiddleware');
const authMiddleware = require('../../middlewares/authMiddlewar');

const upload = multer({storage: storage});

router.get('/', 
        guestMiddleware, 
        userController.index
        );

router.post('/loguear', 
        validations.validetUserLogin, 
        userController.loguear
        );
router.get('/logout', userController.logout); 

router.post('/register',
         upload.single('file'),
         validations.validetUserCreate, 
         userController.create
         );
         
router.get('/:id/detailUser',
         authMiddleware,
         userController.detail
         );

module.exports = router;