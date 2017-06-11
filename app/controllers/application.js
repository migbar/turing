import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({

  currentState: 'S1',

  currentValue: computed('tapePosition', 'cells.@each', {

    get() {
      return this.get('cells')[this.get('tapePosition')].value;
    },

    set(key, value) {
      let currentCell = this.get('cells')[this.get('tapePosition')];
      currentCell.set('value', value);
      return value;
    }

  }),

  tapePosition: computed('cells.[]', function() {
    let halfPoint = Math.floor(this.get('cells').length / 2);
    return halfPoint;
  }),

  findMatchingInstruction() {
    let condition = [this.get('currentState'), this.get('currentValue')];
    return this.get('instructions')[condition];
  },

  writeValue(instruction) {
    let value = instruction[0];
    this.set('currentValue', value);
  },

  moveTape(instruction) {
    let direction = instruction[1];
    direction === 'R' ? this.moveRight() : this.moveLeft();
  },

  updateState(instruction) {
    let newState = instruction[2];
    this.set('currentState', newState);
  },

  moveRight() {
    this.incrementProperty('tapePosition');
  },

  moveLeft() {
    this.decrementProperty('tapePosition');
  },

  actions: {

    play() {
      let instruction = this.findMatchingInstruction();
      this.writeValue(instruction);
      this.moveTape(instruction);
      this.updateState(instruction);
    }

  }
})
