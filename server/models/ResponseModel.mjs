/*________in http-response.json upp    
  success: false,
  statusCode: 404,
  error: '  Not Found!',
  items: 0,
  data: null,
_________*/

class ResponseModel {
  constructor({ statusCode = 404, data = null, error = null }) {
    this.success = false;
    this.statusCode = statusCode;

    if (statusCode >= 200 && statusCode <= 299) this.success = true;

    this.error = error;

    if (data) {
      if (Array.isArray(data)) {
        this.items =  data.length;
      } else {
        this.items = 1;
      }
    } else {
      this.items = 0;
    }

    this.data = data;
  }
}

export default ResponseModel;
