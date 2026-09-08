const fs = require("fs");
const path = require("path");
const { PurgeCSS } = require("purgecss");

const ROOT = path.resolve(__dirname, "..");

const FONT_AWESOME_CSS = path.join(
  ROOT,
  "node_modules",
  "@fortawesome",
  "fontawesome-free",
  "css",
  "all.css"
);

const OUTPUT_CSS = path.join(
  ROOT,
  "css",
  "fa-purged.css"
);

const SOURCE_DIRS = [
  ROOT
];

const WEBFONTS_SOURCE = path.join(
  ROOT,
  "node_modules",
  "@fortawesome",
  "fontawesome-free",
  "webfonts"
);

const WEBFONTS_DEST = path.join(
  ROOT,
  "webfonts"
);

async function generateFontAwesome() {
  console.log("Generating Font Awesome CSS...");

  if (!fs.existsSync(FONT_AWESOME_CSS)) {
    throw new Error(
      `Font Awesome CSS not found:\n${FONT_AWESOME_CSS}`
    );
  }

  /*
   * Scan the project for Font Awesome classes.
   *
   * This supports:
   *   fas fa-plane-departure
   *   far fa-user
   *   fab fa-react
   *   fa-solid fa-plane-departure
   *   fa-regular fa-user
   *   fa-brands fa-react
   */
  const result = await new PurgeCSS().purge({
    content: [
      path.join(ROOT, "**/*.html"),
      path.join(ROOT, "**/*.htm"),
      path.join(ROOT, "**/*.js"),
      path.join(ROOT, "**/*.jsx"),
      path.join(ROOT, "**/*.ts"),
      path.join(ROOT, "**/*.tsx"),
      path.join(ROOT, "**/*.php"),
    ],

    css: [
      FONT_AWESOME_CSS
    ],

    safelist: {
      /*
       * Keep Font Awesome base classes.
       */
      standard: [
        "fa",
        "fas",
        "far",
        "fab",
        "fa-solid",
        "fa-regular",
        "fa-brands",

        /*
         * Font Awesome utility/state classes
         */
        "fa-spin",
        "fa-pulse",
        "fa-beat",
        "fa-bounce",
        "fa-fade",
        "fa-flip",
        "fa-shake",
        "fa-spin-pulse"
      ],

      /*
       * Keep any Font Awesome selector beginning with fa-
       * if PurgeCSS cannot detect it correctly.
       */
      deep: [
        /^\.fa-/,
        /^\.fas/,
        /^\.far/,
        /^\.fab/
      ]
    },

    /*
     * Keep @font-face declarations.
     */
    keyframes: true,
    fontFace: true,
    variables: true
  });

  if (!result.length) {
    throw new Error(
      "PurgeCSS returned no CSS. Aborting so the existing fa-purged.css is not overwritten."
    );
  }

  const purifiedCSS = result[0].css;

  fs.mkdirSync(path.dirname(OUTPUT_CSS), {
    recursive: true
  });

  fs.writeFileSync(
    OUTPUT_CSS,
    purifiedCSS,
    "utf8"
  );

  console.log(
    `✓ Generated: ${path.relative(ROOT, OUTPUT_CSS)}`
  );

  /*
   * Copy Font Awesome webfonts required by the generated CSS.
   */
  if (fs.existsSync(WEBFONTS_SOURCE)) {
    fs.mkdirSync(WEBFONTS_DEST, {
      recursive: true
    });

    const fontFiles = fs.readdirSync(WEBFONTS_SOURCE);

    for (const file of fontFiles) {
      if (
        file.endsWith(".woff2") ||
        file.endsWith(".woff") ||
        file.endsWith(".ttf")
      ) {
        fs.copyFileSync(
          path.join(WEBFONTS_SOURCE, file),
          path.join(WEBFONTS_DEST, file)
        );

        console.log(`✓ Copied font: ${file}`);
      }
    }
  }

  /*
   * Verify important icon.
   */
  if (purifiedCSS.includes("fa-plane-departure")) {
    console.log("✓ fa-plane-departure found in generated CSS");
  } else {
    console.warn(
      "⚠ fa-plane-departure was NOT found in generated CSS"
    );
  }

  console.log("Font Awesome generation completed.");
}

generateFontAwesome().catch((error) => {
  console.error("\n✗ Font Awesome generation failed:");
  console.error(error);
  process.exit(1);
});