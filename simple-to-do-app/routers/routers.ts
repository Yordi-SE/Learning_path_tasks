import express = require('express');
import controllers from '../controllers/controllers'
import verifyToken from '../jwt/auth'
const router:express.Router = express.Router();
router.post('/todos', verifyToken,controllers.post)
router.get('/todos',verifyToken,controllers.get_all)
router.get('/todos/:id',verifyToken,controllers.get_by_id)
router.put('/todos/:id',verifyToken,controllers.put)
router.delete('/todos/:id',verifyToken,controllers.delete_by_id)
export default router