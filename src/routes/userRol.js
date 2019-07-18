const UserRol = require('../../library/MongoDB/models/user_rol');
const checkAuth = require('../middlewares/check-auth');
const express = require('express');
const { message } = require('../utils/tools');

const router = express.Router();



/** 
 * Metodos de consulta 
 */

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
    populate({ path: 'id_user' }).
    populate({ path: 'id_rol' }).exec((err, response) => {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });

});

router.get('/search/:username', (req, res) => {
    // Validate Request
    if (!req.params.username) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    UserRol.find({}).
    populate({
        path: 'id_user',
        match: {
            username: { $gte: req.params.username }
        }
    }).populate({ path: 'id_rol' }).exec((err, response) => {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });

});

router.get('/idUsuario/:idUser', (req, res) => {

    UserRol.find({ id_user: req.params.idUser }, function(err, response) {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }

    });

});


/** 
 * Metodos de creacion 
 */

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

/** 
 * Metodos de actualizacion 
 */

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

/** 
 * Metodos de Eliminacion 
 */
router.delete('/:id', checkAuth, (req, res) => {
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