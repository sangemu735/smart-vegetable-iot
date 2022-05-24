import React from "react";
import { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import { io } from "socket.io-client";
import "./Control.css";

const socket = io("https://smart-vegetable.herokuapp.com");

const lamp_on = "images/lamp_on.png";
const lamp_off = "images/lamp_off.png";
const pump_on = "images/water_pump_on.png";
const pump_off = "images/water_pump_off.png";

const Control = () => {
    const [status1, setStatus1] = useState("off");
    const [status2, setStatus2] = useState("off");
    const [option, setOption] = useState("current");
    const [adjustTemp, setAdjustTemp] = useState(27);

    useEffect(() => {
        socket.on("data_dht", (data) => {
            let temperatureElement = document.getElementById("temperature");
            let humidityElement = document.getElementById("humidity");
            temperatureElement.value = data.dht[0];
            humidityElement.value = data.dht[1];
        });

        socket.on("data_devices", (data) => {
            if (data.device_1 === "A1_ON") {
                setStatus1("on");
            } else if (data.device_1 === "A1_OFF") {
                setStatus1("off");
            }

            if (data.device_2 === "A2_ON") {
                setStatus2("on");
            } else if (data.device_2 === "A2_OFF") {
                setStatus2("off");
            }
        });
    }, [socket]);

    useEffect(() => {
        socket.emit("sync", "sync");
    }, []);

    useEffect(() => {
        let bodyElement = document.querySelector("body");
        if (status2 === "on") {
            bodyElement.style.backgroundImage = `url("images/ON1.jpg")`;
        } else {
            bodyElement.style.backgroundImage = `url("images/ON2.jpg")`;
        }
    });

    const changeStatus1 = () => {
        let buttonElement = document.querySelector("[id*='device1']");
        if (status1 === "off") {
            setStatus1("on");
            buttonElement.id = "device1-on";
            socket.emit("status_device", "A1_ON");
        } else {
            setStatus1("off");
            buttonElement.id = "device1-off";
            socket.emit("status_device", "A1_OFF");
        }
    };

    const changeStatus2 = () => {
        let buttonElement = document.querySelector("[id*='device2']");
        if (status2 === "off") {
            setStatus2("on");
            buttonElement.id = "device2-on";
            socket.emit("status_device", "A2_ON");
        } else {
            setStatus2("off");
            buttonElement.id = "device2-off";
            socket.emit("status_device", "A2_OFF");
        }
    };

    const chartTracker = (value) => {
        setOption(value);
    };

    const minusTemp = (Temp) => {
        let tmp = Temp;
        if (Temp > 0) {
            tmp -= 1;
            setAdjustTemp(tmp);
            socket.emit("temp_threshold", "Threshold: " + tmp.toString());
        } else {
            setAdjustTemp(0);
        }
    };

    const plusTemp = (Temp) => {
        let tmp = Temp;
        if (Temp < 99) {
            tmp += 1;
            setAdjustTemp(tmp);
            socket.emit("temp_threshold", "Threshold: " + tmp.toString());
        } else {
            setAdjustTemp(99);
        }
    };

    const sendMode = (mode) => {
        socket.emit("mode", mode);
    };

    return (
        <div className="control-container">
            <div className="display-wrapper">
                <div className="mode-wrapper">
                    <div className="mode-title">Select System Mode: </div>
                    <div className="mode-box">
                        <select onChange={(e) => sendMode(e.target.value)}>
                            <option value="auto">AUTO</option>
                            <option value="manual">MANUAL</option>
                        </select>
                    </div>
                    <div className="threshold-title">Set Temperature Threshold: </div>
                    <div className="adjust-wrapper">
                        <span onClick={() => minusTemp(adjustTemp)}>-</span>
                        <span>{adjustTemp < 10 ? "0" + adjustTemp : adjustTemp}</span>
                        <span onClick={() => plusTemp(adjustTemp)}>+</span>
                    </div>
                </div>
                <div className="temperature-humidity">
                    <label>Temperature: </label>
                    <input id="temperature" type="text" />
                    <label>Humidity: </label>
                    <input id="humidity" type="text" />
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-between">
                    <div className="col">
                        <div className="device-list">
                            <span>Device 1</span>
                            <img src={status1 === "off" ? pump_off : pump_on} alt="Device 1" onClick={changeStatus1} />
                            <button
                                id="device1-off"
                                style={{ backgroundColor: status1 === "off" ? "red" : "green" }}
                                onClick={changeStatus1}
                            >
                                {status1 === "off" ? "OFF" : "ON"}
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="device-list">
                            <span>Device 2</span>
                            <img src={status2 === "off" ? lamp_off : lamp_on} alt="Device 2" onClick={changeStatus2} />
                            <button
                                id="device2-off"
                                style={{ backgroundColor: status2 === "off" ? "red" : "green" }}
                                onClick={changeStatus2}
                            >
                                {status2 === "off" ? "OFF" : "ON"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-vis">
                <LineChart option={option} />
                <div className="selectBox">
                    <select onChange={(e) => chartTracker(e.target.value)}>
                        <option value="current">Current</option>
                        <option value="latest_3_days">Latest 3 Days</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Control;
