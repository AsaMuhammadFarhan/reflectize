/* eslint-disable @typescript-eslint/unbound-method */

import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const brand = definePartsStyle({
  field: {
    _hover: {
      bgColor: "#E1E7EC"
    },
    _placeholder: {
      color: "#AEBECD",
    },
    _disabled: {
      opacity: ".5"
    },
    _invalid: {
      boxShadow: "inset 0px -2px 0px #D72D2D",
    },
    _focus: {},
    bgColor: "#F8F9FA",
    color: "#212934",
    height: "40px",
    borderRadius: "16px",
    padding: "10px 20px 10px 20px",
  },
})

const selectTheme = defineMultiStyleConfig({
  variants: { brand },
});

export default selectTheme;