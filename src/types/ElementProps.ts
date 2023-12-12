import StyleSheetProps from "./StyleSheetProps";

export default interface ElementProps {
  as?: React.ElementType;
  styleSheet?: StyleSheetProps;
  [k: string]: any;
}
