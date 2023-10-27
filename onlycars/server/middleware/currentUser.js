module.exports.currentUser = (req, res, next) => {
    if (req.session && req.session.user) {
        req.currentUser = req.session.user;
    } else {
        req.currentUser = null;
    }
    next();
};