import { Bar } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";

// data prop for the chart
const chartData = {
    labels: ["Consumable 1", "Consumable 2", "Consumable 3", "Consumable 4", "Consumable 5"],
    datasets: [
        {
            label: "amount",
            data: [12, 9, 15, 6, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }
    ]
}

// chart hook
function DataChart () {
    return (<div>
        <h1 class="d-flex justify-content-center">Data Chart</h1>
        <Bar data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Sample Data"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }
            }}/>
    </div>)
}

export default DataChart;