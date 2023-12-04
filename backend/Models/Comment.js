const { Int32 } = require('mongodb');
let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
   username:{
        type: String,
        required: true
   },
   comment:{
        type: String,
        required: true
   },
   stars:{
        type: String,
        required: true
   },
   date:{
     type: String,
     required: true
     }
})

module.exports = mongoose.model("Comment", commentSchema);