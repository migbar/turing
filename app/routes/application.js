import Ember from 'ember';
const CELL_COUNT = 500;

export default Ember.Route.extend({

  model() {
    return Array(CELL_COUNT).fill(0);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cells', model);
  }

});
