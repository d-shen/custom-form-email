export const handler = async (event, context, callback) => {
  // const { message, senderEmail, senderName } = JSON.parse(event.body);
  const data = JSON.parse(event.body);

  try {
    return {
      statusCode: 200,
      body: data,
      headers: {
        "access-control-allow-origin": "*",
      },
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
      headers: {
        "access-control-allow-origin": "*",
      },
    };
  }
};
