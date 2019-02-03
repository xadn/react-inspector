"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ObjectValue = _interopRequireDefault(require("../object/ObjectValue"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DataContainer = (_ref) => {
  let rows = _ref.rows,
      columns = _ref.columns,
      rowsData = _ref.rowsData;
  const styles = (0, _styles.useStyles)('TableInspectorDataContainer');
  const borderStyles = (0, _styles.useStyles)('TableInspectorLeftBorder');
  return _react.default.createElement("div", {
    style: styles.div
  }, _react.default.createElement("table", {
    style: styles.table
  }, _react.default.createElement("colgroup", null), _react.default.createElement("tbody", null, rows.map((row, i) => _react.default.createElement("tr", {
    key: row,
    style: styles.tr
  }, _react.default.createElement("td", {
    style: _objectSpread({}, styles.td, borderStyles.none)
  }, row), columns.map(column => {
    const rowData = rowsData[i]; // rowData could be
    //  object -> index by key
    //    array -> index by array index
    //    null -> pass
    //  boolean -> pass
    //  string -> pass (hasOwnProperty returns true for [0..len-1])
    //  number -> pass
    //  function -> pass
    //  symbol
    //  undefined -> pass

    if (typeof rowData === 'object' && rowData !== null && rowData.hasOwnProperty(column)) {
      return _react.default.createElement("td", {
        key: column,
        style: _objectSpread({}, styles.td, borderStyles.solid)
      }, _react.default.createElement(_ObjectValue.default, {
        object: rowData[column]
      }));
    } else {
      return _react.default.createElement("td", {
        key: column,
        style: _objectSpread({}, styles.td, borderStyles.solid)
      });
    }
  }))))));
};

var _default = DataContainer;
exports.default = _default;