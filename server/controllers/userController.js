const User = require('../models/user');
const Friendship = require('../models/friendship');
const { generateUserData } = require('../utils/miscellaneous');


exports.getNonFriends = async (req, res, next) => {
  const start = req.body.start;
  const end = req.body.end;
  
  if (end - start <= 0) return res.status(200).json({});
  
  try {
    const friends = (await Friendship.find({ friendship: req.user._id })).reduce((friendships, friendship) => {
      if (friendship.friendship[0] == req.user._id) {
        friendships.push(friendship.friendship[1]);
        return friendships;
      }
      
      friendships.push(friendship.friendship[0]);
      return friendships;
    }, []);
    
    const users = await User.find({ username: { $ne: req.user.username }, _id: { $nin: friends }}).limit(100);
    const nonFriends = users.reduce((arr, user) => {
      arr.push(generateUserData(user));
      
      return arr;
    }, []);
    
    return res.status(200).json(nonFriends);
  } catch(err) {
    res.status(200).json([]);
  }
}

exports.getPendingFriends = (req, res, next) => {
  Friendship.find({ "friendship": req.user._id, "pending": true }).populate('friendship')
    .then(friendships => {
      const pending = friendships.map(friendship => {
        return {
          ...generateUserData(friendship.friendship[0]._id == req.user._id ? friendship.friendship[1] : friendship.friendship[0]),
          pending: friendship.friendship[0]._id == req.user._id ? true : false
        };
      });
      
      res.status(200).json(pending);
    });
}

exports.addFriend = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    if (!user) return res.status(200).send();
    
    let friendship = await Friendship.findOne({ $and: [
      { "friendship": user._id },
      { "friendship": req.user._id }
    ]});
    
    if (friendship) {
      friendship.pending = false;
    } else {
      friendship = new Friendship({
        friendship: [req.user._id, user._id],
        pending: true
      });
    }
    
    friendship.save()
      .then(() => {
        res.status(200).send();
      })
      .catch(err => next(err));
  } catch(err) {
    next(err);
  }
}

exports.removeFriend = (req, res, next) => {
  Friendship.findOneAndRemove({ $and: [
    { friendship: req.user._id },
    { friendship: req.body.id }
  ], pending: false })
    .then(() => res.status(200).send())
    .catch(err => next(err));
}

exports.checkFriend = (req, res, next) => {
  Friendship.findOne({ $and: [
    { friendship: req.user._id },
    { friendship: req.query.id }
  ]})
    .then(friendship => res.status(200).json({
      friend: friendship ? true : false,
      pending: friendship ? friendship.pending : false
    }))
    .catch(err => next(err));
}

exports.getFriends = async (req, res, next) => {
  try {
    const friends = (await Friendship.find({ "friendship": req.user._id, "pending": false }).populate('friendship')).map(friendship => {
      return generateUserData(friendship.friendship[0]._id == req.user._id ? friendship.friendship[1] : friendship.friendship[0]);
    });
    
    return res.status(200).json(friends);
  } catch(err) {
    res.status(200).json([]);
  }
}

exports.getFriendsUser = (req, res, next) => {
  Friendship.find({ "friendship": req.query.id, pending: false }).populate('friendship')
    .then(friendships => {
      res.status(200).json(friendships?.map(friendship => generateUserData(friendship.friendship[0]._id == req.query.id ? friendship.friendship[1] : friendship.friendship[0])));
    });
}

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.query.id })
    .then(user => {
      res.status(200).json(!user ? [] : generateUserData(user));
    })
}

exports.searchUsers = (req, res, next) => {
  const reg = req.query.search ? new RegExp(req.query.search, 'i') : '';
  
  User.find({ full_name: reg })
    .then(users => {
      res.status(200).json(users ? users.map(user => generateUserData(user)) : []);
    })
    .catch(err => next(err));
}

exports.changeName = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
      
      user.save()
        .then(() => res.status(200).send())
        .catch(err => next(err));
    })
    .catch(err => next(err));
}