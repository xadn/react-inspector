"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("../styles");

var _shouldInline = _interopRequireDefault(require("./shouldInline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OpenTag = (_ref) => {
  let tagName = _ref.tagName,
      attributes = _ref.attributes,
      styles = _ref.styles;
  return _react.default.createElement("span", {
    style: styles.base
  }, '<', _react.default.createElement("span", {
    style: styles.tagName
  }, tagName), (() => {
    if (attributes) {
      let attributeNodes = [];

      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        attributeNodes.push(_react.default.createElement("span", {
          key: i
        }, ' ', _react.default.createElement("span", {
          style: styles.htmlAttributeName
        }, attribute.name), '="', _react.default.createElement("span", {
          style: styles.htmlAttributeValue
        }, attribute.value), '"'));
      }

      return attributeNodes;
    }
  })(), '>');
}; // isChildNode style={{ marginLeft: -12 /* hack: offset placeholder */ }}


const CloseTag = (_ref2) => {
  let tagName = _ref2.tagName,
      _ref2$isChildNode = _ref2.isChildNode,
      isChildNode = _ref2$isChildNode === void 0 ? false : _ref2$isChildNode,
      styles = _ref2.styles;
  return _react.default.createElement("span", {
    style: Object.assign({}, styles.base, isChildNode && styles.offsetLeft)
  }, '</', _react.default.createElement("span", {
    style: styles.tagName
  }, tagName), '>');
};

const nameByNodeType = {
  1: 'ELEMENT_NODE',
  3: 'TEXT_NODE',
  7: 'PROCESSING_INSTRUCTION_NODE',
  8: 'COMMENT_NODE',
  9: 'DOCUMENT_NODE',
  10: 'DOCUMENT_TYPE_NODE',
  // http://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
  11: 'DOCUMENT_FRAGMENT_NODE'
};

const DOMNodePreview = (_ref3) => {
  let isCloseTag = _ref3.isCloseTag,
      data = _ref3.data,
      expanded = _ref3.expanded;
  const styles = (0, _styles.useStyles)('DOMNodePreview');

  if (isCloseTag) {
    return _react.default.createElement(CloseTag, {
      styles: styles.htmlCloseTag,
      isChildNode: true,
      tagName: data.tagName
    });
  }

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return _react.default.createElement("span", null, _react.default.createElement(OpenTag, {
        tagName: data.tagName,
        attributes: data.attributes,
        styles: styles.htmlOpenTag
      }), (0, _shouldInline.default)(data) ? data.textContent : !expanded && '…', !expanded && _react.default.createElement(CloseTag, {
        tagName: data.tagName,
        styles: styles.htmlCloseTag
      }));

    case Node.TEXT_NODE:
      return _react.default.createElement("span", null, data.textContent);

    case Node.CDATA_SECTION_NODE:
      return _react.default.createElement("span", null, '<![CDATA[' + data.textContent + ']]>');

    case Node.COMMENT_NODE:
      return _react.default.createElement("span", {
        style: styles.htmlComment
      }, '<!--', data.textContent, '-->');

    case Node.PROCESSING_INSTRUCTION_NODE:
      return _react.default.createElement("span", null, data.nodeName);

    case Node.DOCUMENT_TYPE_NODE:
      return _react.default.createElement("span", {
        style: styles.htmlDoctype
      }, '<!DOCTYPE ', data.name, data.publicId ? ` PUBLIC "${data.publicId}"` : '', !data.publicId && data.systemId ? ' SYSTEM' : '', data.systemId ? ` "${data.systemId}"` : '', '>');

    case Node.DOCUMENT_NODE:
      return _react.default.createElement("span", null, data.nodeName);

    case Node.DOCUMENT_FRAGMENT_NODE:
      return _react.default.createElement("span", null, data.nodeName);

    default:
      return _react.default.createElement("span", null, nameByNodeType[data.nodeType]);
  }
};

DOMNodePreview.propTypes = {
  /** If true, just render a close tag */
  isCloseTag: _propTypes.default.bool,

  /**  */
  name: _propTypes.default.string,

  /** The DOM Node */
  data: _propTypes.default.object.isRequired,

  /** Whether the DOM node has been expanded. */
  expanded: _propTypes.default.bool.isRequired
};
var _default = DOMNodePreview;
exports.default = _default;