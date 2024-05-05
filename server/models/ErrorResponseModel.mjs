//Error --class i javascript
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);//arv i js
    this.statusCode = statusCode;
    this.success = `${statusCode}`.startsWith('4') ? false : true;//own-if starts with 4 -> false else true
  }
}

 
export default ErrorResponse