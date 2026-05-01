import { Tooltip } from '../Snippets';
import styles from './ConfigOptions.module.css'

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

            const string = seqArray.map(seqElement => seqElement.textContent).join("");

            const keyPresses = seqArray.map(seqElement => ({
              string: seqElement.innerHTML,
              usage: seqElement.getAttribute("usage").replace("0x", ""),
              modifier: seqElement.getAttribute("modifier").replace("0x", "")
            }));

            const sequenceItems = seqArray.map((seqElement, index) => {
              return ({
                id: index,
                string: seqElement.textContent,
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
      <div className={styles.flexRow}>
        <h2>Template</h2>
        <Tooltip name="file-upload" text={<><p>Upload a .krs file to populate the configuration options and button sequences.</p><p><b>Note:</b> Uploading a file will overwrite all current configuration options and button sequences.</p></>} />
      </div>
      <input type="text" id="template-name" value={templateName} placeholder="Enter new template name..." onChange={(e) => setTemplateName(e.target.value)} />
      <input type="file" name="file-upload" id="file-upload" accept=".krs" onChange={handleUpload} />
    </div>
  )
}

function Connection({ connection, setConnection }) {
  return (
    <div id="connection" className={styles.connection}>
      <div className={styles.flexRow}>
        <h2>Connection</h2>
        <Tooltip name="connection" text={<><p>Select the connection type for how you will connect your Bumpbar.</p><p><b>Note:</b> If you are unsure how you will eventually connect, leave connections as "Auto".</p></>} />
      </div>
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
    <div id="mode" className={styles.mode}>
      <div className={styles.flexRow}>
        <h2>Mode</h2>
        <Tooltip name="mode" text={<><p>All modes except Mode 4 contain pre-configured Bumpbar layouts and configurations for popular KDS systems, while Mode 4 is the user-customizable mode.</p></>} />
      </div>
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
    <div id="keypress-sound" className={styles.keypressSound}>
      <div className={styles.flexRow}>
        <h2>Keypress Sound</h2>
        <Tooltip name="keypress-sound" text={<><p>Toggle the keypress sound on or off.</p><p>When enabled, the volume can be adjusted from 1 (quiet) to 3 (loud).</p></>} />
      </div>
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
    <div id="beeper" className={styles.lockSounds}>
      <div className={styles.flexRow}>
        <h2>Lock Sounds</h2>
        <Tooltip name="beeper" text={<><p>Configure the beeper to sound when certain lock keys are pressed, or to never sound.</p><p><b>Note:</b> Wired Bumpbars will beep continously until the lock key is turned off, while Wireless Bumpbars will beep for 2 seconds.</p></>} />
      </div>
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