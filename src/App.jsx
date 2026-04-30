import { useState, useEffect } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import GenerateFile from "./components/GenerateFile/GenerateFile"
import { SequenceProvider } from './context/SequenceProvider'
import keyboardHexMap from "./keyboardhexmap.json"

function App() {
  const [templateName, setTemplateName] = useState("");
  const [connection, setConnection] = useState("Auto");
  const [mode, setMode] = useState("4");
  const [keypressSound, setKeypressSound] = useState(true);  
  const [volume, setVolume] = useState("3");
  const [lockSound, setLockSound] = useState("Scroll");
  const [activeSwitch, setActiveSwitch] = useState(3)

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
      />
      <BumpbarLayout
        activeSwitch={activeSwitch}
        setActiveSwitch={setActiveSwitch}
        bumpbarButtons={bumpbarButtons}
        setBumpbarButtons={setBumpbarButtons}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
      />
      <SequenceProvider>
        <SequenceBuilder
          bumpbarButtons={bumpbarButtons}
          setBumpbarButtons={setBumpbarButtons}
          currentButton={currentButton}
        />
      </SequenceProvider>
      <GenerateFile
        activeSwitch={activeSwitch}
        setActiveSwitch={setActiveSwitch}
        templateName={templateName}
        connection={connection}
        mode={mode}
        keypressSound={keypressSound}
        volume={volume}
        lockSound={lockSound}
        bumpbarButtons={bumpbarButtons}
      />
      <Footer />
    </>
  )
}


function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/reecejpetty/krs-configurator">Submit issues to GitHub</a>
      <p>© 2026 Reece J Petty. All Rights Reserved.</p>
    </div>
  )
} 


const initialState = (() => {
  const mode1Array = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  return mode1Array.map(key => {
    return {
      string: key,
      keypresses: [
        {
          string: key,
          usage: keyboardHexMap[key].usage,
          modifier: keyboardHexMap[key].modifier
        }
      ],
      sequenceItems: [{
        id: 0,
        string: key,
        keypresses: [{
          string: key,
          usage: keyboardHexMap[key].usage,
          modifier: keyboardHexMap[key].modifier
        }]
      }]
    }
  })
})


export default App
