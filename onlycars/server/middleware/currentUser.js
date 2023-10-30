  module.exports = async (req, res, next) => {
    if (req.session && req.session.user) {
      req.currentUser = req.session.user;
    }
    next();
  };
  