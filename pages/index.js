import Head from "next/head";
import { Fragment, useEffect } from "react";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { firebaseDb } from "../firebaseConfig";
import NextLink from "next/link";
import { Container, Link } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <main>
        <div>
          <h1>boba rate</h1>
          <NextLink href="/users" passHref>
            <Link>users</Link>
          </NextLink>
          <br />
          <NextLink href="/users/new" passHref>
            <Link>new user</Link>
          </NextLink>
          <br />
          <NextLink href="/ratings" passHref>
            <Link>ratings</Link>
          </NextLink>
          <br />
          <NextLink href="/ratings/new" passHref>
            <Link>new rating</Link>
          </NextLink>
        </div>
      </main>
    </Container>
  );
}
