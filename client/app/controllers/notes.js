import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    new() {
      this.store.createRecord('note', {
        content: ''
      }).save()
      .then(newNote => {
        this.transitionToRoute('note', newNote);
      });
    },

  }
});
