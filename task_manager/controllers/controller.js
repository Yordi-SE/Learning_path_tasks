const Tasks = require('../model/db.js')
const get_by_id = (req,res)=>{
    Tasks.findOne({_id: req.params.taskId}).then((data)=>{
        if (data){
            res.json(data)
        }
        else{
            res.status(404).send("task not found")
        }
        
    }).catch((err)=>{
        res.status(400).send("There was an error getting the task. Please try again later.")
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
        res.status(400).send("There was an error updating the task. Please try again later.")
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
        res.status(500).send("There was an error deleting the task. Please try again later.")
    })
}
const get_tasks = (req,res)=>{
    Tasks.find().then((data)=>{
        res.json(data)
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