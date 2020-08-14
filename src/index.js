const express = require("express")
require('../src/db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is started on port " + port)
})

const User = require('./models/users')
const Task = require('./models/tasks')

const test = async ()=>{
    // const task = await Task.findById('5ee61261bb111c52d0b6e131')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5ee60d4475b00a4fe8e13b4a')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

}
// test();
