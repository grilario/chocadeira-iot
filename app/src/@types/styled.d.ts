import "styled-components";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      text: string;
      textSecondary: string;
      shadow: string;
      secondary: string;
    };
  }
}
