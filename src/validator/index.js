module.exports = {
  validate: (
    schema = {
      body: null,
      params: null,
      header: null,
      query: null,
    }
  ) => {
    return (req, res, next) => {
      let valid = false;
      let result;
      if (schema.body) {
        result = schema.body.validate(req.body);
        valid = !result.error;
      }
      if (valid) {
        next();
      } else {
        const details = result.error.details.map((item) => {
          return {
            message: item.message,
            key: item.path[0],
          };
        });
        res.status(400).send({
          message: "Error in validation",
          details,
        });
      }
    };
  },
  auth: require("./auth"),
};
