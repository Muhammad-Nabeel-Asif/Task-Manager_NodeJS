const notFound = (req, res) =>
  res.status(501).send(`The route "${req.originalUrl}" is not defined yet.`);

module.exports = notFound;
