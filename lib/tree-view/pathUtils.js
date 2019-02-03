"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasChildNodes = hasChildNodes;
exports.getExpandedPaths = exports.wildcardPathsFromLevel = exports.DEFAULT_ROOT_PATH = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_ROOT_PATH = '$';
exports.DEFAULT_ROOT_PATH = DEFAULT_ROOT_PATH;
const WILDCARD = '*';

function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}

const wildcardPathsFromLevel = level => {
  // i is depth
  return Array.from({
    length: level
  }, (_, i) => [DEFAULT_ROOT_PATH].concat(Array.from({
    length: i
  }, () => '*')).join('.'));
};

exports.wildcardPathsFromLevel = wildcardPathsFromLevel;

const getExpandedPaths = (data, dataIterator, expandPaths, expandLevel, prevExpandedPaths) => {
  let wildcardPaths = [].concat(wildcardPathsFromLevel(expandLevel)).concat(expandPaths).filter(path => typeof path === 'string'); // could be undefined

  const expandedPaths = [];
  wildcardPaths.forEach(wildcardPath => {
    const keyPaths = wildcardPath.split('.');

    const populatePaths = (curData, curPath, depth) => {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }

      const key = keyPaths[depth];

      if (depth === 0) {
        if (hasChildNodes(curData, dataIterator) && (key === DEFAULT_ROOT_PATH || key === WILDCARD)) {
          populatePaths(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          for (let _ref of dataIterator(curData)) {
            let name = _ref.name;
            let data = _ref.data;

            if (hasChildNodes(data, dataIterator)) {
              populatePaths(data, `${curPath}.${name}`, depth + 1);
            }
          }
        } else {
          const value = curData[key];

          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, `${curPath}.${key}`, depth + 1);
          }
        }
      }
    };

    populatePaths(data, '', 0);
  });
  return expandedPaths.reduce((obj, path) => {
    obj[path] = true;
    return obj;
  }, _objectSpread({}, prevExpandedPaths));
};

exports.getExpandedPaths = getExpandedPaths;