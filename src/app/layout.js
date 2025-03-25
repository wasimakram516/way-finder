import "./styles/globals.css";
import ThemeRegistry from "@/app/styles/themeRegistry"; // assuming you're using a custom MUI registry wrapper

export const metadata = {
  title: "WayFinder",
  description:
    "An interactive wayfinding kiosk app to help visitors locate stores across floors in Mall of Muscat.",
  keywords: "Mall of Muscat, wayfinding, map, shopping, navigation, digital screen",
  author: "WhiteWall Digital Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#c8b178" />
        <link rel="icon" href="/mallLogo.png" type="image/png" />
        <title>WayFinder</title>
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
