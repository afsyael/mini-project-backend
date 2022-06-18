const jwt = require('jsonwebtoken'); // modul utk login, diinstal terlebih dahulu
const bcrypt = require('bcrypt');
const models = require('../../models/index');

async function login(req, res) { // 
    try {
        // fungsi await adalah utk memberikan tanda tunggu pada tipe async
        const results = await models.Merchant.findOne({where: { email: req.body.email } });
        if (results.length < 1) {
            return res.status(204).send({ message: 'Data not found' });
        }

        if (!bcrypt.compareSync(req.body.password, results.password)) {
            return res.status(400).send({ message: 'Email or password is wrong' })
        }

        // Information about users saved to payload
        const payload = {
            id: results.id,
            email: results.email,
        }
        const token = jwt.sign(payload, 'secret', { expiresIn: '7d' })

        return res.send({ message: 'Data is found', data: { token: token } })
    } catch (error) {
        return res.status(204).send({ message: 'Data not found'})
    }
}

module.exports = {
    login,
}