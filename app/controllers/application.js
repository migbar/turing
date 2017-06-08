import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({

  tapePosition: computed('cells.[]', function() {
    let halfPoint = Math.floor(this.get('cells').length / 2);
    return halfPoint;
  }),

  actions: {

    up() {
      this.incrementProperty('tapePosition');
      this.set('currentState', 'S99');
    },

    down() {
      this.decrementProperty('tapePosition');
      this.set('currentState', 'S101');
    }

  }
})
