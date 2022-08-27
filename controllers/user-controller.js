const { User, Thought } = require('../models')

const userController = {
    // getAllUsers 
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // getUserById
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v', populate: { path: 'reactions' }
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser
    createUser({ body }, res) {
        User.create({
            username: body.username,
            email: body.email
        })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // updateUser
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    // deleteUser 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // add a friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $push: {
                    friends: params.friendId
                }
            },
            {
                new: true,
                runValidators: true
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },

    // remove a friend from user 
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }, 
            { $pull: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    }
};

module.exports = userController;