import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    _checked: defineStyle({
      bgColor: "#000000",
      _hover: {
        bgColor: "#000000"
      }
    }),
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
