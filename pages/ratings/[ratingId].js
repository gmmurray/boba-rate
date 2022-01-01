import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import RatingForm from "../../components/RatingForm";
import { firebaseDb } from "../../firebaseConfig";
import { useUserContext } from "../../userContext";

const ViewRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { users = [], usersLoading, getUsers } = useUserContext();
  const router = useRouter();
  const { ratingId, userId } = router.query;
  const userOptions = users.map((u) => ({ value: u.id, text: u.name }));
  const currentUser = users.find((u) =>
    (u.ratings ?? []).some((r) => r.id === ratingId)
  );

  const currentRating = (currentUser?.ratings ?? []).find(
    (r) => r.id === ratingId
  );

  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      const newRatings = (currentUser?.ratings ?? []).map((r) => {
        if (r.id === currentRating.id) {
          return values;
        } else {
          return r;
        }
      });
      await updateDoc(doc(firebaseDb, "users", values.userId), {
        ratings: [...newRatings],
      });
      setIsLoading(false);
      getUsers();
    },
    [currentRating, currentUser?.ratings, getUsers]
  );

  if (!usersLoading && !currentRating) {
    router.push("/404");
  }

  return (
    <Container>
      <Box>
        <Typography variant="h3">view rating</Typography>
        <Box mb={2}>
          <Link href={`/ratings${userId ? `?userId=${userId}` : ""}`} passHref>
            <Button variant="contained">back to list</Button>
          </Link>
          <Link
            href={`/ratings/new${userId ? `?userId=${userId}` : ""}`}
            passHref
          >
            <Button variant="contained" sx={{ ml: 2 }}>
              add another rating
            </Button>
          </Link>
          <Link href={`/users/${currentRating.userId}`} passHref>
            <Button variant="contained" sx={{ ml: 2 }}>
              view user
            </Button>
          </Link>
        </Box>
        <Box>
          <RatingForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            initialValues={currentRating}
            userOptions={userOptions}
            selectedUser={userId ?? undefined}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ViewRating;
