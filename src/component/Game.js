function Game({value,hold,isheld,style}){
    const styles={
      backgroundColor: isheld?'purple': '',
      color: isheld?'floralwhite': ''
    }
    return(
      <div className="die-face" style={styles} onClick={hold}>
        {value}
      </div>
    )
  }
  export default Game