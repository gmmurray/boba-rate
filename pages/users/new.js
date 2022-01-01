import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Field, Form } from "react-final-form";
import { firebaseDb } from "../../firebaseConfig";
import UserForm from "../../components/UserForm";
import { useUserContext } from "../../userContext";

const NewUser = () => {
  const { getUsers } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      const result = await addDoc(collection(firebaseDb, "users"), {
        ...values,
      });
      setIsLoading(false);
      getUsers();
      router.push(`/users/${result.id}`);
    },
    [getUsers, router]
  );
  return (
    <Container>
      <Box>
        <Typography variant="h3">add user</Typography>
      </Box>
      <Box mb={2}>
        <Link href="/users" passHref>
          <Button variant="contained">back to list</Button>
        </Link>
      </Box>
      <Box>
        <UserForm onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
    </Container>
  );
};

export default NewUser;
