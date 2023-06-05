const Chat = require('../models/chat');
const { body, validationResult } = require('express-validator');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

exports.getMessages = (req, res, next) => {
  Chat.findOne({ $and: [
    { users: req.user._id },
    { users: req.query.id }
  ]}).populate('messages.user', 'messages.user first_name last_name')
    .then(chat => {
      res.status(200).json(!chat ? [] : chat.messages)
    })
    .catch(err => next(err));
}

exports.getUnreadMessagesCount = (req, res, next) => {
  Chat.findOne({ $and: [
    { users: req.user._id },
    { users: req.query.id }
  ]})
    .then(chat => {
      let unreadMessages = chat?.messages.reduce((acc, message) => {
        return message.user == req.user._id || message.read.includes(req.user._id) ? acc : acc + 1;
      }, 0);
      
      res.status(200).json(unreadMessages ? unreadMessages : 0);
    })
    .catch(err => next(err));
}

exports.addMessage = [
  body('message', 'Message must be between 1 and 100 characters.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array({ onlyFirstError: true }).map(err => err.msg));
    }
    
    try {
      let chat = await Chat.findOne({ $and: [
        { users: req.user._id },
        { users: req.body.id }
      ] });
      
      const message = {
        message: req.body.message,
        user: req.user._id,
        date: Date.now(),
        read: []
      };
      
      if (chat) {
        console.log(chat);
        chat.messages.push(message);
      } else {
        if (!chat) chat = new Chat({
          users: [req.user._id, req.body.id],
          messages: [message]
        });
      }
      
      
      
      chat.save()
        .then(() => res.status(200).send())
        .catch(err => next(err));
    } catch(err) {
      next(err);
    }
  }
]

exports.readMessages = (req, res, next) => {
  Chat.findOne({ $and: [
    { users: req.user._id },
    { users: req.body.id }
  ]})
    .then(chat => {
      if (!chat) return res.status(200).send();
      
      chat.messages = chat.messages.map(message => {
        return {
          ...message,
          read: req.body.messages.includes(message._id.toString()) ? [...message.read, req.user._id] : message.read
        }
      });
      
      chat.save()
        .then(() => res.status(200).send())
        .catch(err => next(err));
    })
    .catch(err => next(err));
}

exports.getChatId = (req, res, next) => {
  Chat.findOne({ $and: [
    { users: req.user._id },
    { users: req.query.id }
  ]})
    .then(chat => {
      res.status(200).json(chat?._id);
    })
    .catch(err => next(err));
}