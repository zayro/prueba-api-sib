var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
const RolSchema = new Schema({
    rol_name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean }
});

module.exports = mongoose.model('Rol', RolSchema);