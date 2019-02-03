"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ObjectName = _interopRequireDefault(require("../object/ObjectName"));

var _ObjectPreview = _interopRequireDefault(require("./ObjectPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectRootLabel = (_ref) => {
  let name = _ref.name,
      data = _ref.data;

  if (typeof name === 'string') {
    return _react.default.createElement("span", null, _react.default.createElement(_ObjectName.default, {
      name: name
    }), _react.default.createElement("span", null, ": "), _react.default.createElement(_ObjectPreview.default, {
      data: data
    }));
  } else {
    return _react.default.createElement(_ObjectPreview.default, {
      data: data
    });
  }
};

var _default = ObjectRootLabel;
exports.default = _default;