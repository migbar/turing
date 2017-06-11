import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['instruction-list'],

  instructionsCollection: Ember.computed('instructions', function() {
    return Object.entries(this.get('instructions'));
  })

});
