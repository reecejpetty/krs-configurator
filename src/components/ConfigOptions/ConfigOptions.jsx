import styles from './ConfigOptions.module.css'

function ConfigOptions({ templateName, setTemplateName, connection, setConnection, mode, setMode, keypressSound, setKeypressSound, volume, setVolume, lockSound, setLockSound }) {
  return (
    <div>
      <h1>Configuration Options</h1>
      <div id="config-options" className={styles.configOptions}>
        <FileUpload templateName={templateName} setTemplateName={setTemplateName} />
        <Connection connection={connection} setConnection={setConnection} />
        <Mode mode={mode} setMode={setMode} />
        <KeypressSound keypressSound={keypressSound} setKeypressSound={setKeypressSound} volume={volume} setVolume={setVolume} />
        <Beeper lockSound={lockSound} setLockSound={setLockSound} />
      </div>
    </div>
  )
}

function FileUpload({ templateName, setTemplateName }) {
  return (
    <div id="file-upload" className={styles.configSection}>
      <h2>Template</h2>
      <div className={styles.flexRow}>
        <label htmlFor="template-name">Name:&nbsp;</label>
        <input type="text" id="template-name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
      </div>
      <input type="file" name="file-upload" id="file-upload" accept=".krs" />
    </div>
  )
}

function Connection({ connection, setConnection }) {
  return (
    <div id="connection" className={styles.configSection}>
      <h2>Connection</h2>
      <div className={styles.flexRow}>
        <select name="connection-dropdown" id="connection-dropdown" value={connection} onChange={e => setConnection(e.target.value)}>
          <option value="auto">Auto</option>
          <option value="ble">Bluetooth</option>
          <option value="usb">USB</option>
          <option value="ps2">PS/2</option>
          <option value="serial">Serial</option>
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
      "value": "never",
      "label": "Never"
    },
    {
      "value": "num",
      "label": "Num Lock"
    },
    {
      "value": "caps",
      "label": "Caps Lock"
    },
    {
      "value": "scroll",
      "label": "Scroll Lock"
    },
    {
      "value": "bel",
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