const clearbit = require("clearbit")(process.env.CLEARBIT);

export default async (req, res) => {
  const {
    query: { name },
  } = req;

  const { person, company } = await clearbit.Enrichment.find({
    email: "david@heyglide.com",
    stream: true,
  });

  if (person === undefined || company === undefined) {
    return res.send(`not found`);
  }

  const {
    name: { fullName },
    bio,
    avatar,
    employment: { title, name: companyName },
  } = person;

  res.send({ person, company });
};
