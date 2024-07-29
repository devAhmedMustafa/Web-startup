import { createContext, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Background, { ChangeBackground } from './components/Background'
import ShortCutsGroup from './components/ShortCutsGroup'

export const BackgroundContext = createContext(undefined)

function App() {

  const [background, setBackground] = useState(localStorage['background']?localStorage['background']:"")

  return (
    <div className='flex flex-col items-center'>

      <BackgroundContext.Provider value={{background, setBackground}}>
        <Background/>
        <ChangeBackground/>
      </BackgroundContext.Provider>

      <div className='w-[60%] justify-center py-16'>
        <SearchBar/>
      </div>

      <div className='max-w-[60%]'>
        <ShortCutsGroup/>
      </div>


    </div>
  )
}

export default App
