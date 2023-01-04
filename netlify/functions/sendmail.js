import client from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL } =
  process.env;

// const SENDGRID_API_KEY =
//   "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";
// const SENDGRID_TO_EMAIL = "phidon-dev@outlook.com";
// const SENDGRID_FROM_EMAIL = "phidon-dev@outlook.com";

export const handler = async (event, context, callback) => {
  // const { message, senderEmail, senderName } = JSON.parse(event.body);
  const { name, email, item, people, budget, text } = JSON.parse(event.body);

  // const senderName = "testname";
  // const senderEmail = "test@test.com";
  const message = `
    <h3>Corporate Gifts with Phidon</h3><br>
    <strong>Company Name</strong><br>
    ${name}<br>
    <strong>Email Address</strong><br>
    ${email}<br>
    <strong>What are you looking for? Select multiple if required. (Note: custom work will have an additional charge.)</strong><br>
    ${item}<br>
    <strong>How many people are you buying for?</strong><br>
    ${people}<br>
    <strong>What is your budget per person?</strong><br>
    ${budget}<br>
    <strong>Please let us know when you need the order by and if there's anything else you're looking for.</strong><br>
    ${text}<br>
    `;

  client.setApiKey(SENDGRID_API_KEY);

  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `New custom corporate order inquiry from ${name} (${email})`,
    html: message,
  };

  try {
    await client.send(data);
    return {
      statusCode: 200,
      body: "Message sent",
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

// {
//   "name": "fdsa",
//   "email": "ace@gmail.com",
//   "item": "pens,custom-notebooks",
//   "people": "1-10",
//   "budget": "$25-50",
//   "text": "fdfd"
// }
