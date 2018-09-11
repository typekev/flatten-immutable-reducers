# redux-immutable-merge-reducers

Return the flattened output of the redux-immutable combineReducers function.

## Description

Use `redux-immutable-merge-reducers` when you want to combine reducers into one flattened state object.

Import `mergeReducers` as so:

```javascript
import mergeReducers from "redux-immutable-merge-reducers";
```

Then pass any number of reducers you'd like to `mergeReducers` like so:

```javascript
mergeReducers(reducerA, reducerB);
```

Your store should then contain a flattened object with the state of both reducers, similar to the result you would get from using the `spread operator` to combine objects in es6:

```
{ ...stateA, ...stateB };
```

## Example

Given the following reducers:

```javascript
import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";

export const reducerAInitialState = fromJS({
  someStateObject: {
    aNestedStateObject: {
      aDeeplyNestedList: []
    }
  }
});

function reducerA(state = reducerAInitialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default reducerA;
```

```javascript
import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";

export const reducerBInitialState = fromJS({
  someOtherStateObject: {
    anotherNestedStateObject: {
      anotherDeeplyNestedList: []
    }
  },
  moreStateThisTimeAString: "An example string."
});

function reducerB(state = reducerBInitialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default reducerB;
```

And the following reducer:

```javascript
myReducer: mergerReducers(reducerA, reducerB);
```

Your store would contain the following state tree:

```
myReducer: {
  someStateObject: {
    aNestedStateObject: {
      aDeeplyNestedList: []
    }
  },
  someOtherStateObject: {
    anotherNestedStateObject: {
      anotherDeeplyNestedList: []
    }
  },
  moreStateThisTimeAString: "An example string."
};
```

## Installation

`npm i --save redux-immutable-merge-reducers`

`yarn add redux-immutable-merge-reducers`

## License

MIT
