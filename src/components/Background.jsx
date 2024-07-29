import { useContext, useEffect } from "react"
import { BackgroundContext } from "../App"

export default function Background(){

    const {background} = useContext(BackgroundContext)

    return (
        <div className="bg-neutral-900 fixed top-0 left-0 w-screen h-screen -z-10 flex justify-center items-center">
            
            <img className="w-full" src={background} alt="" />

        </div>
    )
}

export function ChangeBackground(){

    const show = ()=>{
        document.getElementById('back_form').classList.add('w-screen')
        document.getElementById('back_form').classList.remove('w-0')
    }

    return (

        <div>
            <div onClick={show} className="absolute top-4 z-50 left-4 size-10 flex justify-center items-center cursor-pointer rounded-full bg-slate-800">
                <i className="fa-solid fa-image"></i>
            </div>

            <SetBackgroundUrl/>

        </div>

    )
}

function SetBackgroundUrl(){

    const {setBackground} = useContext(BackgroundContext)

    const cancel = ()=>{
        document.getElementById('back_form').classList.remove('w-screen')
        document.getElementById('back_form').classList.add('w-0')
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        setBackground(e.target.background.value)

        localStorage['background'] = e.target.background.value;


        cancel()

    }

    return (
        <div id="back_form" className="fixed top-0 overflow-hidden w-0 transition-all duration-500 left-0 h-screen bg-[#1d1a27e7] flex justify-center items-center z-20">
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-6">

                <TextInput name="background" />

                <button type="Submit">Change Background</button>

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