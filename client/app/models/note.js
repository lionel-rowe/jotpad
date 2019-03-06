import DS from 'ember-data';
// import { throttle } from '@ember/runloop';

// const throttle = Ember.run.debounce;
// const debounce = Ember.run.debounce;

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  // _markUp: function() {
  //   this.set('formatted', formatMarkdown(this.get('content')));
  // },

  // _formattedUpdater: computed('content', function() {

  //   debounce(this, this._markUp, 1, false);

  //   // DS.PromiseObject.create({
  //   //   promise: new Ember.RSVP.Promise((resolve, reject) => {

  //   //     debounce(this, this._markUp, 3000, false);

  //   //     setTimeout(() => resolve(), 1000);

  //   //   }).then(res => {
  //   //     // console.log(this, res)
  //   //     this.set('formatted', res)
  //   //   })
  //   // })
  // }),

  reload: function() {
    this.notifyPropertyChange('updated_at');
    this._super();
  }
});


