const Permission = require('../../library/MongoDB/models/permission');
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

    Permission.find({}, function(err, response) {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }

    });

});


router.post('/', (req, res) => {

    const permission = new Permission({
        descripcion: req.body.descripcion,
        permission_name: req.body.permission_name,
        url: req.body.url,
        active: req.body.active
    });

    permission.save(function(err, response) {
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

    Permission.update({ _id: req.params.id }, {
            descripcion: req.body.descripcion,
            permission_name: req.body.permission_name,
            url: req.body.url,
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


router.delete('/:id', (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).json(message(true, null, "No existe el parametro"));
    }

    // Process Delete
    Permission.deleteOne({ _id: req.params.id })
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


router.get('/test/', (req, res) => {

    res.send('Hello World');

});

module.exports = router;