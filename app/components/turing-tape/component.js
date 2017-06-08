import Ember from 'ember';
const { computed } = Ember;

const CELL_WIDTH = 78.668;
const RIGHT = -1;
const LEFT = 1;

export default Ember.Component.extend({
  classNames: ['tape-container'],
  tapePosition: null,
  previousTapePosition: null,
  firstRender: true,
  state: null,
  
  didRender() {
    this._super(...arguments);
    if (this.get('firstRender')) {
      this.set('firstRender', false);
      this.set('initialPosition', this.get('tapePosition'));
      this.translateTape();
    }
  },

  activeCell: computed('tapePosition', function() {
    if (!this.get('initialPosition')) {
      return this.get('tapePosition');
    }
    let displacement = this.get('initialPosition') - this.get('tapePosition');
    return this.get('initialPosition') + displacement;
  }),

  translateTape() {
    let tape = this.$('.tape')[0];
    let holder = this.$('.cell-holder')[0];
    let state = this.$('.state-holder')[0];

    let tapeRect = tape.getBoundingClientRect();
    let containerRect = this.$()[0].getBoundingClientRect();
    let activeRect = this.$('.active')[0].getBoundingClientRect();

    let translateAmount = tapeRect.left + tapeRect.width / 2 - containerRect.width / 2 + 50;
    this.set('currentTranslate', translateAmount);

    Ember.$(tape).css('transform', `translateX(-${translateAmount}px)`);
    Ember.$(holder).css('left', (activeRect.left - 15) - translateAmount);
    Ember.$(holder).css('top', activeRect.top - 15);

    Ember.$(state).css('left', (activeRect.left - 15) - translateAmount);
    Ember.$(state).css('top', activeRect.top + 65);
  },

  tapeTranslate: computed('tapePosition', function() {
    let moveRight = this.get('tapePosition') > this.get('previousTapePosition');
    return moveRight ? this.translate(RIGHT) : this.translate(LEFT);
  }),

  translate(rightOrLeftFactor) {
    this.set('previousTapePosition', this.get('tapePosition'));
    let newTranslate = this.get('currentTranslate') + CELL_WIDTH * rightOrLeftFactor;
    this.set('currentTranslate', newTranslate);
    return Ember.String.htmlSafe(`transform: translateX(-${this.get('currentTranslate')}px)`);
  }

});
