import authHelper from "../Helpers/authHelper";
import React, {
  useState
} from "react";

export const UserContext = React.createContext([{}, () => {}]);

export function UserContextProvider(props) {
  const [user, setUser] = useState(() => authHelper.getCurrentUser());

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
