function Button(props){
   
    return(
      <button onClick={props.ResetButton}>
        {props.text}
      </button>
    )
  }
  export default Button