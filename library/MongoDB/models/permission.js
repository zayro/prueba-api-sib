var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
const PermissionSchema = new Schema({
    descripcion: { type: String },
    permission_name: {
        type: String,
        index: true,
        unique: true
    },
    url: {
        type: String,
        index: true,
        unique: true
    },
    active: { type: Boolean }
});

module.exports = mongoose.model('Permission', PermissionSchema);