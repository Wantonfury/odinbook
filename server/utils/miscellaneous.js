const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

exports.generateUserData = (user) => {
  return {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    pfp: null
  }
}

exports.generatePost = (post, id) => {
  return {
    id: post._id,
    message: post.message,
    likes: post.likes,
    liked: post.likes.indexOf(id) !== -1 ? true : false,
    posts: post.likes.length,
    date: dayjs(post.date).fromNow(),
    user: this.generateUserData(post.user)
  }
}

exports.generateComment = (comment) => {
  return {
    comment: comment.comment,
    user: this.generateUserData(comment.user)
  }
}