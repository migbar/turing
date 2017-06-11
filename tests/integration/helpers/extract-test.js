
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('extract', 'helper:extract', {
  integration: true
});


test('it renders', function(assert) {
  let obj = {};
  let condition = ['S1', '0'];
  let action = [')', 'R', 'S2'];
  obj[condition] = action;
  let instruction = Object.entries(obj)[0];

  this.set('instruction', instruction);

  this.render(hbs`{{extract instruction 'state'}}`);
  assert.equal(this.$().text(), 'S1');

  this.render(hbs`{{extract instruction 'trigger'}}`);
  assert.equal(this.$().text(), '0');

  this.render(hbs`{{extract instruction 'value'}}`);
  assert.equal(this.$().text(), ')');

  this.render(hbs`{{extract instruction 'move'}}`);
  assert.equal(this.$().text(), 'R');

  this.render(hbs`{{extract instruction 'newState'}}`);
  assert.equal(this.$().text(), 'S2');

});
