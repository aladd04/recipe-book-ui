import React, {
  useState
} from "react";

export const SiteMessageContext = React.createContext([{}, () => {}]);

export function SiteMessageContextProvider(props) {
  const [message, setMessage] = useState("");

  return (
    <SiteMessageContext.Provider value={[message, setMessage]}>
      {props.children}
    </SiteMessageContext.Provider>
  );
}
