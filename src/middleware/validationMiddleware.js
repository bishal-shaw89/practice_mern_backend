const { validationResult } = require('express-validator');

const validationMiddleware = {};

// This is a middleware that will be used to validate the request body.
validationMiddleware.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // validation error found
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    // No validation error found, continue to the next middleware or route handler
    next();

}