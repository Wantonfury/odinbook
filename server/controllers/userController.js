const User = require('../models/user');
const Friendship = require('../models/friendship');

const generateUserData = (user) => {
  return {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    pfp: null
  }
}

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
      friendships.reduce(async (pending, friendship) => {
        const user = friendship.friendship[0]._id == req.user._id ? friendship.friendship[1] : friendship.friendship[0];
        
        const pendingArr = await pending;
        
        const userData = generateUserData(user);
        userData.pending = friendship.friendship[0]._id == req.user._id ? true : false
        
        pendingArr.push(userData);
        
        
        return pendingArr;
      }, [])
        .then(pending => res.status(200).json(pending));
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
      console.log(req.user);
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