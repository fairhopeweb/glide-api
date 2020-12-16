import express from "express";
import { validate as validateEmail } from "email-validator";

const clearbit = require("clearbit")(process.env.CLEARBIT);

const app = express();

// We use this to parse the request body to JSON.
app.use(express.json());

// Since your API is not hosted on Glide's domain, you must
// support CORS.
function addCORS(response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");
}

// This answers the OPTIONS request, which is used for CORS.
app.options("/full-name", async (request, response) => {
  addCORS(response);
  return response.status(204).send("");
});

// This is the actual API request
app.post("/full-name", async (request, response) => {
  addCORS(response);

  // The parameters passed from Glide are in the `params`
  // field of the request body.  Our request takes a single
  // parameter, which is called `pokemon`.
  const {
    params: { email },
  } = request.body;

  if (email === undefined || email.type !== "string" || !validateEmail(email)) {
    return response.sendStatus(400);
  }

  const { person, company } = await clearbit.Enrichment.find({
    email,
    stream: true,
  });

  if (person === undefined || company === undefined) {
    return response.sendStatus(400);
  }

  response.type("application/json");

  return response.send(
    JSON.stringify({ type: "string", value: person.name.fullName })
  );
});

export default app;
