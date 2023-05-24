const router = require('express').Router();
const {
  getUsers,
  deleteUser,
  getSingleUser,
  createUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friend/:friendId
router
  .route('/:userId/friend/:friendId')
  .put(addFriend)
  .delete(removeFriend)
  

module.exports = router;
