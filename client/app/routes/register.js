import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),

  model() {
    return this.get('store').createRecord('user');
  },

  actions: {
    register() {
      const { email, password } = this.context;

      this.store.createRecord('user', {
        email,
        password
      }).save()
      .then(_newUser => {

        this.get('session').authenticate('authenticator:oauth2', email, password).then(() => {

          this.get('currentUser').load()
            .then(() => {
              this.controllerFor('application').set('currentUser', this.get('currentUser'));
              this.transitionTo('/');
            });

        })
        .catch((reason) => {
          // first param actually sent by `authenticator:oauth2` as `username`
          this.set('errorMessage', reason.error || reason);
        });

      });
    },
  }

});
