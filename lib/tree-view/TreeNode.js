"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Arrow = (_ref) => {
  let expanded = _ref.expanded,
      styles = _ref.styles;
  return _react.default.createElement("span", {
    style: _objectSpread({}, styles.base, expanded ? styles.expanded : styles.collapsed)
  }, "\u25B6");
};

const TreeNode = (0, _react.memo)(props => {
  props = _objectSpread({
    expanded: true,
    nodeRenderer: (_ref2) => {
      let name = _ref2.name;
      return _react.default.createElement("span", null, name);
    },
    onClick: () => {},
    shouldShowArrow: false,
    shouldShowPlaceholder: true
  }, props);
  const _props = props,
        expanded = _props.expanded,
        onClick = _props.onClick,
        children = _props.children,
        nodeRenderer = _props.nodeRenderer,
        title = _props.title,
        shouldShowArrow = _props.shouldShowArrow,
        shouldShowPlaceholder = _props.shouldShowPlaceholder;
  const styles = (0, _styles.useStyles)('TreeNode');
  const NodeRenderer = nodeRenderer;
  return _react.default.createElement("li", {
    "aria-expanded": expanded,
    role: "treeitem",
    style: styles.treeNodeBase,
    title: title
  }, _react.default.createElement("div", {
    style: styles.treeNodePreviewContainer,
    onClick: onClick
  }, shouldShowArrow || _react.Children.count(children) > 0 ? _react.default.createElement(Arrow, {
    expanded: expanded,
    styles: styles.treeNodeArrow
  }) : shouldShowPlaceholder && _react.default.createElement("span", {
    style: styles.treeNodePlaceholder
  }, "\xA0"), _react.default.createElement(NodeRenderer, props)), _react.default.createElement("ol", {
    role: "group",
    style: styles.treeNodeChildNodesContainer
  }, expanded ? children : undefined));
});
TreeNode.propTypes = {
  name: _propTypes.default.string,
  data: _propTypes.default.any,
  expanded: _propTypes.default.bool,
  shouldShowArrow: _propTypes.default.bool,
  shouldShowPlaceholder: _propTypes.default.bool,
  nodeRenderer: _propTypes.default.func,
  onClick: _propTypes.default.func
};
var _default = TreeNode;
exports.default = _default;