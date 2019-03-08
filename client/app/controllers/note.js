import Controller from '@ember/controller';

export default Controller.extend({
  actions: {

    delete() {
      const note = this.model;

      if (window.confirm(`Are you sure you want to delete your note${note.title ? ' ' + note.title : ''}?`)) {
        note.deleteRecord()

        note.save().then(_ => {
          this.transitionToRoute('notes');
        });
      }
    },

  }
});
