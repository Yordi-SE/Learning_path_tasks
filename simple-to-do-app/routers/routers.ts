import express = require('express');
import controllers from '../controllers/controllers'
import validate_task from '../joi_validation/validation';
import validate_param from '../joi_validation/route_params';
import verifyToken from '../jwt/auth'
const router:express.Router = express.Router();
router.post('/todos', verifyToken,validate_task,controllers.post)
router.get('/todos',verifyToken,controllers.get_all)
router.get('/todos/:id',verifyToken,validate_param,controllers.get_by_id)
router.put('/todos/:id',verifyToken,validate_param,validate_task,controllers.put)
router.delete('/todos/:id',verifyToken,validate_param,controllers.delete_by_id)
export default router