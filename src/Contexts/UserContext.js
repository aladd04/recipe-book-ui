import userTokenHelper from "../Helpers/userTokenHelper";
import React, {
  useState
} from "react";

export const UserContext = React.createContext([{}, () => {}]);

export function UserContextProvider(props) {
  const [user, setUser] = useState(() => userTokenHelper.getUserFromToken());

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
