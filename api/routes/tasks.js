
const router = require("express").Router();
const Lists = require("../modules/Lists");
const Tasks = require("../modules/Tasks");

// add task
router.put(`/addTask/:id`, async (req, res) => {
    const task = await new Tasks({
        idOfList: req.params.id,
        what: req.body.what, 
        category: req.body.category, 
        reminder: req.body.reminder,
        type: false
    })

    try {
        await task.save();
        res.status(200).send("ok");
    } catch (err) {
        res.status(500).send(err);
    }
})


// delete task
router.delete(`/deleteTask/:id`, async (req, res) => {
    try {
        await Tasks.findByIdAndDelete(req.params.id);
        res.status(200).send("task was deleted successfully");
    } catch (err) {
        res.status(500).send("error" + err);
    }
})


// update val of what in task
router.put(`/updateWhat/:id`, async (req, res) => {
    try {
        const currentTask = await Tasks.findById(req.params.id);
        await currentTask.updateOne({what: req.body.what})
        res.status(200).send("updated");
    } catch (err) {
        res.status(500).send("err" + err);
    }
})

// update val of category in task
router.put(`/updateCategory/:id`, async (req, res) => {
    try {
        const currentTask = await Tasks.findById(req.params.id);
        await currentTask.updateOne({category: req.body.category})
        res.status(200).send("updated");
    } catch (err) {
        res.status(500).send("err" + err);
    }
})

// update val of reminder in task
router.put(`/updateReminder/:id`, async (req, res) => {
    try {
        const currentTask = await Tasks.findById(req.params.id);
        await currentTask.updateOne({reminder: req.body.reminder})
        res.status(200).send("updated");
    } catch (err) {
        res.status(500).send("err" + err);
    }
})

// update val of Type in task
router.put(`/updateType/:id`, async (req, res) => {
    try {
        const currentTask = await Tasks.findById(req.params.id);
        await currentTask.updateOne({type: req.body.type})
        res.status(200).send("updated");
    } catch (err) {
        res.status(500).send("err" + err);
    }
})


// get all tasks
router.get(`/getTasks/:id`, async (req, res) => {
    try {
        const allTasks = await Tasks.find({idOfList: req.params.id});
        res.status(200).send(allTasks);
    } catch (err) {
        res.status(500).send("error" + err);
    }
})


module.exports = router;