import "./Square.css"
export function Square({ piece, updateTheBoard, index, winner }) {
    let colorWinner=winner?'cell border colorWinner':'cell border ' ;

    console.log(winner)
    function handClick() {
        updateTheBoard(index)
    }
    return (
        <div onClick={() => handClick()} className={colorWinner} key={piece}>
            <span className='cell_content'>{piece}</span>
        </div>
    )
}
export function SeePiece({ piece, isActive }) {
    const contentIsActive = isActive ? "cell fontActive" : "cell";
    return (
        <div className={contentIsActive} key={piece}>
            <span className='cell_content'>{piece}</span>
        </div>
    )
}