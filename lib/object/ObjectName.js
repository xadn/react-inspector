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
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */
const ObjectName = (_ref) => {
  let name = _ref.name,
      _ref$dimmed = _ref.dimmed,
      dimmed = _ref$dimmed === void 0 ? false : _ref$dimmed,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles;
  const themeStyles = (0, _styles.useStyles)('ObjectName');

  const appliedStyles = _objectSpread({}, themeStyles.base, dimmed ? themeStyles['dimmed'] : {}, styles);

  return _react.default.createElement("span", {
    style: appliedStyles
  }, name);
};

ObjectName.propTypes = {
  /** Property name */
  name: _propTypes.default.string,

  /** Should property name be dimmed */
  dimmed: _propTypes.default.bool
};
var _default = ObjectName;
exports.default = _default;