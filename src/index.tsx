import './index.css';
import { createStore } from 'redux';


var body = document.getElementById('root') as HTMLBodyElement;
body.innerHTML = "<p>Hello from Simple Redux Typescript App <p>";

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


function render() {
    console.log("DOM will be updated");
    body.innerHTML = `
      <p>
          Clicked: <span id="value">${store.getState().counter.toString()}</span> times
          <button id="increment" >+</button>
          <button id="decrement" >-</button>
      </p>
  `
}

const incrementButton = document.getElementById('increment') as HTMLButtonElement;
incrementButton.addEventListener(
    'click',
    function () {
        store.dispatch({ type: 'INCREMENT' })
    }
)

const decrementButton = document.getElementById('increment') as HTMLButtonElement;
decrementButton.addEventListener(
    'click',
    function () {
        const decrementAction = { type: 'INCREMENT' };
        store.dispatch(decrementAction)
    }
)

render()
store.subscribe(render)

