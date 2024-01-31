const { Schema, SchemaTypes, models, model } = require("mongoose");

const CoursesSchema = Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    desc: {
        type: SchemaTypes.String,
    },
    banner: {
        type: SchemaTypes.String,
        required: true,
    },
    videoUrls: {
        type: SchemaTypes.Array,
    },
    subDescriptions: {
        type: SchemaTypes.Array,
    },
    price: {
        type: SchemaTypes.String,
    },
    isFree: {
        type: SchemaTypes.Boolean,
        default: false
    },
    owner: {
        type: SchemaTypes.String,
        ref: "User"
    },
    createdAt: {
        type: SchemaTypes.Date,
        default: Date.now()
    }
})

const Course = models.Course || model("Course", CoursesSchema)

module.exports = Course