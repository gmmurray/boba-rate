import { Box, Button, Container, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import UserForm from "../../components/UserForm";
import { firebaseDb } from "../../firebaseConfig";
import { useUserContext } from "../../userContext";

const ViewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { users, usersLoading, getUsers } = useUserContext();
  const router = useRouter();
  const { userId } = router.query;
  const currentUser = users.find((u) => u.id === userId);

  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      const { id, ...valuesWithoutId } = values;
      await setDoc(doc(firebaseDb, "users", userId), valuesWithoutId);
      setIsLoading(false);
      getUsers();
    },
    [getUsers, userId]
  );

  if (!usersLoading && !currentUser) {
    router.push("/404");
  }

  return (
    <Container>
      <Box>
        <Typography variant="h3">view user</Typography>
      </Box>
      <Box mb={2}>
        <Link href="/users" passHref>
          <Button variant="contained">back to list</Button>
        </Link>
        <Link href={`/ratings?userId=${userId}`} passHref>
          <Button variant="contained" sx={{ ml: 2 }}>
            view ratings
          </Button>
        </Link>
        <Link href={`/ratings/new?userId=${userId}`} passHref>
          <Button variant="contained" sx={{ ml: 2 }}>
            add rating
          </Button>
        </Link>
      </Box>
      <Box>
        <UserForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          initialValues={currentUser}
        />
      </Box>
    </Container>
  );
};

export default ViewUser;
