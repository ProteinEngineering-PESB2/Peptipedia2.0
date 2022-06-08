import { createContext } from "react";

interface IAppContext {
  section: string;
  toggleSection: (section: string) => void;
}

export const defaultState = {
  section: "home",
  toggleSection: () => "home"
};

const AppContext = createContext<IAppContext>(defaultState);

export default AppContext;
