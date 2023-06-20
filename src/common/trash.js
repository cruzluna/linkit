// import Image from "next/image";
// import styles from "./page.module.css";

"use client";
import { Container, Card, Grid, Row, Text } from "@nextui-org/react";

export default function Home() {
  // Container
  // avatar
  // text area - bio
  // cards
  //  |
  //  |-->Link
  // icons - nested container with images for experience
  return (
    <main>
      <Container>
        <Card css={{ $$cardColor: "$colors$primary" }}>
          <Card.Body>
            <Row justify="center" align="center">
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                NextUI gives you the best developer experience with all the
                features you need for building beautiful and modern websites and
                applications.
              </Text>
            </Row>
          </Card.Body>
        </Card>
        <Grid xs={4}>
          <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
          <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
          <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
          <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Container>
    </main>
  );
}
