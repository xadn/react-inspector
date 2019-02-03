"use strict";

var _expect = _interopRequireDefault(require("expect"));

var _pathUtils = require("./pathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const root = _pathUtils.DEFAULT_ROOT_PATH;
describe('PathUtils', () => {
  beforeEach(() => {});
  it('wildcardPathsFromLevel works', () => {
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(-1)).toEqual([]);
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(0)).toEqual([]);
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(1)).toEqual([root]);
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(2)).toEqual([root, `${root}.*`]);
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(3)).toEqual([root, `${root}.*`, `${root}.*.*`]);
    (0, _expect.default)((0, _pathUtils.wildcardPathsFromLevel)(4)).toEqual([root, `${root}.*`, `${root}.*.*`, `${root}.*.*.*`]);
  }); // it('getExpandedPaths works', () => {
  // })
});