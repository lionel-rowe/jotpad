import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('note', params.id);
  },
  init(...args) {
    this._super(...args);
    this.interval = setInterval(() => {
      this.actions.pushOrPull.call(this);
    }, 10000);
  },
  transitionTo(...args) {
    clearInterval(this.interval);
    this._super(...args);
  },
  actions: {
    updateContent(newContent) {
      const note = this.get('context');
      note.set('content', newContent);
      this.set('model', note);
    },
    updateTitle(newTitle) {
      const note = this.get('context');
      note.set('title', newTitle);
      this.set('model', note);
    },
    pushOrPull() {
      const note = this.get('context');

      if (note.hasDirtyAttributes) {

        return note.save().then(_res => {
          // console.log(res);
        }, _err => {
          // console.log(err);
        });

      } else {
        return note.reload();
      }
    },
    pushOrPullAndQuit(nextUrl) {
      this.actions.pushOrPull.call(this)
        .then(() => {
          this.transitionTo(nextUrl);
        });
    }
  }
});
