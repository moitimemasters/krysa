import { createSignal, onCleanup, onMount } from "solid-js"
import myFace from "./assets/my-face.jpg"
import clown from "./assets/clown.jpg"
import cute from "./assets/cute.jpg"
import depressed from "./assets/pure_depression.jpg"
import champ from "./assets/champ.jpg"

const [russian, setRussian] = createSignal(null)
const [math, setMath] = createSignal(null)
const [informatics, setInformatics] = createSignal(null)
const [physics, setPhysics] = createSignal(null)
const [voencom, setVoencom] = createSignal(null)

const App = () => {
    let m, r, i, p, v
    const russianDate = new Date("2022-05-30")
    const mathDate = new Date("2022-06-02")
    const physDate = new Date("2022-06-06")
    const infDate = new Date("2022-06-20")
    const voenDate = new Date("2022-07-08")
    onMount(() => {setRussian(r), setMath(m), setPhysics(p), setInformatics(i), setVoencom(v)})
    return <div className="flex-1 flex flex-col p-5">
        <h1 className="self-center font-bold text-8xl text-teal-600">Считаем секунды до депрессии</h1>
        <Slider onClick={() => { russian().scrollIntoView({ behavior: "smooth" }); console.log(russian) }} />
        <Img src={myFace} />
        <SecondsTillDepression ref={r} title="ЕГЭ по русскому" date={russianDate} nextRef={math()} />
        <Img src={depressed} />
        <SecondsTillDepression ref={m} title="ЕГЭ по матеше" date={mathDate} nextRef={physics()}/>
        <Img src={clown} />
        <SecondsTillDepression ref={p} title="ЕГЭ по физике" date={physDate} nextRef={informatics()}/>
        <Img src={cute} />
        <SecondsTillDepression ref={i} title="ЕГЭ по информатике" date={infDate} nextRef={voencom()}/>
        <Img src={champ} />
        <SecondsTillDepression ref={v} title="Военкомата" date={voenDate} nextRef={russian()}/>
    </div>
}

const Img = props => {
    return <img className="w-full h-96 rounded-xl" src={props.src} />
}

const Slider = props => {
    return <div onClick={props.onClick} className="self-center group w-full flex items-center justify-center my-10">
        <h1 className="text-8xl font-bold duration-300 group-hover:text-rose-400 scale-150 text-rose-700 cursor-pointer select-none">↓</h1>
    </div>
}

const SecondsTillDepression = props => {
    const [seconds, setSeconds] = createSignal(0)
    const timer = setInterval(() => setSeconds(Math.ceil((props.date - Date.now()) / 1000)), 1000)
    onCleanup(() => clearInterval(timer))
    return <div className="my-40 w-full py-32 flex flex-col" ref={props.ref}>
        <h1 className="font-bold text-6xl self-center uppercase">Секунд до <span className="text-rose-500">{props.title}</span></h1>
        <h2 className="font-bold my-3 text-5xl self-center uppercase">{seconds()}</h2>
        <button onClick={() => {props.nextRef.scrollIntoView({behavior: "smooth"})}} className="ring-rose-500 ring-2 rounded-lg p-3 text-4xl text-rose-500 text-center w-1/2 self-center mt-20 duration-300 hover:bg-rose-500 hover:text-white">Следующий</button>
    </div>
}

export default App