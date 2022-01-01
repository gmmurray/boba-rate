import { CircularProgress, Container } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { firebaseDb } from "./firebaseConfig";

const UserContext = createContext({ users: [], getUsers: () => {} });
export const useUserContext = () => useContext(UserContext);

const UserContextProvider = (props) => {
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    setUsersLoading(true);
    const q = query(collection(firebaseDb, "users"));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) =>
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    console.log(data);
    setUsers(data);
    setUsersLoading(false);
  }, []);

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const contextValue = {
    users,
    getUsers,
    usersLoading,
  };

  if (usersLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
