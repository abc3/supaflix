import { createStore } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { reducer, State } from "./reducer";


// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: false });
