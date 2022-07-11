var xValues = [];
var yValues = [];
for (var i=0; i<100; i++) {
		xValues.push(i);
		yValues.push(i*i);
}

console.log(yValues);

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      pointRadius : 4,
      pointBackgroundColor: "rgb(200, 200, 200)",
      borderColor: "rgb(218, 218, 218)",
      // backgroundColor: "red",
      data: yValues
    }]
  },
  options: {
    backgroundColor : "rgb(32, 32, 32)",
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});