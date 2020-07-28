import React from 'react';
import forest from "./forest.mp3";
import './App.css';
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./fonts/digital-7.ttf"



const Header = () =>{
  return (
      <div className={"row justify-content-center"}>
        <div className={"col-5"}>
          <header className={"Title"}>
            PomodoroClock, work more efficiently!
          </header>
        </div>
      </div>
  )
}

const SetTimers = (props) => {
    return (
        <div className={"row justify-content-center"}>
            <div className={"col-4 Setter"}>
                <div id={"break-label"}>
                    <h2 className={"LengthHeader"}>
                        Break-Length
                    </h2>
                    <div id={"break-length"} className={"Lengthwrapper"}>
                        <button className={"btnChange"} id={"break-decrement"} value={-1} onClick={props.handleChangeBreak}>
                            <FontAwesomeIcon className={"Icons"} icon={faArrowDown} size={"lg"}/>
                        </button>
                        {props.breakLength}
                        <button className={"btnChange"} id={"break-increment"} value={1} onClick={props.handleChangeBreak}>
                            <FontAwesomeIcon className={"Icons"} icon={faArrowUp} size={"lg"}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"col-4 Setter"}>
                <div id={"session-label"}>
                    <h2 className={"LengthHeader"}>
                        Session-Length
                    </h2>
                    <div id={"session-length"} className={"Lengthwrapper"}>
                        <button className={"btnChange"} id={"session-decrement"} value={-1} onClick={props.handleChangeSession}>
                        <FontAwesomeIcon className={"Icons"}  icon={faArrowDown} size={"lg"}/>
                        </button>
                         {props.sessionLength}
                        <button className={"btnChange"} id={"session-increment"} value={1} onClick={props.handleChangeSession}>
                        <FontAwesomeIcon className={"Icons"} icon={faArrowUp} size={"lg"}/>
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
            <div className={"col-3 DisplayCol"}>
                <h2 id={"timer-label"}>{props.currentMode}</h2>
                <h1 id={"time-left"}>{props.currentMinutes}:{props.currentSeconds}</h1>
            </div>
        </div>
    )
}

const Toolbar = (props) => {
    return (
        <div className={"row justify-content-center Toolbar"}>
            <div className={"col-3 ToolbarCol"}>

                <button className={"btnChange"} id={"start_stop"} onClick={props.handleStartStopToggle}>
                    {(props.running === "ON") ? <FontAwesomeIcon className={"Icons"} icon={faPause} size={"lg"}/> : <FontAwesomeIcon className={"Icons"} icon={faPlay} size={"lg"}/>}
                </button>

                <button className={"btnChange"} id={"reset"} onClick={props.handleReset}>
                    <FontAwesomeIcon className={"Icons"} icon={faSyncAlt} size={"lg"}/>
                </button>
            </div>
        </div>
    )
}



class PomodoroClock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        sessionLength: 25,
        breakLength: 5,
        currentMinutes: 25,
        currentSeconds: "00",
        currentTimer: 25 * 60,
        currentMode: "Session",
        running: "OFF",
    };
    this.handleChangeBreak = this.handleChangeBreak.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleStartStopToggle = this.handleStartStopToggle.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.tick = this.tick.bind(this);

  }

    handleChangeBreak(event){
        let newBreak = this.state.breakLength + parseInt(event.currentTarget.value);
        if(newBreak > 0 && newBreak <= 60 && (this.state.running === "OFF")){
            this.setState(state => {
                Object.assign(this.state, {breakLength: newBreak})
            });
            this.forceUpdate();
        }
        else{
            return NaN;
        }
    }

    handleChangeSession(event){
        let newSession = this.state.sessionLength + parseInt(event.currentTarget.value);
        if(newSession > 0 && newSession <= 60 && (this.state.running === "OFF")){
            this.setState(state => {
                Object.assign(this.state, {sessionLength: newSession, currentTimer : newSession * 60},
                    {currentMinutes: newSession})
            });
            this.forceUpdate();
        }
        else{
            return NaN;
        }
    }

    tick(){

      if((this.state.running === "ON")){
        let newTimer = this.state.currentTimer - 1;
        let newMins = Math.floor(newTimer / 60);
        let newSeconds = newTimer - newMins * 60;
        this.setState(state => {
            Object.assign(this.state, {currentTimer : newTimer,
                    currentMinutes: (newMins > 9) ? (newMins) : ("0" + newMins.toString()),
                    currentSeconds: (newSeconds > 9) ? (newSeconds) : ("0" + newSeconds.toString())})
        });
        if(newTimer === 0){
            document.getElementById("beep").play();
            if(this.state.currentMode === "Session"){
                this.setState(state => {
                    Object.assign(this.state, {currentMode : "Break",
                    currentMinutes: state.breakLength,
                    currentSeconds: "00",
                    currentTimer: state.breakLength * 60})
                });
            }
            else{
                this.setState(state => {
                    Object.assign(this.state, {currentMode: "Session",
                    currentMinutes: state.sessionLength,
                    currentSeconds: "00",
                    currentTimer: state.sessionLength * 60})
                });
            }
        }
        this.forceUpdate();
      }
      else{
      }
    }

    handleStartStopToggle() {
      let control = this.state.running;
        (this.state.running === "ON") ?
            (this.setState(Object.assign(this.state, {running:"PAUSE"}))) :
            (this.setState(Object.assign(this.state, {running: "ON"})));
        if(control === "OFF"){
            this.interval = setInterval(this.tick, 1000);
        }
    }

    handleReset(){
      let beep = document.getElementById("beep");
      beep.pause();
      beep.currentTime=0;
      clearInterval(this.interval);
      this.setState({
          sessionLength: 25,
          breakLength: 5,
          currentMinutes: 25,
          currentSeconds: "00",
          currentTimer: 25 * 60,
          currentMode: "Session",
          running: "OFF"
      });
    }

  render(){
    return(
        <div className={"wrapper row align-items-center justify-content-center"}>
          <div className={"col"}>
              <div className={"watchwrapper"}>

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
                currentMinutes={this.state.currentMinutes}
                currentSeconds={this.state.currentSeconds}
            />
            <br/>
            <Toolbar
                handleStartStopToggle={this.handleStartStopToggle}
                handleReset={this.handleReset}
                running={this.state.running}
            />

            <audio id={"beep"} src={forest}/>
          </div>
          </div>
        </div>

    )

  }

}

export default PomodoroClock;
