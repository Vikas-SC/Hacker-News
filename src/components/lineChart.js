import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);
    const ids = props.stories.map(id => id.objectID);
    const votes = props.stories.map(point => point.points);
    this.state = {
      options: {
        chart: {
          id: "basic-line",
          toolbar: {
            show: false
          },
        },
        xaxis: {
          categories: ids,
          title: {
            text: 'ID',
          }
        },
        yaxis: {
          title: {
            text: 'VOTE',
          },
        }
      },
      series: [
        {
          name: "series-1",
          data: votes
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;