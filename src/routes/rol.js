const Rol = require('../../library/MongoDB/models/rol');
const checkAuth = require('../middlewares/check-auth');
const express = require('express');
const { message } = require('../utils/tools');

const router = express.Router();


router.get('/', (req, res) => {

    Rol.find({}, function(err, response) {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }

    });

});


router.post('/', (req, res) => {

    const rol = new Rol({
        description: req.body.description,
        rol_name: req.body.rol_name,
        active: req.body.active
    });

    rol.save(function(err, response) {
        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });


});


router.put('/:id', (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    Rol.update({ _id: req.params.id }, {
            description: req.body.description,
            rol_name: req.body.rol_name,
            active: req.body.active
        })
        .then(response => {
            if (!response) {
                return res.status(200).json(message(true, response, "Se actualizo exitosamente"));
            }
            res.send(response);
        }).catch(err => {
            return res.status(500).json(message(true, err, "Ocurrio un problema al consultar"));
        });

});


router.delete('/:id', checkAuth, (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).json(message(true, null, "No existe el parametro"));
    }

    // Process Delete
    Rol.deleteOne({ _id: req.params.id })
        .then(response => {
            if (response) {
                return res.status(200).json(message(true, response, "Se elimino exitosamente"));
            } else {
                return res.status(400).json(message(true, response, "Se elimino exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(true, err, "Ocurrio un problema al consultar"));
        });

});




module.exports = router;