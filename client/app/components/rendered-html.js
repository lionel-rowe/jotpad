import Component from '@ember/component';
// import { computed } from '@ember/object';
import formatMarkdown from '../utils/formatMarkdown';
import { throttle } from '@ember/runloop';
// import { debounce } from '@ember/runloop';

export default Component.extend({
  _prevInput: '',
  _lastRenderWaitTime: 0,

  html: '',

  setHTML: function() {
    const timeStart = new Date().valueOf();
    this.set('html', formatMarkdown(this.get('input'), this.get('live')));
    const timeEnd = new Date().valueOf();
    this.set('_lastRenderWaitTime', timeEnd - timeStart);
  },

  didReceiveAttrs: function() {
    const prevInput = this.get('_prevInput');
    const newInput = this.get('input');

    if (prevInput !== newInput) {
      this.set('_prevInput', newInput)
      throttle(
        this,
        this.setHTML,
        this._lastRenderWaitTime * 3,
        false
      );


    }

    // this._super();
  },

  // html: computed('input', 'live', function() {
  //   // this.set('formatted', formatMarkdown(this.get('input')));

  //   return ;
  // }),
});
