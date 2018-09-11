'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _reduxImmutable = require('redux-immutable');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flatCombineReducers = function flatCombineReducers(reducers) {
  return function (previousState, action) {
    if (!previousState) {
      return reducers.reduce(function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var reducer = arguments[1];
        return (0, _immutable.fromJS)(_extends({}, (0, _immutable.fromJS)(state).toJS(), reducer(previousState, action).toJS()));
      }, {});
    }
    var combinedReducers = (0, _reduxImmutable.combineReducers)(reducers);
    var combinedPreviousState = (0, _immutable.fromJS)(reducers.reduce(function (accumulatedPreviousStateDictionary, reducer, reducerIndex) {
      return _extends({}, accumulatedPreviousStateDictionary, _defineProperty({}, reducerIndex, previousState));
    }, {}));
    var combinedState = combinedReducers(combinedPreviousState, action).toJS();
    var isStateEqualToPreviousState = function isStateEqualToPreviousState(state) {
      return Object.values(combinedPreviousState.toJS()).filter(function (previousStateForComparison) {
        return (0, _immutable.Map)((0, _immutable.fromJS)(previousStateForComparison)).equals((0, _immutable.Map)((0, _immutable.fromJS)(state)));
      }).length > 0;
    };
    var newState = Object.values(combinedState).reduce(function (accumulatedState, state) {
      return isStateEqualToPreviousState(state) ? _extends({}, state, accumulatedState) : _extends({}, accumulatedState, state);
    }, {});

    return (0, _immutable.fromJS)(newState);
  };
};

var mergeReducers = function mergeReducers() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return flatCombineReducers(reducers);
};

exports.default = mergeReducers;