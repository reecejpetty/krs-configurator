import { Tooltip } from '../Snippets';
import styles from './ConfigOptions.module.css'
import modes from "../../modes.json"
import { useState } from 'react';

function ConfigOptions({ templateName, setTemplateName, connection, setConnection, serialInfo, setSerialInfo, mode, setMode, keypressSound, setKeypressSound, volume, setVolume, lockSound, setLockSound, otherValue, setOtherValue, setBumpbarButtons, setButtonCount }) {
  const [advanced, setAdvanced] = useState(false);

  return (
    <div>
      <div className={styles.flexApart}>
        <h1>Configuration Options</h1>
        <AdvancedOptions advanced={advanced} setAdvanced={setAdvanced} />
      </div>
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
        <Connection
          connection={connection}
          setConnection={setConnection}
          serialInfo={serialInfo}
          setSerialInfo={setSerialInfo}
          setMode={setMode}
          display={advanced}
        />
        <Mode
          mode={mode}
          setMode={setMode}
          setBumpbarButtons={setBumpbarButtons}
          setConnection={setConnection}
          setKeypressSound={setKeypressSound}
          setLockSound={setLockSound}
          setButtonCount={setButtonCount}
          display={advanced}
        />
        <KeypressSound
          keypressSound={keypressSound}
          setKeypressSound={setKeypressSound}
          volume={volume}
          setVolume={setVolume}
          setMode={setMode}
          advanced={advanced}
        />
        <Beeper
          lockSound={lockSound}
          setLockSound={setLockSound}
          otherValue={otherValue}
          setOtherValue={setOtherValue}
          setMode={setMode}
          advanced={advanced}
        />
      </div>
    </div>
  )
}

function AdvancedOptions({ advanced, setAdvanced }) {
    return (
      <div className={styles.advancedToggle}>
        <label htmlFor="advancedOptionCheckbox" className={advanced ? styles.advancedToggleActive : styles.advancedToggleLabel}>
          <input type="checkbox" id="advancedOptionCheckbox" checked={advanced} onChange={e => setAdvanced(e.target.checked)} />
          {advanced ? "Hide" : "Show"} Advanced Options
        </label>
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
          const bumpbarButtons = Array.from(keyElements).map((keyElement, index) => {
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

            return { id: index, string: string, keypresses: keyPresses, sequenceItems: sequenceItems };
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

function Connection({ connection, setConnection, serialInfo, setSerialInfo, setMode, display }) {
  if (!display) {
    return;
  }
  const handleChange = (e) => {
    setMode("4");
    setConnection(e.target.value)
  }

  const serialSection = (
    <div className={styles.serialInfo}>
      <div className={styles.serialInfoRow}>
        <label htmlFor="baudRate">Baud Rate:</label>
        <div className="dropdown">
          <select name="baudRate" id="baudRate" value={serialInfo.baudRate}
            onChange={e => setSerialInfo({...serialInfo, baudRate: e.target.value})}
          >
            <option value="1200">1200</option>
            <option value="2400">2400</option>
            <option value="4800">4800</option>
            <option value="9600">9600</option>
            <option value="19200">19200</option>
            <option value="38400">38400</option>
            <option value="57600">57600</option>
            <option value="115200">115200</option>
          </select>
        </div>
      </div>
      <div className={styles.serialInfoRow}>
        <label htmlFor="parity">Parity:</label>
        <div className="dropdown">
          <select name="parity" id="parity" value={serialInfo.parity}
            onChange={e => setSerialInfo({...serialInfo, parity: e.target.value})}
          >
            <option value="N">None</option>
            <option value="E">Even</option>
            <option value="O">Odd</option>
            <option value="M">Mark</option>
            <option value="S">Space</option>
          </select>
        </div>
      </div>
      <div className={styles.serialInfoRow}>
        <label htmlFor="wordSize">Word Size:</label>
        <div className="dropdown">
          <select name="wordSize" id="wordSize" value={serialInfo.wordSize}
            onChange={e => setSerialInfo({...serialInfo, wordSize: e.target.value})}
          >
            <option value="5">5 bits</option>
            <option value="6">6 bits</option>
            <option value="7">7 bits</option>
            <option value="8">8 bits</option>
          </select>
        </div>
      </div>
      <div className={styles.serialInfoRow}>
        <label htmlFor="stopBits">Stop Bits:</label>
        <div className="dropdown">
          <select name="stopBits" id="stopBits" value={serialInfo.stopBits}
            onChange={e => setSerialInfo({...serialInfo, stopBits: e.target.value})}
          >
            <option value="1">1 bit</option>
            <option value="2">2 bits</option>
          </select>
        </div>
      </div>
    </div>
  )

  return (
    <div id="connection" className={styles.connection}>
      <div className={styles.flexRow}>
        <h2>Connection</h2>
        <Tooltip name="connection" text={<><p>Select the connection type for how you will connect your Bumpbar.</p><p><b>Note:</b> If you are unsure how you will eventually connect, leave connections as "Auto".</p></>} />
      </div>
      <div className="dropdown">
        <select name="connection-dropdown" id="connection-dropdown" value={connection} onChange={handleChange}>
          <option value="Auto">Auto</option>
          <option value="BLE">Bluetooth</option>
          <option value="USB">USB</option>
          <option value="PS/2">PS/2</option>
          <option value="Serial">Serial</option>
        </select>
      </div>
      {connection == "Serial" ? serialSection : null}
    </div>
  )
}

function Mode({ mode, setMode, setBumpbarButtons, setConnection, setKeypressSound, setLockSound, setButtonCount, display }) {
  if (!display) {
    return;
  }
  
  const changeModes = (e) => {
    const newMode = e.target.value;
    const modeObject = modes.find((item) => item.mode == newMode);
    const newButtonArray = modeObject.keys.map((key, index) => {
      if (key.string) {
        return (
          {
            "id": index,
            "string": key.string,
            "keypresses": [{
              "string": key.string,
              "usage": key.usage,
              "modifier": key.modifier
            }],
            "sequenceItems": [{
              "id": 0,
              "string": key.string,
              "keypresses": [{
                "string": key.string,
                "usage": key.usage,
                "modifier": key.modifier
              }]
            }]
          }
        )
      } else {
        return (
          {
            "id": index,
            "string": "",
            "keypresses": [],
            "sequenceItems": []
          }
        )
      }
    })
    setMode(newMode);
    setConnection(modeObject.connection);
    setKeypressSound(modeObject.sound);
    setLockSound(modeObject.lock);
    setButtonCount(modeObject.buttonCount);
    setBumpbarButtons(newButtonArray);
  }

  return (
    <div id="mode" className={styles.mode}>
      <div className={styles.flexRow}>
        <h2>Mode</h2>
        <Tooltip name="mode" text={<><p>All modes except Mode 4 contain pre-configured Bumpbar layouts and configurations for popular KDS systems, while Mode 4 is the user-customizable mode.</p></>} />
      </div>
      <div className="dropdown">
        <select name="mode-dropdown" id="mode-dropdown" value={mode} onChange={changeModes}>
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

function KeypressSound({ keypressSound, setKeypressSound, volume, setVolume, setMode, advanced }) {
  const handleChange = (e) => {
    setMode("4");
    setKeypressSound(e.target.value === "true")
  }

  return (
    <div id="keypress-sound" className={styles.keypressSound}>
      <div className={styles.flexRow}>
        <h2>Keypress Sound</h2>
        <Tooltip name="keypress-sound" text={<><p>Toggle the keypress sound on or off.</p><p>When enabled, the volume can be adjusted from 1 (quiet) to 3 (loud).</p></>} />
      </div>
      <div className={keypressSound ? styles.keypressSoundSwitchOn : styles.keypressSoundSwitch}>
        <div className={styles.flexRow}>
          <label htmlFor="keypress-enable" className={styles.keypressSoundOption}>
            <input type="radio" name="keypress" id="keypress-enable" value="true" checked={keypressSound} onChange={handleChange} />Enable</label>
        </div>
        <div className={styles.flexRow}>
          <label htmlFor="keypress-disable" className={styles.keypressSoundOption}>
            <input type="radio" name="keypress" id="keypress-disable" value="false" checked={!keypressSound} onChange={handleChange} />Disable</label>
        </div>
      </div>
      <div className="dropdown" style={{ display: advanced ? "flex" : "none" }}>
        <select name="volume-dropdown" id="volume-dropdown" value={volume} onChange={e => setVolume(e.target.value)}>
          <option value="1">1 (Quiet)</option>
          <option value="2">2</option>
          <option value="3">3 (Loud)</option>
        </select>
      </div>
    </div>
  )
}

function Beeper({ lockSound, setLockSound, otherValue, setOtherValue, setMode, advanced }) {
  const lockSoundOptions = [
    {
      "value": "None",
      "label": "Off",
      "advanced": false
    },
    {
      "value": "Num",
      "label": "NUM",
      "advanced": false
    },
    {
      "value": "Caps",
      "label": "CAPS",
      "advanced": false
    },
    {
      "value": "Scroll",
      "label": "SCROLL",
      "advanced": false
    },
    {
      "value": "Bel",
      "label": "BEL",
      "advanced": true
    },
    {
      "value": "Other",
      "label": "Other",
      "advanced": true
    }
  ]

  const handleChange = (e) => {
    setMode("4");
    setLockSound(e.target.value)
  }

  return (
    <div id="beeper" className={styles.lockSounds}>
      <div className={styles.flexRow}>
        <h2>Lock Sounds</h2>
        <Tooltip name="beeper" text={<><p>Configure the beeper to sound when certain lock keys are pressed, or to never sound.</p><p><b>Note:</b> Wired Bumpbars will beep continously until the lock key is turned off, while Wireless Bumpbars will beep for 2 seconds.</p></>} />
      </div>
      <div className={advanced ? styles.beeperOptionsAdvanced : styles.beeperOptions}>
        {lockSoundOptions.map((option, index) => {
          if (!option.advanced || option.advanced === advanced) {
            let otherTextBox = null;
            if (option.value === "Other" && lockSound === "Other") {
              otherTextBox = <input type="text" className={styles.otherText} value={otherValue} onChange={(e) => setOtherValue(e.target.value)} pattern="0x[a-fA-F0-9]{2}" requred />
            }
            return (
              <div className={styles.flexRow}>
                <label className={lockSound === option.value? styles.beeperOptionActive : styles.beeperOption} key={index} htmlFor={`beeper-${option.value}`}>
                  <input
                    type="radio"
                    name="beeper-option"
                    id={`beeper-${option.value}`}
                    value={option.value}
                    checked={lockSound === option.value}
                    onChange={handleChange}
                  />{option.label}
                </label>
                {otherTextBox}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default ConfigOptions