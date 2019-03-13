import Component from '@ember/component';
import formatDate from '../utils/formatDate';

export default Component.extend({
  _timeout: -1,
  _prevTime: null,

  _getTimeToNext: function() {
    return 60000 - ((new Date().valueOf() - this.get('time').valueOf()) % 60000);
  },

  _setNextTimeout: function() {
    const timeToNext = this._getTimeToNext();

    this._timeout = setTimeout(() => {
      this.set('formattedTime', formatDate(this.get('time')));
      this._setNextTimeout();
    }, timeToNext);
  },

  formattedTime: '',

  didReceiveAttrs: function() {
    this.set('formattedTime', formatDate(this.get('time')));
    const prevTime = this.get('_prevTime');
    const newTime = this.get('time');

    if (prevTime !== newTime) {
      this.set('_prevTime', newTime);

      clearTimeout(this._timeout);
      this._setNextTimeout();
    }
  },

  willDestroyElement: function() {
    clearTimeout(this._timeout);
  }

});
