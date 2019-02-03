"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _ObjectName = _interopRequireDefault(require("./ObjectName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ObjectName', () => {
  it('should render', () => {
    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectName.default, {
      name: "testvalue"
    }));

    expect(tree).toMatchSnapshot();
  });
  it('should apply dimming if `dimmed` prop is true', () => {
    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectName.default, {
      name: "testvalue",
      dimmed: true
    }));

    expect(tree).toMatchSnapshot();
  });
  it('should not apply dimming if `dimmed` prop is false', () => {
    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectName.default, {
      name: "testvalue",
      dimmed: false
    }));

    expect(tree).toMatchSnapshot();
  });
  it('Accepts and applies additional `style` prop', () => {
    // Test that a custom `style` props is passed and applied to <span/>
    const style = {
      color: 'hotpink'
    };

    const tree = _reactTestRenderer.default.create(_react.default.createElement(_ObjectName.default, {
      styles: style
    }));

    expect(tree).toMatchSnapshot();
  });
});