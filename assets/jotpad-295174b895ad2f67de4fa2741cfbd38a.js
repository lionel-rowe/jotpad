"use strict"
define("jotpad/adapters/application",["exports","ember-data","jotpad/config/environment","ember-simple-auth/mixins/data-adapter-mixin"],function(e,t,a,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={session:Ember.inject.service(),namespace:"api/v1",authorize:function(e){var t=this.get("session.data.authenticated").access_token
Ember.isPresent(t)&&e.setRequestHeader("Authorization","Bearer ".concat(t))}}
a.default.API_HOST&&(r.host=a.default.API_HOST)
var i=t.default.JSONAPIAdapter.extend(n.default,r)
e.default=i}),define("jotpad/adapters/user",["exports","jotpad/adapters/application"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.extend({urlForQueryRecord:function(e){return e.me?(delete e.me,"".concat(this._super.apply(this,arguments),"/me")):this._super.apply(this,arguments)}})
e.default=a}),define("jotpad/app",["exports","jotpad/resolver","ember-load-initializers","jotpad/config/environment"],function(e,t,a,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,a.default)(r,n.default.modulePrefix)
var i=r
e.default=i}),define("jotpad/authenticators/oauth2",["exports","jotpad/config/environment","ember-simple-auth/authenticators/oauth2-password-grant"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.API_HOST?t.default.API_HOST+"/oauth/token":"/oauth/token",r=a.default.extend({serverTokenEndpoint:n})
e.default=r}),define("jotpad/components/click-outside",["exports","ember-click-outside/component"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/components/head-content",["exports","jotpad/templates/head"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Component.extend({tagName:"",model:Ember.inject.service("head-data"),layout:t.default})
e.default=a}),define("jotpad/components/head-layout",["exports","ember-cli-head/components/head-layout"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({session:Ember.inject.service(),actions:{invalidateSession:function(){this.get("session").invalidate()}}})
e.default=t}),define("jotpad/controllers/login",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({})
e.default=t}),define("jotpad/controllers/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({})
e.default=t}),define("jotpad/helpers/app-version",["exports","jotpad/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,a){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.default.APP.version,i=n.versionOnly||n.hideSha,o=n.shaOnly||n.hideVersion,l=null
return i&&(n.showExtended&&(l=r.match(a.versionExtendedRegExp)),l||(l=r.match(a.versionRegExp))),o&&(l=r.match(a.shaRegExp)),l?l[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var r=Ember.Helper.helper(n)
e.default=r}),define("jotpad/helpers/formatDate",["exports","moment"],function(e,t){function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0
try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(d){r=!0,i=d}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Helper.helper(function(e){var n=a(e,1)[0]
return n=new Date(n),Ember.String.htmlSafe('<time datetime="'.concat(n.toISOString(),'" title="').concat((0,t.default)(n).format("MMMM Do YYYY, h:mm:ss a"),'">').concat((0,t.default)(n).fromNow(),"</time>"))})
e.default=n}),define("jotpad/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("jotpad/helpers/safeCssBg",["exports","jotpad/utils/safeURI"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Helper.helper(function(e){var a=(0,t.default)(e)
return Ember.String.htmlSafe("background-image: url(".concat(a,")"))})
e.default=a}),define("jotpad/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("jotpad/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","jotpad/config/environment"],function(e,t,a){var n,r
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a.default.APP&&(n=a.default.APP.name,r=a.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(n,r)}
e.default=i}),define("jotpad/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=a}),define("jotpad/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("jotpad/initializers/ember-simple-auth",["exports","jotpad/config/environment","ember-simple-auth/configuration","ember-simple-auth/initializers/setup-session","ember-simple-auth/initializers/setup-session-service","ember-simple-auth/initializers/setup-session-restoration"],function(e,t,a,n,r,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={name:"ember-simple-auth",initialize:function(e){var o=t.default["ember-simple-auth"]||{}
o.rootURL=t.default.rootURL||t.default.baseURL,a.default.load(o),(0,n.default)(e),(0,r.default)(e),(0,i.default)(e)}}
e.default=o}),define("jotpad/initializers/export-application-global",["exports","jotpad/config/environment"],function(e,t){function a(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var a
if("undefined"!=typeof window)a=window
else if("undefined"!=typeof global)a=global
else{if("undefined"==typeof self)return
a=self}var n,r=t.default.exportApplicationGlobal
n="string"==typeof r?r:Ember.String.classify(t.default.modulePrefix),a[n]||(a[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=a,e.default=void 0
var n={name:"export-application-global",initialize:a}
e.default=n}),define("jotpad/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("jotpad/instance-initializers/ember-simple-auth",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ember-simple-auth",initialize:function(){}}}),define("jotpad/instance-initializers/head-browser",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"head-browser",initialize:function(){}}}),define("jotpad/mixins/click-outside",["exports","ember-click-outside/mixin"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/models/note",["exports","ember-data","jotpad/utils/formatMarkdown"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model.extend({title:t.default.attr("string"),content:t.default.attr("string"),created_at:t.default.attr("date"),updated_at:t.default.attr("date"),formatted:Ember.computed("content",function(){return(0,a.default)(this.get("content"))}),reload:function(){this.notifyPropertyChange("updated_at"),this._super()}})
e.default=n}),define("jotpad/models/user",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.Model.extend({email:t.default.attr("string"),gravatar:t.default.attr("string"),password:t.default.attr("string")})
e.default=a}),define("jotpad/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("jotpad/router",["exports","jotpad/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
a.map(function(){var e=this
this.route("login"),this.route("notes",{path:"/"},function(){e.route("new",{path:"/notes/new"}),e.route("note",{path:"/notes/:id"})})})
var n=a
e.default=n}),define("jotpad/routes/application",["exports","ember-simple-auth/mixins/authenticated-route-mixin","ember-simple-auth/mixins/application-route-mixin"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.inject.service,r=Ember.Route.extend(a.default,t.default,{currentUser:n(),beforeModel:function(){var e=this
if(this.get("session").isAuthenticated)return this._loadCurrentUser().then(function(){e.controllerFor("application").set("currentUser",e.get("currentUser"))})
this._super.apply(this,arguments)},_loadCurrentUser:function(){var e=this
return this.get("currentUser").load().catch(function(){return e.get("session").invalidate()})}})
e.default=r}),define("jotpad/routes/login",["exports"],function(e){function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0
try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(d){r=!0,i=d}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Route.extend({session:Ember.inject.service(),currentUser:Ember.inject.service(),model:function(){return this.get("store").createRecord("user")},actions:{authenticate:function(){var e=this,a=t(["email","password"].map(function(e){return document.querySelector("#".concat(e)).value}),2),n=a[0],r=a[1]
this.get("session").authenticate("authenticator:oauth2",n,r).catch(function(t){e.set("errorMessage",t.error||t)}).then(function(){e.get("currentUser").load().then(function(){e.controllerFor("application").set("currentUser",e.get("currentUser"))}),e.transitionTo("/")})}}})
e.default=a})
define("jotpad/routes/note",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(e){return this.get("store").findRecord("note",e.id)},activate:function(){var e=this
this._super.apply(this,arguments),this.interval=setInterval(function(){e._pushOrPull.call(e)},1e4),window.onbeforeunload=function(){e._pushOrPull.call(e)}},_pushOrPull:function(){var e=this.get("context")
return e.hasDirtyAttributes?e.save().then(function(e){return e},function(e){return e}):e.reload()},deactivate:function(){clearInterval(this.interval),window.onbeforeunload=null,this._super.apply(this,arguments)},actions:{willTransition:function(e){this._pushOrPull.call(this)},updateContent:function(e){var t=this.get("context")
t.set("content",e),this.set("model",t)},updateTitle:function(e){var t=this.get("context")
t.set("title",e),this.set("model",t)}}})
e.default=t}),define("jotpad/routes/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.get("store").findAll("note")}})
e.default=t}),define("jotpad/serializers/application",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.JSONAPISerializer.extend({keyForAttribute:function(e){return e}})
e.default=a}),define("jotpad/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/services/cookies",["exports","ember-cookies/services/cookies"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("jotpad/services/current-user",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Service.extend({session:Ember.inject.service("session"),store:Ember.inject.service(),load:function(){var e=this
return this.get("session.isAuthenticated")?this.get("store").queryRecord("user",{me:!0}).then(function(t){e.set("user",t)}):Ember.RSVP.resolve()}})
e.default=t}),define("jotpad/services/head-data",["exports","ember-cli-head/services/head-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("jotpad/services/session",["exports","ember-simple-auth/services/session"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("jotpad/session-stores/application",["exports","ember-simple-auth/session-stores/adaptive"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.extend()
e.default=a}),define("jotpad/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"lq/bpsuw",block:'{"symbols":[],"statements":[[1,[21,"head-layout"],false],[0,"\\n\\n"],[7,"nav"],[9],[0,"\\n"],[4,"link-to",["notes"],[["class"],["unstyled-link"]],{"statements":[[0,"    "],[7,"div"],[11,"class","title"],[9],[0,"\\n      jotpad\\n    "],[10],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[23,["session","isAuthenticated"]]],null,{"statements":[[0,"    "],[7,"button"],[11,"class","unstyled-btn"],[11,"aria-label","Menu"],[9],[0,"\\n      "],[7,"div"],[11,"class","avatar navbar-btn"],[12,"style",[27,"safeCssBg",[[23,["currentUser","user","gravatar"]]],null]],[9],[10],[0,"\\n    "],[3,"action",[[22,0,[]],"invalidateSession"]],[10],[0,"\\n\\n"],[4,"if",[[23,["menu","open"]]],null,{"statements":[[4,"click-outside",null,[["action"],[[27,"action",[[22,0,[]],"closeMenu"],null]]],{"statements":[[0,"        Your HTML...\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[10],[0,"\\n\\n"],[7,"div"],[11,"class","spacer"],[9],[10],[0,"\\n\\n"],[0,"\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/application.hbs"}})
e.default=t}),define("jotpad/templates/head",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"xJIULImV",block:'{"symbols":[],"statements":[[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/head.hbs"}})
e.default=t}),define("jotpad/templates/login",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qnUvBhsI",block:'{"symbols":[],"statements":[[0,"\\n"],[7,"form"],[9],[0,"\\n  "],[7,"label"],[11,"for","email"],[9],[0,"Email"],[10],[0,"\\n  "],[1,[27,"input",null,[["id","placeholder","value"],["email","Enter Email",[23,["model","email"]]]]],false],[0,"\\n  "],[7,"label"],[11,"for","password"],[9],[0,"Password"],[10],[0,"\\n  "],[1,[27,"input",null,[["id","placeholder","type","value"],["password","Enter Password","password",[23,["model","password"]]]]],false],[0,"\\n  "],[7,"button"],[11,"type","submit"],[9],[0,"Login"],[10],[0,"\\n"],[4,"if",[[23,["errorMessage"]]],null,{"statements":[[0,"    "],[7,"p"],[9],[1,[21,"errorMessage"],false],[10],[0,"\\n"]],"parameters":[]},null],[3,"action",[[22,0,[]],"authenticate"],[["on"],["submit"]]],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/login.hbs"}})
e.default=t}),define("jotpad/templates/note",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"u1pYJnZn",block:'{"symbols":[],"statements":[[0,"\\n"],[0,"\\n"],[7,"div"],[11,"class","editor-ui"],[9],[0,"\\n  "],[7,"header"],[9],[0,"\\n    "],[7,"div"],[11,"class","details"],[11,"style","margin-left: -0.3em;"],[9],[0,"\\n      "],[1,[27,"input",null,[["maxlength","value","change","style"],["255",[23,["model","title"]],"updatetitle","margin-left: -0.3em;"]]],false],[0,"\\n      "],[7,"div"],[9],[0,"\\n        "],[7,"i"],[11,"class","far fa-edit"],[11,"aria-label","Updated"],[11,"style","padding-left: 0.3em;"],[9],[10],[0,"\\n        "],[1,[27,"formatDate",[[23,["model","updated_at"]]],null],false],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n\\n  "],[10],[0,"\\n\\n  "],[7,"div"],[11,"class","panes"],[9],[0,"\\n    "],[7,"div"],[11,"class","pane"],[9],[0,"\\n      "],[1,[27,"textarea",null,[["maxlength","value","change"],["65536",[23,["model","content"]],"updateContent"]]],false],[0,"\\n    "],[10],[0,"\\n    "],[7,"div"],[11,"class","rendered pane"],[9],[0,"\\n      "],[7,"div"],[11,"class","markdown-body"],[9],[0,"\\n        "],[1,[23,["model","_formattedUpdater"]],false],[0,"\\n        "],[1,[23,["model","formatted"]],false],[0,"\\n"],[0,"      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n\\n  "],[7,"footer"],[9],[0,"\\n\\n  "],[10],[0,"\\n\\n"],[10],[0,"\\n\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/note.hbs"}})
e.default=t}),define("jotpad/templates/notes",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Tgj1ag9b",block:'{"symbols":["note"],"statements":[[0,"\\n"],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n\\n  "],[7,"h1"],[9],[0,"My Notes"],[10],[0,"\\n\\n"],[4,"each",[[23,["model"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","paper-container"],[9],[0,"\\n"],[4,"link-to",["note",[22,1,[]]],[["class"],["unstyled-link"]],{"statements":[[0,"        "],[7,"div"],[11,"class","paper"],[9],[0,"\\n          "],[7,"div"],[11,"class","details"],[9],[0,"\\n            "],[7,"div"],[11,"class","title"],[9],[0,"\\n              "],[1,[22,1,["title"]],false],[0,"\\n            "],[10],[0,"\\n            "],[7,"div"],[11,"class","updated"],[9],[0,"\\n              "],[7,"i"],[11,"class","far fa-edit"],[11,"aria-label","Updated"],[9],[10],[0,"\\n              "],[1,[27,"formatDate",[[22,1,["updated_at"]]],null],false],[0,"\\n            "],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"div"],[11,"class","paper-body markdown-body noclicks"],[9],[0,"\\n            "],[1,[22,1,["_formattedUpdater"]],false],[0,"\\n            "],[1,[22,1,["formatted"]],false],[0,"\\n          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n"]],"parameters":[1]},null],[0,"\\n"],[10],[0,"\\n\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"jotpad/templates/notes.hbs"}})
e.default=t}),define("jotpad/utils/formatMarkdown",["exports","marked","insane","highlightjs","jotpad/utils/safeURI"],function(e,t,a,n,r){function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0
try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(d){r=!0,i=d}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
for(var o=new t.default.Renderer,l=new t.default.Renderer,d={allowedAttributes:{a:["href","name","target","rel","title","tabindex"],img:["src","alt","title"],input:["type","checked","disabled"],code:["class"],span:["class"],th:["align"],tr:["align"]},allowedClasses:{ul:["checklist"],a:["unstyled-link"]},allowedSchemes:["http","https","mailto"],allowedTags:["a","article","b","blockquote","br","caption","code","del","details","div","em","h1","h2","h3","h4","h5","h6","hr","i","img","input","ins","kbd","label","li","main","ol","p","pre","section","span","strike","strong","sub","summary","sup","table","tbody","td","th","thead","tr","u","ul"],filter:function(e){return[["code","language-"],["span","hljs-"]].forEach(function(t){var a=i(t,2),n=a[0],r=a[1]
e.tag!==n||"string"!=typeof e.attrs.class||!/\s/.test(e.attrs.class)&&e.attrs.class.startsWith(r)||delete e.attrs.class}),!0},transformText:null},s=1;s<=6;s++)d.allowedClasses["h".concat(s)]=["heading"],d.allowedAttributes["h".concat(s)]=["id"]
var u=function(e){return'<label><input type="checkbox" '.concat(e?"checked ":"","disabled> ")},c=function(e){var t=e.trim().startsWith("<label>")?"</label>":""
return"<li>".concat(e).concat(t,"</li>\n")},f=function(e,t,a){var n=t?"ol":"ul",r=t&&1!==a?' start="'.concat(a,'"'):"",i=e.trim().split(/[\r\n]+/).every(function(e){return e.trim().startsWith('<li><label><input type="checkbox"')}),o=!t&&i?' class="checklist"':""
return"<".concat(n).concat(o).concat(r,">\n").concat(e,"</").concat(n,">\n")};[o,l].forEach(function(e){e.checkbox=u,e.listitem=c,e.list=f}),o.link=function(e,t,a){try{e=(0,r.default)(e)}catch(n){return a}return'<a target="_blank" rel="nofollow noreferrer" href="'.concat(e,'"').concat(t?' title="'.concat(t,'"'):"",">").concat(a,"</a>")},o.heading=function(e,t,a,n){var r=o.options.headerPrefix+n.slug(a)
return"<h".concat(t,' class="heading" id="').concat(r,'"><a class="unstyled-link" href="#').concat(r,'">').concat(e,"</a></h").concat(t,">\n")},l.link=function(e,t,a){try{e=(0,r.default)(e)}catch(n){return a}return'<a tabindex="-1" href="'.concat(e,'">').concat(a,"</a>")},l.heading=function(e,t,a,n){return"<h".concat(t,' class="heading">').concat(e,"</h").concat(t,">\n")},t.default.setOptions({highlight:function(e,t){if(["plaintext","plain","txt"].includes(t.trim().toLowerCase()))return e
try{return n.highlight(t,e).value}catch(a){return n.highlightAuto(e).value}},pedantic:!1,gfm:!0,tables:!0,breaks:!1,sanitize:!1,smartLists:!0,smartypants:!0,xhtml:!1})
var p=function(e){var n,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
return e=e.replace(/\[\[(.+?)\]\]/g,"<kbd>$1</kbd>"),t.default.setOptions({renderer:r?o:l}),Ember.String.htmlSafe((n=(0,t.default)(e),(0,a.default)(n,d)))}
e.default=p}),define("jotpad/utils/safeURI",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=function(e){return encodeURI(e).replace(/%25/g,"%")}
e.default=t}),define("jotpad/config/environment",[],function(){try{var e="jotpad/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),a={default:JSON.parse(unescape(t))}
return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("jotpad/app").default.create({name:"jotpad",version:"0.0.0+d65de79c"})
