import { Element, useNode } from "@craftjs/core";
import React from "react";

import { Button } from "./Button";
import {
  Container,
  ContainerSettings,
  ContainerDefaultProps,
} from "./Container";
import { Text } from "./Text";

export const CardTop = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      ref={connect}
      className="text-only"
      style={{
        padding: "10px",
        marginBottom: "10px",
        borderBottom: "10px solid #eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes) => {
      console.log(5555555555, incomingNodes);
      return incomingNodes.every(
        (incomingNode) => incomingNode.data.type === Text
      );
    },
  },
};

export const CardBottom = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div {...props} style={{ padding: "10px 0" }} ref={connect}>
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};

export const CardContent = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      ref={connect}
      className="text-only"
      style={{
        padding: "10px",
        marginBottom: "10px",
        borderBottom: "10px solid #eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
};

const arraySelect = [Button , Text]

CardContent.craft = {
  rules: {
    canMoveIn: (incomingNodes) => {
      return incomingNodes.every(
        (incomingNode) => arraySelect.includes(incomingNode.data.type)
      );
    },
  },
};


export const Card = ({ background, padding = 100, ...props }) => {
  return (
    <Container {...props} background={background} padding={padding}>
      <Element canvas id="text" is={CardTop} data-cy="card-top">
        <Text text="Only texts" fontSize={20} data-cy="card-top-text-1" />
        <Text
          text="are allowed up here"
          fontSize={15}
          data-cy="card-top-text-2"
        />
      </Element>

      <Element canvas id="buttonAndText"  is={CardContent} data-cy="card-content">
        <Text text="Content card" fontSize={20} data-cy="card-content-text-1" />
        <Text text="card content" fontSize={25} data-cy="card-content-text-2" />
      </Element>

      <Element canvas id="buttons1" is={CardBottom} data-cy="card-bottom">
        <Button
          size="small"
          text="Được đưa button"
          data-cy="card-bottom-button"
        />
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
