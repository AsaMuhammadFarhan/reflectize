/* eslint-disable @typescript-eslint/unbound-method */

import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const designSystemInputProps = {
  _placeholder: {
    color: "#AEBECD",
  },
  _hover: {
    bgColor: "#E1E7EC",
  },
  _groupHover: {
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
  textAlign: "left",
}

const sizeProp = {
  small: {
    fontSize: "14px",
    letterSpacing: "0.0125em",
    height: "34px",
    padding: "8px 16px 8px 16px",
    borderRadius: "12px",
  },
  medium: {
    fontSize: "16px",
    letterSpacing: "0.005em",
    height: "40px",
    padding: "10px 20px 10px 20px",
    borderRadius: "16px",
  },
  large: {
    fontSize: "20px",
    letterSpacing: "0.0015em",
    height: "45px",
    padding: "10px 20px 10px 20px",
    borderRadius: "16px",
  },
}

const addonColor = {
  _groupHover: {
    bgColor: "#AEBECD",
  },
  _groupDisabled: {
    opacity: ".5",
  },
  transition: ".2s",
  bgColor: "#E1E7EC",
};

const brandSmall = definePartsStyle({
  addon: {
    ...addonColor,
    ...sizeProp.small,
  },
  field: {
    ...designSystemInputProps,
    ...sizeProp.small,
  },
});

const brandMedium = definePartsStyle({
  addon: {
    ...addonColor,
    ...sizeProp.medium,
  },
  field: {
    ...designSystemInputProps,
    ...sizeProp.medium,
  },
});

const brandLarge = definePartsStyle({
  addon: {
    ...addonColor,
    ...sizeProp.large,
  },
  field: {
    ...designSystemInputProps,
    ...sizeProp.large,
  },
});

const inputTheme = defineMultiStyleConfig({
  variants: {
    brandSmall,
    brandMedium,
    brandLarge,
  },
});

export default inputTheme;