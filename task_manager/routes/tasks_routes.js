const {Router} = require('express')
const route = Router()
const {post_tasks, get_tasks,get_by_id,patch_by_id,delete_by_id}= require('../controllers/controller.js')

route.post('/tasks',post_tasks)
route.get('/tasks',get_tasks)
route.get('/tasks/:taskId',get_by_id)
route.patch('/tasks/:taskId',patch_by_id)
route.delete('/tasks/:taskId',delete_by_id)
module.exports = route