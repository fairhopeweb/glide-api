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

interface Enrichement {
  person: any;
  company: any;
}

function enrichment(path: string, t: (enrichment: Enrichement) => string) {
  const apiPath = `/api${path}`;

  // This answers the OPTIONS request, which is used for CORS.
  app.options(apiPath, async (request, response) => {
    addCORS(response);
    return response.status(204).send("");
  });

  // This is the actual API request
  app.post(apiPath, async (request, response) => {
    addCORS(response);

    console.log(request.body);

    // The parameters passed from Glide are in the `params`
    // field of the request body.  Our request takes a single
    // parameter, which is called `pokemon`.
    const {
      params: { email },
    } = request.body;

    if (
      email === undefined ||
      email.type !== "string" ||
      !validateEmail(email.value)
    ) {
      return response.sendStatus(400);
    }

    let enrich;
    try {
      enrich = await clearbit.Enrichment.find({
        email: email.value,
        stream: true,
      });
    } catch (error) {
      console.error(error);
      return response.sendStatus(400);
    }

    if (enrich?.person === undefined || enrich?.company === undefined) {
      return response.sendStatus(400);
    }

    response.type("application/json");

    return response.send(JSON.stringify({ type: "string", value: t(enrich) }));
  });
}

enrichment("/full-name", (enrich) => enrich.person.name.fullName);
enrichment("/avatar", (enrich) => enrich.person.avatar);
enrichment("/bio", (enrich) => enrich.person.bio);
enrichment(
  "/title",
  (enrich) =>
    `${enrich.person.employment.title}, ${enrich.person.employment.name}`
);

export default app;
