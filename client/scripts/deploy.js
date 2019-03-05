const ghpages = require('gh-pages');

const opts = {
  branch: 'gh-pages',
  repo: 'https://github.com/lionel-rowe/jotpad'
};

const callback = () => {
  // console.log('Published')
  console.log(`Published to \`${opts.branch}\` branch at \`${opts.repo}\`.`);
}

ghpages.publish('dist', opts, callback);
