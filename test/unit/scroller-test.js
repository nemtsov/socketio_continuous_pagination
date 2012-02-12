var vows = require('vows')
  , assert = require('assert')
  , Scroller = require('../../lib/scroller');

vows.describe('Scroller').addBatch({
  'Scroller test': {
    topic: new Scroller(),

    'counter must increment': function(s) {
      assert.equal(s.getData().counter, 1);
      assert.equal(s.getData().counter, 2);
    }
  }
})['export'](module);

