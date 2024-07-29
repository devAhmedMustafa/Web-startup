import { useEffect, useState } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar(){
    
    const [search, setSearch] = useState("")
    const [history, setHistory] = useState(localStorage['searchHistory']?JSON.parse(localStorage['searchHistory']):[])
    const [isFocus, setIsFocus] = useState(false)

    const handleSearch = ()=>{

        if (search.length == 0)
            return

        goSearch(search)

        let temp_history = history;

        if (temp_history.length > 5){
            temp_history = temp_history.slice(0,5)
        }

        console.log(temp_history)

        setHistory(
            [search, ...temp_history]
        )
    }

    function goSearch(search){
        window.open("https://www.google.com/search?q="+search)
    }

    useEffect(()=>{
        localStorage['searchHistory'] = JSON.stringify(history);
    }, [history])

    useEffect(()=>{
        // set focus false
        function handleMouseDown(e){
            if (!e.target.classList.contains('stay-focus')){
                setIsFocus(false)
            }

        }
        addEventListener('mousedown', handleMouseDown)

        return ()=>{
            removeEventListener('mousedown', handleMouseDown)
        }
    },[])

    return(
        <div className="flex items-center gap-4 relative w-full">

            <label onClick={handleSearch} htmlFor="usernameField" className={styles.searchlabel + styles.label + " absolute right-5 stay-focus"}><i className="fa-brands fa-google text-neutral-500"></i></label>

            <input onFocus={()=>{
                setIsFocus(true)
            }} 
            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    handleSearch()
                }
                }} onChange={(e)=> setSearch(e.currentTarget.value)} type="text" placeholder="Search Google" className={styles.searchField + " py-4 px-6 w-full" + " stay-focus"} required="required"/>
                
                {
                    isFocus &&
                    <div className="absolute top-16 left-0 w-full px-4 stay-focus">
                        <ul className="bg-[#202020da] rounded-md shadow-md stay-focus">
                            {history.map((item, index)=>{
                                return(
                                    <li key={index} className="py-2 px-4 w-full hover:bg-violet-800 stay-focus
                                    ">
                                        <a target="_blank" href={"https://www.google.com/search?q="+item} className="text-neutral-300 text-sm stay-focus">{item}</a>
                                        
                                    </li>
                                )})
                            }
                        </ul>
                    </div>
                }
            
        </div>
    )
}