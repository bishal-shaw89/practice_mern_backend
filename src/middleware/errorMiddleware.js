const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Default to a generic 500 Internal server error
  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorMiddleware;
