"use strict";

/* const element = (
    <div title='Outer div'>
        <h1>Hello World!</h1>
    </div>
); */
var continents = ['africa', 'asia', 'america', 'australia', 'europe'];
var helloContinents = Array.from(continents, function (c) {
  return "Hello ".concat(c, "!");
});
var message = helloContinents.join(' ');
var element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, message));
ReactDOM.render(element, document.getElementById('contents'));