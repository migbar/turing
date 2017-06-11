import Ember from 'ember';
const { computed } = Ember;

const CELL_WIDTH = 78.673;
const RIGHT = -1;
const LEFT = 1;

export default Ember.Component.extend({
  classNames: ['tape-container'],
  tapePosition: null,
  previousTapePosition: null,
  firstRender: true,
  state: null,

  activeCell: computed.alias('tapePosition'),

  didRender() {
    this._super(...arguments);
    if (this.get('firstRender')) {
      this.set('firstRender', false);
      this.set('initialPosition', this.get('tapePosition'));
      this.scrollTape();
    }
  },

  scrollTape() {
    let tape = this.$('.tape')[0];
    let holder = this.$('.cell-holder')[0];
    let state = this.$('.state-holder')[0];

    let tapeRect = tape.getBoundingClientRect();
    let containerRect = this.$()[0].getBoundingClientRect();
    let activeRect = this.$('.active')[0].getBoundingClientRect();

    let translateXAmount = tapeRect.left + tapeRect.width / 2 - containerRect.width / 2 + 50;
    let translateYAmount = tapeRect.top;

    this.set('currentTranslate', translateXAmount);

    Ember.$(tape).css('transform', `translateX(-${translateXAmount}px)`);
    Ember.$(holder).css('left', activeRect.left - translateXAmount - 6);
    Ember.$(holder).css('top', activeRect.top - translateYAmount - 7);
    Ember.$(state).css('left', activeRect.left - translateXAmount - 6);
    Ember.$(state).css('top', activeRect.top - translateYAmount + 70);
  },

  tapeTranslate: computed('tapePosition', function() {
    let moveLeft = this.get('tapePosition') > this.get('previousTapePosition');
    return moveLeft ? this._translate(LEFT) : this._translate(RIGHT);
  }),

  _translate(direction) {
    let newTranslate = this.get('currentTranslate') + CELL_WIDTH * direction;
    this.set('currentTranslate', newTranslate);
    this.set('previousTapePosition', this.get('tapePosition'));
    return Ember.String.htmlSafe(`transform: translateX(-${this.get('currentTranslate')}px)`);
  }

});
