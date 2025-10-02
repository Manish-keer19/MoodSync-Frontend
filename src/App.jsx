import { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'
import "./App.css"

function App() {
  const [songs, setSongs] = useState([])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MoodSync 🎵</h1>
      </header>
      <main className="app-main">
        <FacialExpression setSongs={setSongs}/>
        <MoodSongs songs={songs}/>
      </main>
    </div>
  )
}

export default App
