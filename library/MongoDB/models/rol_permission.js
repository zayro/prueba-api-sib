var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* var User = mongoose.model('User');
var Rol = mongoose.model('Rol');
 */
var RolPermissionSchema = new Schema({
    id_user: { type: Schema.ObjectId, ref: "Permission" },
    id_rol: { type: Schema.ObjectId, ref: "Rol" }
});


module.exports = mongoose.model('RolPermission', RolPermissionSchema);