import AuthContext from "../contexts/FirebaseAuthContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
