const Tasks = require('../model/db.js')
const get_by_id = (req,res)=>{
    Tasks.findOne({_id: req.params.taskId}).then((data)=>{
        if (data){
            res.send(JSON.stringify(data))
        }
        else{
            res.status(404).send("task not found")
        }
        
    }).catch((err)=>{
        res.status(404).send("task not found")
    })
}
const patch_by_id = (req,res)=>{
    Tasks.findOne({_id : req.params.taskId}).then((data)=>{
        if (data){
            data.description = req.body.description
            data.title = req.body.title
            if (req.body.status){
                data.status = req.body.status
            }
            data.save()
            res.send("success")
        }
        else{
            res.status(404).send("task not found")
        }
    }).catch(()=>{
        // res.writeHead(404)
        res.status(404).send("task not found")
    })
}
const delete_by_id = (req,res)=>{
    Tasks.findOneAndDelete({_id: req.params.taskId}).then((data)=>{
        if (data){
            res.status(204).send("success")
        }
        else{
            res.status(404).send("task not found")
        }
        
    }).catch((error)=>{
        res.status(404).send("task not found")
    })
}
const get_tasks = (req,res)=>{
    Tasks.find().then((data)=>{
        res.send(JSON.stringify(data))
    })
}
const post_tasks = (req,res)=>{
    Tasks.create(req.body)
    res.send("success")
}
module.exports = {
    get_by_id: get_by_id,
    post_tasks: post_tasks,
    delete_by_id: delete_by_id,
    patch_by_id: patch_by_id,
    get_tasks: get_tasks
}