"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ExpandedPathsContext = _interopRequireDefault(require("./ExpandedPathsContext"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _pathUtils = require("./pathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const ConnectedTreeNode = (0, _react.memo)(props => {
  const data = props.data,
        dataIterator = props.dataIterator,
        path = props.path,
        depth = props.depth,
        nodeRenderer = props.nodeRenderer;

  const _useContext = (0, _react.useContext)(_ExpandedPathsContext.default),
        _useContext2 = _slicedToArray(_useContext, 2),
        expandedPaths = _useContext2[0],
        setExpandedPaths = _useContext2[1];

  const nodeHasChildNodes = (0, _pathUtils.hasChildNodes)(data, dataIterator);
  const expanded = !!expandedPaths[path];
  const handleClick = (0, _react.useCallback)(() => nodeHasChildNodes && setExpandedPaths(prevExpandedPaths => _objectSpread({}, prevExpandedPaths, {
    [path]: !expanded
  })), [nodeHasChildNodes, setExpandedPaths, path, expanded]);
  return _react.default.createElement(_TreeNode.default, _extends({
    expanded: expanded,
    onClick: handleClick // show arrow anyway even if not expanded and not rendering children
    ,
    shouldShowArrow: nodeHasChildNodes // show placeholder only for non root nodes
    ,
    shouldShowPlaceholder: depth > 0 // Render a node from name and data (or possibly other props like isNonenumerable)
    ,
    nodeRenderer: nodeRenderer
  }, props), // only render if the node is expanded
  expanded ? [...dataIterator(data)].map((_ref) => {
    let name = _ref.name,
        data = _ref.data,
        renderNodeProps = _objectWithoutProperties(_ref, ["name", "data"]);

    return _react.default.createElement(ConnectedTreeNode, _extends({
      name: name,
      data: data,
      depth: depth + 1,
      path: `${path}.${name}`,
      key: name,
      dataIterator: dataIterator,
      nodeRenderer: nodeRenderer
    }, renderNodeProps));
  }) : null);
});
ConnectedTreeNode.propTypes = {
  name: _propTypes.default.string,
  data: _propTypes.default.any,
  dataIterator: _propTypes.default.func,
  depth: _propTypes.default.number,
  expanded: _propTypes.default.bool,
  nodeRenderer: _propTypes.default.func
};
const TreeView = (0, _react.memo)((_ref2) => {
  let name = _ref2.name,
      data = _ref2.data,
      dataIterator = _ref2.dataIterator,
      nodeRenderer = _ref2.nodeRenderer,
      expandPaths = _ref2.expandPaths,
      expandLevel = _ref2.expandLevel;
  const stateAndSetter = (0, _react.useState)({});

  const _stateAndSetter = _slicedToArray(stateAndSetter, 2),
        setExpandedPaths = _stateAndSetter[1];

  (0, _react.useLayoutEffect)(() => setExpandedPaths(prevExpandedPaths => (0, _pathUtils.getExpandedPaths)(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths)), [data, dataIterator, expandPaths, expandLevel]);
  return _react.default.createElement(_ExpandedPathsContext.default.Provider, {
    value: stateAndSetter
  }, _react.default.createElement(ConnectedTreeNode, {
    name: name,
    data: data,
    dataIterator: dataIterator,
    depth: 0,
    path: _pathUtils.DEFAULT_ROOT_PATH,
    nodeRenderer: nodeRenderer
  }));
});
TreeView.propTypes = {
  name: _propTypes.default.string,
  data: _propTypes.default.any,
  dataIterator: _propTypes.default.func,
  nodeRenderer: _propTypes.default.func,
  expandPaths: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  expandLevel: _propTypes.default.number
};
var _default = TreeView;
exports.default = _default;