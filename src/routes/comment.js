const apicache = require('apicache');
let cache = apicache.middleware;
const {
  addComment,
  getComments,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  getCommentsByCodesnippetId,
  upvoteComment,
  downvoteComment,
  uploadImg,
} = require('../controllers/comment'); //require comment controller to avail its featured methods
const router = require('express').Router(); //require router to define expected client request

//////----begin imported custom middlewares
const { checkToken } = require('../../middlewares/user'); //avail user checkToken middleware
const {
  commentAddValidation,
  commentEditValidation,
} = require('../../middlewares/comment'); //avail comment add/edit validation middlewares
//////-----End imported custom middlewares

////----Begin routes defination
router.post('/add-comment', checkToken, commentAddValidation, addComment);
router.get('/comments', getComments);
router.get('/comment', getCommentByCommentId);
router.put('/edit-comment', checkToken, commentEditValidation, updateComment);
router.delete('/del-comment', checkToken, deleteComment);
router.get('/comments-by-codeid', getCommentsByCodesnippetId);
router.put('/upvote-comment', upvoteComment);
router.put('/downvote-comment', downvoteComment);
router.post('/upload-img', uploadImg);

module.exports = router; // make the module available for imports
