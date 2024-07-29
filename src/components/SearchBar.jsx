import { useEffect, useState } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar(){
    
    const [search, setSearch] = useState("")
    const [isFocus, setIsFocus] = useState(false);

    const handleSearch = ()=>{
        window.open("https://www.google.com/search?q="+search)
        setSearch("")
    }

    const handleEnterDown = (e)=>{
        if(e.key === "Enter"){
            handleSearch()
        }
    }

    useEffect(()=>{
        addEventListener('keydown', handleEnterDown)
        return ()=>{
            removeEventListener('keydown', handleEnterDown)
        }
    }, [])

    return(
        <div className="flex items-center gap-4 relative w-full">
            <label onClick={handleSearch} htmlFor="usernameField" className={styles.searchlabel + styles.label + " absolute right-5"}><i className="fa-brands fa-google text-neutral-500"></i></label>
            <input onFocus={()=>{
                setIsFocus(true)
            }} onBlur={()=>{
                setIsFocus(false)
            }} onChange={(e)=> setSearch(e.currentTarget.value)} type="text" placeholder="Search Google" className={styles.searchField + " py-4 px-6 w-full"} required="required"></input>
        </div>
    )
}