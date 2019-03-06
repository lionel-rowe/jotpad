import { htmlSafe } from '@ember/template';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatDate = (date) => {
  const _date = new Date(date);

  return htmlSafe(`<time datetime="${
    _date.toISOString()
  }" title="${
    dayjs(_date).format('MMMM Do YYYY, h:mm:ss a')
  }">${
    dayjs(_date).fromNow()
  }</time>`);
}

export default formatDate;
