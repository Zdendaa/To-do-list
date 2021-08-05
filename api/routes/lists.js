const router = require("express").Router();
const Lists = require("../modules/Lists");

// get all Lists 
router.get("/getLists", async (req, res) => {
    const list = await Lists.find();
    res.send(list);
})
// add list
router.post("/addList", async (req, res) => {
    const list = await new Lists({
        desc: req.body.desc
    })

    try {
        await list.save();
        res.status(200).send("ok");
    } catch (err) {
        res.status(500).send(err);
    }
});

// delete list
router.delete(`/deleteList/:id`, async (req, res) => {
    try {
        await Lists.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted list successfully");
    } catch (err) {
        res.status(500).send(err);
    }
})

// update val of desc in list
router.put(`/updateDesc/:id`, async (req, res) => {
    try {
        const currentList = await Lists.findById(req.params.id);
        await currentList.updateOne({desc: req.body.desc});
        res.status(200).send("description value saved");
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;