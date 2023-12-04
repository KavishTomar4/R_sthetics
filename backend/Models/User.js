let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    index:{
        type: Number,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        requierd: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    reff: {
        type: String,
        required:true
    },
    joined: {
        type: String,
        required: true
    },
    courses: [Object]
})

module.exports = mongoose.model("Users", userSchema);