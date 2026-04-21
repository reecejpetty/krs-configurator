// import { useState } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'

function App() {
  return (
    <>
      <ConfigOptions />
      <BumpbarLayout />
      <SequenceBuilder />
    </>
  )
}

export default App
