"use strict"
define("jotpad/adapters/application",["exports","ember-data","jotpad/config/environment","ember-simple-auth/mixins/data-adapter-mixin"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={session:Ember.inject.service(),namespace:"api/v1",authorize:function(e){var t=this.get("session.data.authenticated").access_token
Ember.isPresent(t)&&e.setRequestHeader("Authorization","Bearer ".concat(t))}}
n.default.API_HOST&&(o.host=n.default.API_HOST)
var i=t.default.JSONAPIAdapter.extend(a.default,o)
e.default=i}),define("jotpad/adapters/user",["exports","jotpad/adapters/application"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.extend({urlForQueryRecord:function(e){return e.me?(delete e.me,"".concat(this._super.apply(this,arguments),"/me")):this._super.apply(this,arguments)}})
e.default=n}),define("jotpad/app",["exports","jotpad/resolver","ember-load-initializers","jotpad/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(o,a.default.modulePrefix)
var i=o
e.default=i}),define("jotpad/authenticators/oauth2",["exports","jotpad/config/environment","ember-simple-auth/authenticators/oauth2-password-grant"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.API_HOST?t.default.API_HOST+"/oauth/token":"/oauth/token",o=n.default.extend({serverTokenEndpoint:a})
e.default=o}),define("jotpad/components/click-outside",["exports","ember-click-outside/component"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/components/head-content",["exports","jotpad/templates/head"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({tagName:"",model:Ember.inject.service("head-data"),layout:t.default})
e.default=n}),define("jotpad/components/head-layout",["exports","ember-cli-head/components/head-layout"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/components/icon-button",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({})
e.default=t}),define("jotpad/components/last-updated",["exports","jotpad/utils/formatDate"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({_timeout:-1,_prevTime:null,_getTimeToNext:function(){return 6e4-((new Date).valueOf()-this.get("time").valueOf())%6e4},_setNextTimeout:function(){var e=this,n=this._getTimeToNext()
this._timeout=setTimeout(function(){e.set("formattedTime",(0,t.default)(e.get("time"))),e._setNextTimeout()},n)},formattedTime:"",didReceiveAttrs:function(){this.set("formattedTime",(0,t.default)(this.get("time")))
var e=this.get("_prevTime"),n=this.get("time")
e!==n&&(this.set("_prevTime",n),clearTimeout(this._timeout),this._setNextTimeout())},willDestroyElement:function(){clearTimeout(this._timeout)}})
e.default=n}),define("jotpad/components/rendered-html",["exports","jotpad/utils/formatMarkdown"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({_prevInput:"",_lastRenderWaitTime:0,html:"",setHTML:function(){var e=(new Date).valueOf()
this.set("html",(0,t.default)(this.get("input"),this.get("live")))
var n=(new Date).valueOf()
this.set("_lastRenderWaitTime",n-e)},didReceiveAttrs:function(){var e=this.get("_prevInput"),t=this.get("input")
e!==t&&(this.set("_prevInput",t),Ember.run.throttle(this,this.setHTML,3*this._lastRenderWaitTime,!1))}})
e.default=n}),define("jotpad/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({session:Ember.inject.service(),actions:{invalidateSession:function(){this.get("session").invalidate()}}})
e.default=t}),define("jotpad/controllers/login",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({})
e.default=t}),define("jotpad/controllers/note",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({actions:{delete:function(){var e=this,t=this.model
window.confirm("Are you sure you want to delete your note".concat(t.title?" "+t.title:"","?"))&&(t.deleteRecord(),t.save().then(function(t){e.transitionToRoute("notes")}))}}})
e.default=t}),define("jotpad/controllers/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({actions:{new:function(){var e=this
this.store.createRecord("note",{content:""}).save().then(function(t){e.transitionToRoute("note",t)})}}})
e.default=t}),define("jotpad/helpers/app-version",["exports","jotpad/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.default.APP.version,i=a.versionOnly||a.hideSha,r=a.shaOnly||a.hideVersion,l=null
return i&&(a.showExtended&&(l=o.match(n.versionExtendedRegExp)),l||(l=o.match(n.versionRegExp))),r&&(l=o.match(n.shaRegExp)),l?l[0]:o}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=void 0
var o=Ember.Helper.helper(a)
e.default=o}),define("jotpad/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("jotpad/helpers/safeCssBg",["exports","jotpad/utils/safeURI"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Helper.helper(function(e){var n=(0,t.default)(e)
return Ember.String.htmlSafe("background-image: url(".concat(n,")"))})
e.default=n}),define("jotpad/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("jotpad/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","jotpad/config/environment"],function(e,t,n){var a,o
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n.default.APP&&(a=n.default.APP.name,o=n.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(a,o)}
e.default=i}),define("jotpad/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("jotpad/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("jotpad/initializers/ember-simple-auth",["exports","jotpad/config/environment","ember-simple-auth/configuration","ember-simple-auth/initializers/setup-session","ember-simple-auth/initializers/setup-session-service","ember-simple-auth/initializers/setup-session-restoration"],function(e,t,n,a,o,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-simple-auth",initialize:function(e){var r=t.default["ember-simple-auth"]||{}
r.rootURL=t.default.rootURL||t.default.baseURL,n.default.load(r),(0,a.default)(e),(0,o.default)(e),(0,i.default)(e)}}
e.default=r}),define("jotpad/initializers/export-application-global",["exports","jotpad/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,o=t.default.exportApplicationGlobal
a="string"==typeof o?o:Ember.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var a={name:"export-application-global",initialize:n}
e.default=a}),define("jotpad/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("jotpad/instance-initializers/ember-simple-auth",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ember-simple-auth",initialize:function(){}}}),define("jotpad/instance-initializers/head-browser",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"head-browser",initialize:function(){}}}),define("jotpad/mixins/click-outside",["exports","ember-click-outside/mixin"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/models/note",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model.extend({title:t.default.attr("string"),content:t.default.attr("string"),created_at:t.default.attr("date"),updated_at:t.default.attr("date")})
e.default=n}),define("jotpad/models/user",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model.extend({email:t.default.attr("string"),gravatar:t.default.attr("string"),password:t.default.attr("string")})
e.default=n}),define("jotpad/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n})
define("jotpad/router",["exports","jotpad/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){var e=this
this.route("login"),this.route("notes",{path:"/"},function(){e.route("new",{path:"/notes/new"}),e.route("note",{path:"/notes/:id"})}),this.route("404")})
var a=n
e.default=a}),define("jotpad/routes/404",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("jotpad/routes/application",["exports","ember-simple-auth/mixins/authenticated-route-mixin","ember-simple-auth/mixins/application-route-mixin"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.inject.service,o=Ember.Route.extend(n.default,t.default,{currentUser:a(),beforeModel:function(){var e=this
if(this.get("session").isAuthenticated)return this._loadCurrentUser().then(function(){e.controllerFor("application").set("currentUser",e.get("currentUser"))})
this._super.apply(this,arguments)},_loadCurrentUser:function(){var e=this
return this.get("currentUser").load().catch(function(){return e.get("session").invalidate()})}})
e.default=o}),define("jotpad/routes/login",["exports"],function(e){function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,o=!1,i=void 0
try{for(var r,l=e[Symbol.iterator]();!(a=(r=l.next()).done)&&(n.push(r.value),!t||n.length!==t);a=!0);}catch(s){o=!0,i=s}finally{try{a||null==l.return||l.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend({session:Ember.inject.service(),currentUser:Ember.inject.service(),model:function(){return this.get("store").createRecord("user")},actions:{authenticate:function(){var e=this,n=t(["email","password"].map(function(e){return document.querySelector("#".concat(e)).value}),2),a=n[0],o=n[1]
this.get("session").authenticate("authenticator:oauth2",a,o).catch(function(t){e.set("errorMessage",t.error||t)}).then(function(){e.get("currentUser").load().then(function(){e.controllerFor("application").set("currentUser",e.get("currentUser"))}),e.transitionTo("/")})}}})
e.default=n}),define("jotpad/routes/note",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({_interval:-1,model:function(e){var t=this
return this.store.findRecord("note",e.id).then(function(e){return e}).catch(function(e){"404"===e.errors[0].status&&t.transitionTo("404")})},activate:function(){var e=this
this._super.apply(this,arguments),this._interval=setInterval(function(){e._pushOrPull.call(e)},1e4),window.onbeforeunload=function(){e._pushOrPull.call(e)}},_pushOrPull:function(){var e=this.context
return e.hasDirtyAttributes?e.save().then(function(e){return e},function(e){return e}):!e.isDeleted&&e.reload()},deactivate:function(){clearInterval(this._interval),window.onbeforeunload=null,this._super.apply(this,arguments)},actions:{willTransition:function(e){this._pushOrPull.call(this)},updateContent:function(e){var t=this.context
t.set("content",e),this.set("model",t)},updateTitle:function(e){var t=this.context
t.set("title",e),this.set("model",t)}}})
e.default=t}),define("jotpad/routes/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.store.findAll("note",{reload:!0}).then(function(e){return e.toArray().sort(function(e,t){return t.updated_at-e.updated_at})})}})
e.default=t}),define("jotpad/serializers/application",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.JSONAPISerializer.extend({keyForAttribute:function(e){return e}})
e.default=n}),define("jotpad/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/services/cookies",["exports","ember-cookies/services/cookies"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("jotpad/services/current-user",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Service.extend({session:Ember.inject.service("session"),store:Ember.inject.service(),load:function(){var e=this
return this.get("session.isAuthenticated")?this.get("store").queryRecord("user",{me:!0}).then(function(t){e.set("user",t)}):Ember.RSVP.resolve()}})
e.default=t}),define("jotpad/services/head-data",["exports","ember-cli-head/services/head-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/services/session",["exports","ember-simple-auth/services/session"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("jotpad/session-stores/application",["exports","ember-simple-auth/session-stores/adaptive"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.extend()
e.default=n}),define("jotpad/templates/404",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"SSucf96n",block:'{"symbols":[],"statements":[[1,[21,"outlet"],false]],"hasEval":false}',meta:{moduleName:"jotpad/templates/404.hbs"}})
e.default=t}),define("jotpad/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"lq/bpsuw",block:'{"symbols":[],"statements":[[1,[21,"head-layout"],false],[0,"\\n\\n"],[7,"nav"],[9],[0,"\\n"],[4,"link-to",["notes"],[["class"],["unstyled-link"]],{"statements":[[0,"    "],[7,"div"],[11,"class","title"],[9],[0,"\\n      jotpad\\n    "],[10],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[23,["session","isAuthenticated"]]],null,{"statements":[[0,"    "],[7,"button"],[11,"class","unstyled-btn"],[11,"aria-label","Menu"],[9],[0,"\\n      "],[7,"div"],[11,"class","avatar navbar-btn"],[12,"style",[27,"safeCssBg",[[23,["currentUser","user","gravatar"]]],null]],[9],[10],[0,"\\n    "],[3,"action",[[22,0,[]],"invalidateSession"]],[10],[0,"\\n\\n"],[4,"if",[[23,["menu","open"]]],null,{"statements":[[4,"click-outside",null,[["action"],[[27,"action",[[22,0,[]],"closeMenu"],null]]],{"statements":[[0,"        Your HTML...\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[10],[0,"\\n\\n"],[7,"div"],[11,"class","spacer"],[9],[10],[0,"\\n\\n"],[0,"\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/application.hbs"}})
e.default=t}),define("jotpad/templates/components/icon-button",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"PGq7fnWK",block:'{"symbols":[],"statements":[[0,"\\n"],[7,"button"],[12,"title",[28,[[22,0,["title"]]]]],[12,"aria-label",[28,[[22,0,["title"]]]]],[12,"class",[28,[[22,0,["variant"]]," icon-button unstyled-btn"]]],[11,"type","button"],[9],[0,"\\n  "],[7,"i"],[12,"class",[28,["icon-button fa fa-",[22,0,["icon"]]]]],[11,"aria-hidden",""],[9],[10],[0,"\\n"],[3,"action",[[22,0,[]],[22,0,["handler"]]]],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/components/icon-button.hbs"}})
e.default=t}),define("jotpad/templates/components/last-updated",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"vxm+dOTp",block:'{"symbols":[],"statements":[[7,"i"],[11,"class","far fa-edit"],[11,"aria-label","Updated"],[9],[10],[0,"\\n"],[1,[22,0,["formattedTime"]],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/components/last-updated.hbs"}})
e.default=t}),define("jotpad/templates/components/rendered-html",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"HfwB0NIc",block:'{"symbols":[],"statements":[[1,[22,0,["html"]],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/components/rendered-html.hbs"}})
e.default=t}),define("jotpad/templates/head",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"xJIULImV",block:'{"symbols":[],"statements":[[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/head.hbs"}})
e.default=t}),define("jotpad/templates/login",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qnUvBhsI",block:'{"symbols":[],"statements":[[0,"\\n"],[7,"form"],[9],[0,"\\n  "],[7,"label"],[11,"for","email"],[9],[0,"Email"],[10],[0,"\\n  "],[1,[27,"input",null,[["id","placeholder","value"],["email","Enter Email",[23,["model","email"]]]]],false],[0,"\\n  "],[7,"label"],[11,"for","password"],[9],[0,"Password"],[10],[0,"\\n  "],[1,[27,"input",null,[["id","placeholder","type","value"],["password","Enter Password","password",[23,["model","password"]]]]],false],[0,"\\n  "],[7,"button"],[11,"type","submit"],[9],[0,"Login"],[10],[0,"\\n"],[4,"if",[[23,["errorMessage"]]],null,{"statements":[[0,"    "],[7,"p"],[9],[1,[21,"errorMessage"],false],[10],[0,"\\n"]],"parameters":[]},null],[3,"action",[[22,0,[]],"authenticate"],[["on"],["submit"]]],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/login.hbs"}})
e.default=t}),define("jotpad/templates/note",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"pl9AGU+q",block:'{"symbols":[],"statements":[[0,"\\n"],[0,"\\n"],[7,"div"],[11,"class","editor-ui"],[9],[0,"\\n  "],[7,"header"],[9],[0,"\\n    "],[7,"div"],[11,"class","details"],[9],[0,"\\n      "],[1,[27,"input",null,[["maxlength","value","change"],["255",[23,["model","title"]],"updatetitle"]]],false],[0,"\\n      "],[7,"div"],[9],[0,"\\n        "],[1,[27,"last-updated",null,[["time"],[[23,["model","updated_at"]]]]],false],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n\\n    "],[1,[27,"icon-button",null,[["variant","title","handler","icon"],["danger","Delete",[27,"action",[[22,0,[]],"delete"],null],"trash-alt"]]],false],[0,"\\n\\n  "],[10],[0,"\\n\\n  "],[7,"div"],[11,"class","panes"],[9],[0,"\\n    "],[7,"div"],[11,"class","pane"],[9],[0,"\\n      "],[1,[27,"textarea",null,[["autofocus","maxlength","value","change"],[true,"65536",[23,["model","content"]],"updateContent"]]],false],[0,"\\n    "],[10],[0,"\\n    "],[7,"div"],[11,"class","rendered pane"],[9],[0,"\\n      "],[7,"div"],[11,"class","markdown-body"],[9],[0,"\\n\\n      "],[1,[27,"rendered-html",null,[["input","live"],[[23,["model","content"]],true]]],false],[0,"\\n\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n\\n  "],[7,"footer"],[9],[0,"\\n\\n  "],[10],[0,"\\n\\n"],[10],[0,"\\n\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/note.hbs"}})
e.default=t}),define("jotpad/templates/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"A6IdYmyq",block:'{"symbols":["note"],"statements":[[0,"\\n"],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n\\n  "],[7,"header"],[11,"class","notes-header"],[9],[0,"\\n    "],[7,"h1"],[9],[0,"My Notes"],[10],[0,"\\n    "],[1,[27,"icon-button",null,[["variant","title","handler","icon"],["primary","New",[27,"action",[[22,0,[]],"new"],null],"plus"]]],false],[0,"\\n  "],[10],[0,"\\n\\n"],[4,"each",[[23,["model"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","paper-container"],[9],[0,"\\n"],[4,"link-to",["note",[22,1,[]]],[["class"],["unstyled-link"]],{"statements":[[0,"        "],[7,"div"],[11,"class","paper"],[9],[0,"\\n          "],[7,"div"],[11,"class","details"],[9],[0,"\\n            "],[7,"div"],[11,"class","title"],[9],[0,"\\n              "],[1,[22,1,["title"]],false],[0,"\\n            "],[10],[0,"\\n            "],[7,"div"],[11,"class","updated"],[9],[0,"\\n              "],[1,[27,"last-updated",null,[["time"],[[22,1,["updated_at"]]]]],false],[0,"\\n            "],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"div"],[11,"class","paper-body markdown-body noclicks"],[9],[0,"\\n            "],[1,[27,"rendered-html",null,[["input","live"],[[22,1,["content"]],false]]],false],[0,"\\n          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n"]],"parameters":[1]},null],[0,"\\n"],[10],[0,"\\n\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/notes.hbs"}})
e.default=t}),define("jotpad/utils/formatDate",["exports","dayjs","dayjs/plugin/relativeTime"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t.default.extend(n.default)
var a=function(e){var n=new Date(e)
return Ember.String.htmlSafe('<time datetime="'.concat(n.toISOString(),'" title="').concat((0,t.default)(n).format("MMMM Do YYYY, h:mm:ss a"),'">').concat((0,t.default)(n).fromNow(),"</time>"))}
e.default=a}),define("jotpad/utils/formatMarkdown",["exports","marked","insane","prismjs","prismjs/plugins/custom-class/prism-custom-class.min.js","prismjs/components/prism-markdown.min.js","jotpad/utils/safeURI"],function(e,t,n,a,o,i,r){function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,o=!1,i=void 0
try{for(var r,l=e[Symbol.iterator]();!(a=(r=l.next()).done)&&(n.push(r.value),!t||n.length!==t);a=!0);}catch(s){o=!0,i=s}finally{try{a||null==l.return||l.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,document.removeEventListener("DOMContentLoaded",a.default.highlightAll),document.removeEventListener("DOMContentLoaded",a.default.fileHighlight),a.default.plugins.customClass.prefix("prism-"),a.default.manual=!0,a.default.highlightAllUnder=function(){}
for(var d=new t.default.Renderer,u=new t.default.Renderer,c={allowedAttributes:{a:["href","name","target","rel","title","tabindex"],img:["src","alt","title"],input:["type","checked","disabled"],code:["class"],span:["class"],pre:["class"],div:["data-line"],th:["align"],tr:["align"]},allowedClasses:{ul:["checklist"],a:["unstyled-link"]},allowedSchemes:["http","https","mailto"],allowedTags:["a","article","b","blockquote","br","caption","code","del","details","div","em","h1","h2","h3","h4","h5","h6","hr","i","img","input","ins","kbd","label","li","main","ol","p","pre","section","span","strike","strong","sub","summary","sup","table","tbody","td","th","thead","tr","u","ul"],filter:function(e){return[["code","language-"],["span","prism-"]].forEach(function(t){var n=s(t,2),a=n[0],o=n[1]
if(e.tag===a){var i=e.attrs.class?e.attrs.class.split(" "):[]
e.attrs.class=i.filter(function(e){return e.startsWith(o)}).join(" ")||void 0}}),!0},transformText:null},f=1;f<=6;f++)c.allowedClasses["h".concat(f)]=["heading"],c.allowedAttributes["h".concat(f)]=["id"]
var p=function(e){return'<label><input type="checkbox" '.concat(e?"checked ":"","disabled> ")},m=function(e){var t=e.trim().startsWith("<label>")?"</label>":""
return"<li>".concat(e).concat(t,"</li>\n")},v=function(e,t,n){var a=t?"ol":"ul",o=t&&1!==n?' start="'.concat(n,'"'):"",i=e.trim().split(/[\r\n]+/).every(function(e){return e.trim().startsWith('<li><label><input type="checkbox"')}),r=!t&&i?' class="checklist"':""
return"<".concat(a).concat(r).concat(o,">\n").concat(e,"</").concat(a,">\n")};[d,u].forEach(function(e){e.checkbox=p,e.listitem=m,e.list=v}),d.link=function(e,t,n){try{e=(0,r.default)(e)}catch(a){return n}return'<a target="_blank" rel="nofollow noreferrer" href="'.concat(e,'"').concat(t?' title="'.concat(t,'"'):"",">").concat(n,"</a>")},d.heading=function(e,t,n,a){var o=d.options.headerPrefix+a.slug(n)
return"<h".concat(t,' class="heading" id="').concat(o,'"><a class="unstyled-link" href="#').concat(o,'">').concat(e,"</a></h").concat(t,">\n")},u.link=function(e,t,n){try{e=(0,r.default)(e)}catch(a){return n}return'<a tabindex="-1" href="'.concat(e,'">').concat(n,"</a>")},u.heading=function(e,t,n,a){return"<h".concat(t,' class="heading">').concat(e,"</h").concat(t,">\n")},t.default.setOptions({highlight:function(e,t){var n=t.trim().toLowerCase()
return"object"!==l(a.default.languages[n])?e:a.default.highlight(e,a.default.languages[n],n).split(/\r?\n/).map(function(e,t){return'<div data-line="'.concat(t+1,'">').concat(e,"</div>")}).join("\n")},pedantic:!1,gfm:!0,tables:!0,breaks:!1,sanitize:!1,smartLists:!0,smartypants:!0,xhtml:!1})
var h=function(e){var a,o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
return e=e.replace(/\[\[(.+?)\]\]/g,"<kbd>$1</kbd>"),t.default.setOptions({renderer:o?d:u}),Ember.String.htmlSafe((a=(0,t.default)(e),(0,n.default)(a,c)))}
e.default=h}),define("jotpad/utils/safeURI",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=function(e){return encodeURI(e).replace(/%25/g,"%")}
e.default=t}),define("jotpad/config/environment",[],function(){try{var e="jotpad/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("jotpad/app").default.create({name:"jotpad",version:"0.0.0+dbd39ab1"})