const Comment = require("../models/comment.js");

async function getCommentsBy(commentsData, page, limit) {
  const { userId } = commentsData;
  return await Comment.find({ userId })
    .skip(page * limit)
    .limit(limit)
    .exec();
}

async function getCommentsById(commentId) {
  return await Comment.findOne({ commentId });
}

async function deleteComment(commentId) {
  return await await Comment.findOneAndDelete({ commentId });
}

async function createComment(commentData) {
  return await Comment.create(commentData);
}

module.exports = {
  getCommentsBy,
  createComment,
  getCommentsById,
  deleteComment,
};
