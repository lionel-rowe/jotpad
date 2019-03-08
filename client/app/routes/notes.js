import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // console.log( this.get('store').findAll('note'))
    return this.store.findAll('note', { reload: true })
      .then(notes => notes.toArray().sort((a, b) => b.updated_at - a.updated_at));
  },

});
