const {Schema, SchemaTypes, models, model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
    phoneNumber: {
        type: SchemaTypes.String,
        required: false
    },
    role: {
        type: SchemaTypes.String,
        required: true, 
    },
    courses: {
        type: SchemaTypes.Array,
    },
    deviceName: {
        type: SchemaTypes.String,
        // required: true,
    },
    deviceType: {
        type: SchemaTypes.String,
        required: true,
    },
    ipAddress: {
        type: SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: SchemaTypes.Date,
        default: Date.now(),
    }
})

const User = models.User || model("User", UserSchema)

module.exports = User