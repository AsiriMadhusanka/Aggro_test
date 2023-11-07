// dataRouts.js

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataConrollers');

router.post('/insert', dataController.insertData);
router.put('/update', dataController.updateData);
router.delete('/delete', dataController.deleteData);
router.get('/fetch', dataController.fetchData);
router.get('/deviceIds', dataController.fetchDeviceIds);
router.get('/fetchByDeviceId/:device_id', dataController.fetchDataByDeviceId);
router.get('/fetchAllUserIds', dataController.fetchAllUserIds);
router.get('/fetchDataByUserId/:userid', dataController.fetchDataByUserId);


module.exports = router;