import { useEffect, useState } from "react"
import ShortCut from "./ShortCut"

export default function ShortCutsGroup(){
    
    const [shorts, setShorts] = useState(localStorage['shortens']?JSON.parse(localStorage['shortens']):[])

    const showForm = ()=>{
        document.getElementById('add_form').classList.remove('w-0')
        document.getElementById('add_form').classList.add('w-screen')
    }

    useEffect(()=>{
        document.getElementById('add_form').classList.add('w-0')
        document.getElementById('add_form').classList.remove('w-screen')

        localStorage['shortens'] = JSON.stringify(shorts)
    }, [shorts])

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap gap-2 items-center justify-center">

                {shorts.map((s, id)=>

                <ShortCut key={id}
                    url={s.url}
                    shorten={s.shorten}
                    icon={s.icon}
                />

                )}

                <div className="size-12 flex justify-center items-center bg-neutral-700 rounded-full">
                    <button onClick={showForm} className="size-full"><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <AddShorten setShorts={setShorts}/>

        </div>
    )
}

function AddShorten({setShorts}){

    const cancel = ()=>{
        document.getElementById('add_form').classList.remove('w-screen')
        document.getElementById('add_form').classList.add('w-0')
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const data = {
            shorten: e.target.shorten.value,
            url: e.target.url.value,
            icon: e.target.icon.value
        }

        setShorts((prev)=>{
            return [...prev, data]
        })
    }

    return (
        <div id="add_form" className="fixed top-0 overflow-hidden w-0 transition-all duration-500 left-0 h-screen bg-[#1d1a27e7] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-6">

                <TextInput name="shorten" />
                <TextInput name="url" />
                <TextInput name="icon" />

                {/* <label className="bg-violet-400 px-5 py-2 cursor-pointer rounded-md" htmlFor="icon">Upload icon</label>
                <input id="icon" type="file" className="hidden"/> */}

                <button type="Submit">Add Shorten</button>

            </form>

            <button onClick={cancel} className="size-8 bg-red-800 absolute right-0 top-0">
                <i className="fa-solid fa-xmark"></i>
            </button>

        </div>
    )

}

function TextInput({name}){
    return (
        <div className="flex flex-col gap-2 items-center">
            <label className="font-semibold">{name}</label>
            <input type="text" name={name} className="focus:outline-none bg-neutral-800 px-6 py-2 rounded-full"/>
        </div>
    )
}