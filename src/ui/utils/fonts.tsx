import { green, darkBlue } from './colors';

const fontSora = {
  fontFamily: 'Sora',
  fontStyle: 'normal',
};

const fontRoboto = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
};

const fontTitle1 = {
  ...fontSora,
  fontSize: 50,
  fontWeight: 600,
};

const fontTitle1White = {
  ...fontTitle1,
  color: 'white',
};

const fontTitle1Green = {
  ...fontTitle1,
  color: green,
};

const fontTitle3 = {
  ...fontSora,
  fontSize: 22,
  fontWeight: 600,
};

const fontTitle3White = {
  ...fontTitle3,
  color: 'white',
};

const fontTitle3Black = {
  ...fontTitle3,
  color: 'black',
};

const fontSubTitle = {
  ...fontRoboto,
  fontSize: 20,
  fontWeight: 400,
};

const fontSubTitleWhite = {
  ...fontSubTitle,
  color: 'white',
};

const fontNormal1 = {
  ...fontSora,
  fontSize: 14,
  fontWeight: 400,
};

const fontNormal1White = {
  ...fontNormal1,
  color: 'white',
};

const fontNormal1WhiteMenu = {
  ...fontNormal1,
  fontWeight: 500,
  color: 'white',
};

const fontNormal1WhiteBold = {
  ...fontSora,
  ...fontNormal1,
  fontWeight: 600,
  color: 'white',
};

const fontNormal2 = {
  ...fontSora,
  fontSize: 18,
  fontWeight: 400,
};

const fontNormal2White = {
  ...fontNormal2,
  color: 'white',
};

const fontNormal2Black = {
  ...fontNormal2,
  color: 'black',
};

const fontNormal2BlackBold = {
  ...fontNormal2,
  fontWeight: 600,
  color: 'black',
};

const fontButtonDarkBlue = {
  ...fontRoboto,
  fontSize: 16,
  fontWeight: 500,
  color: darkBlue,
};

const fontButtonWhite = {
  ...fontRoboto,
  fontSize: 16,
  fontWeight: 500,
  color: 'white',
};

export {
  fontSora,
  fontRoboto,
  fontTitle1,
  fontTitle1White,
  fontTitle1Green,
  fontTitle3,
  fontTitle3White,
  fontTitle3Black,
  fontSubTitle,
  fontSubTitleWhite,
  fontNormal1,
  fontNormal1White,
  fontNormal1WhiteMenu,
  fontNormal1WhiteBold,
  fontNormal2,
  fontNormal2White,
  fontNormal2Black,
  fontNormal2BlackBold,
  fontButtonDarkBlue,
  fontButtonWhite,
}