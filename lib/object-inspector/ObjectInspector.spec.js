"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _ObjectInspector = _interopRequireDefault(require("./ObjectInspector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ObjectInspector', () => {
  it('should render', () => {
    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectInspector.default, null));

    expect(tree).toMatchSnapshot();
  });
  it('passes `nodeRenderer` prop to <TreeView/>', () => {
    const nodeRenderer = () => _react.default.createElement("span", null, "unit test");

    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectInspector.default, {
      nodeRenderer: nodeRenderer
    }));

    expect(tree).toMatchSnapshot();
  });
});