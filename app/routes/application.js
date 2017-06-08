import Ember from 'ember';
const CELL_COUNT = 500;
const SAMPLE_INSTRUCTIONS = [
  {
    state: 'S1',
    trigger: '0',
    value: '1',
    move: 'R',
    newState: 'S2'
  },
  {
    state: 'S2',
    trigger: '1',
    value: '0',
    move: 'L',
    newState: 'S2'
  },
  {
    state: 'S2',
    trigger: '0',
    value: '1',
    move: 'R',
    newState: 'S3'
  },
  {
    state: 'S3',
    trigger: '1',
    value: '0',
    move: 'L',
    newState: 'S4'
  },
  {
    state: 'S4',
    trigger: '0',
    value: '0',
    move: 'R',
    newState: 'S4'
  }
];
export default Ember.Route.extend({

  model() {
    return {
      cells: Array(CELL_COUNT).fill(0),
      instructions: SAMPLE_INSTRUCTIONS
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cells', model.cells);
    controller.set('instructions', model.instructions);
  }

});
