"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "chromeLight", {
  enumerable: true,
  get: function get() {
    return _themes.chromeLight;
  }
});
Object.defineProperty(exports, "chromeDark", {
  enumerable: true,
  get: function get() {
    return _themes.chromeDark;
  }
});
Object.defineProperty(exports, "ObjectInspector", {
  enumerable: true,
  get: function get() {
    return _ObjectInspector2.default;
  }
});
Object.defineProperty(exports, "TableInspector", {
  enumerable: true,
  get: function get() {
    return _TableInspector2.default;
  }
});
Object.defineProperty(exports, "DOMInspector", {
  enumerable: true,
  get: function get() {
    return _DOMInspector2.default;
  }
});
Object.defineProperty(exports, "ObjectLabel", {
  enumerable: true,
  get: function get() {
    return _ObjectLabel2.default;
  }
});
Object.defineProperty(exports, "ObjectRootLabel", {
  enumerable: true,
  get: function get() {
    return _ObjectRootLabel2.default;
  }
});
Object.defineProperty(exports, "ObjectValue", {
  enumerable: true,
  get: function get() {
    return _ObjectValue2.default;
  }
});
Object.defineProperty(exports, "ObjectName", {
  enumerable: true,
  get: function get() {
    return _ObjectName2.default;
  }
});
exports.default = exports.Inspector = void 0;

var _themes = require("./styles/themes");

var _ObjectInspector2 = _interopRequireDefault(require("./object-inspector/ObjectInspector"));

var _TableInspector2 = _interopRequireDefault(require("./table-inspector/TableInspector"));

var _DOMInspector2 = _interopRequireDefault(require("./dom-inspector/DOMInspector"));

var _ObjectLabel2 = _interopRequireDefault(require("./object-inspector/ObjectLabel"));

var _ObjectRootLabel2 = _interopRequireDefault(require("./object-inspector/ObjectRootLabel"));

var _ObjectValue2 = _interopRequireDefault(require("./object/ObjectValue"));

var _ObjectName2 = _interopRequireDefault(require("./object/ObjectName"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isDom = _interopRequireDefault(require("is-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Inspector = (_ref) => {
  let _ref$table = _ref.table,
      table = _ref$table === void 0 ? false : _ref$table,
      data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["table", "data"]);

  if (table) {
    return _react.default.createElement(_TableInspector2.default, _extends({
      data: data
    }, rest));
  }

  if ((0, _isDom.default)(data)) return _react.default.createElement(_DOMInspector2.default, _extends({
    data: data
  }, rest));
  return _react.default.createElement(_ObjectInspector2.default, _extends({
    data: data
  }, rest));
};

exports.Inspector = Inspector;
Inspector.propTypes = {
  data: _propTypes.default.any,
  name: _propTypes.default.string,
  table: _propTypes.default.bool
};
var _default = Inspector;
exports.default = _default;