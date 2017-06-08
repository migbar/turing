import Ember from 'ember';

export function cellPosition(params/*, hash*/) {
  return `cell-${params}`;
}

export default Ember.Helper.helper(cellPosition);
