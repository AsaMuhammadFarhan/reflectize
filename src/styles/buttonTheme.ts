import { fontStyle } from "./fontStyle";


// SIDE STYLE
const solidStyle = {
  primary: {
    _hover: { bgColor: "#0994AA" },
    _pressed: { bgColor: "#077B8D" },
    _disabled: { opacity: ".5" },
    bgColor: "#0BB1CB",
    color: "white",
  },
  secondary: {
    _hover: { bgColor: "#AEBECD" },
    _pressed: { bgColor: "#929FB1" },
    _disabled: { opacity: ".5" },
    bgColor: "#CCD4DB",
    color: "#404B5A",
  },
  accent: {
    _hover: { bgColor: "#E78913" },
    _pressed: { bgColor: "#CB7811" },
    _disabled: { opacity: ".5" },
    bgColor: "#EE9A31",
    color: "white",
  },
  success: {
    _hover: { bgColor: "#30A660" },
    _pressed: { bgColor: "#2A9255" },
    _disabled: { opacity: ".5" },
    bgColor: "#37BE6E",
    color: "white",
  },
  warning: {
    _hover: { bgColor: "#DBA400" },
    _pressed: { bgColor: "#B88A00" },
    _disabled: { opacity: ".5" },
    bgColor: "#FFC107",
    color: "white",
  },
  danger: {
    _hover: { bgColor: "#BC2424" },
    _pressed: { bgColor: "#9F1E1E" },
    _disabled: { opacity: ".5" },
    bgColor: "#D72D2D",
    color: "white",
  },
};

const outlineStyle = {
  primary: {
    _hover: { bgColor: "#0BB1CB1A" },
    _pressed: { bgColor: "#0BB1CB33" },
    _disabled: { opacity: ".5" },
    color: "#0BB1CB",
    bgColor: "transparent",
    border: "2px solid #0BB1CB",
  },
  secondary: {
    _hover: { bgColor: "white" },
    _pressed: { bgColor: "white" },
    _disabled: { opacity: ".5" },
    color: "#404B5A",
    bgColor: "transparent",
    border: "2px solid #CCD4DB",
  },
  accent: {
    _hover: { bgColor: "#EE9A311A" },
    _pressed: { bgColor: "#EE9A3133" },
    _disabled: { opacity: ".5" },
    color: "#EE9A31",
    bgColor: "transparent",
    border: "2px solid #EE9A31",
  },
  success: {
    _hover: { bgColor: "#37BE6E1A" },
    _pressed: { bgColor: "#37BE6E33" },
    _disabled: { opacity: ".5" },
    color: "#37BE6E",
    bgColor: "transparent",
    border: "2px solid #37BE6E",
  },
  warning: {
    _hover: { bgColor: "#FFC1071A" },
    _pressed: { bgColor: "#FFC10733" },
    _disabled: { opacity: ".5" },
    color: "#FFC107",
    bgColor: "transparent",
    border: "2px solid #FFC107",
  },
  danger: {
    _hover: { bgColor: "#D72D2D1A" },
    _pressed: { bgColor: "#D72D2D33" },
    _disabled: { opacity: ".5" },
    color: "#D72D2D",
    bgColor: "transparent",
    border: "2px solid #D72D2D",
  },
};

const ghostStyle = {
  primary: {
    _hover: { color: "#0994AA" },
    _pressed: { color: "#077B8D" },
    _disabled: { opacity: ".5" },
    color: "#0BB1CB",
    bgColor: "transparent",
  },
  secondary: {
    _hover: { color: "#AEBECD" },
    _pressed: { color: "#929FB1" },
    _disabled: { opacity: ".5" },
    color: "#CCD4DB",
    bgColor: "transparent",
  },
  accent: {
    _hover: { color: "#E78913" },
    _pressed: { color: "#CB7811" },
    _disabled: { opacity: ".5" },
    color: "#EE9A31",
    bgColor: "transparent",
  },
  success: {
    _hover: { color: "#30A660" },
    _pressed: { color: "#2A9255" },
    _disabled: { opacity: ".5" },
    color: "#37BE6E",
    bgColor: "transparent",
  },
  warning: {
    _hover: { color: "#DBA400" },
    _pressed: { color: "#B88A00" },
    _disabled: { opacity: ".5" },
    color: "#FFC107",
    bgColor: "transparent",
  },
  danger: {
    _hover: { color: "#BC2424" },
    _pressed: { color: "#9F1E1E" },
    _disabled: { opacity: ".5" },
    color: "#D72D2D",
    bgColor: "transparent",
  },
};

const boxStyle = {
  small: {
    alignItems: "center",
    height: "34px",
    borderRadius: "12px",
    padding: "8px 16px 8px 16px",
  },
  medium: {
    alignItems: "center",
    height: "40px",
    borderRadius: "16px",
    padding: "10px 20px 10px 20px",
  },
  large: {
    alignItems: "center",
    height: "45px",
    borderRadius: "16px",
    padding: "10px 20px 10px 20px",
  },
};

// MAIN STYLE
const buttonTheme = {
  variants: {
    "primary-solid-small": {
      ...solidStyle.primary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "primary-solid-medium": {
      ...solidStyle.primary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "primary-solid-large": {
      ...solidStyle.primary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "primary-outline-small": {
      ...outlineStyle.primary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "primary-outline-medium": {
      ...outlineStyle.primary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "primary-outline-large": {
      ...outlineStyle.primary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "primary-ghost-small": {
      ...ghostStyle.primary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "primary-ghost-medium": {
      ...ghostStyle.primary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "primary-ghost-large": {
      ...ghostStyle.primary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "secondary-solid-small": {
      ...solidStyle.secondary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "secondary-solid-medium": {
      ...solidStyle.secondary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "secondary-solid-large": {
      ...solidStyle.secondary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "secondary-outline-small": {
      ...outlineStyle.secondary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "secondary-outline-medium": {
      ...outlineStyle.secondary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "secondary-outline-large": {
      ...outlineStyle.secondary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "secondary-ghost-small": {
      ...ghostStyle.secondary,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "secondary-ghost-medium": {
      ...ghostStyle.secondary,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "secondary-ghost-large": {
      ...ghostStyle.secondary,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "accent-solid-small": {
      ...solidStyle.accent,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "accent-solid-medium": {
      ...solidStyle.accent,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "accent-solid-large": {
      ...solidStyle.accent,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "accent-outline-small": {
      ...outlineStyle.accent,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "accent-outline-medium": {
      ...outlineStyle.accent,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "accent-outline-large": {
      ...outlineStyle.accent,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "accent-ghost-small": {
      ...ghostStyle.accent,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "accent-ghost-medium": {
      ...ghostStyle.accent,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "accent-ghost-large": {
      ...ghostStyle.accent,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "success-solid-small": {
      ...solidStyle.success,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "success-solid-medium": {
      ...solidStyle.success,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "success-solid-large": {
      ...solidStyle.success,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "success-outline-small": {
      ...outlineStyle.success,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "success-outline-medium": {
      ...outlineStyle.success,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "success-outline-large": {
      ...outlineStyle.success,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "success-ghost-small": {
      ...ghostStyle.success,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "success-ghost-medium": {
      ...ghostStyle.success,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "success-ghost-large": {
      ...ghostStyle.success,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "warning-solid-small": {
      ...solidStyle.warning,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "warning-solid-medium": {
      ...solidStyle.warning,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "warning-solid-large": {
      ...solidStyle.warning,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "warning-outline-small": {
      ...outlineStyle.warning,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "warning-outline-medium": {
      ...outlineStyle.warning,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "warning-outline-large": {
      ...outlineStyle.warning,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "warning-ghost-small": {
      ...ghostStyle.warning,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "warning-ghost-medium": {
      ...ghostStyle.warning,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "warning-ghost-large": {
      ...ghostStyle.warning,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "danger-solid-small": {
      ...solidStyle.danger,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "danger-solid-medium": {
      ...solidStyle.danger,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "danger-solid-large": {
      ...solidStyle.danger,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "danger-outline-small": {
      ...outlineStyle.danger,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "danger-outline-medium": {
      ...outlineStyle.danger,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "danger-outline-large": {
      ...outlineStyle.danger,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
    "danger-ghost-small": {
      ...ghostStyle.danger,
      ...boxStyle.small,
      ...fontStyle.body2semibold,
    },
    "danger-ghost-medium": {
      ...ghostStyle.danger,
      ...boxStyle.medium,
      ...fontStyle.body1semibold,
    },
    "danger-ghost-large": {
      ...ghostStyle.danger,
      ...boxStyle.large,
      ...fontStyle.heading6bold,
    },
  },
};

export default buttonTheme;
