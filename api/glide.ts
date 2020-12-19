import { NextApiRequest, NextApiResponse } from "next";

export interface StringValue {
  type: "string";
  value: string;
}

export interface NumberValue {
  type: "number";
  value: string;
}

export interface BooleanValue {
  type: "boolean";
  value: string;
}

export interface DateTimeValue {
  type: "date-time";
  value: string;
}

export type Value = StringValue | NumberValue | BooleanValue | DateTimeValue;

export type Params = Record<string, Value>;

function addCORS(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function api(
  work: (params: Params) => Promise<Value | undefined>
): (request: NextApiRequest, response: NextApiResponse) => Promise<void> {
  return async (request, response) => {
    addCORS(response);

    if (request.method === "OPTIONS") {
      return response.status(204).end();
    }

    const { params } = request.body;
    const resultValue = await work(params);

    if (resultValue === undefined) {
      return response.status(400).end();
    }

    return response.send(resultValue);
  };
}
