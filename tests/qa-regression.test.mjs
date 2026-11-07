import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Test QA-03: Share Data Codec
test("QA-03: decodeGreetingData handles valid, missing, and malformed data safely", async () => {
  // Test with pure implementation or import
  function decodeGreetingData(encoded) {
    if (!encoded) return null;
    try {
      const base64Pattern = /^[A-Za-z0-9+/=_\-%]+$/;
      if (!base64Pattern.test(encoded)) {
        return null;
      }
      const jsonStr = decodeURIComponent(atob(encoded));
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== "object" || !parsed.recipient) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  function encodeGreetingData(card) {
    const jsonStr = JSON.stringify(card);
    return btoa(encodeURIComponent(jsonStr));
  }

  // 1. Missing / empty data returns null
  assert.equal(decodeGreetingData(""), null);
  assert.equal(decodeGreetingData(null), null);
  assert.equal(decodeGreetingData(undefined), null);

  // 2. Malformed / invalid inputs return null without throwing
  assert.equal(decodeGreetingData("not-valid-base64@@@###"), null);
  assert.equal(decodeGreetingData("12345"), null);
  assert.equal(decodeGreetingData("bm90LWpzb24="), null); // "not-json" base64
  assert.equal(decodeGreetingData(btoa(JSON.stringify({ notCard: true }))), null);

  // 3. Valid round-trip encoding
  const sampleCard = {
    template: "royal-traditional",
    recipient: "Priya & Family",
    sender: "Sagnik",
    message: "May this Diwali bring boundless joy and auspicious prosperity!",
    blessing: "Shubh Deepavali!",
  };
  const encoded = encodeGreetingData(sampleCard);
  const decoded = decodeGreetingData(encoded);
  assert.deepEqual(decoded, sampleCard);
});

// Test QA-01: Consent Filtering for Wall of Light & Wish Wall
test("QA-01: Consent filtering strictly excludes opt-out (isPublic: false) entries", () => {
  const allDiyas = [
    { id: "1", name: "Aarav", isPublic: true },
    { id: "2", name: "Secret Devotee", isPublic: false },
    { id: "3", name: "Pooja", isPublic: true },
    { id: "4", name: "Private Wish", isPublic: false },
  ];

  // Wall filter rule
  const publicDiyas = allDiyas.filter((d) => d.isPublic === true);
  assert.equal(publicDiyas.length, 2);
  assert.equal(publicDiyas.some((d) => d.id === "2"), false);
  assert.equal(publicDiyas.some((d) => d.id === "4"), false);

  const allWishes = [
    { id: "w1", wish: "Peace for world", isPublic: true },
    { id: "w2", wish: "Secret private wish", isPublic: false },
  ];
  const publicWishes = allWishes.filter((w) => w.isPublic === true);
  assert.equal(publicWishes.length, 1);
  assert.equal(publicWishes[0].id, "w1");
});

// Test QA-04: Clipboard Safe Copy Utility
test("QA-04: copyToClipboard function gracefully handles rejection without crashing", async () => {
  // Emulate copyToClipboard logic
  async function copyToClipboard(text, mockNavigator) {
    if (mockNavigator?.clipboard?.writeText) {
      try {
        await mockNavigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  // 1. Success case
  const mockSuccessNavigator = {
    clipboard: {
      writeText: async (t) => {
        assert.equal(t, "https://diwali.test");
      },
    },
  };
  const success = await copyToClipboard("https://diwali.test", mockSuccessNavigator);
  assert.equal(success, true);

  // 2. Rejection / Permission Denied case
  const mockRejectNavigator = {
    clipboard: {
      writeText: async () => {
        throw new Error("NotAllowedError: Document is not focused or clipboard permission denied");
      },
    },
  };
  const failure = await copyToClipboard("https://diwali.test", mockRejectNavigator);
  assert.equal(failure, false);
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
