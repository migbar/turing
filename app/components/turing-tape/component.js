import Ember from 'ember';
const { computed } = Ember;

const CELL_WIDTH = 79.45;
const RIGHT = -1;
const LEFT = 1;

export default Ember.Component.extend({
  classNames: ['tape-container'],
  firstRender: true,

  tapePosition: null,
  previousTapePosition: null,

  activeCell: computed.alias('tapePosition'),

  didRender() {
    this._super(...arguments);
    if (this.get('firstRender')) {
      this.set('firstRender', false);
      this.set('initialPosition', this.get('tapePosition'));
      this.intialScrollTape();
    }
  },

  intialScrollTape() {
    let tape = this.$('.tape')[0];
    let holder = this.$('.cell-holder')[0];
    let state = this.$('.state-holder')[0];

    let tapeRect = tape.getBoundingClientRect();
    let componentRect = this.$()[0].getBoundingClientRect();
    let activeRect = this.$('.active')[0].getBoundingClientRect();

    let translateXAmount = tapeRect.left + tapeRect.width / 2 - componentRect.width / 2 + 50;
    let translateYAmount = tapeRect.top;

    this.set('currentTranslate', translateXAmount);

    Ember.$(tape).css('transform', `translateX(-${translateXAmount}px)`);
    Ember.$(holder).css('left', activeRect.left - translateXAmount - 6);
    Ember.$(holder).css('top', activeRect.top - translateYAmount - 7);
    Ember.$(state).css('left', activeRect.left - translateXAmount - 6);
    Ember.$(state).css('top', activeRect.top - translateYAmount + 70);
  },

  tapeMovement: computed('tapePosition', function() {
    let moveLeft = this.get('tapePosition') > this.get('previousTapePosition');
    this.set('previousTapePosition', this.get('tapePosition'));

    return moveLeft ? this._move(LEFT) : this._move(RIGHT);
  }),

  _move(direction) {
    let movement = CELL_WIDTH * direction;
    this.set('currentTranslate', this.get('currentTranslate') + movement);
    return Ember.String.htmlSafe(`transform: translateX(-${this.get('currentTranslate')}px)`);
  }

});
