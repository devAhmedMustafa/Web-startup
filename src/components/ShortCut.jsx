import { Icon } from "@iconify-icon/react";
import { useEffect, useRef, useState } from "react";
import "./Shorten.css"

export default function ShortCut({icon, url, shorten}){

    const ref = useRef();
    const [rect, setRect] = useState([0, 0])
    
    const detect = 72

    function handleMouseOver(e){
        
        const xDiff = Math.abs(e.clientX - rect[0] );
        const yDiff = Math.abs(e.clientY - rect[1] );


        if (xDiff <= detect && yDiff <= detect) {

            let diff = Math.max(xDiff, yDiff) 
        
            diff = detect+10 - diff
        
            let amout = ((diff*0.01)/((100-detect)/10))*100 + detect;

            ref.current.style.width = `${amout}%`
            ref.current.style.height = `${amout}%`
        }

        else{
            ref.current.style.width = `${detect}%`
            ref.current.style.height = `${detect}%`
        }
    }

    useEffect(()=>{
        const short = ref.current;

        const r = ref.current.getBoundingClientRect();
        setRect([r.left, r.top])


       
    }, [])

    useEffect(()=>{
        addEventListener('mousemove', handleMouseOver)

        return ()=>{
            removeEventListener('mousemove', handleMouseOver)
        }
    }, [rect])

    return (
        <div className="size-16 flex justify-center items-center relative overflow-visible shorten">


            <a href={url} target="_blank" ref={ref} className="bg-neutral-700 rounded-full transition-all cursor-pointer duration-100 flex justify-center items-center">
                <Icon className="text-3xl" icon={icon}/>
            </a>

            <p className="text-sm absolute top-1 transition-all duration-300 bg-neutral-800 font-bold px-2 text-center rounded-md opacity-0">{shorten}</p>

        </div>
    )
}