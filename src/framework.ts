export type StatefulElement<T = unknown> = Element & {
  state?: T;
};

export const state = <T = unknown>(el: StatefulElement<T>): T | undefined =>
  (el.state as T) ?? undefined;

export const setState = <T>(el: StatefulElement<T>, state: T) => {
  el.state = state;
};
