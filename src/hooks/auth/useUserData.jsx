import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

/**
 *
 * @typedef {Object} UserData
 * 
 * @property {boolean} isAuthenticated
 * @property {boolean} isAdmin
 * @property {boolean} isPasswordExpired
 * @property {Object} user
 * @property {Function} signIn
 * @property {Function} signOut
 * @property {boolean} loading
 * @property {Function} checkSession
 *
 * @returns {UserData}
 *
 */
const useUserData = () => {
  return useContext(AuthContext);
};

export default useUserData;
