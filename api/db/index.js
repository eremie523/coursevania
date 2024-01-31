const mongoose = require('mongoose')
const colors = require('colors')

mongoose.connect('mongodb://localhost:27017/attendance_project').then(() => {
    console.log(colors.green("MongoDB Connection established"))
}).catch(err => console.error('Unable to connect to Mongo'))
