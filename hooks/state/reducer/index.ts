import { combineReducers } from "redux";

export interface State {
}

const r = combineReducers<State>(
  {
  }
)

function getDefaultState(): State {
  return {
  }
}

// export type GroupedActionPayload = Array<T>;
// export type GroupedAction = Action<"ga", GroupedActionPayload>
// export const groupedAction = (payload: GroupedActionPayload): GroupedAction =>
//   createAction('ga', payload)

export function reducer(state: State = getDefaultState(), action: any): State {
  if (action.type === "ga") {
    return action.payload.reduce((acc: any, val: any) => r(acc, val), state);
  }
  return r(state, action);
}

