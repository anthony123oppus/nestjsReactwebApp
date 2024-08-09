import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface datasetProps {
  x: string;
  y: number;
}

export interface pieDataProps {
  series: string;
  dataSet: datasetProps[];
}

const PieGraph = ({ pieData }: { pieData: pieDataProps }) => {
  const options: ApexOptions = {
    chart: {
      width: '100px',
      type: 'pie',
    },
    colors: ['#0000ff', '#00b300', '#ff1a1a', '#800080'],
    dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        // offsetY: -6,
        style: {
          fontSize: '12px',
          colors: ['white']
        },
        formatter: function (val: number) {
            if (typeof val === 'number') {
                return `${val.toFixed(2)} %`;
            }
            return val;
        }
      },
    labels: pieData.dataSet.map((data) => data.x), // Use dataSet to generate labels
    legend: {
      position: 'bottom',
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      labels: {
        colors: ['black', 'black','black','black'],
        useSeriesColors: false
    },
    }
    // colors: ['#FF5733', '#FFC300', '#DAF7A6', '#FF5733', '#FF5733'], // Customize colors here
  };

  const series = pieData.dataSet.map((data) => data.y); // Extract y values

  return (
    <div className="">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Skill Expertise
          </h5>
        </div>
      </div>
      <div id="chartThree" className="w-[600px]">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default PieGraph;
