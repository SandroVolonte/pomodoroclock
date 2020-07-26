import React from 'react';
import logo from './logo.svg';
import './App.css';
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const DEFAULTSTATE = {
    sessionLength: 25,
    breakLength: 5,
    currentSession: "25:00",
    currentBreak: 0,
    currentMode: "Session",
    running: false
};

const Header = () =>{
  return (
      <div className={"row justify-content-center"}>
        <div className={"col-5"}>
          <header className={"Title"}>
            My PomodoroClock, use it to work more efficiently!
          </header>
        </div>
      </div>
  )
}

const SetTimers = (props) => {
    return (
        <div className={"row justify-content-center"}>
            <div className={"col-3 Setter"}>
                <div id={"break-label"}>
                    <h2 className={"LengthHeader"}>
                        Break-Length
                    </h2>
                    <div id={"break-length"} className={"Lengthwrapper"}>
                        <button className={"btnChange"} id={"break-decrement"} value={-1} onClick={props.handleChangeBreak}>
                            <FontAwesomeIcon icon={faArrowDown} size={"lg"}/>
                        </button>
                        {props.breakLength}
                        <button className={"btnChange"} id={"break-increment"} value={1} onClick={props.handleChangeBreak}>
                            <FontAwesomeIcon icon={faArrowUp} size={"lg"}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"col-3 Setter"}>
                <div id={"session-label"}>
                    <h2 className={"LengthHeader"}>
                        Session-Length
                    </h2>
                    <div id={"session-length"} className={"Lengthwrapper"}>
                        <button className={"btnChange"} id={"session-decrement"} value={-1} onClick={props.handleChangeSession}>
                        <FontAwesomeIcon  icon={faArrowDown} size={"lg"}/>
                        </button>
                         {props.sessionLength}
                        <button className={"btnChange"} id={"session-increment"} value={1} onClick={props.handleChangeSession}>
                        <FontAwesomeIcon icon={faArrowUp} size={"lg"}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TimeDisplay = (props) => {
    return(
        <div className={"row justify-content-center Display"}>
            <div className={"col-2 DisplayCol"}>
                <h2 id={"timer-label"}>{props.currentMode}</h2>
                <h1 id={"time-left"}>{(props.currentMode === "Session") ? (props.currentSession) : (props.currentBreak)}</h1>
            </div>
        </div>
    )
}

const Toolbar = (props) => {
    return (
        <div className={"row justify-content-center Toolbar"}>
            <div className={"col-2 ToolbarCol"}>

                <button className={"btnChange"} id={"start_stop"} onClick={() => {props.handleStartStopToggle(); props.handleRunToggle()}}>
                    {(props.running === true) ? <FontAwesomeIcon icon={faPause} size={"lg"}/> : <FontAwesomeIcon icon={faPlay} size={"lg"}/>}
                </button>

                <button className={"btnChange"} id={"reset"} onClick={props.handleReset}>
                    <FontAwesomeIcon icon={faSyncAlt} size={"lg"}/>
                </button>
            </div>
        </div>
    )
}



class PomodoroClock extends React.Component{
  constructor(props){
    super(props);
    this.state = DEFAULTSTATE;
    this.handleChangeBreak = this.handleChangeBreak.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleStartStopToggle = this.handleStartStopToggle.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRunToggle = this.handleRunToggle.bind(this);

  }

    handleChangeBreak(event){
        let newBreak = this.state.breakLength + parseInt(event.currentTarget.value);
        console.log(newBreak);
        if(newBreak > 0 && newBreak <= 60 && !this.state.running){
            this.setState(state => {
                Object.assign(this.state, {breakLength: newBreak}, {currentBreak: `${newBreak}:00`})
            });
            this.forceUpdate();
        }
        else{
            return NaN;
        }
    }

    handleChangeSession(event){
        let newSession = this.state.sessionLength + parseInt(event.currentTarget.value);
        if(newSession > 0 && newSession <= 60 && !this.state.running){
            this.setState(state => {
                Object.assign(this.state, {sessionLength: newSession}, {currentSession: `${newSession}:00`})
            });
            this.forceUpdate();
        }
        else{
            return NaN;
        }
    }

    handleStartStopToggle(){

    }

    handleReset(){
      this.setState({
          sessionLength: 25,
          breakLength: 5,
          currentSession: "25:00",
          currentBreak: 0,
          currentMode: "Session",
          running: false
      });
    }

    handleRunToggle(){
      if(this.state.running){
          this.setState(
              Object.assign(this.state, {running:false})
          )
      }
      else{
          this.setState(
              Object.assign(this.state, {running: true})
          )
      }
    }

  render(){
    return(
        <div className={"wrapper row align-items-center justify-content-center"}>
          <div className={"col"}>

            <Header/>
            <br/>
            <SetTimers
                handleChangeSession={this.handleChangeSession}
                handleChangeBreak={this.handleChangeBreak}
                breakLength={this.state.breakLength}
                sessionLength={this.state.sessionLength}
            />
            <br/>
            <br/>
            <TimeDisplay
                currentMode={this.state.currentMode}
                currentSession={this.state.currentSession}
                currentBreak={this.state.currentBreak}
            />
            <br/>
            <Toolbar
                handleStartStopToggle={this.handleStartStopToggle}
                handleReset={this.handleReset}
                handleRunToggle={this.handleRunToggle}
                running={this.state.running}
            />


          </div>
        </div>

    )

  }

}

export default PomodoroClock;
