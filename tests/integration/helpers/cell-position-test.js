
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cell-position', 'helper:cell-position', {
  integration: true
});

test('it renders', function(assert) {
  this.set('index', '1234');

  this.render(hbs`{{cell-position index}}`);

  assert.equal(this.$().text().trim(), 'cell-1234');
});
