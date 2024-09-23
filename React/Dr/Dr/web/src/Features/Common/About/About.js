import "./About.scss";
import banner from "./Resources/banner.jpg";
import music from "./Resources/everything_is_awesome.mp3";

export default function About(props) {
    const dismiss = props.dismiss;
    const audio = new Audio(music);

    let toggle = false;
    const togglePlay = () => {
        toggle = !toggle;
        toggle ? audio.play() : audio.pause();
    };

    const close = () => {
        audio.pause();
        dismiss();
    };

    return (
        <dialog className={"about"} open>
            <div className={"about-body"}>
                <img src={banner} onDoubleClick={togglePlay} alt={"banner"}/>
                <footer onClick={close} autoFocus>OK</footer>
            </div>
        </dialog>
    );
}