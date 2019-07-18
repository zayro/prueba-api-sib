const UserRol = require('../../library/MongoDB/models/user_rol');
const User = require('../../library/MongoDB/models/user');
const checkAuth = require('../middlewares/check-auth');
const express = require('express');

const router = express.Router();


const message = (status, response, message) => {
    const data = {};
    data.status = status;
    data.data = response;
    data.message = message;

    return data;
};

router.get('/', (req, res) => {

    UserRol.find({}, function(err, response) {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }

    });

});


router.get('/all', (req, res) => {

    UserRol.find({}).
    populate('User').
    populate('Rol').
    exec((err, response) => {

        /*        User.populate(response, function(err, libros) {
                   res.status(200).send(libros);
               }); */

        console.log(response);

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });

});



router.post('/', (req, res) => {

    const userRol = new UserRol({
        id_user: req.body.id_user,
        id_rol: req.body.id_rol,
    });

    userRol.save(function(err, response) {
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

    UserRol.update({ _id: req.params.id }, {
            id_user: req.body.id_user,
            id_rol: req.body.id_rol,
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


router.delete('/:id', (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).json(message(true, null, "No existe el parametro"));
    }

    // Process Delete
    UserRol.deleteOne({ _id: req.params.id })
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