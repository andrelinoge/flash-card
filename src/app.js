// ADD_CARD
// SHOW_ADD_DECK
// HIDE_ADD_DECK

const addDeck     = (name) => ({ type: 'ADD_DECK', data: name });
const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });

const cards = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }
};

const decks = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck = { name: action.data, id: +new Date };
      return state.concat([newDeck]);

    default:
      return state || [];
  }
}

const addingDeck = (state, action) => {
  switch (action.type) {
    case 'SHOW_ADD_DECK': return true;
    case 'HIDE_ADD_DECK': return false;
    default: return !!state;
  }
}

const store = Redux.createStore(Redux.combineReducers({
  cards,
  decks,
  addingDeck
}));

const Sidebar = React.createClass({
  render() {
    let props = this.props;

    return(
      <div className="sider-bar">
        <h2>All decks</h2>
        <ul>
          {props.decks.map((deck, index) =>
            <li key={index}>{deck.name}</li>
          )}
        </ul>

        {props.addingDeck && <input ref='add' />}
      </div>
    );
  }
});

const Application = (props) => {
  return (<div className='application'> {props.children} </div>);
};

function run() {
  let state = store.getState();
  console.log(state);

  ReactDOM.render(
    <Application>
      <Sidebar decks={state.decks} addingDeck={state.addingDeck} />
    </Application>,
    document.getElementById('app_root')
  );
}

run();
store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck('Test deck:' + new Date().toString()));
