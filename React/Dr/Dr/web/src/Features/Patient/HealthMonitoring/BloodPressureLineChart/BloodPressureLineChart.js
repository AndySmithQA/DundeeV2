import "./BloodPressureLineChart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {faker} from "@faker-js/faker";

export default function BloodPressureChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Blood Pressure Chart",
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90
                }
            }
        }
    };

    const labels = ["1/1/2020", "2/1/2020", "3/1/2020", "4/1/2020", "5/1/2020", "6/1/2020", "7/1/2020", "8/1/2020", "8/1/2020", "10/1/2020"];
    const data = {
        labels,
        datasets: [
            {
                label: "SYS",
                data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "DIA",
                data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    return (
        <>
            <Line options={options} data={data}/>
            <canvas id="myChartAxis"></canvas>
        </>
    );
}