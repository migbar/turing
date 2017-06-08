import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
let activeCell, cells;

moduleForComponent('turing-tape', 'Integration | Component | turing tape', {
  integration: true,

  beforeEach() {
    cells = Array(100).fill(0);
    activeCell = 7;
    cells[activeCell] = 1;
    this.set('cells', cells);
    this.set('activeCell', activeCell);
    this.set('state', 'S1');
  }
});

test('it renders one tape', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.equal(this.$('.tape').length, 1, 'it renders one tape');
});

test('it renders all the cells', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.equal(this.$('.cell').length, cells.length, 'it renders all the cells');
});

test('it renders the active cell', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.ok(this.$(`.cell:nth-of-type(${activeCell+1})`).hasClass('active'), 'it renders the active cell');
});

test('there is only one active cell', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.equal(this.$(`.cell.active`).length, 1, 'there is only one active cell');
});

test('active cell displays correct value', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.equal(this.$(`.cell.active`).text().trim(), '1', 'active cell displays correct value');
});

test('it renders the cell holder', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  assert.equal(this.$(`.cell-holder`).length, '1', 'renders one cell holder');
});

test('it renders the cell value for each index', function(assert) {
  this.render(hbs`{{turing-tape cells=cells activeCell=activeCell state=state}}`);
  for (var i = 0; i < cells.length; i++) {
    assert.equal(this.$(`.cell:nth-of-type(${i+1})`).text().trim(), cells[i], `it renders the cell value for index ${i}`);
  }
});
