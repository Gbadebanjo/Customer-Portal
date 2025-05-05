import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DonutChartComponent = ({ totals }) => {
    const total = totals.TotalMostRecentPvPower
        + totals.TotalMostRecentGensetPower
        + totals.TotalMostRecentPowerFromGrid;

    const data = {
        labels: [
            "Power Supplied  Solar",
            'Power Supplied  Generator',
            'Power Supplied the Grid'
        ],
        datasets: [
            {
                label: '',
                data: [
                    Math.floor(totals?.TotalMostRecentPvPower/total * 100) || 0,
                    Math.floor(totals?.TotalMostRecentGensetPower/total * 100) || 0,
                    Math.floor(totals?.TotalMostRecentPowerFromGrid/total * 100) || 0,
                ],
                backgroundColor: ['#FF7D70', '#0F69ED', '#00C9FF'],
                hoverBackgroundColor: ['#FF7D70', '#0F69ED', '#00C9FF'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: '70%',
    };

    const chartContainerStyle = {
        width: '150px', // Set the desired width
        height: '150px', // Set the desired height
        position: 'relative',
    };
    return (
        <div style={chartContainerStyle}>
            <Doughnut data={data} options={options}/>
        </div>
    )

};

export default DonutChartComponent;