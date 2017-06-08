import Ember from 'ember';
import INSTRUCTIONS from 'turing/fixtures/instructions';
const CELL_COUNT = 500;

export default Ember.Route.extend({

  model() {
    return {
      cells: Array(CELL_COUNT).fill(0),
      instructions: INSTRUCTIONS
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('cells', model.cells);
    controller.set('instructions', model.instructions);
  }

});
