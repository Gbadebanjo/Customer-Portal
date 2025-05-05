'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ProgressBarChartComponent = ({ progressData }) => {
    // alert('inside progress bar');
    // alert(JSON.stringify(progressData));
    const total =  progressData?.energyFromSolar || 0
            +  progressData?.energyFromGenerator || 0
    + progressData?.energyFromGrid || 0;
    // alert('total'+ JSON.stringify(total));
    const data = {
        labels: [
            "Energy from solar",
            'Energy from generator',
            'Energy from grid'
        ],
        datasets: [
            {
                label: '',
                data: [
                    progressData?.energyFromSolar || 0,
                    progressData?.energyFromGenerator || 0,
                    progressData?.energyFromGrid || 0,
                ],
                backgroundColor: ['#FF7D70', '#0F69ED', '#00C9FF'],
                hoverBackgroundColor: ['#FF7D70', '#0F69ED', '#00C9FF'],
                borderColor: ['#fff', '#fff', '#fff'],
                borderWidth: 1,
                barThickness: 5, // Adjust this value to make the bars thinner
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: 'y', // This makes the bars horizontal
        scales: {
            x: {
                display: true,
                beginAtZero: true,
                ticks: {
                    display: false, // Hides the ticks
                },
                grid: {
                    display: false, // Hides the horizontal grid lines
                },
            },
            y: {
                display: true,
                grid: {
                    display: false, // Hides the vertical grid lines
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ProgressBarChartComponent;
