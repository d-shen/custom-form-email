const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

import client from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL } =
  process.env;

export const handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  client.setApiKey(SENDGRID_API_KEY);

  const dataSend = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    // subject: `New custom corporate order inquiry from ${name} (${email})`,
    subject: `New custom corporate order inquiry from`,
    html: tempMessage,
  };

  try {
    await client.send(dataSend);
    return {
      statusCode: 200,
      body: JSON.stringify(dataSend),
      headers: CORS_HEADERS,
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
      headers: CORS_HEADERS,
    };
  }
};
