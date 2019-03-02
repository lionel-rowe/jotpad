import DS from 'ember-data';
import ENV from '../config/environment';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

const options = {
  session: service(),

  namespace: 'api/v1',

  authorize(xhr) {
    let { access_token } = this.get('session.data.authenticated');

    if (isPresent(access_token)) {
      xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
    }
  }
};

if (ENV.API_HOST) {
  options.host = ENV.API_HOST;
}

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, options);
