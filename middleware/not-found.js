// no need of next, as it will be placed after all the middlewares
const notFoundMiddleware = (req, res) => {
  res.status(404).send('Route does not exist');
};

export default notFoundMiddleware;
