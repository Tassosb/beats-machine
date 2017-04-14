/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;

  }

  html(string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    this.nodes.forEach((node) => {
      if (arg instanceof DOMNodeCollection) {
        arg.nodes.forEach((argNode) => {
          node.innerHTML += (argNode.outerHTML);
        });
      } else if (arg instanceof HTMLElement) {
        node.innerHTML += (arg.outerHTML);
      } else if (typeof arg === "string") {
        node.innerHTML += arg;
      }
    });
  }

  attr(attrName, value) {
    if (value === undefined) {
      return this.nodes[0].getAttribute(attrName);
    } else {
      this.nodes.forEach((node) => {
        node.setAttribute(attrName, value);
      });
      return this.nodes;
    }
  }

  addClass(classNames) {
    classNames = classNames.split(' ');
    this.nodes.forEach((node) => {
      node.classList.add(...classNames);
    });
  }

  removeClass(classNames) {
    if (classNames === undefined) {
      this.attr('class', '');
    } else {
      classNames = classNames.split(' ');
      this.nodes.forEach((node) => {
        node.classList.remove(...classNames);
      });
    }
  }

  children() {
    let allChildren = [];
    this.nodes.forEach((node) => {
      const childArr = [].slice.call(node.children);
      allChildren = allChildren.concat(childArr);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let allParents = [];
    this.nodes.forEach((node) => {
      const nodeParent = node.parentNode;
      if (!allParents.includes(nodeParent)) {
        allParents.push(nodeParent);
      }
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let foundNodes = [];

    this.nodes.forEach((node) => {
      let matched = node.querySelectorAll(selector);
      let matchedArr = [].slice.call(matched);

      foundNodes = foundNodes.concat(matchedArr);
    });

    return new DOMNodeCollection(foundNodes);
  }

  remove() {
    this.nodes.forEach((node) => {
      node.remove();
    });
  }

  on(type, callback) {
    this.nodes.forEach((node) => {
      node.addEventListener(type, callback);
      //creates an events attribute on node in order to
      ////get event callback for a given event type in #off.
      node.events = node.events || {};

      if (node.events[type] === undefined) {
        node.events[type] = [callback];
      } else {
        node.events[type].push(callback);
      }
    });
  }

  off(type) {
    this.nodes.forEach((node) => {
      let eventCallbacks = node.events[type];
      eventCallbacks.forEach((callback) => {
        node.removeEventListener(type, callback);
      });
    });
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const funcQueue = [];


Window.prototype.$l = function (arg) {
  if (typeof arg === 'string') {
    const nodeList = document.querySelectorAll(arg);
    const nodeArray = [].slice.call(nodeList);
    return new DOMNodeCollection(nodeArray);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
    if (document.readyState === 'complete') {
      arg();
    } else {
      funcQueue.push(arg);
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  funcQueue.forEach((func) => {
    func();
  });
});

$l.extend = function(firstObj, ...otherObjs) {
  otherObjs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      firstObj[key] = obj[key];
    });
  });
  return firstObj;
};

const defaults = {
  success: function (res) {console.log(res);},
  error: function () {console.log("error :(");},
  url: window.location.pathname,
  method: 'GET',
  data: "",
  contentType: "application/x-www-form-urlencoded; charset=UTF-8"
};

$l.ajax = function(options) {
  options = options || {};
  options = $l.extend({}, defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  };

  xhr.setRequestHeader("Content-type", options.contentType);
  xhr.send(options.data);
};


/***/ })
/******/ ]);
