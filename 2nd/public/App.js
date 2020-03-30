"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");

function jsonDateReceiver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var IssueFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  var _super = _createSuper(IssueFilter);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _super.apply(this, arguments);
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the IssueFilter.");
    }
  }]);

  return IssueFilter;
}(React.Component);

function IssueRow(props) {
  var issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ""), /*#__PURE__*/React.createElement("td", null, issue.title));
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

var IssueAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueAdd, _React$Component2);

  var _super2 = _createSuper(IssueAdd);

  function IssueAdd(props) {
    var _this;

    _classCallCheck(this, IssueAdd);

    _this = _super2.call(this, props);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.getElementById("issueAdd");
      var issue = {
        owner: form.owner.value,
        title: form.title.value,
        due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
      };
      this.props.createIssue(issue);
      form.owner.value = "";
      form.title.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "issueAdd",
        id: "issueAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueList, _React$Component3);

  var _super3 = _createSuper(IssueList);

  function IssueList(_ref, issues) {
    var _this2;

    _objectDestructuringEmpty(_ref);

    _classCallCheck(this, IssueList);

    _this2 = _super3.call(this, {}, issues);
    _this2.state = {
      issues: []
    };
    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, response, body, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n            issueList{\n                id title status owner \n                created effort due\n            }\n        }";
                _context.next = 3;
                return fetch("/graphql", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                body = _context.sent;
                result = JSON.parse(body, jsonDateReceiver);
                this.setState({
                  issues: result.data.issueList
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createIssue",
    value: function () {
      var _createIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issue) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation issueAdd($issue:IssueInputs!) {\n        issueAdd(issue: $issue) {\n            id\n        }\n    }";
                _context2.next = 3;
                return fetch("/graphql", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      issue: issue
                    }
                  })
                });

              case 3:
                response = _context2.sent;
                this.loadData();

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createIssue(_x) {
        return _createIssue.apply(this, arguments);
      }

      return createIssue;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }));
    }
  }]);

  return IssueList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById("contents"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAudHN4Il0sIm5hbWVzIjpbImRhdGVSZWdleCIsIlJlZ0V4cCIsImpzb25EYXRlUmVjZWl2ZXIiLCJrZXkiLCJ2YWx1ZSIsInRlc3QiLCJEYXRlIiwiSXNzdWVGaWx0ZXIiLCJSZWFjdCIsIkNvbXBvbmVudCIsIklzc3VlUm93IiwicHJvcHMiLCJpc3N1ZSIsImlkIiwic3RhdHVzIiwib3duZXIiLCJjcmVhdGVkIiwidG9EYXRlU3RyaW5nIiwiZWZmb3J0IiwiZHVlIiwidGl0bGUiLCJJc3N1ZVRhYmxlIiwiaXNzdWVSb3dzIiwiaXNzdWVzIiwibWFwIiwiSXNzdWVBZGQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRUaW1lIiwiY3JlYXRlSXNzdWUiLCJJc3N1ZUxpc3QiLCJzdGF0ZSIsImxvYWREYXRhIiwicXVlcnkiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwidGV4dCIsInJlc3VsdCIsInBhcnNlIiwic2V0U3RhdGUiLCJkYXRhIiwiaXNzdWVMaXN0IiwidmFyaWFibGVzIiwiZWxlbWVudCIsIlJlYWN0RE9NIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxTQUFTLEdBQUcsSUFBSUMsTUFBSixDQUFXLDZCQUFYLENBQWxCOztBQUVBLFNBQVNDLGdCQUFULENBQTBCQyxHQUExQixFQUFvQ0MsS0FBcEMsRUFBK0Q7QUFDN0QsTUFBSUosU0FBUyxDQUFDSyxJQUFWLENBQWVELEtBQWYsQ0FBSixFQUEyQixPQUFPLElBQUlFLElBQUosQ0FBU0YsS0FBVCxDQUFQO0FBQzNCLFNBQU9BLEtBQVA7QUFDRDs7SUFFS0csVzs7Ozs7Ozs7Ozs7Ozs2QkFDSztBQUNQLDBCQUFPLDhFQUFQO0FBQ0Q7Ozs7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QkFBQUEsS0FBSyxFQUFMQTtBQUFGO0FBQXBCLG1CQUFmO0FBSGlDLGlCQUFiLEM7OztBQUF0QmlDLGdCQUFBQSxRO0FBS04scUJBQUtSLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHTztBQUNQLDBCQUNFLG9CQUFDLEtBQUQsQ0FBTyxRQUFQLHFCQUNFLGdEQURGLGVBRUUsb0JBQUMsV0FBRCxPQUZGLGVBR0UsK0JBSEYsZUFJRSxvQkFBQyxVQUFEO0FBQVksUUFBQSxNQUFNLEVBQUUsS0FBS0QsS0FBTCxDQUFXYjtBQUEvQixRQUpGLGVBS0UsK0JBTEYsZUFNRSxvQkFBQyxRQUFEO0FBQVUsUUFBQSxXQUFXLEVBQUUsS0FBS1c7QUFBNUIsUUFORixDQURGO0FBVUQ7Ozs7RUF2RHFCMUIsS0FBSyxDQUFDQyxTOztBQTBEOUIsSUFBTTRDLE9BQU8sZ0JBQUcsb0JBQUMsU0FBRCxPQUFoQjtBQUVBQyxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JGLE9BQWhCLEVBQXlCdEIsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF0ZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5cXFxcZFxcXFxkXFxcXGRcXFxcZC1cXFxcZFxcXFxkLVxcXFxkXFxcXGRcIik7XHJcblxyXG5mdW5jdGlvbiBqc29uRGF0ZVJlY2VpdmVyKGtleTogYW55LCB2YWx1ZTogYW55KTogRGF0ZSB8IE51bWJlciB7XHJcbiAgaWYgKGRhdGVSZWdleC50ZXN0KHZhbHVlKSkgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmNsYXNzIElzc3VlRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gPGRpdj5UaGlzIGlzIGEgcGxhY2Vob2xkZXIgZm9yIHRoZSBJc3N1ZUZpbHRlci48L2Rpdj47XHJcbiAgfVxyXG59XHJcblxyXG50eXBlIElzc3VlT2JqZWN0ID0ge1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgb3duZXI6IHN0cmluZztcclxuICBjcmVhdGVkOiBEYXRlO1xyXG4gIGVmZm9ydDogbnVtYmVyO1xyXG4gIGR1ZT86IERhdGU7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBrZXk6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgcm93UHJvcHMgPSB7XHJcbiAgaXNzdWU6IElzc3VlT2JqZWN0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gSXNzdWVSb3cocHJvcHM6IHJvd1Byb3BzKSB7XHJcbiAgY29uc3QgaXNzdWUgPSBwcm9wcy5pc3N1ZTtcclxuICByZXR1cm4gKFxyXG4gICAgPHRyPlxyXG4gICAgICA8dGQ+e2lzc3VlLmlkfTwvdGQ+XHJcbiAgICAgIDx0ZD57aXNzdWUuc3RhdHVzfTwvdGQ+XHJcbiAgICAgIDx0ZD57aXNzdWUub3duZXJ9PC90ZD5cclxuICAgICAgPHRkPntpc3N1ZS5jcmVhdGVkLnRvRGF0ZVN0cmluZygpfTwvdGQ+XHJcbiAgICAgIDx0ZD57aXNzdWUuZWZmb3J0fTwvdGQ+XHJcbiAgICAgIDx0ZD57aXNzdWUuZHVlID8gaXNzdWUuZHVlLnRvRGF0ZVN0cmluZygpIDogXCJcIn08L3RkPlxyXG4gICAgICA8dGQ+e2lzc3VlLnRpdGxlfTwvdGQ+XHJcbiAgICA8L3RyPlxyXG4gICk7XHJcbn1cclxuXHJcbnR5cGUgVGFibGVQcm9wcyA9IHtcclxuICBpc3N1ZXM6IElzc3VlT2JqZWN0W107XHJcbn07XHJcblxyXG5mdW5jdGlvbiBJc3N1ZVRhYmxlKHByb3BzOiBUYWJsZVByb3BzKSB7XHJcbiAgY29uc3QgaXNzdWVSb3dzID0gcHJvcHMuaXNzdWVzLm1hcChpc3N1ZSA9PiAoXHJcbiAgICA8SXNzdWVSb3cga2V5PXtpc3N1ZS5pZH0gaXNzdWU9e2lzc3VlfSAvPlxyXG4gICkpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgPHRoZWFkPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5JRDwvdGg+XHJcbiAgICAgICAgICA8dGg+U3RhdHVzPC90aD5cclxuICAgICAgICAgIDx0aD5Pd25lcjwvdGg+XHJcbiAgICAgICAgICA8dGg+Q3JlYXRlZDwvdGg+XHJcbiAgICAgICAgICA8dGg+RWZmb3J0PC90aD5cclxuICAgICAgICAgIDx0aD5EdWUgRGF0ZTwvdGg+XHJcbiAgICAgICAgICA8dGg+VGl0bGU8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGhlYWQ+XHJcbiAgICAgIDx0Ym9keT57aXNzdWVSb3dzfTwvdGJvZHk+XHJcbiAgICA8L3RhYmxlPlxyXG4gICk7XHJcbn1cclxuXHJcbnR5cGUgQWRkUHJvcHMgPSB7XHJcbiAgY3JlYXRlSXNzdWU6IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxudHlwZSBBZGRGb3JtID0ge1xyXG4gIG93bmVyOiBhbnk7XHJcbiAgdGl0bGU6IGFueTtcclxufTtcclxuXHJcbmNsYXNzIElzc3VlQWRkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEFkZFByb3BzPiB7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEFkZFByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWJtaXQoZTogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlzc3VlQWRkXCIpIGFzIHVua25vd24gYXMgQWRkRm9ybTtcclxuICAgIGNvbnN0IGlzc3VlID0ge1xyXG4gICAgICBvd25lcjogZm9ybS5vd25lci52YWx1ZSxcclxuICAgICAgdGl0bGU6IGZvcm0udGl0bGUudmFsdWUsXHJcbiAgICAgIGR1ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAxMDAwICogNjAgKiA2MCAqIDI0ICogMTApXHJcbiAgICB9O1xyXG4gICAgdGhpcy5wcm9wcy5jcmVhdGVJc3N1ZShpc3N1ZSk7XHJcbiAgICBmb3JtLm93bmVyLnZhbHVlID0gXCJcIjtcclxuICAgIGZvcm0udGl0bGUudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gbmFtZT1cImlzc3VlQWRkXCIgaWQ9XCJpc3N1ZUFkZFwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm93bmVyXCIgcGxhY2Vob2xkZXI9XCJPd25lclwiIC8+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiIC8+XHJcbiAgICAgICAgPGJ1dHRvbj5BZGQ8L2J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgTGlzdFN0YXRlID0ge1xyXG4gIGlzc3VlczogSXNzdWVPYmplY3RbXTtcclxufTtcclxuXHJcbmNsYXNzIElzc3VlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwgTGlzdFN0YXRlPiBpbXBsZW1lbnRzIElzc3VlTGlzdCB7XHJcbiAgY29uc3RydWN0b3Ioe30sIGlzc3VlczogTGlzdFN0YXRlKSB7XHJcbiAgICBzdXBlcih7fSwgaXNzdWVzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGlzc3VlczogW10gfTtcclxuICAgIHRoaXMuY3JlYXRlSXNzdWUgPSB0aGlzLmNyZWF0ZUlzc3VlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMubG9hZERhdGEoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGxvYWREYXRhKCkge1xyXG4gICAgY29uc3QgcXVlcnkgPSBgcXVlcnkge1xyXG4gICAgICAgICAgICBpc3N1ZUxpc3R7XHJcbiAgICAgICAgICAgICAgICBpZCB0aXRsZSBzdGF0dXMgb3duZXIgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVkIGVmZm9ydCBkdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1gO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvZ3JhcGhxbFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBxdWVyeSB9KVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShib2R5LCBqc29uRGF0ZVJlY2VpdmVyKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc3N1ZXM6IHJlc3VsdC5kYXRhLmlzc3VlTGlzdCB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZUlzc3VlKGlzc3VlOiBJc3N1ZU9iamVjdCkge1xyXG4gICAgY29uc3QgcXVlcnkgPSBgbXV0YXRpb24gaXNzdWVBZGQoJGlzc3VlOklzc3VlSW5wdXRzISkge1xyXG4gICAgICAgIGlzc3VlQWRkKGlzc3VlOiAkaXNzdWUpIHtcclxuICAgICAgICAgICAgaWRcclxuICAgICAgICB9XHJcbiAgICB9YDtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2dyYXBocWxcIiwge1xyXG4gICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcXVlcnksIHZhcmlhYmxlczogeyBpc3N1ZSB9IH0pXHJcbiAgICB9KTtcclxuICAgIHRoaXMubG9hZERhdGEoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICA8aDE+SXNzdWUgVHJhY2tlcjwvaDE+XHJcbiAgICAgICAgPElzc3VlRmlsdGVyIC8+XHJcbiAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgPElzc3VlVGFibGUgaXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc30gLz5cclxuICAgICAgICA8aHIgLz5cclxuICAgICAgICA8SXNzdWVBZGQgY3JlYXRlSXNzdWU9e3RoaXMuY3JlYXRlSXNzdWV9IC8+XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZWxlbWVudCA9IDxJc3N1ZUxpc3QgLz47XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoZWxlbWVudCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50c1wiKSk7XHJcbiJdfQ==