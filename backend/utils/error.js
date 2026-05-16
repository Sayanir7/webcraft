export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = typeof message === "string" ? message : message?.message || "Something went wrong";
    return error;
  };
