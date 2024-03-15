import express = require('express');
import controllers from '../controllers/controllers'
const router:express.Router = express.Router();
router.post('/todos', controllers.post)
router.get('/todos',controllers.get_all)
router.get('/todos/:id',controllers.get_by_id)
router.put('/todos/:id',controllers.put)
router.delete('/todos/:id',controllers.delete_by_id)
export default router