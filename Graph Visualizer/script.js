var xValues = [];
var yValues = [];
for (var i=0; i<100; i++) {
		xValues.push(i);
		yValues.push(i*i);
}

console.log(yValues);

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: "red",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});