function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};

  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

SessionManager.prototype.logIn = async function(req, user) {
  var self = this;
  const obj = await this._serializeUser(user, req);
  if (!req._passport.session) {
    req._passport.session = {};
  }
  req._passport.session.user = obj;
  if (!req.session) {
    req.session = {};
  }
  req.session[self._key] = req._passport.session;
}

SessionManager.prototype.logOut = function(req) {
  if (req._passport && req._passport.session) {
    delete req._passport.session.user;
  }
}


module.exports = SessionManager;
