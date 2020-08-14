const express = require("express")
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')


const router = express.Router()

router.post('/tasks', auth, async (req, resp) => {
    const data = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await data.save()
        resp.status(201).send(data)
    } catch (e) {
        resp.status(400).send(e)
    }

})

// fetch all the records 
router.get('/tasks', auth, async (req, resp) => {
    try {
        match = {}
        sort = {}
        if(req.query.isCompleted){
            match.isCompleted = req.query.isCompleted === 'true'
        }
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        // const taskData = await Tasks.find({'owner': req.user._id})
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        resp.send(req.user.tasks)
    } catch (e) {
        resp.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, resp) => {
    const _id = req.params.id

    try {
        const task = await Tasks.findById({ _id, 'owner': req.user._id })
        if (!task) {
            return resp.status(200).send('No found for this id ' + _id)
        }
        resp.status(200).send(task)
    } catch (e) {
        resp.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'isCompleted']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Tasks.findOne({ '_id': req.params.id, 'owner': req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, resp) => {
    const id = req.params.id
    try {
        const result = await Tasks.findOneAndDelete({ _id: id, owner: req.user._id })
        if (!result) {
            return resp.status(404).send('Failed to delete data')
        }
        resp.send(result)
    } catch (e) {
        resp.status(500).send(e)
    }
})

module.exports = router;