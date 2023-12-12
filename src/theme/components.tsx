import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as iconSet from "@fortawesome/free-solid-svg-icons";

import { theme } from ".";
import ElementProps from "../types/ElementProps";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const renderCSSValue = (cssPropName: string, cssPropValue: string) => {
  if (cssPropName.includes("horizontal")) {
    return `
      ${cssPropName.replace("horizontal", "left")}: ${cssPropValue};
      ${cssPropName.replace("horizontal", "right")}: ${cssPropValue};
    `;
  }

  if (cssPropName.includes("vertical")) {
    return `
      ${cssPropName.replace("vertical", "top")}: ${cssPropValue};
      ${cssPropName.replace("vertical", "bottom")}: ${cssPropValue};
    `;
  }

  return cssPropName + ":" + cssPropValue + ";";
};

const renderCSS = (props: any, currentBreakpoint: string) => {
  if (!props) return "";

  return Object.keys(props)
    .map((prop) => {
      const cssPropName = prop
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase();
      const cssPropValue = props[prop];
      const isCssPropValueAnObject =
        Object.prototype.toString.call(cssPropValue) === "[object Object]";
      const currentCssPropValue = cssPropValue[currentBreakpoint];

      if (currentBreakpoint == "xs" && !isCssPropValueAnObject) {
        return renderCSSValue(cssPropName, cssPropValue);
      }

      if (currentCssPropValue) {
        return renderCSSValue(cssPropName, currentCssPropValue);
      }
    })
    .filter(Boolean)
    .join("");
};

export const Box = ({ as, styleSheet, ...props }: ElementProps) => {
  const Tag = as || "div";

  let focus,
    hover,
    srOnly,
    restOfStyles = null;
  if (styleSheet) {
    const { focus, hover, srOnly, ...rest } = styleSheet;
    restOfStyles = rest;
  }

  return (
    <React.Fragment>
      <Tag
        {...props}
        className={`${props.className ? props.className : ""} ${
          srOnly ? "sr-only" : ""
        }`}
      />
      <style jsx>{`
        ${Tag} {
          ${renderCSS(restOfStyles, "xs")};
        }
        ${Tag}:hover {
          ${renderCSS(hover, "xs")};
        }
        ${Tag}:focus {
          ${renderCSS(focus, "xs")};
        }
        @media screen and (min-width: ${theme.breakpoints[
            "Breakpoints.sm"
          ]}px) {
          ${Tag} {
            ${renderCSS(restOfStyles, "sm")};
          }
          ${Tag}:hover {
            ${renderCSS(hover, "sm")};
          }
          ${Tag}:focus {
            ${renderCSS(focus, "sm")};
          }
        }
        @media screen and (min-width: ${theme.breakpoints[
            "Breakpoints.md"
          ]}px) {
          ${Tag} {
            ${renderCSS(restOfStyles, "md")};
          }
          ${Tag}:hover {
            ${renderCSS(hover, "md")};
          }
          ${Tag}:focus {
            ${renderCSS(focus, "md")};
          }
        }
        @media screen and (min-width: ${theme.breakpoints[
            "Breakpoints.lg"
          ]}px) {
          ${Tag} {
            ${renderCSS(restOfStyles, "lg")};
          }
          ${Tag}:hover {
            ${renderCSS(hover, "lg")};
          }
          ${Tag}:focus {
            ${renderCSS(focus, "lg")};
          }
        }
        @media screen and (min-width: ${theme.breakpoints[
            "Breakpoints.xl"
          ]}px) {
          ${Tag} {
            ${renderCSS(restOfStyles, "xl")};
          }
          ${Tag}:hover {
            ${renderCSS(hover, "xl")};
          }
          ${Tag}:focus {
            ${renderCSS(focus, "xl")};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

/* @media screen and (min-width: ${theme.breakpoints['Breakpoints.md']}px) {
    ${renderCSS(styleSheet, 'md')};
    :hover {
    ${renderCSS(hover, 'md')};
    }
    :focus {
    ${renderCSS(focus, 'md')};
    }
}
@media screen and (min-width: ${theme.breakpoints['Breakpoints.lg']}px) {
    ${renderCSS(styleSheet, 'lg')};
    :hover {
    ${renderCSS(hover, 'lg')};
    }
    :focus {
    ${renderCSS(focus, 'lg')};
    }
}
@media screen and (min-width: ${theme.breakpoints['Breakpoints.xl']}px) {
    ${renderCSS(styleSheet, 'xl')};
    :hover {
    ${renderCSS(hover, 'xl')};
    }
    :focus {
    ${renderCSS(focus, 'xl')};
    }
} */

export const Icon = ({ as, styleSheet, ...props }: ElementProps) => {
  let iconVariant,
    styleSheetUpdated = null;
  if (styleSheet) {
    const { iconVariant, ...rest } = styleSheet;
    styleSheetUpdated = rest;
  }

  console.log("iconVariant", iconVariant);

  const formattedIconVariant = capitalize(String(iconVariant));
  const icon = iconSet[`fa${formattedIconVariant}` as keyof typeof iconSet];

  return (
    <Box
      as={FontAwesomeIcon}
      icon={icon}
      crossOrigin="anonymous"
      styleSheet={{
        width: "1.5ch",
        height: "1.5ch",
        ...styleSheetUpdated,
      }}
      {...props}
    />
  );
};

export const Text = ({ as, styleSheet, ...props }: ElementProps) => {
  let textVariantRest = {
    fontSize: "inherit",
  };
  let restStyleSheet = null;
  if (styleSheet) {
    let { textVariant, ...rest } = styleSheet;
    restStyleSheet = rest;
    if (textVariant) {
      textVariantRest = textVariant;
    }
  }

  const styleSheetUpdated = { ...textVariantRest, ...restStyleSheet };
  const tag = as || "span";

  return <Box as={tag} styleSheet={styleSheetUpdated} {...props} />;
};

export const Image = ({ as, ...props }: ElementProps) => {
  const tag = as || "img";
  const { children, dangerouslySetInnerHTML, ...imageProps } = props;

  return <Box as={tag} {...imageProps} />;
};

export const Input = ({ as, styleSheet, ...props }: ElementProps) => {
  const tag = "input";
  const finalStyleSheet = {
    transition: "all 0.2s ease-in-out",
    outline: 0,
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral[900],
    boxShadow: `0 5px 7px -5px ${theme.colors.neutral[999]}43`,
    display: "block",
    width: theme.space["x1/1"],
    border: `1px solid ${theme.colors.neutral[300]}`,
    borderRadius: theme.space.x2,
    paddingHorizontal: theme.space.x5,
    paddingVertical: theme.space.x3,
    focus: {
      border: `1px solid ${theme.colors.primary[500]}`,
      boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}43`,
    },
    ...styleSheet,
  };

  return <Text as={tag} styleSheet={finalStyleSheet} {...props} />;
};

export const Button = ({ as, styleSheet, ...props }: ElementProps) => {
  const tag = "button";

  // let buttonVariant = "primary",
  let restStyleSheet = null;
  if (styleSheet) {
    let {
      // buttonVariant,
      ...rest
    } = styleSheet;
    restStyleSheet = rest;
    //   buttonVariant = buttonVariant || "primary";
  }

  const finalStyleSheet = {
    cursor: "pointer",
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral["000"],
    boxShadow: `0 5px 7px -5px ${theme.colors.neutral["999"]}43`,
    display: "block",
    outline: 0,
    width: theme.space["x1/1"],
    border: `${theme.space.xpx} solid ${theme.colors["primary"][900]}`,
    borderRadius: theme.space.x2,
    paddingHorizontal: {
      xs: theme.space.x5,
      sm: theme.space.x10,
    },
    paddingVertical: theme.space.x3,
    transition: "all 0.2s ease-in-out",
    backgroundColor: theme.colors["primary"][600],
    hover: {
      backgroundColor: theme.colors["primary"][500],
      boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}73`,
    },
    focus: {
      backgroundColor: theme.colors["primary"][700],
      boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}93`,
    },
    ...restStyleSheet,
  };

  return <Text as={tag} styleSheet={finalStyleSheet} {...props} />;
};
