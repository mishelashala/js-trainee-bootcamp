const INCREMENT = "my-app/counter/INCREMENT";
const DECREMENT = "my-app/counter/DECREMENT";
const RESET = "my-app/counter/RESET";

export interface IFluxStandardAction {
  type: string;
  payload?: Object | Error;
  error?: boolean;
}

export default function counter(
  state = 0,
  action: IFluxStandardAction
): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
}

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
