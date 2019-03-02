import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  gravatar: DS.attr('string'),
  password: DS.attr('string')
});
