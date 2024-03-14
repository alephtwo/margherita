import * as React from "react";
import { createRoot } from "react-dom/client";
import { Margherita } from "./margherita/Margherita";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, colors } from "@mui/material";
import "./static/favicon.ico";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Lobster",
      color: colors.grey[100],
      textShadow: "2px 2px 5px black",
    },
  },
});

const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Margherita />
  </ThemeProvider>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(app);
