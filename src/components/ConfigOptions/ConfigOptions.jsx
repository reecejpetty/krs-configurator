import styles from './ConfigOptions.module.css'

function ConfigOptions() {
  return (
    <>
      <h1>Configuration Options</h1>
      <div id="config-options" className={styles.configOptions}>
        <FileUpload />
        <Connection />
        <Mode />
        <KeypressSound />
        <Beeper />
      </div>
    </>
  )
}

function FileUpload() {
  return (
    <div id="file-upload" className={styles.configSection}>
      <div className={styles.flexRow}>
        <label htmlFor="template-name">Template Name:&nbsp;</label>
        <input type="text" id="template-name" />
      </div>
      <input type="file" name="file-upload" id="file-upload" accept=".krs" />
    </div>
  )
}

function Connection() {
  return (
    <div id="connection" className={styles.configSection}>
      <div className={styles.flexRow}>
        <label htmlFor="connection-dropdown">Connection:&nbsp;</label>
        <select name="connection-dropdown" id="connection-dropdown">
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

function Mode() {
  return (
    <div id="mode" className={styles.configSection}>
      <div className={styles.flexRow}>
        <label htmlFor="mode-dropdown">Mode:&nbsp;</label>
        <select name="mode-dropdown" id="mode-dropdown">
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

function KeypressSound() {
  return (
    <div id="keypress-sound" className={styles.configSection}>
      <div className={styles.flexRow}>
        Keypress<br />Sound:
        <div className={styles.flexColumn}>
          <div className={styles.flexRow}>
            <input type="radio" name="keypress" id="keypress-enable" defaultChecked />
            <label htmlFor="keypress-enable">Enable</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="keypress" id="keypress-disable" />
            <label htmlFor="keypress-disable">Disable</label>
          </div>
        </div>
      </div>
      <div className={styles.flexRow}>
        <label htmlFor="volume-dropdown">Volume:&nbsp;</label>
        <select name="volume-dropdown" id="volume-dropdown">
          <option value="1">1 (Quiet)</option>
          <option value="2">2</option>
          <option value="3">3 (Loud)</option>
        </select>
      </div>
    </div>
  )
}

function Beeper() {
  return (
    <div id="beeper" className={styles.configSection}>
      <div className={styles.flexRow}>
        <div>Beeper<br />Sounds On:</div>
        <div className={styles.beeperOptions}>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-never" />
            <label htmlFor="beeper-never">Never</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-num" />
            <label htmlFor="beeper-num">Num Lock</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-caps" />
            <label htmlFor="beeper-caps">Caps Lock</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-scrolls" defaultChecked />
            <label htmlFor="beeper-scroll">Scroll Lock</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-bel" />
            <label htmlFor="beeper-bel">BEL</label>
          </div>
          <div className={styles.flexRow}>
            <input type="radio" name="beeper-option" id="beeper-other" />
            <label htmlFor="beeper-other">Other:&nbsp;
              <input type="text" className={styles.otherText} />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigOptions