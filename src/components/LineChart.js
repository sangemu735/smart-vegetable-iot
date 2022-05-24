import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import "./LineChart.css";

ChartJS.register(Legend, Tooltip, Title, CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = (option) => {
    var [dhtList, setDhtList] = useState([]);

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var data = {
        labels: [],
        datasets: [
            {
                label: "Temperature (°C)",
                data: dhtList.map((item) => {
                    return item.temperature;
                }),
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 4,
            },
            {
                label: "Humidity (%)",
                data: dhtList.map((item) => {
                    return item.humidity;
                }),
                backgroundColor: "transparent",
                borderColor: "green",
                borderWidth: 4,
            },
        ],
    };

    var options = {
        // responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
            xAxisID: {
                title: {
                    display: true,
                    text: "Time",
                    color: "#000",
                    font: {
                        size: 20,
                    },
                },
                ticks: {
                    display: true,
                },
            },
            yAxisID: {
                title: {
                    display: true,
                    text: "Value",
                    color: "#000",
                    font: {
                        size: 20,
                    },
                },
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 18,
                    },
                },
            },
            title: {
                display: true,
                text: "Temperature And Humidity Chart",
                color: "#000",
                font: {
                    size: 24,
                },
            },
        },
    };

    useEffect(() => {
        if (option.option !== "current") {
            Axios.get(`https://smart-vegetable.herokuapp.com/dhts/${option.option}`).then((response) => {
                setDhtList(response.data);
            });
        }
    }, [option]);

    useEffect(() => {
        if (option.option === "current") {
            Axios.get(`https://smart-vegetable.herokuapp.com/dhts/${option.option}`).then((response) => {
                setDhtList(response.data);
            });
        }
    });

    if (option.option === "current") {
        data.labels = dhtList.map((item) => {
            return (
                new Date(item.created_at).getHours() +
                ":" +
                new Date(item.created_at).getMinutes() +
                ":" +
                new Date(item.created_at).getSeconds()
            );
        });
    } else if (option.option === "latest_3_days") {
        data.labels = dhtList.map((item) => {
            return days[new Date(item.Days).getDay()];
        });
    } else if (option.option === "week") {
        data.labels = dhtList.map((item) => {
            return days[item.Days - 1];
        });
    } else if (option.option === "month") {
        data.labels = dhtList.map((item) => {
            return item.Days;
        });
    }
    // console.log(data.labels);

    return (
        <div>
            <article className="canvas-container">
                <Line data={data} options={options} />
            </article>
        </div>
    );
};

export default LineChart;
