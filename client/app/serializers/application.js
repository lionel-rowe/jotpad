import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: k => k
});
