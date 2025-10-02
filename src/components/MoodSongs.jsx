import "./MoodSongs.css"
import { useState } from "react"

const MoodSongs = ({ songs }) => {
   const [isPlaying, setIsPlaying] = useState(null)

   return (
     <div className='mood-songs'> 
       <h2>Recommended Songs</h2>
       <div className="songs-grid">
        {songs.map((song, index)=>(
          <div className='song-card' key={index}>
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <audio 
              src={song.audio} 
              controls 
              className="audio-player"
              onPlay={() => setIsPlaying(index)}
              onPause={() => setIsPlaying(null)}
            />
          </div>
        ))}
       </div>
     </div>
   )
}

export default MoodSongs
