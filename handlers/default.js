module.exports.handler = async (event) => {

    console.log("Default")
    console.log(event)
  
    const { connectionId } = event.requestContext
  
  
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          connectionId,
          event,
          message: "Go Serverless v3.0! Your function Default successfully!",
          input: event,
        }
      ),
    };
  };
  