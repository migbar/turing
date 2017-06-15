import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
let tapePosition, cells;
let CELL_COUNT = 100;
moduleForComponent('tm-tape', 'Integration | Component | turing machine tape', {
  integration: true,

  beforeEach() {
    cells = [];
    for (var i = 0; i < CELL_COUNT; i++) {
      cells.pushObject(Ember.Object.create({ value: 0 }));
    }
    tapePosition = 7;
    cells[tapePosition].set('value', 1);
    this.set('cells', cells);
    this.set('tapePosition', tapePosition);
    this.set('currentState', 'S1');
  }
});

test('it renders one tape', function(assert) {

  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.equal(this.$('.tape').length, 1, 'it renders one tape');
});

test('it renders all the cells', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.equal(this.$('.cell').length, CELL_COUNT, 'it renders all the cells');
});

test('it renders the active cell', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.ok(this.$(`.cell:nth-of-type(${tapePosition+1})`).hasClass('active'), 'it renders the active cell');
});

test('there is only one active cell', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.equal(this.$(`.cell.active`).length, 1, 'there is only one active cell');
});

test('active cell displays correct value', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.equal(this.$(`.cell.active`).text().trim(), '1', 'active cell displays correct value');
});

test('it renders the cell holder', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  assert.equal(this.$(`.cell-holder`).length, '1', 'renders one cell holder');
});

test('it renders the cell value for each index', function(assert) {
  this.render(hbs`{{tm-tape cells=cells tapePosition=tapePosition state=currentState}}`);
  for (var i = 0; i < CELL_COUNT; i++) {
    assert.equal(this.$(`.cell:nth-of-type(${i+1})`).text().trim(), cells[i].get('value'), `it renders the cell value for index ${i}`);
  }
});
