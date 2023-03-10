import client from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

client.setApiKey(process.env.SENDGRID_API_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

export const handler = async (event, context) => {
  const { name, email, item, people, budget, text } = JSON.parse(event.body);

  const message = `
    <h3>Corporate Gifts with Phidon</h3><br>
    <strong>Company Name</strong><br>
    ${name}<br>
    <strong>Email Address</strong><br>
    ${email}<br>
    <strong>What are you looking for? Select multiple if required. (Note: custom work will have an additional charge.)</strong><br>
    ${item ? `${item}` : ""}<br>
    <strong>How many people are you buying for?</strong><br>
    ${people}<br>
    <strong>What is your budget per person?</strong><br>
    ${budget}<br>
    <strong>Please let us know when you need the order by and if there's anything else you're looking for.</strong><br>
    ${text ? `${text}` : ""}<br>
    `;

  const data = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New custom corporate order inquiry from ${name} (${email})`,
    html: message,
  };

  try {
    await client.send(data);
    return {
      statusCode: 200,
      body: "Message sent",
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
