import { Box, Button, Container, Link, Typography } from "@mui/material";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import RatingForm from "../../components/RatingForm";
import { firebaseDb } from "../../firebaseConfig";
import { useUserContext } from "../../userContext";

const NewRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userId } = router.query;
  const { users = [], getUsers } = useUserContext();
  const userOptions = users.map((u) => ({ value: u.id, text: u.name }));

  if (userId) {
    const selectedUsers = userOptions.filter((uo) => uo.value === userId);
    if (selectedUsers.length === 0) {
      router.push("/ratings/new");
    }
  }

  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      const newId = nanoid();
      const user = users.find((u) => u.id === values.userId);
      await updateDoc(doc(firebaseDb, "users", values.userId), {
        ratings: arrayUnion({
          ...values,
          id: newId,
          userName: user?.name ?? "",
        }),
      });
      setIsLoading(false);
      getUsers();
      router.push(`/ratings/${newId}${userId ? `?userId=${userId}` : ""}`);
    },
    [getUsers, router, userId, users]
  );
  return (
    <Container>
      <Box>
        <Typography variant="h3">new rating</Typography>
      </Box>
      <Box mb={2}>
        <Link href={`/ratings${userId ? `?userId=${userId}` : ""}`} passHref>
          <Button variant="contained">back to list</Button>
        </Link>
      </Box>
      <Box>
        <RatingForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          userOptions={userOptions}
          selectedUser={userId ?? undefined}
        />
      </Box>
    </Container>
  );
};

export default NewRating;
