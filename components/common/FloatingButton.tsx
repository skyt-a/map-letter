import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FC } from "react";

type FloatingButtonProps = {
  styleType?: "circle" | "square";
} & ButtonProps;

const FloatingButton: FC<FloatingButtonProps> = ({
  children,
  styleType,
  ...rest
}) => {
  return (
    <StyledButton bg="brand.700" color="#fff" styleType={styleType} {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  ${({ styleType }) =>
    styleType === "circle" &&
    `
    border-radius: 50%;
  `}
`;

export default FloatingButton;
