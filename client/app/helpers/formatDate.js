import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

import moment from 'moment';

const formatDate = ([ date ]) => {
  date = new Date(date);

  return htmlSafe(`<time datetime="${
    date.toISOString()
  }" title="${
    moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }">${
    moment(date).fromNow()
  }</time>`);
}

export default helper(formatDate);
