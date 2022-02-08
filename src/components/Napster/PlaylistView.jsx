import { useParams } from 'react-router-dom'
import { useSong } from '../../hooks/useSong'
import { useTracks } from '../../hooks/useTracks'
import Loader from '../Loader/Loader'
import TrackCard from './TrackCard'

const PlaylistView = () => {
  const { playlistId } = useParams()
  const { currentPlaylist, isLoading, tracks } = useTracks(playlistId)
  const { toggleSong, currentTrack } = useSong(tracks)

  const {
    name: title,
    description: desc
  } = currentPlaylist

  if (isLoading) return <Loader />
  return (
    <section className='grid place-items-center h-max my-20'>
      <div className='bg-white p-10 rounded-xl w-[80%] text-center'>
        <h1 className='text-4xl font-bold text-slate-500'>{title}</h1>
        <p className='text-slate-500 mt-2'>{desc}</p>
        <div className='mt-10'>
          <ol className='list-decimal' data-testid='ol-playlistview'>
            <li className='grid grid-cols-[4rem_1fr_1fr] gap-y-20 border-b-2 border-slate-300 text-slate-500 py-2 px-4 w-full text-left'>
              <p className='pl-3'>#</p>
              <p>Title</p>
              <p>Album</p>
            </li>
            {
              tracks.map((track, id) =>
                <TrackCard track={track} key={id} toggleSong={toggleSong} currentTrack={currentTrack} />
              )
            }
          </ol>
        </div>
      </div>
    </section>
  )
}

export default PlaylistView
