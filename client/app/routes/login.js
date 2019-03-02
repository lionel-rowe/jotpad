import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  model(params) {
    return this.get('store').createRecord('user');
  },
  actions: {
    authenticate() {
      // TODO
      // const login = this.get('context');
      // const { email, password } = login;

      const [ email, password ] = [ 'email', 'password' ].map(id => {
        return document.querySelector(`#${id}`).value;
      });

      this.get('session').authenticate('authenticator:oauth2', email, password).catch((reason) => {
        // first param actually sent by `authenticator:oauth2` as `username`
        this.set('errorMessage', reason.error || reason);
      }).then(_ => {
        this.transitionTo('/'); // TODO: should preserve previously-navigated path
      });

    }
  }

});
