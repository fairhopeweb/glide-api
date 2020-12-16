const clearbit = require("clearbit")(process.env.CLEARBIT);

export default (req, res) => {
  const {
    query: { name },
  } = req;

  res.send(`Hello ${name}!`);
};
