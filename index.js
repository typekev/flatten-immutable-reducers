import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

const flatCombineReducers = reducers => {
  return (previousState, action) => {
    if (!previousState) {
      return reducers.reduce(
        (state = {}, reducer) =>
          fromJS({ ...fromJS(state).toJS(), ...reducer(previousState, action).toJS() }),
        {},
      );
    }
    const combinedReducers = combineReducers(reducers);
    const combinedPreviousState = fromJS(
      reducers.reduce(
        (accumulatedPreviousStateDictionary, reducer, reducerIndex) => ({
          ...accumulatedPreviousStateDictionary,
          [reducerIndex]: previousState,
        }),
        {},
      ),
    );
    const combinedState = combinedReducers(combinedPreviousState, action).toJS();
    const isStateEqualToPreviousState = state =>
      Object.values(combinedPreviousState.toJS()).filter(previousStateForComparison =>
        Map(fromJS(previousStateForComparison)).equals(Map(fromJS(state))),
      ).length > 0;
    const newState = Object.values(combinedState).reduce(
      (accumulatedState, state) =>
        isStateEqualToPreviousState(state)
          ? {
              ...state,
              ...accumulatedState,
            }
          : {
              ...accumulatedState,
              ...state,
            },
      {},
    );

    return fromJS(newState);
  };
};

const mergeReducers = (...reducers) => flatCombineReducers(reducers);

export default mergeReducers;
