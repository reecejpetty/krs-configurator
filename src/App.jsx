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
  const [mode, setMode] = useState("4");
  const [keypressSound, setKeypressSound] = useState(true);  
  const [volume, setVolume] = useState("3");
  const [lockSound, setLockSound] = useState("Scroll");
  const [otherValue, setOtherValue] = useState("0x07");
  const [buttonCount, setButtonCount] = useState(3)

  const [currentButton, setCurrentButton] = useState(null);
  const [bumpbarButtons, setBumpbarButtons] = useState(initialState);

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
        templateName={templateName}
        setTemplateName={setTemplateName}
        connection={connection}
        setConnection={setConnection}
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


export default App
