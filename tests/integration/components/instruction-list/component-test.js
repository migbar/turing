import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
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

moduleForComponent('instruction-list', 'Integration | Component | instruction list', {
  integration: true
});

test('it renders the headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(this.$('th').length, 5, 'Renders 5 headers');
});

test('it renders the condition headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(this.$('th.condition').length, 2, 'Renders 2 condition headers');
});

test('it renders the condition cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(this.$('td.condition').length, 2*SAMPLE_INSTRUCTIONS.length, 'Renders condition cells');
});

test('it renders the right text for condition headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(this.$('th.condition:nth-of-type(1)').text().trim(), 'Match State', 'Renders match state header');
  assert.equal(this.$('th.condition:nth-of-type(2)').text().trim(), 'Match Value', 'Renders match value header');
});

test('it renders the right text for regular headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(Ember.$(this.$('th:not(".condition")')[0]).text().trim(), 'New Value', 'Renders New Value header');
  assert.equal(Ember.$(this.$('th:not(".condition")')[1]).text().trim(), 'Tape Move', 'Renders Tape Move header');
  assert.equal(Ember.$(this.$('th:not(".condition")')[2]).text().trim(), 'New State', 'Renders New State header');
});

test('it renders the right text for condition cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(Ember.$(this.$('td.condition:nth-of-type(1)')[0]).text().trim(), SAMPLE_INSTRUCTIONS[0].state, 'Renders match state cell text');
  assert.equal(Ember.$(this.$('td.condition:nth-of-type(2)')[0]).text().trim(), SAMPLE_INSTRUCTIONS[0].trigger, 'Renders match trigge text');
});

test('it renders the right text for regular cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{instruction-list instructions=instructions}}`);

  assert.equal(Ember.$(this.$('td:not(".condition")')[0]).text().trim(), SAMPLE_INSTRUCTIONS[0].value, 'Renders New Value cell text');
  assert.equal(Ember.$(this.$('td:not(".condition")')[1]).text().trim(), SAMPLE_INSTRUCTIONS[0].move, 'Renders Tape Move cell text');
  assert.equal(Ember.$(this.$('td:not(".condition")')[2]).text().trim(), SAMPLE_INSTRUCTIONS[0].newState, 'Renders New State cell text');
});
