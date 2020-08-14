const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,//to avoid deprecate warning coming from mongodb
    useUnifiedTopology:  true
})

// const data = new User({
//     name: 'Krishna',
//     email: 'krisha@gmail.com',
//     age: 26,
//     password: 'Chinnu@123',
// })

// data.save().then(() => {
//     console.log(data)
// }).catch((error) => {
//     console.log('Error : ' + error)
// })

