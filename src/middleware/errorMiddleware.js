const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Error ni full details ane location terminal ma print karo

  res.status(500).json({ message: "Somethig went wrong" });
};

module.exports = errorMiddleware;
