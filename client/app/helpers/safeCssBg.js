import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import safeURI from './safeURI';

const safeCssBg = uri => {
  const uriSafe = safeURI(uri)

  return htmlSafe(
    `background-image: url(${
      uriSafe
    })`
  );
}

export default helper(safeCssBg);
