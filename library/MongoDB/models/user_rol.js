var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* var User = mongoose.model('User');
var Rol = mongoose.model('Rol');
 */
var UserRolSchema = new Schema({
    id_user: [{ type: Schema.ObjectId, ref: "User" }],
    id_rol: [{ type: Schema.ObjectId, ref: "Rol" }]
});


module.exports = mongoose.model('UserRol', UserRolSchema);