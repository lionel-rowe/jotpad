import Route from '@ember/routing/route';

export default Route.extend({

  _interval: -1,

  model(params) {

    return this.store.findRecord('note', params.id)
      .then(note => {
        // console.log(note);
        return note;
      }).catch(err => {
        if (err.errors[0].status === '404') {
          // this.set('error', 404);
          // this.context.set('error', 404);
          // return { error: 404 };
          this.transitionTo('404'); // TODO
        }
      });

  },

  activate(...args) {


    this._super(...args);
    this._interval = setInterval(() => {
      this._pushOrPull.call(this);
    }, 10000);
    window.onbeforeunload = () => {
      this._pushOrPull.call(this);
    };
  },

  _pushOrPull() {
    const note = this.context;

    if (note.hasDirtyAttributes) {

      return note.save().then(res => {
        return res;
      }, err => {
        return err;
      });

    } else {
      return !note.isDeleted && note.reload();
    }

  },

  deactivate(...args) {
    clearInterval(this._interval);
    window.onbeforeunload = null;
    this._super(...args);
  },

  actions: {
    willTransition(transition) {
      this._pushOrPull.call(this);

      // transition.abort();
    },
    updateContent(newContent) {
      const note = this.context;
      note.set('content', newContent);
      this.set('model', note);
    },
    updateTitle(newTitle) {
      const note = this.context;
      note.set('title', newTitle);
      this.set('model', note);
    },

  }
});
