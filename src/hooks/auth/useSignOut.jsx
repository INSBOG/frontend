import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

/**
 * @typedef {Function} SignOut
 *
 * @returns {void}
 *
 */
const useSignOut = () => {
  const { signOut } = useContext(AuthContext);
  return signOut;
};

export default useSignOut;
