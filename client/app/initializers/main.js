// import { VERSION } from '@ember/version';
import { registerDeprecationHandler } from '@ember/debug';

// const semVer = verString => {
//   const [ major, minor, patch ] = verString.split('.').map(s => +s);
//   return { major, minor, patch };
// }

export function initialize() {
  registerDeprecationHandler((message, options, next) => {
    // https://github.com/ember-a11y/ember-a11y/issues/73
    if (options && [ 'deprecate-router-events', 'remove-handler-infos' ].includes(options.id)) {
      return;
    }

    next(message, options);
  });
}

export default { initialize };
