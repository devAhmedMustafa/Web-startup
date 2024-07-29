import { useEffect, useState } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar(){
    
    const [search, setSearch] = useState("")

    const handleSearch = ()=>{
        window.open("https://www.google.com/search?q="+search)
    }

    return(
        <div className="flex items-center gap-4 relative w-full">
            <label onClick={handleSearch} htmlFor="usernameField" className={styles.searchlabel + styles.label + " absolute right-5"}><i className="fa-brands fa-google text-neutral-500"></i></label>
            <input onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    handleSearch()
                }
                }} onChange={(e)=> setSearch(e.currentTarget.value)} type="text" placeholder="Search Google" className={styles.searchField + " py-4 px-6 w-full"} required="required"></input>
        </div>
    )
}