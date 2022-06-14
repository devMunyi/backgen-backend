const {
  addComment,
  getCommentByCommentId,
  getComments,
  updateComment,
  deleteComment,
  getCommentsByCodesnippetId,
  getTotalCommentsCodeId,
  incrementRepliesTotal,
  incrementVotesTotal,
} = require("../models/comment"); //require comment models to avail its featured methods
const { incrementCommentsTotal } = require("../models/codesnippet");
//const { inputAvailable } = require("../../helpers/common"); //require common helper functions
//const { json } = require("express");

module.exports = {
  addComment: (req, res) => {
    const { body } = req;
    addComment(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new comment",
        });
      }

      let { code_snippet_id, replying_to } = body;
      if (replying_to == 0) {
        //increment total_comments in the pr_code_snippets table
        incrementCommentsTotal(code_snippet_id, (err2, results2) => {
          if (err2) {
            console.log(err2);
          }

          //ready to give a response for successful comment save
          if (results2) {
            console.log(
              "response on incrementing comments total => ",
              results2
            );
            return res.json({
              success: true,
              data: results,
              message: "Comment added Successfully",
            });
          }
        });
      } else {
        //increment total_replies in the pr_comments table
        incrementRepliesTotal(
          { code_snippet_id, replying_to },
          (err3, results3) => {
            if (err3) {
              console.log(err3);
            }

            //ready to give a response for successful comment save
            if (results3) {
              console.log(
                "response on incrementing replies total => ",
                results3
              );
              return res.json({
                success: true,
                data: results,
                message: "Comment added Successfully",
              });
            }
          }
        );
      }
    });
  },
  getCommentByCommentId: (req, res) => {
    const { comment_id } = req.query;

    if (!comment_id) {
      return res.json();
    }

    getCommentByCommentId(parseInt(comment_id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  getComments: (req, res) => {
    getComments((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  updateComment: (req, res) => {
    const { body } = req;
    updateComment(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update comment",
        });
      }

      return res.json({
        success: true,
        message: "Comment updated successfully!",
      });
    });
  },
  deleteComment: (req, res) => {
    const { comment_id } = req.body;
    deleteComment(parseInt(comment_id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Comment deleted successfully!",
      });
    });
  },

  getCommentsByCodesnippetId: (req, res) => {
    let queryObj = {};
    let { where_, orderby, dir, offset, rpp } = req.query;

    console.log("QUERY AT CONTROLLER => ", where_);
    console.log("offset => ", offset);
    console.log("rpp => ", rpp);

    if (!where_) {
      return res.json();
    }

    // let andsearch;
    // search_ = inputAvailable(search_);
    // if (search_ != undefined) {
    //   andsearch = `AND sf.name LIKE '%${search_}%'`;
    // } else {
    //   andsearch = "";
    // }

    if (!orderby) {
      orderby = "cmt.uid";
    }
    if (!dir) {
      dir = "DESC";
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    queryObj.where_ = where_;
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    getCommentsByCodesnippetId(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }

      if (results) {
        getTotalCommentsCodeId(where_, (err2, results2) => {
          if (err2) {
            console.log(err2);
          }

          if (results2) {
            return res.json({
              success: true,
              total_records: results2.total_comments,
              data: results,
            });
          }
        });
      }
    });
  },
};
