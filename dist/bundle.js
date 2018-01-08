/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(1);
// const { h, app } = hyperapp

/** @jsx h */

const GIPHY_API_KEY = "dc6zaTOxFJmzC";

const state = {
  url: "",
  query: "",
  isFetching: false
};

const actions = {
  downloadGif: query => async (state, actions) => {
    actions.toggleFetching(true);
    actions.setUrl((await fetch(`//api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}`).then(data => data.json()).then(({ data }) => data[0] ? data[0].images.original.url : "")));
    actions.toggleFetching(false);
  },
  setUrl: url => ({ url }),
  setQuery: query => ({ query }),
  toggleFetching: isFetching => ({ isFetching })
};

const view = (state, actions) => Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* h */])(
  "main",
  null,
  Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* h */])("input", {
    type: "text",
    placeholder: "Type here...",
    autofocus: true,
    onkeyup: ({ target: { value } }) => {
      if (value !== state.query) {
        actions.setQuery(value);
        if (!state.isFetching) {
          actions.downloadGif(value);
        }
      }
    }
  }),
  Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* h */])(
    "div",
    { "class": "container" },
    Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* h */])("img", {
      src: state.url,
      style: {
        display: state.isFetching || state.url === "" ? "none" : "block"
      }
    })
  )
);

Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* app */])(state, actions, view, document.body);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = h;
/* harmony export (immutable) */ __webpack_exports__["a"] = app;
function h(name, props) {
  var node
  var children = []

  for (var stack = [], i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i])
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack.push(node[i])
      }
    } else if (node == null || node === true || node === false) {
    } else {
      children.push(node)
    }
  }

  return typeof name === "string"
    ? {
        name: name,
        props: props || {},
        children: children
      }
    : name(props || {}, children)
}

function app(state, actions, view, container) {
  var patchLock
  var lifecycle = []
  var root = container && container.children[0]
  var node = vnode(root, [].map)

  repaint(init([], (state = copy(state)), (actions = copy(actions))))

  return actions

  function vnode(element, map) {
    return (
      element && {
        name: element.nodeName.toLowerCase(),
        props: {},
        children: map.call(element.childNodes, function(element) {
          return element.nodeType === 3
            ? element.nodeValue
            : vnode(element, map)
        })
      }
    )
  }

  function render(next) {
    patchLock = !patchLock
    next = view(state, actions)

    if (container && !patchLock) {
      root = patch(container, root, node, (node = next))
    }

    while ((next = lifecycle.pop())) next()
  }

  function repaint() {
    if (!patchLock) {
      patchLock = !patchLock
      setTimeout(render)
    }
  }

  function copy(a, b) {
    var target = {}

    for (var i in a) target[i] = a[i]
    for (var i in b) target[i] = b[i]

    return target
  }

  function set(path, value, source, target) {
    if (path.length) {
      target[path[0]] =
        1 < path.length ? set(path.slice(1), value, source[path[0]], {}) : value
      return copy(source, target)
    }
    return value
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]]
    }
    return source
  }

  function init(path, slice, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ? (function(key, action) {
            actions[key] = function(data) {
              slice = get(path, state)

              if (typeof (data = action(data)) === "function") {
                data = data(slice, actions)
              }

              if (data && data !== slice && !data.then) {
                repaint((state = set(path, copy(slice, data), state, {})))
              }

              return data
            }
          })(key, actions[key])
        : init(
            path.concat(key),
            (slice[key] = slice[key] || {}),
            (actions[key] = copy(actions[key]))
          )
    }
  }

  function getKey(node) {
    return node && node.props ? node.props.key : null
  }

  function setElementProp(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in copy(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i]
      }
    } else {
      try {
        element[name] = value == null ? "" : value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value == null || value === false) {
          element.removeAttribute(name)
        } else {
          element.setAttribute(name, value)
        }
      }
    }
  }

  function createElement(node, isSVG) {
    var element =
      typeof node === "string" || typeof node === "number"
        ? document.createTextNode(node)
        : (isSVG = isSVG || node.name === "svg")
          ? document.createElementNS("http://www.w3.org/2000/svg", node.name)
          : document.createElement(node.name)

    if (node.props) {
      if (node.props.oncreate) {
        lifecycle.push(function() {
          node.props.oncreate(element)
        })
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG))
      }

      for (var name in node.props) {
        setElementProp(element, name, node.props[name])
      }
    }

    return element
  }

  function updateElement(element, oldProps, props) {
    for (var name in copy(oldProps, props)) {
      if (
        props[name] !==
        (name === "value" || name === "checked"
          ? element[name]
          : oldProps[name])
      ) {
        setElementProp(element, name, props[name], oldProps[name])
      }
    }

    if (props.onupdate) {
      lifecycle.push(function() {
        props.onupdate(element, oldProps)
      })
    }
  }

  function removeChildren(element, node, props) {
    if ((props = node.props)) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i])
      }

      if (props.ondestroy) {
        props.ondestroy(element)
      }
    }
    return element
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }

    if (node.props && (cb = node.props.onremove)) {
      cb(element, done)
    } else {
      done()
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {
    } else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element)
    } else if (node.name && node.name === oldNode.name) {
      updateElement(element, oldNode.props, node.props)

      var oldElements = []
      var oldKeyed = {}
      var newKeyed = {}

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i]

        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < node.children.length) {
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKey(oldChild)
        var newKey = getKey(newChild)

        if (newKeyed[oldKey]) {
          i++
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG)
            j++
          }
          i++
        } else {
          var recyledNode = oldKeyed[newKey] || []

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG)
            i++
          } else if (recyledNode[0]) {
            patch(
              element,
              element.insertBefore(recyledNode[0], oldElements[i]),
              recyledNode[1],
              newChild,
              isSVG
            )
          } else {
            patch(element, oldElements[i], null, newChild, isSVG)
          }

          j++
          newKeyed[newKey] = newChild
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i]
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].props.key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
        }
      }
    } else if (node.name === oldNode.name) {
      element.nodeValue = node
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      )
      removeElement(parent, nextSibling, oldNode)
    }
    return element
  }
}


/***/ })
/******/ ]);