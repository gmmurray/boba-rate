import NextLink from "next/link";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

const cards = [
  {
    link: "/users",
    name: "users",
  },
  {
    link: "/users/new",
    name: "new user",
  },
  {
    link: "/ratings",
    name: "ratings",
  },
  {
    link: "/ratings/new",
    name: "new rating",
  },
];

export default function Home() {
  return (
    <main>
      <Container>
        <Typography variant="h1" gutterBottom>
          boba rate
        </Typography>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={6}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea>
                  <CardContent>
                    <NextLink href={card.link} passHref>
                      <Typography variant="h3">{card.name}</Typography>
                    </NextLink>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
