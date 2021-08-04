import type { Action as RAction } from "redux";
import { HYDRATE } from 'next-redux-wrapper';

export interface Action<T extends string, P> extends RAction {
  type: T,
  payload: P
}

export type HydrateAction = Action<typeof HYDRATE, any>


export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
  return { type, payload };
}
