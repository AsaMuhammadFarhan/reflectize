/* eslint-disable @typescript-eslint/unbound-method */

import { extendTheme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import inputTheme from "./input";
import selectTheme from "./select";
import colors from "./colorTheme";
import { textareaTheme } from "./textarea";
import buttonTheme from "./buttonTheme";
import { radioTheme } from "./radio";
import { checkboxTheme } from "./checkbox";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    // bg: "blackAlpha.200", //change the background
  },
  dialog: {
    borderRadius: "16px",
    padding: "0px",
  },
  header: {
    fontSize: "20px",
    color: "#212934",
    fontWeight: 700,
  },
  closeButton: {
    bgColor: "#E1E7EC",
    marginTop: "8px",
    marginRight: "8px",
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    color: "#404B5A",
  },
});

const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

const tabsTheme = {
  variants: {
    "code-workspace": {
      tab: {
        color: "#212934",
        _selected: {
          color: "#0BB1CB",
          borderColor: "#0BB1CB",
          boxShadow: "inset 4px 0px 0px #0BB1CB",
          bgColor: "white",
        },
      },
    },
    line: {
      tab: {
        color: "#404B5A",
        fontWeight: "600",
        fontSize: "16px",
        _selected: {
          color: "#0BB1CB",
          borderColor: "#0BB1CB",
        },
      },
    },
  },
};

const fonts = {
  heading: "Geist, serif",
  body: "Geist, serif",
  jakarta: "Plus Jakarta Sans, sans-serif",
  satisfy: "Satisfy, serif",
};

const theme = extendTheme({
  colors,
  fonts,
  components: {
    Tabs: tabsTheme,
    Button: buttonTheme,
    Modal: modalTheme,
    Input: inputTheme,
    Select: selectTheme,
    Textarea: textareaTheme,
    Radio: radioTheme,
    Checkbox: checkboxTheme,
  },
});

export default theme;
