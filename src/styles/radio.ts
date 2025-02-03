/* eslint-disable @typescript-eslint/unbound-method */

import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    _hover: { borderColor: "#0BB1CB", color: "#0BB1CB", bgColor: "white" },
    _active: { borderColor: "#0BB1CB", color: "#0BB1CB", bgColor: "white" },
    _selected: { borderColor: "#0BB1CB", color: "#0BB1CB", bgColor: "white" },
    _checked: {
      borderColor: "#0BB1CB",
      color: "#0BB1CB",
      bgColor: "white",
      _hover: { borderColor: "#0BB1CB", color: "#0BB1CB", bgColor: "white" },
    },
    borderColor: "#212934", // change the border color
  },
});

const baseStyleGreen = definePartsStyle({
  // define the part you're going to style
  control: {
    _hover: { borderColor: "#1F6B3E", color: "#1F6B3E", bgColor: "white" },
    _active: { borderColor: "#1F6B3E", color: "#1F6B3E", bgColor: "white" },
    _selected: { borderColor: "#1F6B3E", color: "#1F6B3E", bgColor: "white" },
    _checked: {
      borderColor: "#1F6B3E",
      color: "#1F6B3E",
      bgColor: "white",
      _hover: { borderColor: "#1F6B3E", color: "#1F6B3E", bgColor: "white" },
    },
    borderColor: "#212934", // change the border color
  },
});

const baseStyleRed = definePartsStyle({
  // define the part you're going to style
  control: {
    _hover: { borderColor: "#811818", color: "#811818", bgColor: "white" },
    _active: { borderColor: "#811818", color: "#811818", bgColor: "white" },
    _selected: { borderColor: "#811818", color: "#811818", bgColor: "white" },
    _checked: {
      borderColor: "#811818",
      color: "#811818",
      bgColor: "white",
      _hover: { borderColor: "#811818", color: "#811818", bgColor: "white" },
    },
    borderColor: "#212934", // change the border color
  },
});

export const radioTheme = defineMultiStyleConfig({
  variants: { baseStyle, baseStyleGreen, baseStyleRed },
});
