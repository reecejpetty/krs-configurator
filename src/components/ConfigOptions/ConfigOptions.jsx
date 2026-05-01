import styles from './ConfigOptions.module.css'
import keyboardHexMap from "../../keyboardhexmap.json"

function ConfigOptions({ templateName, setTemplateName, connection, setConnection, mode, setMode, keypressSound, setKeypressSound, volume, setVolume, lockSound, setLockSound, setBumpbarButtons }) {
  return (
    <div>
      <h1>Configuration Options</h1>
      <div id="config-options" className={styles.configOptions}>
        <FileUpload
          templateName={templateName}
          setTemplateName={setTemplateName}
          setConnection={setConnection}
          mode={mode}
          setMode={setMode}
          setKeypressSound={setKeypressSound}
          setVolume={setVolume}
          setLockSound={setLockSound}
          setBumpbarButtons={setBumpbarButtons}
        />
        <Connection connection={connection} setConnection={setConnection} />
        <Mode mode={mode} setMode={setMode} />
        <KeypressSound keypressSound={keypressSound} setKeypressSound={setKeypressSound} volume={volume} setVolume={setVolume} />
        <Beeper lockSound={lockSound} setLockSound={setLockSound} />
      </div>
    </div>
  )
}

function FileUpload({ templateName, setTemplateName, setConnection, mode, setMode, setKeypressSound, setVolume, setLockSound, setBumpbarButtons }) {
  const modifierHexMap = {
    "0F": "[CTRL + SHIFT + ALT + WIN] + ",
    "0E": "[SHIFT + ALT + WIN] + ",
    "0D": "[CTRL + ALT + WIN] + ",
    "0C": "[ALT + WIN] + ",
    "0B": "[CTRL + SHIFT + WIN] + ",
    "0A": "[SHIFT + WIN] + ",
    "09": "[CTRL + WIN] + ",
    "08": "[WIN] + ",
    "07": "[CTRL + SHIFT + ALT] + ",
    "06": "[SHIFT + ALT] + ",
    "05": "[CTRL + ALT] + ",
    "04": "[ALT] + ",
    "03": "[CTRL + SHIFT] + ",
    "02": "[SHIFT] + ",
    "01": "[CTRL] + ",
    "00": ""
  }

  const getModifierString = (usage, modifier, char) => {
    // Do not include modifier string if Repeat or Pause
    if (usage == "FE" || usage == "FD") {
      return "";
    }
    // If the key is a shifted character, adjust the modifier string to reflect the actual modifier used.
    if (keyboardHexMap[char]["modifier"] == "02") {
      // No modifier string if the modifier is just shift, otherwise subtract shift from modifier.
      if (modifier =="02") {
        return "";
      } else {
        const dec = parseInt(modifier, 16) - parseInt("02", 16);
        return modifierHexMap[`0${dec.toString(16).toUpperCase()}`];
      }
    }
    return modifierHexMap[modifier];
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTemplateName(file.name.replace(".krs", ""));
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const parser = new DOMParser();
        const krsFile = parser.parseFromString(fileData, 'application/xml');
        console.log(krsFile);
        const config = krsFile.getElementsByTagName("config")[0];

        setMode(config.getAttribute("mode"));
        setConnection(config.getAttribute("connect"));
        setKeypressSound(config.getAttribute("sound") === "On");
        if (config.getAttribute("volume")) {
          setVolume(config.getAttribute("volume"));
        } else {
          setVolume("3");
        }
        setLockSound(config.getAttribute("lock"));

        if (mode == "4") {
          const keyElements = krsFile.getElementsByTagName("key");
          const bumpbarButtons = Array.from(keyElements).map(keyElement => {
            const seqArray = Array.from(keyElement.getElementsByTagName("seq"));

            const string = seqArray.map(seqElement => {
              const usage = seqElement.getAttribute("usage").replace("0x", "");
              const modifier = seqElement.getAttribute("modifier").replace("0x", "");
              return getModifierString(usage, modifier, seqElement.innerHTML) + seqElement.textContent
            }).join("");

            const keyPresses = seqArray.map(seqElement => ({
              string: seqElement.innerHTML,
              usage: seqElement.getAttribute("usage").replace("0x", ""),
              modifier: seqElement.getAttribute("modifier").replace("0x", "")
            }));

            const sequenceItems = seqArray.map((seqElement, index) => {
              const usage = seqElement.getAttribute("usage").replace("0x", "");
              const modifier = seqElement.getAttribute("modifier").replace("0x", "");
              return ({
                id: index,
                string: getModifierString(usage, modifier, seqElement.innerHTML) + seqElement.textContent,
                keypresses: [keyPresses[index]]
              })
            });

            return { string: string, keypresses: keyPresses, sequenceItems: sequenceItems };
          });

          setBumpbarButtons(bumpbarButtons);
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <div id="file-upload" className={styles.fileUpload}>
      <h2>Template</h2>
      <div className={styles.flexRow} style={{ width: "100%" }}>
        <input type="text" id="template-name" value={templateName} placeholder="Enter new template name..." onChange={(e) => setTemplateName(e.target.value)} />
      </div>
      <input type="file" name="file-upload" id="file-upload" accept=".krs" onChange={handleUpload} />
    </div>
  )
}

function Connection({ connection, setConnection }) {
  return (
    <div id="connection" className={styles.configSection}>
      <h2>Connection</h2>
      <div className={styles.flexRow}>
        <select name="connection-dropdown" id="connection-dropdown" value={connection} onChange={e => setConnection(e.target.value)}>
          <option value="Auto">Auto</option>
          <option value="BLE">Bluetooth</option>
          <option value="USB">USB</option>
          <option value="PS/2">PS/2</option>
          <option value="Serial">Serial</option>
        </select>
      </div>
    </div>
  )
}

function Mode({ mode, setMode }) {
  return (
    <div id="mode" className={styles.configSection}>
      <h2>Mode</h2>
      <div className={styles.flexRow}>
        <select name="mode-dropdown" id="mode-dropdown" value={mode} onChange={e => setMode(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
    </div>
  )
}

function KeypressSound({ keypressSound, setKeypressSound, volume, setVolume }) {
  return (
    <div id="keypress-sound" className={styles.configSection}>
      <h2>Keypress Sound</h2>
      <div className={styles.flexRow}>
        <div className={styles.flexRow}>
          <div className={styles.flexRow}>
            <input type="radio" name="keypress" id="keypress-enable" value="true" checked={keypressSound} onChange={e => setKeypressSound(e.target.value === "true")} />
            <label htmlFor="keypress-enable">Enable</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="keypress" id="keypress-disable" value="false" checked={!keypressSound} onChange={e => setKeypressSound(e.target.value === "true")} />
            <label htmlFor="keypress-disable">Disable</label>
          </div>
        </div>
      </div>
      <div className={styles.flexRow}>
        <select name="volume-dropdown" id="volume-dropdown" value={volume} onChange={e => setVolume(e.target.value)}>
          <option value="1">1 (Quiet)</option>
          <option value="2">2</option>
          <option value="3">3 (Loud)</option>
        </select>
      </div>
    </div>
  )
}

function Beeper({ lockSound, setLockSound }) {
  const lockSoundOptions = [
    {
      "value": "None",
      "label": "Never"
    },
    {
      "value": "Num",
      "label": "Num Lock"
    },
    {
      "value": "Caps",
      "label": "Caps Lock"
    },
    {
      "value": "Scroll",
      "label": "Scroll Lock"
    },
    {
      "value": "Bel",
      "label": "BEL"
    }
  ]

  return (
    <div id="beeper" className={styles.configSection}>
      <h2>Lock Sounds</h2>
      <div className={styles.flexColumn}>
        <div className={styles.beeperOptions}>
          {lockSoundOptions.map((option, index) => (
            <div className={styles.flexRow} key={index}>
              <input
                type="radio"
                name="beeper-option"
                id={`beeper-${option.value}`}
                value={option.value}
                checked={lockSound === option.value}
                onChange={e => setLockSound(e.target.value)}
              />
              <label htmlFor={`beeper-${option.value}`}>{option.label}</label>
            </div>
          ))}
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-other" />
            <label htmlFor="beeper-other">Other:&nbsp;
              <input type="text" className={styles.otherText} defaultValue="0x07" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigOptions