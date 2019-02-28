import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('notes', { path: '/' }, () => {
    this.route('new', { path: '/notes/new' });
    this.route('note', { path: '/notes/:id' });
  });
});

export default Router;
