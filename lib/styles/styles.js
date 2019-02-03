"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeAcceptor = exports.useStyles = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var themes = _interopRequireWildcard(require("./themes"));

var _base = _interopRequireDefault(require("./base"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const DEFAULT_THEME_NAME = 'chromeLight';
const ThemeContext = (0, _react.createContext)((0, _base.default)(themes[DEFAULT_THEME_NAME]));
/**
 * Hook to get the component styles for the current theme.
 */

const useStyles = key => {
  const themeStyles = (0, _react.useContext)(ThemeContext);
  return themeStyles[key];
};
/**
 * HOC to create a component that accepts a "theme" prop and uses it to set
 * the current theme. This is intended to be used by the top-level inspector
 * components.
 */


exports.useStyles = useStyles;

const themeAcceptor = Component => {
  const ThemeAcceptor = (_ref) => {
    let _ref$theme = _ref.theme,
        theme = _ref$theme === void 0 ? DEFAULT_THEME_NAME : _ref$theme,
        restProps = _objectWithoutProperties(_ref, ["theme"]);

    const themeStyles = (0, _react.useMemo)(() => {
      switch (Object.prototype.toString.call(theme)) {
        case '[object String]':
          return (0, _base.default)(themes[theme]);

        case '[object Object]':
          return (0, _base.default)(theme);

        default:
          return (0, _base.default)(themes[DEFAULT_THEME_NAME]);
      }
    }, [theme]);
    return _react.default.createElement(ThemeContext.Provider, {
      value: themeStyles
    }, _react.default.createElement(Component, restProps));
  };

  ThemeAcceptor.propTypes = {
    theme: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
  };
  return ThemeAcceptor;
};

exports.themeAcceptor = themeAcceptor;