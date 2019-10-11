import './index.css';
import { createStore } from 'redux';


var body = document.getElementById('root') as HTMLBodyElement;
body.innerHTML =  `
<p>
    Counter: <span id="counterValue"></span> times
    <button id="increment" >+</button>
    <button id="decrement" >-</button>
</p>
`
console.log("Script started");
let initial = {
    counter: 0
}

function reducerFunction(state = initial, action: any) {
    let newState = JSON.parse(JSON.stringify(state));
    console.log("copy of state:" + JSON.stringify(state));
    switch (action.type) {
        case 'INCREMENT':
            newState.counter += 1;
            return newState;
        case 'DECREMENT':
            newState.counter -= 1;
            return newState;
        default:
            return newState
    }
}

var store = createStore(reducerFunction)

const dynamicContent = document.getElementById("counterValue") as HTMLSpanElement;

render();
function render() {
    console.log("DOM will be updated");
    dynamicContent.innerHTML = store.getState().counter.toString();
}

const incrementButton = document.getElementById('increment') as HTMLButtonElement;
incrementButton.addEventListener(
    'click',
    function () {
        store.dispatch({ type: 'INCREMENT' })
    }
)

const decrementButton = document.getElementById('decrement') as HTMLButtonElement;
decrementButton.addEventListener(
    'click',
    function () {
        const decrementAction = { type: 'DECREMENT' };
        store.dispatch(decrementAction)
    }
)


store.subscribe(render);

