import Ember from 'ember';
import instructions from 'turing/fixtures/instructions';
const CELL_COUNT = 200;

export default Ember.Route.extend({

  model() {
    let cells = [];
    for (var i = 0; i < CELL_COUNT; i++) {
      cells.pushObject(Ember.Object.create({ value: 0 }));
    }
    return {
      cells,
      instructions
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('cells', model.cells);
    controller.set('instructions', model.instructions);
  }

});
