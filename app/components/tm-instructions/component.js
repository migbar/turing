import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tm-instructions'],

  instructionsCollection: Ember.computed('instructions', function() {
    return Object.entries(this.get('instructions'));
  })

});
