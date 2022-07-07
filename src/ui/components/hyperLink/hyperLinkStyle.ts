import React from "react";
import { lightGreen } from "@app/ui/utils/colors";
import { fontButtonDarkBlue, fontRoboto } from "@app/ui/utils/fonts";

export const hyperLinkStyle: React.CSSProperties = {
  ...fontButtonDarkBlue,
  ...fontRoboto,
  fontWeight: 700,            
  borderBottomColor: lightGreen,
  borderBottomWidth: '4px',
  borderBottomStyle: 'solid',
  paddingTop: 0,
  paddingBottom: '2px',
}