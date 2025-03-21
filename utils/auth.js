const withAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.session || !req.session.logged_in) {
    // Redirect to the login page if not authenticated
    return res.redirect('/login');
  }
  
  // Proceed to the next middleware or route handler
  next();
};

module.exports = withAuth;