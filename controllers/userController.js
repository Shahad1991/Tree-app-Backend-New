const userModel = require('../models/userModel');
const pointsModel = require('../models/pointsModel');

const createUser = (req, res) => {
    const { name } = req.body;
    userModel.createUser(name, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, name });
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userModel.updateUser(id, name, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User updated successfully' });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    pointsModel.deletePointsByUserId(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        userModel.deleteUser(id, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'User deleted successfully' });
        });
    });
};

const getUsersWithPoints = (req, res) => {
    userModel.getUsersWithPoints((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsersWithPoints
};