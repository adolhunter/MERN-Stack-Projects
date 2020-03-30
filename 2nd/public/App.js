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
      var form = document.forms.issueAdd;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAudHN4Il0sIm5hbWVzIjpbImRhdGVSZWdleCIsIlJlZ0V4cCIsImpzb25EYXRlUmVjZWl2ZXIiLCJrZXkiLCJ2YWx1ZSIsInRlc3QiLCJEYXRlIiwiSXNzdWVGaWx0ZXIiLCJSZWFjdCIsIkNvbXBvbmVudCIsIklzc3VlUm93IiwicHJvcHMiLCJpc3N1ZSIsImlkIiwic3RhdHVzIiwib3duZXIiLCJjcmVhdGVkIiwidG9EYXRlU3RyaW5nIiwiZWZmb3J0IiwiZHVlIiwidGl0bGUiLCJJc3N1ZVRhYmxlIiwiaXNzdWVSb3dzIiwiaXNzdWVzIiwibWFwIiwiSXNzdWVBZGQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybSIsImRvY3VtZW50IiwiZm9ybXMiLCJpc3N1ZUFkZCIsImdldFRpbWUiLCJjcmVhdGVJc3N1ZSIsIklzc3VlTGlzdCIsInN0YXRlIiwibG9hZERhdGEiLCJxdWVyeSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJ0ZXh0IiwicmVzdWx0IiwicGFyc2UiLCJzZXRTdGF0ZSIsImRhdGEiLCJpc3N1ZUxpc3QiLCJ2YXJpYWJsZXMiLCJlbGVtZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsU0FBUyxHQUFHLElBQUlDLE1BQUosQ0FBVyw2QkFBWCxDQUFsQjs7QUFFQSxTQUFTQyxnQkFBVCxDQUEwQkMsR0FBMUIsRUFBbUNDLEtBQW5DLEVBQTBEO0FBQ3hELE1BQUlKLFNBQVMsQ0FBQ0ssSUFBVixDQUFlRCxLQUFmLENBQUosRUFBMkIsT0FBTyxJQUFJRSxJQUFKLENBQVNGLEtBQVQsQ0FBUDtBQUMzQixTQUFPQSxLQUFQO0FBQ0Q7O0lBRUtHLFc7Ozs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCww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QTtBQUFGO0FBQXBCLG1CQUFmO0FBSGlDLGlCQUFiLEM7OztBQUF0QmtDLGdCQUFBQSxRO0FBS04scUJBQUtSLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHTztBQUNQLDBCQUNFLG9CQUFDLEtBQUQsQ0FBTyxRQUFQLHFCQUNFLGdEQURGLGVBRUUsb0JBQUMsV0FBRCxPQUZGLGVBR0UsK0JBSEYsZUFJRSxvQkFBQyxVQUFEO0FBQVksUUFBQSxNQUFNLEVBQUUsS0FBS0QsS0FBTCxDQUFXZDtBQUEvQixRQUpGLGVBS0UsK0JBTEYsZUFNRSxvQkFBQyxRQUFEO0FBQVUsUUFBQSxXQUFXLEVBQUUsS0FBS1k7QUFBNUIsUUFORixDQURGO0FBVUQ7Ozs7RUF2RHFCM0IsS0FBSyxDQUFDQyxTOztBQTBEOUIsSUFBTTZDLE9BQU8sZ0JBQUcsb0JBQUMsU0FBRCxPQUFoQjtBQUVBQyxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JGLE9BQWhCLEVBQXlCdkIsUUFBUSxDQUFDMEIsY0FBVCxDQUF3QixVQUF4QixDQUF6QiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhdGVSZWdleCA9IG5ldyBSZWdFeHAoXCJeXFxcXGRcXFxcZFxcXFxkXFxcXGQtXFxcXGRcXFxcZC1cXFxcZFxcXFxkXCIpO1xyXG5cclxuZnVuY3Rpb24ganNvbkRhdGVSZWNlaXZlcihrZXk6YW55LCB2YWx1ZTphbnkpOkRhdGV8TnVtYmVyIHtcclxuICBpZiAoZGF0ZVJlZ2V4LnRlc3QodmFsdWUpKSByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuY2xhc3MgSXNzdWVGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiA8ZGl2PlRoaXMgaXMgYSBwbGFjZWhvbGRlciBmb3IgdGhlIElzc3VlRmlsdGVyLjwvZGl2PjtcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgSXNzdWVPYmplY3QgPSB7XHJcbiAgaWQ6IG51bWJlcixcclxuICBzdGF0dXM6IHN0cmluZyxcclxuICBvd25lcjogc3RyaW5nLFxyXG4gIGNyZWF0ZWQ6IERhdGU7XHJcbiAgZWZmb3J0OiBudW1iZXIsXHJcbiAgZHVlPzpEYXRlLFxyXG4gIHRpdGxlOiBzdHJpbmcsXHJcbiAga2V5OiBudW1iZXJcclxufVxyXG5cclxudHlwZSByb3dQcm9wcyA9IHtcclxuICBpc3N1ZTogSXNzdWVPYmplY3RcclxufVxyXG5cclxuZnVuY3Rpb24gSXNzdWVSb3cocHJvcHMgOiByb3dQcm9wcykge1xyXG4gIGNvbnN0IGlzc3VlID0gcHJvcHMuaXNzdWU7XHJcbiAgcmV0dXJuIChcclxuICAgIDx0cj5cclxuICAgICAgPHRkPntpc3N1ZS5pZH08L3RkPlxyXG4gICAgICA8dGQ+e2lzc3VlLnN0YXR1c308L3RkPlxyXG4gICAgICA8dGQ+e2lzc3VlLm93bmVyfTwvdGQ+XHJcbiAgICAgIDx0ZD57aXNzdWUuY3JlYXRlZC50b0RhdGVTdHJpbmcoKX08L3RkPlxyXG4gICAgICA8dGQ+e2lzc3VlLmVmZm9ydH08L3RkPlxyXG4gICAgICA8dGQ+e2lzc3VlLmR1ZSA/IGlzc3VlLmR1ZS50b0RhdGVTdHJpbmcoKSA6IFwiXCJ9PC90ZD5cclxuICAgICAgPHRkPntpc3N1ZS50aXRsZX08L3RkPlxyXG4gICAgPC90cj5cclxuICApO1xyXG59XHJcblxyXG50eXBlIFRhYmxlUHJvcHMgPSB7XHJcbiAgaXNzdWVzOiBJc3N1ZU9iamVjdFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBJc3N1ZVRhYmxlKHByb3BzOiBUYWJsZVByb3BzKSB7XHJcbiAgY29uc3QgaXNzdWVSb3dzID0gcHJvcHMuaXNzdWVzLm1hcChpc3N1ZSA9PiAoXHJcbiAgICA8SXNzdWVSb3cga2V5PXtpc3N1ZS5pZH0gaXNzdWU9e2lzc3VlfSAvPlxyXG4gICkpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgPHRoZWFkPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5JRDwvdGg+XHJcbiAgICAgICAgICA8dGg+U3RhdHVzPC90aD5cclxuICAgICAgICAgIDx0aD5Pd25lcjwvdGg+XHJcbiAgICAgICAgICA8dGg+Q3JlYXRlZDwvdGg+XHJcbiAgICAgICAgICA8dGg+RWZmb3J0PC90aD5cclxuICAgICAgICAgIDx0aD5EdWUgRGF0ZTwvdGg+XHJcbiAgICAgICAgICA8dGg+VGl0bGU8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGhlYWQ+XHJcbiAgICAgIDx0Ym9keT57aXNzdWVSb3dzfTwvdGJvZHk+XHJcbiAgICA8L3RhYmxlPlxyXG4gICk7XHJcbn1cclxuXHJcbnR5cGUgQWRkUHJvcHMgPSB7XHJcbiAgY3JlYXRlSXNzdWU6IEZ1bmN0aW9uLFxyXG59XHJcblxyXG5cclxuY2xhc3MgSXNzdWVBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8QWRkUHJvcHM+IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogQWRkUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVN1Ym1pdChlOiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTEZvcm1FbGVtZW50Pikge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLmlzc3VlQWRkO1xyXG4gICAgY29uc3QgaXNzdWUgPSB7XHJcbiAgICAgIG93bmVyOiBmb3JtLm93bmVyLnZhbHVlLFxyXG4gICAgICB0aXRsZTogZm9ybS50aXRsZS52YWx1ZSxcclxuICAgICAgZHVlOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDEwMDAgKiA2MCAqIDYwICogMjQgKiAxMClcclxuICAgIH07XHJcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUlzc3VlKGlzc3VlKTtcclxuICAgIGZvcm0ub3duZXIudmFsdWUgPSBcIlwiO1xyXG4gICAgZm9ybS50aXRsZS52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybSBuYW1lPVwiaXNzdWVBZGRcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJvd25lclwiIHBsYWNlaG9sZGVyPVwiT3duZXJcIiAvPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwiVGl0bGVcIiAvPlxyXG4gICAgICAgIDxidXR0b24+QWRkPC9idXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG50eXBlIExpc3RTdGF0ZSA9IHtcclxuICBpc3N1ZXM6IElzc3VlT2JqZWN0W11cclxufVxyXG5cclxuXHJcbmNsYXNzIElzc3VlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSxMaXN0U3RhdGU+IGltcGxlbWVudHMgSXNzdWVMaXN0e1xyXG4gIGNvbnN0cnVjdG9yKHt9LGlzc3VlczogTGlzdFN0YXRlKSB7XHJcbiAgICBzdXBlcih7fSxpc3N1ZXMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgaXNzdWVzOiBbXSB9O1xyXG4gICAgdGhpcy5jcmVhdGVJc3N1ZSA9IHRoaXMuY3JlYXRlSXNzdWUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICBjb25zdCBxdWVyeSA9IGBxdWVyeSB7XHJcbiAgICAgICAgICAgIGlzc3VlTGlzdHtcclxuICAgICAgICAgICAgICAgIGlkIHRpdGxlIHN0YXR1cyBvd25lciBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWQgZWZmb3J0IGR1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWA7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9ncmFwaHFsXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5IH0pXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKGJvZHksIGpzb25EYXRlUmVjZWl2ZXIpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzc3VlczogcmVzdWx0LmRhdGEuaXNzdWVMaXN0IH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY3JlYXRlSXNzdWUoaXNzdWU6IElzc3VlT2JqZWN0KSB7XHJcbiAgICBjb25zdCBxdWVyeSA9IGBtdXRhdGlvbiBpc3N1ZUFkZCgkaXNzdWU6SXNzdWVJbnB1dHMhKSB7XHJcbiAgICAgICAgaXNzdWVBZGQoaXNzdWU6ICRpc3N1ZSkge1xyXG4gICAgICAgICAgICBpZFxyXG4gICAgICAgIH1cclxuICAgIH1gO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvZ3JhcGhxbFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBxdWVyeSwgdmFyaWFibGVzOiB7IGlzc3VlIH0gfSlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIDxoMT5Jc3N1ZSBUcmFja2VyPC9oMT5cclxuICAgICAgICA8SXNzdWVGaWx0ZXIgLz5cclxuICAgICAgICA8aHIgLz5cclxuICAgICAgICA8SXNzdWVUYWJsZSBpc3N1ZXM9e3RoaXMuc3RhdGUuaXNzdWVzfSAvPlxyXG4gICAgICAgIDxociAvPlxyXG4gICAgICAgIDxJc3N1ZUFkZCBjcmVhdGVJc3N1ZT17dGhpcy5jcmVhdGVJc3N1ZX0gLz5cclxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBlbGVtZW50ID0gPElzc3VlTGlzdCAvPjtcclxuXHJcblJlYWN0RE9NLnJlbmRlcihlbGVtZW50LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRzXCIpKTtcclxuIl19