import 'styled-components'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      text: string;
      textSecondary: string;
    },
    fonts: {
      openSans: string;
      openSansBold: string;
    },
  }
}