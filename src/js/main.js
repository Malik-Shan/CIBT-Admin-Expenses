import {GoogleCharts} from 'google-charts';
 
//Load the charts library with a callback
GoogleCharts.load(drawChart);
 
function drawChart() {

  // Standard google charts functionality is available as GoogleCharts.api after load
  const data = GoogleCharts.api.
  visualization.arrayToDataTable([
    ['Month', 'Spent', 'Received'],
    ['Jan', 50000, 20000],
    ['Feb', 20000, 70000],
    ['March', 30000, 90000],
    ['April', 50000, 10000],
    ['May', 3000, 20000],
  ])  
  const materialOptions = {
    chart: {
      title: 'Montly Expenditure',
      subtitle: 'Spendings on left, Receivings on right'
    },
    axes: {
      y: {
        distance: {label: 'Money'}, // Left y-axis.
      }
    }
  };
  const classicOptions = {
    backgroundColor:'#334155',
    colors:['red','green'],
    legendTextStyle:{color: 'white'},
    titleTextStyle:{color: 'white'},
    hAxis:{
      textStyle:{
        color: 'white',
      },
    },
    vAxis:{
      textStyle:{
        color: 'white',
      },
    },
    series: {
      0: {targetAxisIndex: 0},
    },
  };
  let options = {
    title: 'Transcations',
    backgroundColor:'#334155',
    is3D: true,
  };
  const pie_1_chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart1'));
  pie_1_chart.draw(data,classicOptions);
}
