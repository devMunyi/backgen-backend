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
} = require("../controllers/comment"); //require comment controller to avail its featured methods
const router = require("express").Router(); //require router to define expected client request

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user"); //avail user checkToken middleware
const {
  commentAddValidation,
  commentEditValidation,
} = require("../../middlewares/comment"); //avail comment add/edit validation middlewares
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
const formidable = require("express-formidable");
//////-----End imported custom middlewares

////----Begin routes defination
router.post("/add-comment", checkToken, commentAddValidation, addComment);
router.get("/comments", getComments);
router.get("/comment", getCommentByCommentId);
router.put("/edit-comment", checkToken, commentEditValidation, updateComment);
router.delete("/del-comment", checkToken, deleteComment);
router.get("/comments-by-codeid", getCommentsByCodesnippetId);
router.put("/upvote-comment", upvoteComment);
router.put("/downvote-comment", downvoteComment);
router.post("/upload-img", uploadImg);

// var storage = multer.diskStorage({
//   //folder upload -> public/upload
//   destination: "backgen-backend/public/upload",
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//       if (err) return cb(err);
//       cb(
//         null,
//         Math.floor(Math.random() * 9000000000) +
//           1000000000 +
//           path.extname(file.originalname)
//       );
//     });
//   },
// });

// var upload = multer({ storage: storage });

//show all image in folder upload to json
// router.get("/files", function (req, res) {
//   const images = fs.readdirSync("public/upload");
//   var sorted = [];
//   for (let item of images) {
//     if (
//       item.split(".").pop() === "png" ||
//       item.split(".").pop() === "jpg" ||
//       item.split(".").pop() === "jpeg" ||
//       item.split(".").pop() === "svg"
//     ) {
//       var abc = {
//         image: "backgen-backend/public/upload/" + item,
//         folder: "/",
//       };
//       sorted.push(abc);
//     }
//   }
//   res.send(sorted);
// });

//upload image to folder upload
// router.post(
//   "/upload",
//   upload.array("flFileUpload", 12),
//   function (req, res, next) {
//     res.redirect("back");
//   }
// );

//delete file
// router.post("/delete_file", function (req, res, next) {
//   var url_del = "public" + req.body.url_del;
//   console.log(url_del);
//   if (fs.existsSync(url_del)) {
//     fs.unlinkSync(url_del);
//   }
//   res.redirect("back");
// });
////------End routes definations

module.exports = router; ////make the module available for imports
