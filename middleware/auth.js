function auth(req, res, next) {
  console.log('Authentication boiler plate...');
  next();
}

module.exports = auth;
