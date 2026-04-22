import styles from "./GenerateFile.module.css"

function GenerateFile() {
  const sampleCode = `<?xml version="1.0" encoding="utf-8"?>
<krs_config>
    <properties filename="krsorders_2.krs">
    </properties>
    <version ver="1" date="1/8/2026" time="1:12 PM">
        <config connect="Auto" serial="9600N81" mode="4" sound="On" volume="3" lock="None">
        </config>
        <key keynum="1">
            <seq usage="0x1E" modifier="0x00">1</seq>
        </key>
        <key keynum="2">
            <seq usage="0x1F" modifier="0x00">2</seq>
        </key>
        <key keynum="3">
            <seq usage="0x20" modifier="0x00">3</seq>
        </key>
        <key keynum="4">
            <seq usage="0x21" modifier="0x00">4</seq>
        </key>
        <key keynum="5">
            <seq usage="0x22" modifier="0x00">5</seq>
        </key>
        <key keynum="6">
            <seq usage="0x1C" modifier="0x00">y</seq>
        </key>
        <key keynum="7">
            <seq usage="0x05" modifier="0x00">b</seq>
        </key>
        <key keynum="8">
            <seq usage="0x06" modifier="0x00">c</seq>
        </key>
        <key keynum="9">
            <seq usage="0xFD" modifier="0x01">[REPEAT:1]</seq>
            <seq usage="0x2B" modifier="0x02">[SHIFT+TAB]</seq>
        </key>
        <key keynum="10">
            <seq usage="0xFD" modifier="0x01">[REPEAT:1]</seq>
            <seq usage="0x52" modifier="0x00">[UP_ARROW]</seq>
        </key>
        <key keynum="11">
            <seq usage="0x23" modifier="0x00">6</seq>
        </key>
        <key keynum="12">
            <seq usage="0x24" modifier="0x00">7</seq>
        </key>
        <key keynum="13">
            <seq usage="0x25" modifier="0x00">8</seq>
        </key>
        <key keynum="14">
            <seq usage="0x26" modifier="0x00">9</seq>
        </key>
        <key keynum="15">
            <seq usage="0x27" modifier="0x00">0</seq>
        </key>
        <key keynum="16">
            <seq usage="0x19" modifier="0x00">v</seq>
        </key>
        <key keynum="17">
            <seq usage="0x04" modifier="0x00">a</seq>
        </key>
        <key keynum="18">
            <seq usage="0x16" modifier="0x00">s</seq>
        </key>
        <key keynum="19">
            <seq usage="0xFD" modifier="0x01">[REPEAT:1]</seq>
            <seq usage="0x2B" modifier="0x00">[TAB]</seq>
        </key>
        <key keynum="20">
            <seq usage="0xFD" modifier="0x01">[REPEAT:1]</seq>
            <seq usage="0x51" modifier="0x00">[DOWN_ARROW]</seq>
        </key>
        <key keynum="21">
            <seq usage="0x4A" modifier="0x00">[Home]</seq>
        </key>
        <key keynum="22">
            <seq usage="0x0D" modifier="0x00">j</seq>
        </key>
        <key keynum="23">
            <seq usage="0x0E" modifier="0x00">k</seq>
        </key>
        <key keynum="24">
            <seq usage="0x0F" modifier="0x00">l</seq>
        </key>
        <key keynum="25">
            <seq usage="0x11" modifier="0x00">n</seq>
        </key>
        <key keynum="26">
            <seq usage="0x08" modifier="0x00">e</seq>
        </key>
        <key keynum="27">
            <seq usage="0x13" modifier="0x00">p</seq>
        </key>
        <key keynum="28">
            <seq usage="0x0B" modifier="0x00">h</seq>
        </key>
        <key keynum="29">
            <seq usage="0x29" modifier="0x00">[ESC]</seq>
        </key>
        <key keynum="30">
            <seq usage="0x28" modifier="0x00">[ENTER]</seq>
        </key>
    </version>
</krs_config>`

  return (
    <div>
      <h1>Generate File</h1>
      <div className={styles.buttonRow}>
      <button className={styles.generateButton}>Generate KRS File</button>
      <button className={styles.krsButton}>Download KRS File (Wired Bumpbars)</button>
      <button className={styles.krsButton}>Download KRSB File (Wireless Bumpbars)</button>
      </div>
      <div className={styles.filePreview}>
      <code><pre>{sampleCode}</pre></code>
      </div>
    </div>
  )
}

export default GenerateFile