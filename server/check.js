module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      console.log('用户未登录');
      return req.redirect('/signin');
    }
    next()
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      console.log('用户已登录');
      return req.redirect('back');
    }
    next()
  }
}
