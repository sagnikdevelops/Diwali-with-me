import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

function loadTypeScriptModule(relativePath) {
  const modulePath = path.resolve(relativePath);
  const source = fs.readFileSync(modulePath, "utf-8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const loadedModule = { exports: {} };

  new Function("exports", "require", "module", compiled)(
    loadedModule.exports,
    createRequire(modulePath),
    loadedModule
  );
  return loadedModule.exports;
}

const { decodeGreetingData, encodeGreetingData } = loadTypeScriptModule("src/lib/share-codec.ts");
const { copyToClipboard } = loadTypeScriptModule("src/lib/utils.ts");
const { parseGreetingRequest } = loadTypeScriptModule("src/lib/greeting-request.ts");

test("QA-03: the share codec round-trips real payloads and safely rejects malformed data", () => {
  const sampleCard = {
    template: "spiritual",
    recipient: "Priya & परिवार",
    sender: "Sagnik",
    message: "May this Diwali bring boundless joy and auspicious prosperity!",
    blessing: "शुभ दीपावली!",
  };
  const decoded = decodeGreetingData(encodeGreetingData(sampleCard));

  assert.equal(decoded?.recipient, sampleCard.recipient);
  assert.equal(decoded?.sender, sampleCard.sender);
  assert.equal(decoded?.message, sampleCard.message);
  assert.equal(decoded?.blessing, sampleCard.blessing);
  assert.equal(decoded?.template, sampleCard.template);
  assert.equal(decodeGreetingData(""), null);
  assert.equal(decodeGreetingData("not-valid-base64@@@###"), null);
  assert.equal(decodeGreetingData("bm90LWpzb24="), null);
});

test("API validation rejects invalid input and bounds valid greeting fields", () => {
  assert.deepEqual(parseGreetingRequest([]), {
    ok: false,
    error: "Request body must be a JSON object.",
  });
  assert.deepEqual(parseGreetingRequest({ recipient: 42 }), {
    ok: false,
    error: '"recipient" must be a string.',
  });

  const result = parseGreetingRequest({
    recipient: ` ${"A".repeat(60)} `,
    language: "Hindi",
    theme: "  light  ",
  });
  assert.deepEqual(result, {
    ok: true,
    data: {
      recipient: "A".repeat(50),
      language: "Hindi",
      tone: "Warm & Heartfelt",
      relationship: "Family",
      theme: "light",
    },
  });
});

test("QA-01: both walls filter restored entries by explicit public consent", () => {
  const diyaWall = fs.readFileSync(path.resolve("src/components/diya/WallOfLight.tsx"), "utf-8");
  const wishWall = fs.readFileSync(path.resolve("src/components/lanterns/WishWall.tsx"), "utf-8");

  assert.match(diyaWall, /parsed\.filter\(\(d\) => d\.isPublic === true/);
  assert.match(wishWall, /parsed\.filter\(\(w\) => w\.isPublic === true/);
  assert.match(diyaWall, /if \(newDiya\.isPublic\)/);
  assert.match(wishWall, /if \(lantern\.isPublic\)/);
});

test("QA-04: the clipboard utility uses the Clipboard API and falls back to legacy copy", async () => {
  const originalGlobals = new Map(
    ["window", "navigator", "document"].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ])
  );
  const setGlobal = (key, value) => {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value,
      writable: true,
    });
  };

  try {
    let copiedText;
    setGlobal("window", {});
    setGlobal("navigator", {
      clipboard: {
        writeText: async (text) => {
          copiedText = text;
        },
      },
    });
    assert.equal(await copyToClipboard("https://diwali.test"), true);
    assert.equal(copiedText, "https://diwali.test");

    let removed = false;
    setGlobal("navigator", {
      clipboard: {
        writeText: async () => {
          throw new Error("Clipboard permission denied");
        },
      },
    });
    setGlobal("document", {
      createElement: () => ({
        value: "",
        style: {},
        setAttribute() {},
        focus() {},
        select() {},
      }),
      body: {
        appendChild() {},
        removeChild() {
          removed = true;
        },
      },
      execCommand: () => true,
    });
    assert.equal(await copyToClipboard("https://diwali.test"), true);
    assert.equal(removed, true);
  } finally {
    for (const [key, descriptor] of originalGlobals) {
      if (descriptor) {
        Object.defineProperty(globalThis, key, descriptor);
      } else {
        delete globalThis[key];
      }
    }
  }
});

// Test QA-05: Form Accessibility & Label Association Verification
test("QA-05: Core components have explicit id, htmlFor, and aria-labels on form controls", () => {
  const components = [
    "src/components/diya/DiyaLightModal.tsx",
    "src/components/greeting/GreetingCreator.tsx",
    "src/components/greeting/PhotoGreeting.tsx",
    "src/components/greeting/AiGreetingModal.tsx",
    "src/components/lanterns/SkyLanterns.tsx",
    "src/components/rangoli/RangoliStudio.tsx",
    "src/components/header/FestiveHeader.tsx",
  ];

  for (const compPath of components) {
    const fullPath = path.resolve(compPath);
    assert.equal(fs.existsSync(fullPath), true, `Component file must exist: ${compPath}`);
    const content = fs.readFileSync(fullPath, "utf-8");

    // Must have htmlFor or aria-label attributes
    assert.equal(
      content.includes("htmlFor") || content.includes("aria-label"),
      true,
      `Component ${compPath} must use programmatic labelling (htmlFor or aria-label)`
    );
  }

  const header = fs.readFileSync(path.resolve("src/components/header/FestiveHeader.tsx"), "utf-8");
  assert.match(header, /aria-expanded=\{isMobileMenuOpen\}/);
  assert.match(header, /aria-controls="mobile-navigation-menu"/);
  assert.match(header, /id="mobile-navigation-menu"/);
});

// Test Audio Assets Presence & Integrity
test("Audio Assets: All required background music tracks and sound effects exist", () => {
  const requiredFiles = [
    "public/audio/festive-sitar.mp3",
    "public/audio/bansuri-flute.mp3",
    "public/audio/santoor-celebration.mp3",
    "public/audio/sfx/diya-light.mp3",
    "public/audio/sfx/diya-light.wav",
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.resolve(relPath);
    assert.equal(fs.existsSync(fullPath), true, `Audio asset must exist: ${relPath}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 1000, `Audio asset must not be empty: ${relPath} (size: ${stat.size} bytes)`);
  }
});

// Test Fireworks & Audio Autoplay Configuration
test("User Experience: fireworks are interactive; ambient music autoplays with gesture fallback", () => {
  const fwPath = path.resolve("src/components/fireworks/FireworksCanvas.tsx");
  const fwContent = fs.readFileSync(fwPath, "utf-8");

  // Auto-launch loop must not exist
  assert.equal(fwContent.includes("lastAutoLaunch"), false, "Auto-launch loop must be removed");
  // Hover interaction must exist
  assert.equal(fwContent.includes("onMouseMove"), true, "Must react on cursor hover");
  assert.equal(fwContent.includes("handleHoverInteraction"), true, "Must have hover interaction handler");

  const audioPath = path.resolve("src/components/audio/AudioBar.tsx");
  const audioContent = fs.readFileSync(audioPath, "utf-8");

  assert.match(audioContent, /const tryAutoPlay = \(\) =>/);
  assert.match(audioContent, /tryAutoPlay\(\);/);
  assert.match(audioContent, /window\.addEventListener\("click", tryAutoPlay/);
  assert.match(audioContent, /userExplicitlyPausedRef\.current = true/);
  assert.match(audioContent, /const togglePlay = \(\) =>/);
  assert.match(audioContent, /aria-label=\{isPlaying \? "Pause music" : "Play music"\}/);
  assert.equal(audioContent.includes('preload="auto"'), true, "AudioBar must have preload=auto for instant playback");

  // Verify bansuri-flute.mp3 is the default track (first item in TRACKS array)
  assert.match(
    audioContent,
    /const TRACKS: AudioTrack\[\] = \[\s*\{\s*id: "bansuri",\s*title: "Diwali Celebration Beats",\s*artist: "Festive Background Music",\s*src: "\/audio\/bansuri-flute\.mp3"/
  );
});
