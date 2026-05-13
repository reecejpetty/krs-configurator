import { useState, useEffect } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import GenerateFile from "./components/GenerateFile/GenerateFile"
import { SequenceProvider } from './context/SequenceProvider'

function App() {
  const [templateName, setTemplateName] = useState("");
  const [connection, setConnection] = useState("Auto");
  const [serialInfo, setSerialInfo] = useState(initialSerialState)
  const [mode, setMode] = useState("4");
  const [keypressSound, setKeypressSound] = useState(true);  
  const [volume, setVolume] = useState("3");
  const [lockSound, setLockSound] = useState("Scroll");
  const [otherValue, setOtherValue] = useState("0x07");
  
  const [buttonCount, setButtonCount] = useState(3)
  const [currentButton, setCurrentButton] = useState(null);
  const [bumpbarButtons, setBumpbarButtons] = useState(initialState);

  const resetConfig = () => {
    setTemplateName("");
    setConnection("Auto");
    setSerialInfo(initialSerialState);
    setMode("4");
    setKeypressSound(true);
    setVolume("3");
    setLockSound("Scroll");
    setOtherValue("0x07");
  }

  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(height, "https://krscorporation.com");
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    sendHeight(); // send once on mount

    window.addEventListener('resize', sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, []);

  return (
    <>
      <ConfigOptions
        resetConfig={resetConfig}
        templateName={templateName}
        setTemplateName={setTemplateName}
        connection={connection}
        setConnection={setConnection}
        serialInfo={serialInfo}
        setSerialInfo={setSerialInfo}
        mode={mode}
        setMode={setMode}
        keypressSound={keypressSound}
        setKeypressSound={setKeypressSound}
        volume={volume}
        setVolume={setVolume}
        lockSound={lockSound}
        setLockSound={setLockSound}
        otherValue={otherValue}
        setOtherValue={setOtherValue}
        setBumpbarButtons={setBumpbarButtons}
        setButtonCount={setButtonCount}
      />
      <BumpbarLayout
        buttonCount={buttonCount}
        setButtonCount={setButtonCount}
        bumpbarButtons={bumpbarButtons}
        setBumpbarButtons={setBumpbarButtons}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
        setMode={setMode}
      />
      <SequenceProvider>
        <SequenceBuilder
          bumpbarButtons={bumpbarButtons}
          setBumpbarButtons={setBumpbarButtons}
          currentButton={currentButton}
          setMode={setMode}
        />
      </SequenceProvider>
      <GenerateFile
        buttonCount={buttonCount}
        setButtonCount={setButtonCount}
        templateName={templateName}
        connection={connection}
        serialInfo={serialInfo}
        mode={mode}
        keypressSound={keypressSound}
        volume={volume}
        lockSound={lockSound}
        otherValue={otherValue}
        bumpbarButtons={bumpbarButtons}
      />
      <Footer />
    </>
  )
}


function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/reecejpetty/krs-configurator" target="_blank">Submit issues to GitHub</a>
      <p>© 2026 Reece J Petty & KRS Corporation, LLC. All Rights Reserved.</p>
    </div>
  )
} 


const initialState = (() => {
  const mode1Array = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  return mode1Array.map((_, index) => {
    return {
      id: index,
      string: "",
      keypresses: [],
      sequenceItems: []
    }
  })
})

const initialSerialState = (() => (
  {
    "baudRate": "9600",
    "parity": "N",
    "wordSize": "8",
    "stopBits": "1"
  }
))


export default App
