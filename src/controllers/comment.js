const {
  addComment,
  getCommentByCommentId,
  getComments,
  updateComment,
  deleteComment,
  getCommentsByCodesnippetId,
  getTotalCommentsCodeId,
  incrementRepliesTotal,
  decrementRepliesTotal,
  incrementCommentVotes,
  decrementCommentVotes,
  commentVotes,
} = require("../models/comment"); //require comment models to avail its featured methods
const {
  incrementCommentsTotal,
  decrementCommentsTotal,
} = require("../models/codesnippet");
const {
  addUpvote,
  addDownvote,
  updateUpvote,
  updateDownvote,
  voteCheckByPostIdUserIdAndTable,
} = require("../models/votes");
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
      if (results) {
        if (replying_to == 0) {
          console.log("replying to == 0");
          //increment total_comments in the pr_code_snippets table
          incrementCommentsTotal(code_snippet_id, (err2, results2) => {
            if (err2) {
              console.log(err2);
            }

            //ready to give a response for successful comment save
            if (results2) {
              return res.json({
                success: true,
                message: "Added Successfully",
              });
            }
          });
        }

        if (replying_to > 0) {
          //increment total_replies in the pr_comments table
          incrementRepliesTotal(
            { code_snippet_id, replying_to },
            (err3, results3) => {
              if (err3) {
                console.log(err3);
              }

              //ready to give a response for successful comment save
              if (results3) {
                return res.json({
                  success: true,
                  message: "Added Successfully",
                });

                //get total comments for this code
                // let { where_ } = req.body;
                // console.log("where parameters via body => ", where_);
                // getTotalCommentsCodeId(code_snippet_id, (err4, results4) => {
                //   console.log("total comments resp => ", results4);
                //   if (err4) {
                //     console.log(err4);
                //   }

                //   if (results4) {
                //     return res.json({
                //       success: true,
                //       message: "Added Successfully",
                //       total_comments: results4.total_comments,
                //     });
                //   }
                // });
              }
            }
          );
        }
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
          message: "Failed to update",
        });
      }

      return res.json({
        success: true,
        message: "Updated successfully!",
      });
    });
  },
  deleteComment: (req, res) => {
    const { comment_id } = req.body;
    const { replying_to, code_snippet_id } = req.query;
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

      if (results) {
        if (replying_to == 0) {
          //decrement total_comments in the pr_code_snippets table
          decrementCommentsTotal(code_snippet_id, (err2, results2) => {
            if (err2) {
              console.log(err2);
            }

            //ready to give a response for successful comment delete
            if (results2) {
              return res.json({
                success: true,
                data: results,
                message: "Deleted Successfully",
              });
            }
          });
        } else {
          if (replying_to > 0) {
            //decrement total_replies in the pr_comments table
            decrementRepliesTotal(
              { code_snippet_id, replying_to },
              (err3, results3) => {
                if (err3) {
                  console.log(err3);
                }

                //ready to give a response for successful comment delete
                if (results3) {
                  return res.json({
                    success: true,
                    message: "Deleted Successfully",
                  });
                }
              }
            );
          } else {
            return res.json({
              success: true,
              message: "Deleted Successfully",
            });
          }
        }
      }
    });
  },

  getCommentsByCodesnippetId: (req, res) => {
    let queryObj = {};
    let { where_, orderby, dir, offset, rpp } = req.query;
    let { code_snippet_id } = where_;

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
    if (!(offset >= 0)) {
      offset = 0;
    }

    if (!rpp > 1) {
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
          console.log("total comments => ", results2.total_comments);

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

  upvoteComment: (req, res) => {
    const { post_id } = req.body;
    const { body } = req;

    //check if the vote is already casted
    voteCheckByPostIdUserIdAndTable(body, (err1, result1) => {
      if (err1) {
        console.log(err1);
      }
      //when db result = undefined will mean not vote record seen, thus can be recorded
      if (result1 == undefined) {
        //means user has not upvoted or downvoted before, hence record his vote
        addUpvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            //increment comment identified with post_id by 1
            incrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Upvote recorded",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }

      //if upvote = 0 => downvote = -1, meaning user now intends to revert the downvote and upvote instead
      if (result1 && result1.upvote == 0 && result1.downvote == -1) {
        updateUpvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            //now revert the downvote
            updateDownvote(body, (err3, result3) => {
              if (err3) {
                console.log(err3);
              }

              if (result3) {
                incrementCommentVotes(
                  { comment_id: post_id, step: 2 },
                  (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      //now get the updated votes
                      commentVotes(post_id, (err5, result5) => {
                        if (err5) {
                          console.log(err5);
                        }

                        if (result5) {
                          return res.json({
                            success: true,
                            message: "Upvote recorded",
                            votes: result5.votes,
                          });
                        }
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }

      //if upvote = 1 => downvote = 0, meaning user now intends to revert the upvote
      if (result1 && result1.upvote == 1 && result1.downvote == 0) {
        body.upvote = 0;
        updateUpvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            decrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  //now get the updated votes
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Upvote reverted",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }

      //if upvote = 0 => downvote = 0, meaning user intends to upvote
      if (result1 && result1.upvote == 0 && result1.downvote == 0) {
        updateUpvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            incrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  //now get the updated votes
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Upvote recorded",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  },
  downvoteComment: (req, res) => {
    const { post_id } = req.body;
    const { body } = req;

    //check if the vote is already casted
    voteCheckByPostIdUserIdAndTable(body, (err1, result1) => {
      if (err1) {
        console.log(err1);
      }
      //when db result = undefined will mean not vote record seen, thus can be recorded
      if (result1 == undefined) {
        //means user has not upvoted or downvoted before, hence record his vote
        addDownvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            //decrement votes for comment identified with variable post_id by 1
            decrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Downvote recorded",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }

      //if downvote = 0 => upvote = 1, meaning user now intends to revert the upvote and downvote instead
      if (result1.downvote == 0 && result1.upvote == 1) {
        updateDownvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            //now revert the downvote
            updateUpvote(body, (err3, result3) => {
              if (err3) {
                console.log(err3);
              }

              if (result3) {
                decrementCommentVotes(
                  { comment_id: post_id, step: 2 },
                  (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }
                    if (result4) {
                      //now get the updated post votes
                      commentVotes(post_id, (err5, result5) => {
                        if (err5) {
                          console.log(err5);
                        }
                        if (result5) {
                          return res.json({
                            success: true,
                            message: "Downvote recorded",
                            votes: result5.votes,
                          });
                        }
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }

      //if downvote = -1 => upvote = 0, meaning user now intends to revert the downvote
      if (result1.downvote == -1 && result1.upvote == 0) {
        body.downvote = 0;
        updateDownvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            incrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  //now get the updated votes
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Downvote reverted",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }

      //if upvote = 0 => downvote = 0, meaning user intends to downvote
      if (result1 && result1.upvote == 0 && result1.downvote == 0) {
        updateDownvote(body, (err2, result2) => {
          if (err2) {
            console.log(err2);
          }

          if (result2) {
            decrementCommentVotes(
              { comment_id: post_id, step: 1 },
              (err3, result3) => {
                if (err3) {
                  console.log(err3);
                }

                if (result3) {
                  //now get the updated votes
                  commentVotes(post_id, (err4, result4) => {
                    if (err4) {
                      console.log(err4);
                    }

                    if (result4) {
                      return res.json({
                        success: true,
                        message: "Downvote recorded",
                        votes: result4.votes,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  },
};
