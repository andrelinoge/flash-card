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
}

const store = Redux.createStore(Redux.combineReducers({
  cards: cards
}));

const Application = (props) => {
  return (<div className='App'>
      <h1>Hello!!</h1>
    </div>
  );
};


ReactDOM.render(<Application />, document.getElementById('app_root'));
