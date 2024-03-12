function isAuthenticated(req, res, next) {
    if (req.session.logged_in) {
      next();
    } else {
      if (req.is('json')) {
        res.status(401).json({ message: 'User not authenticated' });
      } else {
        res.redirect('/login');
      }
    }
  }
  
  module.exports = isAuthenticated;