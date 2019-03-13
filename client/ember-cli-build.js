// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const log = require('broccoli-stew').log;

const Funnel = require('broccoli-funnel');


const BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {

    // treeShaking: {
    //   enabled: true
    // },

    'ember-service-worker': {
      enabled: true
    },
    'esw-cache-fallback': {
      patterns: [
        '/api/v1/(.+)'
      ],
    }
  });

  app.import('node_modules/github-markdown-css/github-markdown.css');

  app.import('vendor/prism/prism.css');

  //fa
  app.import('vendor/fa/all.css');

  const fontawesome = new Funnel('vendor/fa/webfonts', {
      srcDir: '/',
      destDir: '/webfonts'
  });

  const tree = app.toTree()

  const mergedTree = new BroccoliMergeTrees([
    tree,
    fontawesome
  ]);

  const loggedTree = log(mergedTree, { output: 'tree', label: 'tree' });

  return loggedTree;
};
