import { Chart, initTE } from "tw-elements";
import React, { useEffect } from "react";

initTE({ Chart });


const PieChart: React.FC = () => {
  useEffect(() => {
    // Chart
    const dataPie = {
      type: 'pie',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Traffic',
            data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
            backgroundColor: [
              'rgba(63, 81, 181, 0.5)',
              'rgba(77, 182, 172, 0.5)',
              'rgba(66, 133, 244, 0.5)',
              'rgba(156, 39, 176, 0.5)',
              'rgba(233, 30, 99, 0.5)',
              'rgba(66, 73, 244, 0.4)',
              'rgba(66, 133, 244, 0.2)',
            ],
          },
        ],
      },
    };

    new Chart(document.getElementById('pie-chart'), dataPie);
  }, []);

  return <div id="pie-chart"></div>;
};





export default PieChart;

// export default DoughnutChart;

