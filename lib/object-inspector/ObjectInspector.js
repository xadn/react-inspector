"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeView = _interopRequireDefault(require("../tree-view/TreeView"));

var _ObjectRootLabel = _interopRequireDefault(require("./ObjectRootLabel"));

var _ObjectLabel = _interopRequireDefault(require("./ObjectLabel"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const createIterator = (showNonenumerable, sortObjectKeys) => {
  const objectIterator = function* objectIterator(data) {
    const shouldIterate = typeof data === 'object' && data !== null || typeof data === 'function';
    if (!shouldIterate) return;
    const dataIsArray = Array.isArray(data); // iterable objects (except arrays)

    if (!dataIsArray && data[Symbol.iterator]) {
      let i = 0;

      for (let entry of data) {
        if (Array.isArray(entry) && entry.length === 2) {
          const _entry = _slicedToArray(entry, 2),
                k = _entry[0],
                v = _entry[1];

          yield {
            name: k,
            data: v
          };
        } else {
          yield {
            name: i.toString(),
            data: entry
          };
        }

        i++;
      }
    } else {
      const keys = Object.getOwnPropertyNames(data);

      if (sortObjectKeys === true && !dataIsArray) {
        // Array keys should not be sorted in alphabetical order
        keys.sort();
      } else if (typeof sortObjectKeys === 'function') {
        keys.sort(sortObjectKeys);
      }

      for (let propertyName of keys) {
        if (data.propertyIsEnumerable(propertyName)) {
          const propertyValue = data[propertyName];
          yield {
            name: propertyName || `""`,
            data: propertyValue
          };
        } else if (showNonenumerable) {
          // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
          // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
          // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
          let propertyValue;

          try {
            propertyValue = data[propertyName];
          } catch (e) {// console.warn(e)
          }

          if (propertyValue !== undefined) {
            yield {
              name: propertyName,
              data: propertyValue,
              isNonenumerable: true
            };
          }
        }
      } // [[Prototype]] of the object: `Object.getPrototypeOf(data)`
      // the property name is shown as "__proto__"


      if (showNonenumerable && data !== Object.prototype
      /* already added */
      ) {
          yield {
            name: '__proto__',
            data: Object.getPrototypeOf(data),
            isNonenumerable: true
          };
        }
    }
  };

  return objectIterator;
};

const defaultNodeRenderer = (_ref) => {
  let depth = _ref.depth,
      name = _ref.name,
      data = _ref.data,
      isNonenumerable = _ref.isNonenumerable;
  return depth === 0 ? _react.default.createElement(_ObjectRootLabel.default, {
    name: name,
    data: data
  }) : _react.default.createElement(_ObjectLabel.default, {
    name: name,
    data: data,
    isNonenumerable: isNonenumerable
  });
};
/**
 * Tree-view for objects
 */


const ObjectInspector = (_ref2) => {
  let _ref2$showNonenumerab = _ref2.showNonenumerable,
      showNonenumerable = _ref2$showNonenumerab === void 0 ? false : _ref2$showNonenumerab,
      sortObjectKeys = _ref2.sortObjectKeys,
      nodeRenderer = _ref2.nodeRenderer,
      treeViewProps = _objectWithoutProperties(_ref2, ["showNonenumerable", "sortObjectKeys", "nodeRenderer"]);

  const dataIterator = createIterator(showNonenumerable, sortObjectKeys);
  const renderer = nodeRenderer ? nodeRenderer : defaultNodeRenderer;
  return _react.default.createElement(_TreeView.default, _extends({
    nodeRenderer: renderer,
    dataIterator: dataIterator
  }, treeViewProps));
};

ObjectInspector.propTypes = {
  /** An integer specifying to which level the tree should be initially expanded. */
  expandLevel: _propTypes.default.number,

  /** An array containing all the paths that should be expanded when the component is initialized, or a string of just one path */
  expandPaths: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  name: _propTypes.default.string,

  /** Not required prop because we also allow undefined value */
  data: _propTypes.default.any,

  /** Show non-enumerable properties */
  showNonenumerable: _propTypes.default.bool,

  /** Sort object keys with optional compare function. */
  sortObjectKeys: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),

  /** Provide a custom nodeRenderer */
  nodeRenderer: _propTypes.default.func
};

var _default = (0, _styles.themeAcceptor)(ObjectInspector);

exports.default = _default;