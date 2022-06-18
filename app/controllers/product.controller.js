const models = require('../../models/index');
let Validator = require('validatorjs');

async function insertProduct(req, res) {
    let form = req.body
    const data = form;
    const rules = {
        name: 'required|min:3|max:50',
        quantity: 'required|min:1|numeric',
        price: 'required|min:10000|numeric',
    };

    const validation = new Validator(data, rules);
    if (validation.fails()) {
        return res.send({ message: 'Failed', data: validation.errors.all() })
    } else {
    models.Product.create(form);
    }
    return res.send({ message: 'Data has been created', data: form})
}

async function listProduct(req, res) {
    const result = await models.Product.findAll()
    if (result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

async function detailProduct(req, res) {
    const result = await models.Product.findOne({ where: { id: req.params.id } })
    if (!result) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

function updateProduct(req, res) {
    let data = req.body
    models.Product.update(data, { where: { id: req.params.id } })
    
    return res.send({ message: 'Data has been updated', data: req.body })
}

function deleteProduct(req, res) {
    models.Product.destroy({ where: { id: req.params.id } })
    return res.send({ message: 'Data has been deleted' })
}

module.exports = {
    insertProduct,
    listProduct,
    detailProduct,
    updateProduct,
    deleteProduct
}