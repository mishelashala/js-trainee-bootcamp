import * as React from "react";
import { userService } from "../services/";
import { IUser } from "../entities/User";
import counterReducer, { increment, decrement, reset } from "../ducks/counter";

export const DashboardView: React.FC = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [counter, dispatch] = React.useReducer(counterReducer, 0);

  React.useEffect(() => {
    (async () => {
      const users = await userService.getAll();
      setUsers(users);
    })();
  }, []);

  return (
    <div>
      {users.map(user => {
        return <p key={user.id}>{user.username}</p>;
      })}

      <p>{counter}</p>

      <button onClick={() => dispatch(increment())}>-</button>
      <button onClick={() => dispatch(decrement())}>reset</button>
      <button onClick={() => dispatch(reset())}>+</button>
    </div>
  );
};
