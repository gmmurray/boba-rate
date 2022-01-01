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
import { deleteDoc, doc } from "firebase/firestore";
import NextLink from "next/link";
import { useCallback } from "react";
import { firebaseDb } from "../../firebaseConfig";
import { useUserContext } from "../../userContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useRouter } from "next/router";

const Users = () => {
  const { users, getUsers } = useUserContext();
  const router = useRouter();
  const refreshUsers = useCallback(() => {
    getUsers();
  }, [getUsers]);

  const handleDelete = useCallback(
    async (id) => {
      await deleteDoc(doc(firebaseDb, "users", id));
      refreshUsers();
    },
    [refreshUsers]
  );

  return (
    <Container>
      <Box>
        <Typography variant="h3">users</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <NextLink href="/" passHref>
          <Button variant="contained">home</Button>
        </NextLink>
        <NextLink href="/users/new" passHref>
          <Button variant="contained" sx={{ ml: 2 }}>
            new user
          </Button>
        </NextLink>
        <Button variant="outlined" onClick={refreshUsers} sx={{ ml: 2 }}>
          refresh
        </Button>
      </Box>
      {users.length === 0 ? (
        <Box>no users</Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>ratings</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(users ?? []).map((u) => (
                <TableRow key={u.name}>
                  <TableCell>
                    <NextLink href={`/users/${u.id}`} passHref>
                      <Link>{u.name}</Link>
                    </NextLink>
                  </TableCell>
                  <TableCell>{(u.ratings ?? []).length}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => router.push(`/ratings?userId=${u.id}`)}
                    >
                      <ReviewsIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(u.id)}>
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

export default Users;
