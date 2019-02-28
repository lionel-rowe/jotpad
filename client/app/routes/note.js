import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('note', params.id);
  },
  init(...args) {
    this._super(...args);
    this.interval = setInterval(() => {
      this.actions.saveNote.call(this);
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
    saveNote() {
      const note = this.get('context');

      return note.save().then(res => {
        // console.log(res);
      }, err => {
        console.log(err);
      });
    },
    saveAndQuit(nextUrl) {
      this.actions.saveNote.call(this)
        .then(() => {
          this.transitionTo(nextUrl);
        });
    }
  }
});
