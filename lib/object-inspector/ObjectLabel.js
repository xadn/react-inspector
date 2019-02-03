"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ObjectName = _interopRequireDefault(require("../object/ObjectName"));

var _ObjectValue = _interopRequireDefault(require("../object/ObjectValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * if isNonenumerable is specified, render the name dimmed
 */
const ObjectLabel = (_ref) => {
  let name = _ref.name,
      data = _ref.data,
      _ref$isNonenumerable = _ref.isNonenumerable,
      isNonenumerable = _ref$isNonenumerable === void 0 ? false : _ref$isNonenumerable;
  const object = data;
  return _react.default.createElement("span", null, _react.default.createElement(_ObjectName.default, {
    name: name,
    dimmed: isNonenumerable
  }), _react.default.createElement("span", null, ": "), _react.default.createElement(_ObjectValue.default, {
    object: object
  }));
};

ObjectLabel.propTypes = {
  /** Non enumerable object property will be dimmed */
  isNonenumerable: _propTypes.default.bool
};
var _default = ObjectLabel;
exports.default = _default;