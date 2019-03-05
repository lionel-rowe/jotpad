import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.get('store').findRecord('note', params.id);
  },
  activate(...args) {
    this._super(...args);
    this.interval = setInterval(() => {
      this._pushOrPull.call(this);
    }, 10000);
    window.onbeforeunload = () => {
      this._pushOrPull.call(this);
    };
  },

  _pushOrPull() {
    const note = this.get('context');

    if (note.hasDirtyAttributes) {

      return note.save().then(res => {
        return res;
      }, err => {
        return err;
      });

    } else {
      return note.reload();
    }

  },

  deactivate(...args) {
    clearInterval(this.interval);
    window.onbeforeunload = null;
    this._super(...args);
  },

  actions: {
    willTransition(transition) {
      this._pushOrPull.call(this);

      // transition.abort();
    },
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
  }
});
