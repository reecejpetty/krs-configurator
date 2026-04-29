const MAX_SEQUENCE_LENGTH = 58;
const MAX_KEYS = 30;

const MODE_VALUES = new Set([1, 2, 3, 4, 5, 6, 7]);
const LOCK_VALUES = { None: 0, Num: 1, Caps: 2, Scroll: 4 };
const FIRMWARE_VERSION = 1;

// ─────────────────────────────────────────────
//  XML parsing
//  Mirrors xmltodict behaviour:
//    attributes become properties prefixed with @
//    repeated sibling elements become an array
// ─────────────────────────────────────────────
function parseXml(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error(`XML parse error: ${parseError.textContent}`);
  }
  return xmlNodeToDict(doc.documentElement);
}

function xmlNodeToDict(node) {
  const obj = {};

  // Attributes → @name keys (mirrors xmltodict)
  for (const attr of node.attributes ?? []) {
    obj[`@${attr.name}`] = attr.value;
  }

  const children = [...node.children];
  if (children.length === 0) {
    // Leaf node — return text content if no attributes, else merge
    const text = node.textContent.trim();
    if (Object.keys(obj).length === 0) return text || null;
    if (text) obj["#text"] = text;
    return obj;
  }

  for (const child of children) {
    const key = child.tagName;
    const value = xmlNodeToDict(child);
    if (key in obj) {
      // Already seen this tag — convert to array (mirrors xmltodict)
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }

  return obj;
}

// ─────────────────────────────────────────────
//  Keypress  →  2 bytes  [usage, modifier]
// ─────────────────────────────────────────────
function keypressToBytes(desc) {
  const usage    = parseInt(desc["@usage"],    0);  // handles "0x04" etc.
  const modifier = parseInt(desc["@modifier"], 0);
  return new Uint8Array([usage & 0xff, modifier & 0xff]);
}

// ─────────────────────────────────────────────
//  KeySequence  →  (1 + 2*MAX_SEQUENCE_LENGTH) bytes
// ─────────────────────────────────────────────
function keySequenceToBytes(keyDesc) {
  // Mirror Python: inject null seq if 'seq' key is absent
  if (!("seq" in keyDesc)) {
    keyDesc = { seq: { "@usage": "0x00", "@modifier": "0x00" } };
  }

  let seq = keyDesc["seq"];
  // xmltodict gives an object for a single element, array for multiples
  if (!Array.isArray(seq)) seq = [seq];

  const isNull =
    seq.length === 1 &&
    parseInt(seq[0]["@usage"],    0) === 0 &&
    parseInt(seq[0]["@modifier"], 0) === 0;

  const buf = new Uint8Array(1 + 2 * MAX_SEQUENCE_LENGTH); // zero-filled
  buf[0] = isNull ? 0x00 : seq.length;

  let offset = 1;
  for (const k of seq) {
    const kb = keypressToBytes(k);
    buf[offset++] = kb[0];
    buf[offset++] = kb[1];
  }

  return buf;
}

// ─────────────────────────────────────────────
//  Key index translation  (mirrors Python translate_key)
// ─────────────────────────────────────────────
function translateKey(key) {
  const div = Math.floor(key / 10);
  let   mod = key % 10;
  if (mod > 0 && mod < 5) mod = 5 - mod;
  return div * 10 + mod;
}

// ─────────────────────────────────────────────
//  KeyMap  →  bytes
// ─────────────────────────────────────────────
function keyMapToBytes(configDict) {
  const keys = configDict["version"]["key"];

  if (keys.length !== MAX_KEYS) {
    throw new Error(
      `Incorrect number of keys. Found ${keys.length}, expected ${MAX_KEYS}.`
    );
  }

  const seqByteLength = 1 + 2 * MAX_SEQUENCE_LENGTH;
  const buf = new Uint8Array(MAX_KEYS * seqByteLength);

  for (let i = 0; i < MAX_KEYS; i++) {
    const seqBytes = keySequenceToBytes(keys[translateKey(i)]);
    buf.set(seqBytes, i * seqByteLength);
  }

  return buf;
}

// ─────────────────────────────────────────────
//  Config header  (mirrors parse_config_header)
// ─────────────────────────────────────────────
function buildHeader(configDict) {
  const krsConfig = configDict ?? {};
  let   config    = krsConfig["config"] ?? krsConfig["version"]?.["config"] ?? {};

  let mode          = 1;
  let key_sound     = 3;
  let alarm_sound   = 3;
  let alarm_trigger = 0;

  // mode
  const mRaw = parseInt(config["@mode"] ?? 1, 10);
  if (MODE_VALUES.has(mRaw)) {
    mode = mRaw;
  } else {
    console.warn(`Invalid mode: ${config["@mode"]}. Using default (1).`);
  }

  // lock
  const lock = config["@lock"] ?? "None";
  if (lock in LOCK_VALUES) {
    alarm_trigger = LOCK_VALUES[lock];
  } else {
    console.warn(`Invalid lock value: ${lock}. Using default (None).`);
  }

  // volume
  const volume = config["@volume"];
  if (volume != null) {
    const vol = parseInt(volume, 10);
    if ([0, 1, 2, 3].includes(vol)) {
      key_sound = alarm_sound = vol;
    } else {
      console.warn(`Invalid volume value: ${volume}. Ignoring.`);
    }
  }

  // sound off (key clicks only)
  const sound = config["@sound"];
  if (sound && sound.toLowerCase() === "off") {
    key_sound = 0;
  }

  return new Uint8Array([
    0xbb, 0xaa,
    FIRMWARE_VERSION,
    mode,
    key_sound,
    alarm_trigger,
    alarm_sound,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 9 reserved
  ]);
}

// ─────────────────────────────────────────────
//  Main export
//  xmlString: the raw XML string your app generates
//  Returns a Uint8Array of the full .krsb binary
// ─────────────────────────────────────────────
export function krstobin(xmlString) {
  const configDict = parseXml(xmlString);
  console.log(configDict);
  const header     = buildHeader(configDict);
  const keymap     = keyMapToBytes(configDict);

  const out = new Uint8Array(header.length + keymap.length);
  out.set(header, 0);
  out.set(keymap, header.length);
  return out;
}

// ─────────────────────────────────────────────
//  Download helper
// ─────────────────────────────────────────────
export function downloadKrsb(uint8Array, filename = "output.krsb") {
  const url = URL.createObjectURL(
    new Blob([uint8Array], { type: "application/octet-stream" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}