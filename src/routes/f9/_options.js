export const barOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: "white", // labels such as 10, 20, etc
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: "white", // labels such as 10, 20, etc
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0)",
        },
      },
    ],
  },
  legend: {
    labels: {
      fontColor: "white",
    },
  },
};

export const lineOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: "white", // labels such as 10, 20, etc
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: "white", // labels such as 10, 20, etc
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    ],
  },
  legend: {
    labels: {
      fontColor: "white",
    },
  },
  elements: {
    line: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    point: {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
};
