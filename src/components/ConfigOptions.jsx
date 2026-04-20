function ConfigOptions() {
  return (
    <div id="config-options">
      <FileUpload />
      <Connection />
      <Mode />
      <KeypressSound />
      <Beeper />
    </div>
  )
}

function FileUpload() {
  return (
    <div id="file-upload">
      <div id="template-name-entry">
        <label htmlFor="template-name">Template Name:</label>
        <input type="text" id="template-name" />
      </div>
      <input type="file" name="file-upload" id="file-upload" accept=".krs" />
    </div>
  )
}

function Connection() {
  return (
    <div id="connection">
      <label htmlFor="connection-dropdown">Connection:</label>
      <select name="connection-dropdown" id="connection-dropdown">
        <option value="auto">Auto</option>
        <option value="usb">USB</option>
        <option value="ps2">PS/2</option>
        <option value="serial">Serial</option>
      </select>
    </div>
  )
}

function Mode() {
  return (
    <div id="mode">
      <label htmlFor="mode-dropdown">Mode:</label>
      <select name="mode-dropdown" id="mode-dropdown">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4" selected>4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </div>
  )
}

function KeypressSound() {
  return (
    <div id="keypress-sound">
      <div id="keypress-sound-options">
        Keypress Sound:
        <input type="radio" name="keypress" id="keypress-enable" defaultChecked />
        <label htmlFor="keypress-enable">Enable</label>
        <input type="radio" name="keypress" id="keypress-disable" />
        <label htmlFor="keypress-disable">Disable</label>
      </div>
      <div id="keypress-sound-volume">
        <label htmlFor="volume-dropdown">Volume:</label>
        <select name="volume-dropdown" id="volume-dropdown">
          <option value="1">1 (Quiet)</option>
          <option value="2">2</option>
          <option value="3" selected>3 (Loud)</option>
        </select>
      </div>
    </div>
  )
}

function Beeper() {
  return (
    <div id="beeper">
      <div>Beeper Sounds On:</div>
      <div id="beeper-options">
        <input type="radio" name="beeper-option" id="beeper-never" />
        <label htmlFor="beeper-never">Never</label>
        <input type="radio" name="beeper-option" id="beeper-num" />
        <label htmlFor="beeper-num">Num Lock</label>
        <input type="radio" name="beeper-option" id="beeper-caps" />
        <label htmlFor="beeper-caps">Caps Lock</label>
        <input type="radio" name="beeper-option" id="beeper-scrolls" />
        <label htmlFor="beeper-scroll">Scroll Lock</label>
        <input type="radio" name="beeper-option" id="beeper-bel" />
        <label htmlFor="beeper-bel">BEL</label>
        <input type="radio" name="beeper-option" id="beeper-other" />
        <label htmlFor="beeper-other">Other:
          <input type="text" />
        </label>
      </div>
    </div>
  )
}

export default ConfigOptions