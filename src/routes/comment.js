const {
  addComment,
  getComments,
  getCommentByCommentId,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  commentAddValidation,
  commentEditValidation,
  commentIdValidation,
} = require("../../middlewares/comment");
//////-----End imported custom middlewares

////----Begin routes defination
router.post("/add-comment", checkToken, commentAddValidation, addComment);
router.get("/comments", getComments);
router.get("/comment/:id", commentIdValidation, getCommentByCommentId);
router.put(
  "/edit-comment/:id",
  checkToken,
  commentIdValidation,
  commentEditValidation,
  updateComment
);
router.delete(
  "/del-comment/:id",
  checkToken,
  commentIdValidation,
  deleteComment
);
////------End routes definations

module.exports = router; ////make the module available for imports
