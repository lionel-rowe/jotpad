import Component from '@ember/component';
import { computed } from '@ember/object';
import formatMarkdown from '../utils/formatMarkdown';

export default Component.extend({

  html: computed('input', 'live', function() {
    // this.set('formatted', formatMarkdown(this.get('content')));

    return formatMarkdown(this.get('input'), this.get('live'));
  }),
});
