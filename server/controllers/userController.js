exports.secureRoute = (req, res, next) => {
  if (req.isAuthenticated()) return res.send("Allowed 1.");
  res.send("Not allowed 1.");
}

exports.secureRoute2 = (req, res, next) => {
  if (req.isAuthenticated()) return res.send("Allowed 2.");
  res.send("Not allowed 2.");
}

exports.secureRoute3 = (req, res, next) => {
  if (req.isAuthenticated()) return res.send("Allowed 3.");
  res.send("Not allowed 3.");
}