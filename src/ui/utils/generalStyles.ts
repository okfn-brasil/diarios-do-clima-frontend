import { black, darkBlue, gray5 } from "./colors";
import { fontRoboto } from "./fonts";

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '32px 0 10px 2px',
  color: black
};

export const h2Style: React.CSSProperties = {
  fontSize: '38px',
  lineHeight: '48px',
  color: gray5,
  margin: '22px 0'
}

export const h3Style: React.CSSProperties = {
  fontSize: '22px',
  lineHeight: '27px',
  fontWeight: 600,
  color: darkBlue,
  margin: '22px 0'
}

export const h4Style: React.CSSProperties = {
  fontSize: '20px',
  lineHeight: '25px',
  fontWeight: 500,
  color: gray5,
  margin: '22px 0'
}

export const paragrathStyle: React.CSSProperties = {
  ...fontRoboto,
  fontSize: '18px',
  lineHeight: '22px',
  color: gray5,
  marginBottom: '22px'
}