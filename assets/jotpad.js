'use strict';



;define("jotpad/adapters/application", ["exports", "ember-data", "jotpad/config/environment", "ember-simple-auth/mixins/data-adapter-mixin"], function (_exports, _emberData, _environment, _dataAdapterMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const options = {
    session: Ember.inject.service(),
    namespace: 'api/v1',

    authorize(xhr) {
      let {
        access_token
      } = this.get('session.data.authenticated');

      if (Ember.isPresent(access_token)) {
        xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
      }
    }

  };

  if (_environment.default.API_HOST) {
    options.host = _environment.default.API_HOST;
  }

  var _default = _emberData.default.JSONAPIAdapter.extend(_dataAdapterMixin.default, options);

  _exports.default = _default;
});
;define("jotpad/adapters/user", ["exports", "jotpad/adapters/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _application.default.extend({
    urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;
        return `${this._super(...arguments)}/me`;
      }

      return this._super(...arguments);
    }

  });

  _exports.default = _default;
});
;define("jotpad/app", ["exports", "jotpad/resolver", "ember-load-initializers", "jotpad/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("jotpad/authenticators/oauth2", ["exports", "jotpad/config/environment", "ember-simple-auth/authenticators/oauth2-password-grant"], function (_exports, _environment, _oauth2PasswordGrant) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
  // export default OAuth2PasswordGrant.extend();
  const serverTokenPath = '/oauth/token';
  const serverTokenEndpoint = _environment.default.API_HOST ? _environment.default.API_HOST + serverTokenPath : serverTokenPath;

  var _default = _oauth2PasswordGrant.default.extend({
    serverTokenEndpoint
  });

  _exports.default = _default;
});
;define("jotpad/components/click-outside", ["exports", "ember-click-outside/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
;define("jotpad/components/fa-icon", ["exports", "@fortawesome/ember-fontawesome/components/fa-icon"], function (_exports, _faIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _faIcon.default;
    }
  });
});
;define("jotpad/components/head-content", ["exports", "jotpad/templates/head"], function (_exports, _head) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    model: Ember.inject.service('head-data'),
    layout: _head.default
  });

  _exports.default = _default;
});
;define("jotpad/components/head-layout", ["exports", "ember-cli-head/components/head-layout"], function (_exports, _headLayout) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _headLayout.default;
    }
  });
});
;define("jotpad/controllers/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    session: Ember.inject.service(),
    // …
    actions: {
      invalidateSession() {
        this.get('session').invalidate();
      }

    }
  });

  _exports.default = _default;
});
;define("jotpad/controllers/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({});

  _exports.default = _default;
});
;define("jotpad/controllers/notes", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({});

  _exports.default = _default;
});
;define("jotpad/helpers/DEPRECATED_formatMarkdown", ["exports", "marked", "insane", "highlightjs", "jotpad/helpers/safeURI"], function (_exports, _marked, _insane, hljs, _safeURI) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // import { debounce } from '@ember/runloop';
  const liveRenderer = new _marked.default.Renderer();
  const deadRenderer = new _marked.default.Renderer();
  const insaneOptions = {
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'title', 'tabindex'],
      img: ['src', 'alt', 'title'],
      input: ['type', 'checked', 'disabled'],
      code: ['class'],
      span: ['class'],
      th: ['align'],
      tr: ['align']
    },
    allowedClasses: {
      ul: ['checklist'],
      a: ['unstyled-link']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedTags: ['a', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'li', 'main', 'ol', 'p', 'pre', 'section', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul'],
    filter: node => {
      [['code', 'language-'], ['span', 'hljs-']].forEach(([tag, prefix]) => {
        if (node.tag === tag && typeof node.attrs.class === 'string' && (/\s/.test(node.attrs.class) || !node.attrs.class.startsWith(prefix))) {
          delete node.attrs.class;
        }
      });
      return true;
    },
    transformText: null
  };

  for (let i = 1; i <= 6; i++) {
    insaneOptions.allowedClasses[`h${i}`] = ['heading'];
    insaneOptions.allowedAttributes[`h${i}`] = ['id'];
  }

  const sanitize = html => (0, _insane.default)(html, insaneOptions);

  const checkbox = checked => {
    // TODO: enable (must be reliable against dupes)
    return `<label><input type="checkbox" ${checked ? 'checked ' : ''}disabled> `;
  };

  const listitem = text => {
    const closer = text.trim().startsWith('<label>') ? '</label>' : '';
    return `<li>${text}${closer}</li>\n`;
  };

  const list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul';
    const startAt = ordered && start !== 1 ? ` start="${start}"` : '';
    const isChecklist = body.trim().split(/[\r\n]+/).every(line => {
      return line.trim().startsWith('<li><label><input type="checkbox"');
    });
    const checklistClass = !ordered && isChecklist ? ' class="checklist"' : '';
    return `<${type}${checklistClass}${startAt}>\n${body}</${type}>\n`;
  };

  [liveRenderer, deadRenderer].forEach(renderer => {
    renderer.checkbox = checkbox;
    renderer.listitem = listitem;
    renderer.list = list;
  });

  liveRenderer.link = (href, title, text) => {
    try {
      href = (0, _safeURI.default)(href);
    } catch (e) {
      return text;
    }

    return `<a target="_blank" rel="nofollow noreferrer" href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
  };

  liveRenderer.heading = (text, level, raw, slugger) => {
    const id = liveRenderer.options.headerPrefix + slugger.slug(raw);
    return `<h${level} class="heading" id="${id}"><a class="unstyled-link" href="#${id}">${text}</a></h${level}>\n`;
  };

  deadRenderer.link = (href, title, text) => {
    try {
      href = (0, _safeURI.default)(href);
    } catch (e) {
      return text;
    }

    return `<a tabindex="-1" href="${href}">${text}</a>`;
  };

  deadRenderer.heading = (text, level, _raw, _slugger) => {
    return `<h${level} class="heading">${text}</h${level}>\n`;
  };

  _marked.default.setOptions({
    highlight: function (code, lang) {
      if (['plaintext', 'plain', 'txt'].includes(lang.trim().toLowerCase())) {
        return code;
      } else {
        try {
          return hljs.highlight(lang, code).value;
        } catch (e) {
          // hljs throws error on unrecognized or empty `lang` param
          return hljs.highlightAuto(code).value;
        }
      }
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    // covered by insane-powered `sanitize` function
    smartLists: true,
    smartypants: true,
    xhtml: false
  });

  const formatMarkdown = ([markdown, isLive = true]) => {
    markdown = markdown.replace(/\[\[(.+?)\]\]/g, '<kbd>$1</kbd>');

    _marked.default.setOptions({
      renderer: isLive ? liveRenderer : deadRenderer
    });

    return Ember.String.htmlSafe(sanitize((0, _marked.default)(markdown)));
  };

  var _default = Ember.Helper.helper(formatMarkdown);

  _exports.default = _default;
});
;define("jotpad/helpers/app-version", ["exports", "jotpad/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("jotpad/helpers/formatDate", ["exports", "moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const formatDate = ([date]) => {
    date = new Date(date);
    return Ember.String.htmlSafe(`<time datetime="${date.toISOString()}" title="${(0, _moment.default)(date).format('MMMM Do YYYY, h:mm:ss a')}">${(0, _moment.default)(date).fromNow()}</time>`);
  };

  var _default = Ember.Helper.helper(formatDate);

  _exports.default = _default;
});
;define("jotpad/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("jotpad/helpers/safeCssBg", ["exports", "jotpad/utils/safeURI"], function (_exports, _safeURI) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const safeCssBg = uri => {
    const uriSafe = (0, _safeURI.default)(uri);
    return Ember.String.htmlSafe(`background-image: url(${uriSafe})`);
  };

  var _default = Ember.Helper.helper(safeCssBg);

  _exports.default = _default;
});
;define("jotpad/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("jotpad/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "jotpad/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("jotpad/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("jotpad/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("jotpad/initializers/ember-simple-auth", ["exports", "jotpad/config/environment", "ember-simple-auth/configuration", "ember-simple-auth/initializers/setup-session", "ember-simple-auth/initializers/setup-session-service", "ember-simple-auth/initializers/setup-session-restoration"], function (_exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;

      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }

  };
  _exports.default = _default;
});
;define("jotpad/initializers/export-application-global", ["exports", "jotpad/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("jotpad/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("jotpad/instance-initializers/ember-simple-auth", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // This is only needed for backwards compatibility and will be removed in the
  // next major release of ember-simple-auth. Unfortunately, there is no way to
  // deprecate this without hooking into Ember's internals…
  var _default = {
    name: 'ember-simple-auth',

    initialize() {}

  };
  _exports.default = _default;
});
;define("jotpad/instance-initializers/head-browser", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'head-browser',

    initialize() {// do nothing!
      // this functionality has been moved into addon/components/head-layout.js
      // This is only here in order to not break existing addons relying on this, e.g. ember-page-title.
    }

  };
  _exports.default = _default;
});
;define("jotpad/mixins/click-outside", ["exports", "ember-click-outside/mixin"], function (_exports, _mixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mixin.default;
    }
  });
});
;define("jotpad/models/note", ["exports", "ember-data", "jotpad/utils/formatMarkdown"], function (_exports, _emberData, _formatMarkdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // import { throttle } from '@ember/runloop';
  const debounce = Ember.run.debounce;

  var _default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    content: _emberData.default.attr('string'),
    created_at: _emberData.default.attr('date'),
    updated_at: _emberData.default.attr('date'),
    formatted: Ember.computed('content', function () {
      (0, _formatMarkdown.default)(this.get('content'));
    }),
    _markUp: function () {
      this.set('formatted', (0, _formatMarkdown.default)(this.get('content')));
    },
    _formattedUpdater: Ember.computed('content', function () {
      debounce(this, this._markUp, 1, false); // DS.PromiseObject.create({
      //   promise: new Ember.RSVP.Promise((resolve, reject) => {
      //     debounce(this, this._markUp, 3000, false);
      //     setTimeout(() => resolve(), 1000);
      //   }).then(res => {
      //     // console.log(this, res)
      //     this.set('formatted', res)
      //   })
      // })
    }),
    reload: function () {
      this.notifyPropertyChange('updated_at');

      this._super();
    }
  });

  _exports.default = _default;
});
;define("jotpad/models/user", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string'),
    gravatar: _emberData.default.attr('string'),
    password: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("jotpad/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("jotpad/router", ["exports", "jotpad/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('login'); // this.route('authenticated', { path: '' }, () => {

    this.route('notes', {
      path: '/'
    }, () => {
      this.route('new', {
        path: '/notes/new'
      });
      this.route('note', {
        path: '/notes/:id'
      });
    }); // });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("jotpad/routes/application", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin", "ember-simple-auth/mixins/application-route-mixin"], function (_exports, _authenticatedRouteMixin, _applicationRouteMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    service
  } = Ember.inject;

  var _default = Ember.Route.extend(_applicationRouteMixin.default, _authenticatedRouteMixin.default, {
    currentUser: service(),

    beforeModel(...args) {
      if (this.get('session').isAuthenticated) {
        return this._loadCurrentUser().then(() => {
          this.controllerFor('application').set('currentUser', this.get('currentUser'));
        });
      }

      this._super(...args);
    },

    _loadCurrentUser() {
      return this.get('currentUser').load().catch(() => this.get('session').invalidate());
    }

  });

  _exports.default = _default;
});
;define("jotpad/routes/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    model() {
      return this.get('store').createRecord('user');
    },

    actions: {
      authenticate() {
        const [email, password] = ['email', 'password'].map(id => {
          return document.querySelector(`#${id}`).value;
        });
        this.get('session').authenticate('authenticator:oauth2', email, password).catch(reason => {
          // first param actually sent by `authenticator:oauth2` as `username`
          this.set('errorMessage', reason.error || reason);
        }).then(() => {
          this.get('currentUser').load().then(() => {
            this.controllerFor('application').set('currentUser', this.get('currentUser'));
          });
          this.transitionTo('/'); // TODO: should preserve previously-navigated path
        });
      }

    }
  });

  _exports.default = _default;
});
;define("jotpad/routes/note", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model(params) {
      return this.get('store').findRecord('note', params.id);
    },

    activate(...args) {
      this._super(...args);

      this.interval = setInterval(() => {
        this.actions.pushOrPull.call(this);
      }, 10000);
    },

    willTransition(...args) {
      this.pushOrPull();

      this._super(...args);
    },

    deactivate(...args) {
      clearInterval(this.interval);

      this._super(...args);
    },

    actions: {
      updateContent(newContent) {
        const note = this.get('context');
        note.set('content', newContent);
        this.set('model', note);
      },

      updateTitle(newTitle) {
        const note = this.get('context');
        note.set('title', newTitle);
        this.set('model', note);
      },

      pushOrPull() {
        const note = this.get('context');

        if (note.hasDirtyAttributes) {
          return note.save().then(_res => {// console.log(res);
          }, _err => {// console.log(err);
          });
        } else {
          return note.reload();
        }
      }

    }
  });

  _exports.default = _default;
});
;define("jotpad/routes/notes", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return this.get('store').findAll('note');
    }

  });

  _exports.default = _default;
});
;define("jotpad/serializers/application", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.JSONAPISerializer.extend({
    keyForAttribute: k => k
  });

  _exports.default = _default;
});
;define("jotpad/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("jotpad/services/cookies", ["exports", "ember-cookies/services/cookies"], function (_exports, _cookies) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _cookies.default;
  _exports.default = _default;
});
;define("jotpad/services/current-user", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    session: Ember.inject.service('session'),
    store: Ember.inject.service(),

    load() {
      if (this.get('session.isAuthenticated')) {
        return this.get('store').queryRecord('user', {
          me: true
        }).then(user => {
          this.set('user', user);
        });
      } else {
        return Ember.RSVP.resolve();
      }
    }

  });

  _exports.default = _default;
});
;define("jotpad/services/head-data", ["exports", "ember-cli-head/services/head-data"], function (_exports, _headData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _headData.default;
    }
  });
});
;define("jotpad/services/session", ["exports", "ember-simple-auth/services/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _session.default;
  _exports.default = _default;
});
;define("jotpad/session-stores/application", ["exports", "ember-simple-auth/session-stores/adaptive"], function (_exports, _adaptive) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _adaptive.default.extend();

  _exports.default = _default;
});
;define("jotpad/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "lq/bpsuw",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"head-layout\"],false],[0,\"\\n\\n\"],[7,\"nav\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"notes\"],[[\"class\"],[\"unstyled-link\"]],{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"title\"],[9],[0,\"\\n      jotpad\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"    \"],[7,\"button\"],[11,\"class\",\"unstyled-btn\"],[11,\"aria-label\",\"Menu\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"avatar navbar-btn\"],[12,\"style\",[27,\"safeCssBg\",[[23,[\"currentUser\",\"user\",\"gravatar\"]]],null]],[9],[10],[0,\"\\n    \"],[3,\"action\",[[22,0,[]],\"invalidateSession\"]],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"menu\",\"open\"]]],null,{\"statements\":[[4,\"click-outside\",null,[[\"action\"],[[27,\"action\",[[22,0,[]],\"closeMenu\"],null]]],{\"statements\":[[0,\"        Your HTML...\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"spacer\"],[9],[10],[0,\"\\n\\n\"],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "jotpad/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("jotpad/templates/head", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "xJIULImV",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "jotpad/templates/head.hbs"
    }
  });

  _exports.default = _default;
});
;define("jotpad/templates/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qnUvBhsI",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"form\"],[9],[0,\"\\n  \"],[7,\"label\"],[11,\"for\",\"email\"],[9],[0,\"Email\"],[10],[0,\"\\n  \"],[1,[27,\"input\",null,[[\"id\",\"placeholder\",\"value\"],[\"email\",\"Enter Email\",[23,[\"model\",\"email\"]]]]],false],[0,\"\\n  \"],[7,\"label\"],[11,\"for\",\"password\"],[9],[0,\"Password\"],[10],[0,\"\\n  \"],[1,[27,\"input\",null,[[\"id\",\"placeholder\",\"type\",\"value\"],[\"password\",\"Enter Password\",\"password\",[23,[\"model\",\"password\"]]]]],false],[0,\"\\n  \"],[7,\"button\"],[11,\"type\",\"submit\"],[9],[0,\"Login\"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"errorMessage\"]]],null,{\"statements\":[[0,\"    \"],[7,\"p\"],[9],[1,[21,\"errorMessage\"],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[3,\"action\",[[22,0,[]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "jotpad/templates/login.hbs"
    }
  });

  _exports.default = _default;
});
;define("jotpad/templates/note", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "iEe5j543",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"editor-ui\"],[9],[0,\"\\n  \"],[7,\"header\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"details\"],[9],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"change\"],[[23,[\"model\",\"title\"]],\"updatetitle\"]]],false],[0,\"\\n      \"],[7,\"div\"],[9],[0,\"\\n        Updated \"],[1,[27,\"formatDate\",[[23,[\"model\",\"updated_at\"]]],null],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"panes\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"pane\"],[9],[0,\"\\n      \"],[1,[27,\"textarea\",null,[[\"value\",\"change\"],[[23,[\"model\",\"content\"]],\"updateContent\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"rendered pane\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"markdown-body\"],[9],[0,\"\\n        \"],[1,[23,[\"model\",\"_formattedUpdater\"]],false],[0,\"\\n        \"],[1,[23,[\"model\",\"formatted\"]],false],[0,\"\\n\"],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"footer\"],[9],[0,\"\\n\\n  \"],[10],[0,\"\\n\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "jotpad/templates/note.hbs"
    }
  });

  _exports.default = _default;
});
;define("jotpad/templates/notes", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "HiL+d3MR",
    "block": "{\"symbols\":[\"note\"],\"statements\":[[0,\"\\n\"],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n\\n  \"],[7,\"h1\"],[9],[0,\"My Notes\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"paper-container\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"note\",[22,1,[]]],[[\"class\"],[\"unstyled-link\"]],{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"paper\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"details\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"title\"],[9],[0,\"\\n              \"],[1,[22,1,[\"title\"]],false],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[9],[0,\"\\n              Updated \"],[1,[27,\"formatDate\",[[22,1,[\"updated_at\"]]],null],false],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"paper-body markdown-body noclicks\"],[9],[0,\"\\n            \"],[1,[22,1,[\"_formattedUpdater\"]],false],[0,\"\\n            \"],[1,[22,1,[\"formatted\"]],false],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "jotpad/templates/notes.hbs"
    }
  });

  _exports.default = _default;
});
;define("jotpad/utils/formatMarkdown", ["exports", "marked", "insane", "highlightjs", "jotpad/utils/safeURI"], function (_exports, _marked, _insane, hljs, _safeURI) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const liveRenderer = new _marked.default.Renderer();
  const deadRenderer = new _marked.default.Renderer();
  const insaneOptions = {
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'title', 'tabindex'],
      img: ['src', 'alt', 'title'],
      input: ['type', 'checked', 'disabled'],
      code: ['class'],
      span: ['class'],
      th: ['align'],
      tr: ['align']
    },
    allowedClasses: {
      ul: ['checklist'],
      a: ['unstyled-link']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedTags: ['a', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'li', 'main', 'ol', 'p', 'pre', 'section', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul'],
    filter: node => {
      [['code', 'language-'], ['span', 'hljs-']].forEach(([tag, prefix]) => {
        if (node.tag === tag && typeof node.attrs.class === 'string' && (/\s/.test(node.attrs.class) || !node.attrs.class.startsWith(prefix))) {
          delete node.attrs.class;
        }
      });
      return true;
    },
    transformText: null
  };

  for (let i = 1; i <= 6; i++) {
    insaneOptions.allowedClasses[`h${i}`] = ['heading'];
    insaneOptions.allowedAttributes[`h${i}`] = ['id'];
  }

  const sanitize = html => (0, _insane.default)(html, insaneOptions);

  const checkbox = checked => {
    // TODO: enable (must be reliable against dupes)
    return `<label><input type="checkbox" ${checked ? 'checked ' : ''}disabled> `;
  };

  const listitem = text => {
    const closer = text.trim().startsWith('<label>') ? '</label>' : '';
    return `<li>${text}${closer}</li>\n`;
  };

  const list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul';
    const startAt = ordered && start !== 1 ? ` start="${start}"` : '';
    const isChecklist = body.trim().split(/[\r\n]+/).every(line => {
      return line.trim().startsWith('<li><label><input type="checkbox"');
    });
    const checklistClass = !ordered && isChecklist ? ' class="checklist"' : '';
    return `<${type}${checklistClass}${startAt}>\n${body}</${type}>\n`;
  };

  [liveRenderer, deadRenderer].forEach(renderer => {
    renderer.checkbox = checkbox;
    renderer.listitem = listitem;
    renderer.list = list;
  });

  liveRenderer.link = (href, title, text) => {
    try {
      href = (0, _safeURI.default)(href);
    } catch (e) {
      return text;
    }

    return `<a target="_blank" rel="nofollow noreferrer" href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
  };

  liveRenderer.heading = (text, level, raw, slugger) => {
    const id = liveRenderer.options.headerPrefix + slugger.slug(raw);
    return `<h${level} class="heading" id="${id}"><a class="unstyled-link" href="#${id}">${text}</a></h${level}>\n`;
  };

  deadRenderer.link = (href, title, text) => {
    try {
      href = (0, _safeURI.default)(href);
    } catch (e) {
      return text;
    }

    return `<a tabindex="-1" href="${href}">${text}</a>`;
  };

  deadRenderer.heading = (text, level, _raw, _slugger) => {
    return `<h${level} class="heading">${text}</h${level}>\n`;
  };

  _marked.default.setOptions({
    highlight: function (code, lang) {
      if (['plaintext', 'plain', 'txt'].includes(lang.trim().toLowerCase())) {
        return code;
      } else {
        try {
          return hljs.highlight(lang, code).value;
        } catch (e) {
          // hljs throws error on unrecognized or empty `lang` param
          return hljs.highlightAuto(code).value;
        }
      }
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    // covered by insane-powered `sanitize` function
    smartLists: true,
    smartypants: true,
    xhtml: false
  });

  const formatMarkdown = (markdown, isLive = true) => {
    markdown = markdown.replace(/\[\[(.+?)\]\]/g, '<kbd>$1</kbd>');

    _marked.default.setOptions({
      renderer: isLive ? liveRenderer : deadRenderer
    });

    return Ember.String.htmlSafe(sanitize((0, _marked.default)(markdown)));
  };

  var _default = formatMarkdown;
  _exports.default = _default;
});
;define("jotpad/utils/safeURI", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  // import { helper } from '@ember/component/helper';
  const safeURI = uri => encodeURI(uri).replace(/%25/g, '%');

  var _default = safeURI;
  _exports.default = _default;
});
;

;define('jotpad/config/environment', [], function() {
  var prefix = 'jotpad';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("jotpad/app")["default"].create({"name":"jotpad","version":"0.0.0+8e0dd68a"});
          }
        
//# sourceMappingURL=jotpad.map
