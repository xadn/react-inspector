"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A short description of the object values.
 * Can be used to render tree node in ObjectInspector
 * or render objects in TableInspector.
 */
const ObjectValue = (_ref) => {
  let object = _ref.object,
      styles = _ref.styles;
  const themeStyles = (0, _styles.useStyles)('ObjectValue');

  const mkStyle = key => _objectSpread({}, themeStyles[key], styles);

  switch (typeof object) {
    case 'number':
      return _react.default.createElement("span", {
        style: mkStyle('objectValueNumber')
      }, String(object));

    case 'string':
      return _react.default.createElement("span", {
        style: mkStyle('objectValueString')
      }, "\"", object, "\"");

    case 'boolean':
      return _react.default.createElement("span", {
        style: mkStyle('objectValueBoolean')
      }, String(object));

    case 'undefined':
      return _react.default.createElement("span", {
        style: mkStyle('objectValueUndefined')
      }, "undefined");

    case 'object':
      if (object === null) {
        return _react.default.createElement("span", {
          style: mkStyle('objectValueNull')
        }, "null");
      }

      if (object instanceof Date) {
        return _react.default.createElement("span", null, object.toString());
      }

      if (object instanceof RegExp) {
        return _react.default.createElement("span", {
          style: mkStyle('objectValueRegExp')
        }, object.toString());
      }

      if (Array.isArray(object)) {
        return _react.default.createElement("span", null, `Array(${object.length})`);
      }

      if (!object.constructor) {
        return _react.default.createElement("span", null, "Object");
      }

      if (typeof object.constructor.isBuffer === 'function' && object.constructor.isBuffer(object)) {
        return _react.default.createElement("span", null, `Buffer[${object.length}]`);
      }

      return _react.default.createElement("span", null, object.constructor.name);

    case 'function':
      return _react.default.createElement("span", null, _react.default.createElement("span", {
        style: mkStyle('objectValueFunctionKeyword')
      }, "function"), _react.default.createElement("span", {
        style: mkStyle('objectValueFunctionName')
      }, "\xA0", object.name, "()"));

    case 'symbol':
      return _react.default.createElement("span", {
        style: mkStyle('objectValueSymbol')
      }, object.toString());

    default:
      return _react.default.createElement("span", null);
  }
};

ObjectValue.propTypes = {
  // the object to describe
  object: _propTypes.default.any
};
var _default = ObjectValue;
exports.default = _default;