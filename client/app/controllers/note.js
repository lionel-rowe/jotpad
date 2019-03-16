import Controller from '@ember/controller';
import swal from 'sweetalert';

export default Controller.extend({
  actions: {

    delete() {
      const note = this.model;

      swal({
        title: 'Delete?',
        text: `Are you sure you want to delete your note${note.title ? ` “${note.title}”` : ''}?`,

        buttons: ['Cancel', 'Delete'],

        dangerMode: true,
        animation: false
      }).then((shouldDelete) => {
        if (shouldDelete) {
          note.deleteRecord();

          note.save().then(_ => {
            this.transitionToRoute('notes');
          });
        }
      })
    },

  }
});
