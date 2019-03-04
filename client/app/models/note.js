import DS from 'ember-data';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import formatMarkdown from '../utils/formatMarkdown';
// import { throttle } from '@ember/runloop';

const debounce = Ember.run.debounce;

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  formatted: computed('content', function() {
    formatMarkdown(this.get('content'))
  }),

  _markUp: function() {
    this.set('formatted', formatMarkdown(this.get('content')));
  },

  _formattedUpdater: computed('content', function() {

    debounce(this, this._markUp, 1, false);

    // DS.PromiseObject.create({
    //   promise: new Ember.RSVP.Promise((resolve, reject) => {

    //     debounce(this, this._markUp, 3000, false);

    //     setTimeout(() => resolve(), 1000);

    //   }).then(res => {
    //     // console.log(this, res)
    //     this.set('formatted', res)
    //   })
    // })
  }),

  reload: function() {
    this.notifyPropertyChange('updated_at');
    this._super();
  }
});


