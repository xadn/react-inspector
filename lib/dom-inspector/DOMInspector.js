"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DOMNodePreview = _interopRequireDefault(require("./DOMNodePreview"));

var _TreeView = _interopRequireDefault(require("../tree-view/TreeView"));

var _shouldInline = _interopRequireDefault(require("./shouldInline"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const domIterator = function* domIterator(data) {
  if (data && data.childNodes) {
    const textInlined = (0, _shouldInline.default)(data);

    if (textInlined) {
      return;
    }

    for (let i = 0; i < data.childNodes.length; i++) {
      const node = data.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length === 0) continue;
      yield {
        name: `${node.tagName}[${i}]`,
        data: node
      };
    } // at least 1 child node


    if (data.tagName) {
      yield {
        name: 'CLOSE_TAG',
        data: {
          tagName: data.tagName
        },
        isCloseTag: true
      };
    }
  }
};

const DOMInspector = props => {
  return _react.default.createElement(_TreeView.default, _extends({
    nodeRenderer: _DOMNodePreview.default,
    dataIterator: domIterator
  }, props));
};

DOMInspector.propTypes = {
  // The DOM Node to inspect
  data: _propTypes.default.object.isRequired
};

var _default = (0, _styles.themeAcceptor)(DOMInspector);

exports.default = _default;