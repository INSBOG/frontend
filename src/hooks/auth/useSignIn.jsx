import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

const useSignIn = () => {
  const { signIn } = useContext(AuthContext);
  return signIn;
};

export default useSignIn;
