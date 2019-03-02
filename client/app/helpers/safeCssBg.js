import { helper } from '@ember/component/helper';
import safeURI from './safeURI';

const safeCssBg = uri => {
  const uriSafe = safeURI(uri)

  return Ember.String.htmlSafe(
    `background-image: url(${
      uriSafe
    })`
  );
}

export default helper(safeCssBg);
