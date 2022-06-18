const bcrypt = require('bcrypt');
const models = require('../../models/index');
let Validator = require('validatorjs');

async function insertMerchant(req, res) {
    const {email, password, name, address, join_date, phone_number} = req.body;

    const data = req.body;
    const rules = {
        email: 'required|email',
        password: 'required|min:6',
        name: 'required|min:3|max:50',
        address: 'required',
        join_date: 'required|date',
        phone_number: 'required|numeric'
    };

    const validation = new Validator(data, rules);
    if (validation.fails()) {
        return res.send({ message: 'Failed', data: validation.errors.all() })
    } else {
        // Check if email exist
        const emailExist = await models.Merchant.findOne({ where: { email: data.email } })
        if (emailExist) {
            return res.status(400).send('Email has already been taken')
        }
        
        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        
        const users = await models.Merchant.create({
        email: email,
        password: hashPassword,
        name: name,
        address: address,
        join_date: join_date,
        phone_number: phone_number
    })

    return res.send({ message: 'Data has been created', data: users})
    }
    }

async function listMerchant(req, res) {
    const result = await models.Merchant.findAll()
    if (result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

async function detailMerchant(req, res) {
    const result = await models.Merchant.findOne({ where: { id: req.params.id } })
    if (!result) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

function updateMerchant(req, res) {
    let data = req.body
    models.Merchant.update(data, { where: { id: req.params.id } })
    
    return res.send({ message: 'Data has been updated', data: req.body })
}

function deleteMerchant(req, res) {
    models.Merchant.destroy({ where: { id: req.params.id } })
    return res.send({ message: 'Data has been deleted' })
}

module.exports = {
    insertMerchant,
    listMerchant,
    detailMerchant,
    updateMerchant,
    deleteMerchant
}