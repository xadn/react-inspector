"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _getHeaders2 = _interopRequireDefault(require("./getHeaders"));

var _DataContainer = _interopRequireDefault(require("./DataContainer"));

var _HeaderContainer = _interopRequireDefault(require("./HeaderContainer"));

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const TableInspector = (_ref) => {
  let data = _ref.data,
      columns = _ref.columns;
  const styles = (0, _styles.useStyles)('TableInspector');

  const _useState = (0, _react.useState)({
    // has user ever clicked the <th> tag to sort?
    sorted: false,
    // is index column sorted?
    sortIndexColumn: false,
    // which column is sorted?
    sortColumn: undefined,
    // is sorting ascending or descending?
    sortAscending: false
  }),
        _useState2 = _slicedToArray(_useState, 2),
        _useState2$ = _useState2[0],
        sorted = _useState2$.sorted,
        sortIndexColumn = _useState2$.sortIndexColumn,
        sortColumn = _useState2$.sortColumn,
        sortAscending = _useState2$.sortAscending,
        setState = _useState2[1];

  const handleIndexTHClick = (0, _react.useCallback)(() => {
    setState((_ref2) => {
      let sortIndexColumn = _ref2.sortIndexColumn,
          sortAscending = _ref2.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: true,
        sortColumn: undefined,
        // when changed to a new column, default to asending
        sortAscending: sortIndexColumn ? !sortAscending : true
      };
    });
  }, []);
  const handleTHClick = (0, _react.useCallback)(col => {
    setState((_ref3) => {
      let sortColumn = _ref3.sortColumn,
          sortAscending = _ref3.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: false,
        // update sort column
        sortColumn: col,
        // when changed to a new column, default to asending
        sortAscending: col === sortColumn ? !sortAscending : true
      };
    });
  }, []);

  if (typeof data !== 'object' || data === null) {
    return _react.default.createElement("div", null);
  }

  let _getHeaders = (0, _getHeaders2.default)(data),
      rowHeaders = _getHeaders.rowHeaders,
      colHeaders = _getHeaders.colHeaders; // columns to be displayed are specified
  // NOTE: there's some space for optimization here


  if (columns !== undefined) {
    colHeaders = columns;
  }

  let rowsData = rowHeaders.map(rowHeader => data[rowHeader]);
  let columnDataWithRowIndexes;
  /* row indexes are [0..nRows-1] */
  // TODO: refactor

  if (sortColumn !== undefined) {
    // the column to be sorted (rowsData, column) => [[columnData, rowIndex]]
    columnDataWithRowIndexes = rowsData.map((rowData, index) => {
      // normalize rowData
      if (typeof rowData === 'object' && rowData !== null
      /*&& rowData.hasOwnProperty(sortColumn)*/
      ) {
          const columnData = rowData[sortColumn];
          return [columnData, index];
        }

      return [undefined, index];
    });
  } else {
    if (sortIndexColumn) {
      columnDataWithRowIndexes = rowHeaders.map((rowData, index) => {
        const columnData = rowHeaders[index];
        return [columnData, index];
      });
    }
  }

  if (columnDataWithRowIndexes !== undefined) {
    // apply a mapper before sorting (because we need to access inside a container)
    const comparator = (mapper, ascending) => {
      return (a, b) => {
        const v1 = mapper(a); // the datum

        const v2 = mapper(b);
        const type1 = typeof v1;
        const type2 = typeof v2; // use '<' operator to compare same type of values or compare type precedence order #

        const lt = (v1, v2) => {
          if (v1 < v2) {
            return -1;
          } else if (v1 > v2) {
            return 1;
          } else {
            return 0;
          }
        };

        let result;

        if (type1 === type2) {
          result = lt(v1, v2);
        } else {
          // order of different types
          const order = {
            string: 0,
            number: 1,
            object: 2,
            symbol: 3,
            boolean: 4,
            undefined: 5,
            function: 6
          };
          result = lt(order[type1], order[type2]);
        } // reverse result if descending


        if (!ascending) result = -result;
        return result;
      };
    };

    const sortedRowIndexes = columnDataWithRowIndexes.sort(comparator(item => item[0], sortAscending)).map(item => item[1]); // sorted row indexes

    rowHeaders = sortedRowIndexes.map(i => rowHeaders[i]);
    rowsData = sortedRowIndexes.map(i => rowsData[i]);
  }

  return _react.default.createElement("div", {
    style: styles.base
  }, _react.default.createElement(_HeaderContainer.default, {
    columns: colHeaders
    /* for sorting */
    ,
    sorted: sorted,
    sortIndexColumn: sortIndexColumn,
    sortColumn: sortColumn,
    sortAscending: sortAscending,
    onTHClick: handleTHClick,
    onIndexTHClick: handleIndexTHClick
  }), _react.default.createElement(_DataContainer.default, {
    rows: rowHeaders,
    columns: colHeaders,
    rowsData: rowsData
  }));
};

TableInspector.propTypes = {
  /**
   * the Javascript object you would like to inspect, either an array or an object
   */
  data: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),

  /**
   * An array of the names of the columns you'd like to display in the table
   */
  columns: _propTypes.default.array
};

var _default = (0, _styles.themeAcceptor)(TableInspector);

exports.default = _default;