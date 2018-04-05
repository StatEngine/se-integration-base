import _ from 'lodash';
import request from 'request-promise';

export class Integration {
  constructor(params) {
    this.params = params;
  }

  connect() {}

  disconnect() {}

  process(payload, inputParams) {
    this.connect();
    return this.process(payload, inputParams)
      .then((res) => {
        this.disconnect();
        return res;
      });
  }
}

export class WebHookIntegration extends Integration {
  constructor(params) {
    super(params);

    // defaults
    this.params = _.merge({
      method: 'POST',
      json: true,
      timeout: 5000,
    }, params);
  }

  process(payload) {
    this.params.body = payload;
    return request(this.params);
  }
}
