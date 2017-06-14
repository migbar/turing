import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { computed } = Ember;

const INITIAL_STATE = 'S1';

const VALUE = 0;
const DIRECTION = 1;
const NEW_STATE = 2;
const RIGHT = 'R';

const MAXIMUM_EXECUTION_COUNT = 20;

export default Ember.Controller.extend({

  currentState: INITIAL_STATE,
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
    return this.get('instructions')[this.get('currentCondition')];
  },

  currentCondition: Ember.computed('currentState', 'currentValue', function() {
    return [this.get('currentState'), this.get('currentValue')];
  }),

  writeValue(instruction) {
    this.set('currentValue', instruction[VALUE]);
  },

  moveTape(instruction) {
    instruction[DIRECTION] === RIGHT ? this.moveRight() : this.moveLeft();
  },

  updateState(instruction) {
    this.set('currentState', instruction[NEW_STATE]);
  },

  moveRight() {
    this.incrementProperty('tapePosition');
  },

  moveLeft() {
    this.decrementProperty('tapePosition');
  },

  isAtEnd() {
    return this.get('executionCount') >= MAXIMUM_EXECUTION_COUNT;
  },

  execute(instruction) {
    this.writeValue(instruction);
    this.moveTape(instruction);
    this.updateState(instruction);
  },

  playAll: task(function * () {

    while (this.findMatchingInstruction() && !this.isAtEnd()) {
      this.incrementProperty('executionCount');
      let instruction = this.findMatchingInstruction();
      this.execute(instruction);
      yield timeout(400);
    }

  }).drop(),

  play: task(function * () {
    let instruction = this.findMatchingInstruction();
    if (instruction && !this.isAtEnd()) {
      this.execute(instruction);
      yield timeout(400);
    }

  }).drop(),

  resetState() {
    this.set('currentState', INITIAL_STATE);
    this.set('executionCount', 0);
  },

  actions: {
    reset() {
      this.resetState();
      Ember.getOwner(this).lookup(`route:application`).refresh();
    }
  }
})
