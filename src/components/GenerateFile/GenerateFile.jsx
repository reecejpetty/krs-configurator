import { useState } from 'react';
import styles from "./GenerateFile.module.css"

function GenerateFile({ activeSwitch, templateName, connection, mode, keypressSound, volume, lockSound, bumpbarButtons }) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US');
  const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  });

  let finalTemplateName = templateName;
  if (finalTemplateName === "") {
    finalTemplateName = "krs_config";
  }
  if (!finalTemplateName.endsWith(".krs")) {
    finalTemplateName += ".krs";
  }

  let xml = "";
  xml += `<?xml version="1.0" encoding="utf-8"?>\n`;
  xml += `<krs_config>\n`;
  xml += `    <properties filename="${finalTemplateName}">\n`;
  xml += `    </properties>\n`;
  xml += `    <version ver="1" date="${formattedDate}" time="${formattedTime}">\n`;
  xml += `        <config connect="${connection}" serial="9600N81" mode="${mode}" sound="${keypressSound ? 'on' : 'off'}" volume="${volume}" lock="${lockSound}">\n`;
  xml += `        </config>\n`;
  for (let i = 0; i < 30; i++) {
    xml += `        <key keynum="${i + 1}">\n`;
    for (const keyPress of bumpbarButtons[i].keypresses) {
      // Only writes <key> if usage and modifier are not empty.
      if (keyPress.usage != "00" && keyPress.usage != "00" && i < activeSwitch * 10) {
        xml += `            <seq usage="0x${keyPress.usage}" modifier="0x${keyPress.modifier}">${keyPress.string}</seq>\n`;
      }
    }
    xml += `        </key>\n`;
  }
  xml += `    </version>\n`;
  xml += `</krs_config>`;

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <h1>Generate File</h1>
      <div className={styles.buttonRow}>
        <button className={showPreview ? styles.previewButtonHide : styles.previewButton} onClick={() => setShowPreview(!showPreview)}>{showPreview ? "Hide" : "Show"} Preview</button>
        <button className={styles.krsButton}>Download KRS File (Wired)</button>
        <button className={styles.krsButton}>Download KRSB File (Wireless)</button>
      </div>
      <div className={showPreview ? styles.filePreview : styles.filePreviewHide}>
        <code><pre>{xml}</pre></code>
      </div>
    </div>
  )
}

export default GenerateFile