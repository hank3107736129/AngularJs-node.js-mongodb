// app/models/users

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema(

{
    _id:mongoose.Schema.Types.ObjectId,
	id:Number,

    users:Array
});

module.exports = mongoose.model('Users', UserSchema);
