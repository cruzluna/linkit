"use client";
import { Card, Link } from "@nextui-org/react";
const links = ["github", "leetcode", "twitter"];
// TODO: given links from database map each to a card with a link
// add spacer
const UserLink = () => {
  return (
    <>
      {links.map((data, index) => (
        <Card
          key={index}
          isHoverable
          variant="bordered"
          css={{ mw: "400px", margin: "$3" }}
        >
          <Card.Body>
            <Link block color="primary" href="#">
              {data}
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
export default UserLink;
