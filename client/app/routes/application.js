import Ember from 'ember';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Route.extend(ApplicationRouteMixin, AuthenticatedRouteMixin, {
  currentUser: service(),

  beforeModel(...args) {
    if (this.get('session').isAuthenticated) {
      return this._loadCurrentUser().then(() => {
        this.controllerFor('application').set('currentUser', this.get('currentUser'));
      });
    } else if (window.location.pathname !== '/register') {
      this._super(...args);
    }

  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

});
