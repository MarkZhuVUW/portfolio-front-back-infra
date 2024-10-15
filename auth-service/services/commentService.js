const commentDao = require("../daos/commentDao");
const { randomUUID } = require("crypto");
const logger = require("../utils/logger.js");
const userService = require("./userService.js");

async function getCommentsBy({ userId, commentId }, page, limit) {
  if (commentId) {
    logger.info(`Getting comments by commentId=${commentId}`);
    return [await commentDao.getCommentsById(commentId)];
  }
  logger.info(
    `getting comments by userId=${userId} page=${page} limit=${limit}`
  );
  const comments = await commentDao.getCommentsBy(
    { userId, commentId },
    parseInt(page),
    parseInt(limit)
  );

  return comments;
}

async function createComment({ userId, comment }) {
  logger.info(
    `creating comment userId=${userId} comment=${comment}`
  );

  const currDate = new Date();
  const currUser = await userService.getUserById(userId);

  const comments = await commentDao.createComment({
    commentId: randomUUID(),
    userId,
    comment,
    creationDate: currDate.toISOString(),
    lastModifiedDate: currDate.toISOString(),
    userAvatarUrl: currUser.imageUrl,
    userName: currUser.userName,
  });
  return comments;
}

async function deleteComment(commentId) {
  logger.info(`deleting comment commentId=${commentId}`);
  const deletedComment = await commentDao.deleteComment(commentId);
  logger.info(`deleted comment commentId=${commentId}`);

  return deletedComment;
}
module.exports = {
  getCommentsBy,
  createComment,
  deleteComment,
};
