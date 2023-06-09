const getAllFavUsers = (_req, res) => {
    const favUsersDB = require('../data/db.json')
    return res.status(200).json(favUsersDB)
}

module.exports = {
    getAllFavUsers,
}