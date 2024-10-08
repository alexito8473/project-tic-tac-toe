import "./Square.css"
export function Square({ isPieceX, updateTheBoard, index, winner }) {
    const colorWinner = winner ? 'cell border colorWinner ' : 'cell border .typeX ';
    function handClick() {
        updateTheBoard(index)
    }
    return (
        <div onClick={() => handClick()} className={colorWinner} key={index}>
            {
                isPieceX == null ? <span></span> : isPieceX
            }
        </div>
    )
}
export function SeePiece({ piece, isActive }) {
    const contentIsActive = isActive ? "cell fontActive" : "cell";
    return (
        <div className={contentIsActive}>
            <span className='cell_content'>{piece}</span>
        </div>
    )
}