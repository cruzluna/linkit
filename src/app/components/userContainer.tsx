"use client";
import { FC, ReactNode } from "react";
import { Container, Spacer } from "@nextui-org/react";
type ContainerProps = {
  children?: ReactNode;
};
const UserContainer: FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <Container
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Spacer y={5} />
        {children}
        <Spacer y={5} />
      </Container>
    </>
  );
};
export default UserContainer;
