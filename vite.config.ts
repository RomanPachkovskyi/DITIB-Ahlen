import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// https://vitejs.dev/config/
const SITE_ORIGIN = "https://ditib-ahlen-projekte.de";

// ---------------------------------------------------------------------------
// Dev-only mock for Instagram feed (6 posts, real image URLs from prod cache).
// Active only in dev mode when VITE_INSTAGRAM_MOCK=true.
// Remove or ignore once PHP is deployed to prod with limit=6.
// ---------------------------------------------------------------------------
const instagramMockPlugin = (): Plugin => ({
  name: "instagram-mock",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/instagram-feed.php", (_req, res) => {
      const items = [
        {
          id: "17959912329086189",
          type: "video",
          imageUrl: "https://scontent-fra5-1.cdninstagram.com/v/t51.82787-15/684920493_18086655527132979_5038534442704291470_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=vvw7I28c-ysQ7kNvwHigR7F&_nc_oc=AdrneMJsAsaco6Wq1Px9XbJHNgfbAX7FbUwGtVLFPjboOJRiTtptrZrz-aaXt5b7JXVFnC6faBmYa5SC5kpyeBjh&_nc_zt=23&_nc_ht=scontent-fra5-1.cdninstagram.com&oh=00_Af4nUoI53Gp224cnVJS2GiHO1oYdInmg2PSBRglGQlLCOQ&oe=69FE7184",
          permalink: "https://www.instagram.com/reel/DX3qZaGobd3/",
          caption: "Gemeindefest 2026 · Wir bedanken uns herzlich für die großartige Teilnahme an unserem Gemeindefest!",
          timestamp: "2026-05-03T08:31:02+0000",
          likeCount: 47,
          commentsCount: 5,
        },
        {
          id: "18091040729195370",
          type: "video",
          imageUrl: "https://scontent-fra3-2.cdninstagram.com/v/t51.82787-15/681294250_18085639118132979_7447481348970189210_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=uhABLR0v4TEQ7kNvwGpih8X&_nc_oc=AdoYxy8LN3zr8XRH_W4EPCR6DwQuXuasR04Ry7_I-akOueY7vTwDWtr9XCWlA7ncpZ9n8wwXIY1ca0LmQcSVy_qu&_nc_zt=23&_nc_ht=scontent-fra3-2.cdninstagram.com&oh=00_Af7x-5d1MaKDJ-9RgNOtrLnk50VnyqaTtDmyAzlQB-rVzQ&oe=69FE92AE",
          permalink: "https://www.instagram.com/reel/DXql3RBiE0s/",
          caption: "📍 26.04.2026 | Rathaus Ahlen · Informationsveranstaltung zum geplanten Bildungs- und Begegnungszentrum.",
          timestamp: "2026-04-28T06:37:07+0000",
          likeCount: 63,
          commentsCount: 8,
        },
        {
          id: "17970773499048014",
          type: "image",
          imageUrl: "https://scontent-fra5-1.cdninstagram.com/v/t51.82787-15/674535093_18085291841132979_747564930144808953_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bA7owhtyX2cQ7kNvwHbPUmz&_nc_oc=Ado7hMPLsfqYjns8Pdh9rXFj4_tdfAR1CSHMU10uX2vL86smrROUGAGId2nFN3KQcHZNdI54tb--LnClVmE3ge2Q&_nc_zt=23&_nc_ht=scontent-fra5-1.cdninstagram.com&oh=00_Af5SoqPPMEIyNvsM3zRXNsyRFlyAhw-GnzvRi8p4_8raDw&oe=69FE857D",
          permalink: "https://www.instagram.com/p/DXm69phCIzf/",
          caption: "KERMES – Einladung zum Gemeindefest · Vom 01. bis 03. Mai ist es wieder soweit. Die DITIB Ahlen lädt zum Kermes ein.",
          timestamp: "2026-04-26T20:24:08+0000",
          likeCount: 89,
          commentsCount: 12,
        },
        {
          id: "mock-4",
          type: "video",
          imageUrl: "https://scontent-fra5-1.cdninstagram.com/v/t51.82787-15/684920493_18086655527132979_5038534442704291470_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=vvw7I28c-ysQ7kNvwHigR7F&_nc_oc=AdrneMJsAsaco6Wq1Px9XbJHNgfbAX7FbUwGtVLFPjboOJRiTtptrZrz-aaXt5b7JXVFnC6faBmYa5SC5kpyeBjh&_nc_zt=23&_nc_ht=scontent-fra5-1.cdninstagram.com&oh=00_Af4nUoI53Gp224cnVJS2GiHO1oYdInmg2PSBRglGQlLCOQ&oe=69FE7184",
          permalink: "https://www.instagram.com/ditib_ahlen_projekte/",
          caption: "Kermes Day 1 – Ein wunderschöner Start in unser Gemeindefest. Danke an alle, die dabei waren!",
          timestamp: "2026-05-01T14:00:00+0000",
          likeCount: 34,
          commentsCount: 3,
        },
        {
          id: "mock-5",
          type: "video",
          imageUrl: "https://scontent-fra3-2.cdninstagram.com/v/t51.82787-15/681294250_18085639118132979_7447481348970189210_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=uhABLR0v4TEQ7kNvwGpih8X&_nc_oc=AdoYxy8LN3zr8XRH_W4EPCR6DwQuXuasR04Ry7_I-akOueY7vTwDWtr9XCWlA7ncpZ9n8wwXIY1ca0LmQcSVy_qu&_nc_zt=23&_nc_ht=scontent-fra3-2.cdninstagram.com&oh=00_Af7x-5d1MaKDJ-9RgNOtrLnk50VnyqaTtDmyAzlQB-rVzQ&oe=69FE92AE",
          permalink: "https://www.instagram.com/ditib_ahlen_projekte/",
          caption: "Unser Zukunftsprojekt für Ahlen – ein Bildungs- und Begegnungszentrum, das Generationen verbindet.",
          timestamp: "2026-04-20T10:00:00+0000",
          likeCount: 112,
          commentsCount: 15,
        },
        {
          id: "mock-6",
          type: "image",
          imageUrl: "https://scontent-fra5-1.cdninstagram.com/v/t51.82787-15/674535093_18085291841132979_747564930144808953_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bA7owhtyX2cQ7kNvwHbPUmz&_nc_oc=Ado7hMPLsfqYjns8Pdh9rXFj4_tdfAR1CSHMU10uX2vL86smrROUGAGId2nFN3KQcHZNdI54tb--LnClVmE3ge2Q&_nc_zt=23&_nc_ht=scontent-fra5-1.cdninstagram.com&oh=00_Af5SoqPPMEIyNvsM3zRXNsyRFlyAhw-GnzvRi8p4_8raDw&oe=69FE857D",
          permalink: "https://www.instagram.com/ditib_ahlen_projekte/",
          caption: "Gemeinsam für Ahlen. Jede Spende bringt uns näher an unser Ziel – ein Zentrum für alle.",
          timestamp: "2026-04-15T09:00:00+0000",
          likeCount: 78,
          commentsCount: 9,
        },
      ];
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify({ items, updatedAt: new Date().toISOString(), source: "live" }));
    });
  },
});

export default defineConfig(({ mode }) => {
  const enableInstagramMock = process.env.VITE_INSTAGRAM_MOCK === "true";

  return {
    base: mode === "production" ? `${SITE_ORIGIN}/` : "/",
    server: {
      host: "::",
      port: 8082,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api": {
          target: SITE_ORIGIN,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: [react(), ...(enableInstagramMock ? [instagramMockPlugin()] : [])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
