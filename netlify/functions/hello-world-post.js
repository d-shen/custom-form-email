const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

export const handler = async (event, context, callback) => {
  // const { message, senderEmail, senderName } = JSON.parse(event.body);
  console.log(event.body);
  const data = JSON.parse(event.body);

  // try {
  //   return {
  //     statusCode: 200,
  //     body: data,
  //     headers: CORS_HEADERS,
  //   };
  // } catch (err) {
  //   return {
  //     statusCode: err.code,
  //     body: JSON.stringify({ msg: err.message }),
  //     headers: CORS_HEADERS,
  //   };
  // }
};
