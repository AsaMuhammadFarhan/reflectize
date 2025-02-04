export const fontStyle = {
  caption: {
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.004em",
    lineHeight: "15.12px",
  },
  captionRegular: {
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.004em",
    lineHeight: "15.12px",
  },
  captionMedium: {
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.004em",
    lineHeight: "15.12px",
  },
  captionSemibold: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.004em",
    lineHeight: "15.12px",
  },
  captionBold: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.004em",
    lineHeight: "15.12px",
  },
  subtitle2medium: {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.0014em",
  },
  subtitle1bold: {
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.0015em",
    lineHeight: "20.16px",
  },
  subtitle1Semibold: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.0015em",
    lineHeight: "20.16px",
  },
  body2regular: {
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "0.0125em",
    lineHeight: "21px",
  },
  body2medium: {
    fontWeight: 500,
    fontSize: "14px",
    letterSpacing: "0.0125em",
    lineHeight: "21px",
  },
  body2semibold: {
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.0125em",
    lineHeight: "21px",
  },
  body2bold: {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.0125em",
    lineHeight: "21px",
  },
  body2extrabold: {
    fontSize: "14px",
    fontWeight: 800,
    letterSpacing: "0.0125em",
    lineHeight: "21px",
  },
  body1regular: {
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.005em",
    lineHeight: "23px",
  },
  body1medium: {
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.005em",
    lineHeight: "23px",
  },
  body1semibold: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.005em",
    lineHeight: "23px",
  },
  body1bold: {
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.005em",
    lineHeight: "23px",
  },
  body1extrabold: {
    fontSize: "16px",
    fontWeight: 800,
    letterSpacing: "0.005em",
    lineHeight: "23px",
  },
  heading6medium: {
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "0.0015em",
    lineHeight: "25.2px",
  },
  heading6semibold: {
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "0.0015em",
    lineHeight: "25.2px",
  },
  heading6bold: {
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "0.0015em",
    lineHeight: "25.2px",
  },
  heading5semibold: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "30.24px",
  },
  heading5bold: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "30.24px",
  },
  heading5extrabold: {
    fontSize: "24px",
    fontWeight: 800,
    lineHeight: "30.24px",
  },
  heading4semibold: {
    fontSize: "34px",
    fontWeight: 600,
    letterSpacing: "0.0025em",
    lineHeight: "42.84px",
  },
  heading4bold: {
    fontSize: "34px",
    fontWeight: 700,
    letterSpacing: "0.0025em",
    lineHeight: "42.84px",
  },
  heading4extrabold: {
    fontSize: "34px",
    fontWeight: 800,
    letterSpacing: "0.0025em",
    lineHeight: "42.84px",
  },
  heading3semibold: {
    fontSize: "48px",
    fontWeight: 600,
    letterSpacing: "0.0025em",
  },
  heading3bold: {
    fontSize: "48px",
    fontWeight: 700,
    letterSpacing: "0.0025em",
  },
  heading2bold: {
    fontSize: "60px",
    fontWeight: 700,
    letterSpacing: "0.0025em",
  },
};

type CustomFontStyle = {
  fontSize?: string;
  fontWeight?: number;
  letterSpacing?: string;
  lineHeight?: string;
};

export function responsiveFontStyle(
  small: CustomFontStyle,
  large: CustomFontStyle
) {
  return {
    fontSize: [
      small.fontSize ?? null,
      small.fontSize ?? null,
      large.fontSize ?? null,
    ],
    fontWeight: [
      small.fontWeight ?? 500,
      small.fontWeight ?? 500,
      large.fontWeight ?? 500,
    ],
    letterSpacing: [
      small.letterSpacing ?? null,
      small.letterSpacing ?? null,
      large.letterSpacing ?? null,
    ],
    lineHeight: [
      small.lineHeight ?? null,
      small.lineHeight ?? null,
      large.lineHeight ?? null,
    ],
  };
}
