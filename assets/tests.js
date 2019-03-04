'use strict';

define("jotpad/tests/helpers/ember-simple-auth", ["exports", "ember-simple-auth/authenticators/test"], function (_exports, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.authenticateSession = authenticateSession;
  _exports.currentSession = currentSession;
  _exports.invalidateSession = invalidateSession;
  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    const authenticator = container.lookup(TEST_CONTAINER_KEY);

    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    const {
      __container__: container
    } = app;
    const session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    const session = app.__container__.lookup('service:session');

    if (session.get('isAuthenticated')) {
      session.invalidate();
    }

    return app.testHelpers.wait();
  }
});
define("jotpad/tests/integration/helpers/notes-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | notes', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "o/7D3Btz",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"notes\",[[23,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("jotpad/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/user.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('authenticators/oauth2.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/notes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/notes.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/DEPRECATED_formatMarkdown.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/DEPRECATED_formatMarkdown.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/formatDate.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/formatDate.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/safeCssBg.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/safeCssBg.js should pass ESLint\n\n');
  });
  QUnit.test('models/note.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/note.js should pass ESLint\n\n3:10 - \'htmlSafe\' is defined but never used. (no-unused-vars)\n7:18 - Use import { debounce } from \'@ember/runloop\'; instead of using Ember.run.debounce (ember/new-module-imports)\n7:18 - \'Ember\' is not defined. (no-undef)');
  });
  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });
  QUnit.test('routes/note.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/note.js should pass ESLint\n\n');
  });
  QUnit.test('routes/notes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/notes.js should pass ESLint\n\n');
  });
  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
  QUnit.test('services/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-user.js should pass ESLint\n\n');
  });
  QUnit.test('utils/formatMarkdown.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/formatMarkdown.js should pass ESLint\n\n');
  });
  QUnit.test('utils/safeURI.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/safeURI.js should pass ESLint\n\n');
  });
});
define("jotpad/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('jotpad/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'jotpad/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('jotpad/templates/head.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'jotpad/templates/head.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('jotpad/templates/login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'jotpad/templates/login.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('jotpad/templates/note.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'jotpad/templates/note.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('jotpad/templates/notes.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'jotpad/templates/notes.hbs should pass TemplateLint.\n\n');
  });
});
define("jotpad/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('integration/helpers/notes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/notes-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/notes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/notes-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/note-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/note-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/notes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/notes-test.js should pass ESLint\n\n');
  });
});
define("jotpad/tests/test-helper", ["jotpad/app", "jotpad/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("jotpad/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("jotpad/tests/unit/controllers/notes-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | notes', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:notes');
      assert.ok(controller);
    });
  });
});
define("jotpad/tests/unit/models/note-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | note', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('note', {});
      assert.ok(model);
    });
  });
});
define("jotpad/tests/unit/routes/notes-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | notes', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:notes');
      assert.ok(route);
    });
  });
});
define('jotpad/config/environment', [], function() {
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

require('jotpad/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
