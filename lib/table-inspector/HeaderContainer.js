"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("../styles");

var _TH = _interopRequireDefault(require("./TH"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderContainer = (_ref) => {
  let _ref$indexColumnText = _ref.indexColumnText,
      indexColumnText = _ref$indexColumnText === void 0 ? '(index)' : _ref$indexColumnText,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      sorted = _ref.sorted,
      sortIndexColumn = _ref.sortIndexColumn,
      sortColumn = _ref.sortColumn,
      sortAscending = _ref.sortAscending,
      onTHClick = _ref.onTHClick,
      onIndexTHClick = _ref.onIndexTHClick;
  const styles = (0, _styles.useStyles)('TableInspectorHeaderContainer');
  const borderStyles = (0, _styles.useStyles)('TableInspectorLeftBorder');
  return _react.default.createElement("div", {
    style: styles.base
  }, _react.default.createElement("table", {
    style: styles.table
  }, _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement(_TH.default, {
    borderStyle: borderStyles.none,
    sorted: sorted && sortIndexColumn,
    sortAscending: sortAscending,
    onClick: onIndexTHClick
  }, indexColumnText), columns.map(column => _react.default.createElement(_TH.default, {
    borderStyle: borderStyles.solid,
    key: column,
    sorted: sorted && sortColumn === column,
    sortAscending: sortAscending,
    onClick: onTHClick.bind(void 0, column)
  }, column))))));
};

var _default = HeaderContainer;
exports.default = _default;