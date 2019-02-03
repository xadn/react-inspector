"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ObjectValue = _interopRequireDefault(require("../object/ObjectValue"));

var _ObjectName = _interopRequireDefault(require("../object/ObjectName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTE: Chrome console.log is italic */
const styles = {
  preview: {
    fontStyle: 'italic'
  }
};
/* intersperse arr with separator */

function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]]);
}
/**
 * A preview of the object
 */


const ObjectPreview = (_ref) => {
  let data = _ref.data,
      _ref$maxProperties = _ref.maxProperties,
      maxProperties = _ref$maxProperties === void 0 ? 5 : _ref$maxProperties;
  const object = data;

  if (typeof object !== 'object' || object === null || object instanceof Date || object instanceof RegExp) {
    return _react.default.createElement(_ObjectValue.default, {
      object: object
    });
  }

  if (Array.isArray(object)) {
    const previewArray = object.slice(0, maxProperties).map((element, index) => _react.default.createElement(_ObjectValue.default, {
      key: index,
      object: element
    }));

    if (object.length > maxProperties) {
      previewArray.push(_react.default.createElement("span", {
        key: "ellipsis"
      }, "\u2026"));
    }

    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", null, `Array(${object.length})`), _react.default.createElement("span", {
      style: styles.preview
    }, "[", intersperse(previewArray, ','), "]"));
  } else {
    let propertyNodes = [];

    for (let propertyName in object) {
      const propertyValue = object[propertyName];

      if (object.hasOwnProperty(propertyName)) {
        let ellipsis;

        if (propertyNodes.length === maxProperties - 1 && Object.keys(object).length > maxProperties) {
          ellipsis = _react.default.createElement("span", {
            key: 'ellipsis'
          }, "\u2026");
        }

        propertyNodes.push(_react.default.createElement("span", {
          key: propertyName
        }, _react.default.createElement(_ObjectName.default, {
          name: propertyName || `""`
        }), ":\xA0", _react.default.createElement(_ObjectValue.default, {
          object: propertyValue
        }), ellipsis));
        if (ellipsis) break;
      }
    }

    return _react.default.createElement("span", {
      style: styles.preview
    }, `${object.constructor.name} {`, intersperse(propertyNodes, ', '), '}');
  }
};

ObjectPreview.propTypes = {
  /**
   * max number of properties shown in the property view
   */
  maxProperties: _propTypes.default.number
};
var _default = ObjectPreview;
exports.default = _default;