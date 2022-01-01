import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback } from "react";
import { useUserContext } from "../../userContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebaseConfig";

const ViewRatings = () => {
  const { users = [], getUsers } = useUserContext();
  const router = useRouter();
  const { userId } = router.query;
  const currentUsers = userId ? users.filter((u) => u.id === userId) : users;
  const currentRatings = currentUsers.reduce(
    (prev, curr) => prev.concat(curr.ratings ?? []),
    []
  );

  const refreshUsers = useCallback(() => {
    getUsers();
  }, [getUsers]);

  const handleDelete = useCallback(
    async (rating) => {
      await updateDoc(doc(firebaseDb, "users", rating.userId), {
        ratings: arrayRemove(rating),
      });
      refreshUsers();
    },
    [refreshUsers]
  );

  return (
    <Container>
      <Box>
        <Typography variant="h3">ratings</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <NextLink href="/" passHref>
          <Button variant="contained">home</Button>
        </NextLink>
        <NextLink
          href={`/ratings/new${!!userId ? `?userId=${userId}` : ""}`}
          passHref
        >
          <Button variant="contained" sx={{ ml: 2 }}>
            new rating
          </Button>
        </NextLink>
        <Button variant="outlined" onClick={refreshUsers} sx={{ ml: 2 }}>
          refresh
        </Button>
        {!!userId && (
          <Fragment>
            <Button
              variant="outlined"
              onClick={() => router.push("/ratings")}
              sx={{ ml: 2 }}
            >
              view all
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push(`/users/${userId}`)}
              sx={{ ml: 2 }}
            >
              view user
            </Button>
          </Fragment>
        )}
      </Box>
      {currentRatings.length === 0 ? (
        <Box>no ratings</Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {!userId && <TableCell>user</TableCell>}
                <TableCell>name</TableCell>
                <TableCell>overall</TableCell>
                <TableCell>boba</TableCell>
                <TableCell>tea</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRatings.map((r, i) => (
                <TableRow key={i}>
                  {!userId && (
                    <TableCell>
                      <NextLink href={`/users/${r.userId}`} passHref>
                        <Link>{r.userName}</Link>
                      </NextLink>
                    </TableCell>
                  )}
                  <TableCell>
                    <NextLink
                      href={`/ratings/${r.id}${
                        userId ? `?userId=${userId}` : ""
                      }`}
                      passHref
                    >
                      <Link>{r.name}</Link>
                    </NextLink>
                  </TableCell>
                  <TableCell>{r.overall ?? "n/a"}</TableCell>
                  <TableCell>{r.boba ?? "n/a"}</TableCell>
                  <TableCell>{r.tea ?? "n/a"}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(r)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ViewRatings;
