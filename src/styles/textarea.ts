import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brand = defineStyle({
  borderRadius: "12px",
  _placeholder: {
    color: "#AEBECD",
  },
  _hover: {
    bgColor: "#E1E7EC",
  },
  _disabled: {
    opacity: ".5",
  },
  _focus: {
    boxShadow: "inset 0px -2px 0px #0BB1CB",
  },
  _invalid: {
    boxShadow: "inset 0px -2px 0px #D72D2D",
  },
  bgColor: "#F8F9FA",
  color: "#212934",
  fontWeight: 500,
  lineHeight: "18px",
  border: "none",
  textAlign: "left", // remove the border radius
});

export const textareaTheme = defineStyleConfig({
  variants: { brand },
});
