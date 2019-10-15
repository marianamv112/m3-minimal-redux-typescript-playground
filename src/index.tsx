import './index.css';
import { createStore, combineReducers } from 'redux';

var body = document.getElementById('root') as HTMLBodyElement;
body.innerHTML =  `
<div>
<p>
    Counter: <span id="counterValue"></span> times
    <button id="increment" >+</button>
    <button id="decrement" >-</button>
</p>
<div id="colored_rectangle"> </div>
</div>
`

/* This is for the counter*/
const initialState = {
    counter: 0
}

function reducerFunction(state = initialState, action: any) {
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

const colorState = {
    color: "aqua"
}

/* This is for the rectangle */
function changeColor(state = colorState, action: any) {
   
    switch (action.type) {
        case true:
            state.color = "purple"
            return state;
        case false: 
            state.color = "aqua"
            return state;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    reducerFunction, 
    changeColor
})

const store = createStore(allReducers)

const dynamicContent = document.getElementById("counterValue") as HTMLSpanElement;
const dynamicRectangle = document.getElementById("colored_rectangle") as HTMLDivElement;

dynamicRectangle.addEventListener(
    'click',
    function () {
        switch (store.getState().changeColor.color) {
            case "aqua":
                    store.dispatch({type: true})
                break;
            case "purple":
                    store.dispatch({type: false})
                break;
            default:
                break;
        }
    }
)

render();
function render() {
    console.log("DOM will be updated");
    dynamicRectangle.style.backgroundColor = store.getState().changeColor.color;
    dynamicContent.innerHTML = store.getState().reducerFunction.counter.toString();

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

