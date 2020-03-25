/* const element = (
    <div title='Outer div'>
        <h1>Hello World!</h1>
    </div>
); */

const continents = ['africa', 'asia', 'america', 'australia', 'europe']

const helloContinents = Array.from(continents, c => `Hello ${c}!`);
const message = helloContinents.join(' ');

const element = (
    <div title='Outer div'>
        <h1>{message}</h1>
    </div>
);

ReactDOM.render(element, document.getElementById('contents'));