module.exports = async (req, res, next) => {
  if (req.method === "POST") {
    if (!req.body.token || req.body.token !== process.env.API_KEY) {
      return res.status(401).json({ message: "Not authorized" });
    }
    delete req.body.token;
  }
  return next();
};
