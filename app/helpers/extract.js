import Ember from 'ember';

export function extract(params) {
  let [instruction, attr] = params;

  let condition = instruction[0].split(',');
  let action = instruction[1];

  switch (attr) {
    case 'state':
      return condition[0];
    case 'trigger':
      return condition[1];
      
    case 'value':
      return action[0];
    case 'move':
      return action[1];
    case 'newState':
      return action[2];
  }

}

export default Ember.Helper.helper(extract);
