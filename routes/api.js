const express = require('express');
const router = express.Router();
const multer = require('multer');
const komikController = require('../controllers/komikController');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/komiks', upload.single('image'), komikController.createKomik);
router.get('/komiks', komikController.getAllKomik);
router.get('/komiks/:id', komikController.getKomikById);
router.put('/komiks/:id', upload.single('image'), komikController.updateKomik);
router.delete('/komiks/:id', komikController.deleteKomik);

module.exports = router;