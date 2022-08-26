const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    createfriend,
    updateFriend
} = require('../../controllers/user-controller');


router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/userId/friends/friendId')
.post(createFriend)
.delete(deleteFriend)

module.exports = router;