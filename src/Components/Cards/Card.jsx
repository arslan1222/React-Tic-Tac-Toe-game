import Icons from "../Icons/Icons";
import "./Card.css";

export function Card({gameEnd, player, onPlay, index}){
    let icon = <Icons/>

    if(player === "X"){
        icon = <Icons name="cross"/>
    } else if(player === "O"){
        icon = <Icons name = "circle"/>
    }
    return (
        <div className="card" onClick={()=> !gameEnd && onPlay(index)}>
            {icon}
        </div>
    )
}