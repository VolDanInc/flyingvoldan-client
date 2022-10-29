import React from 'react';



class DateTime extends React.Component {
  state={
    curDT : new Date(),

  }
  render(){
    //console.log("it's current datetime .... " + this.state.curDT);
    return (
      <div className="DateTime">
        <p>Current Date And Time : {this.state.curDT.toLocaleString()}</p>
        <p>Current Date And Time : {this.state.curDT.valueOf()}</p>
      </div>
    );
  }
}

export default DateTime;