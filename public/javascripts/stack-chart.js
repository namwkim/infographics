var stackchart = {

  generate : function(settings){
    var margin = settings.margin;//{top: 20, right: 20, bottom: 30, left: 40},
    width = settings.size.width - margin.left - margin.right,
    height = settings.size.height - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(4);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(4)
        .tickFormat(d3.format("$,"));

    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.value); });

    var svg = settings.container.append("svg")
        .attr("x", settings.position.x)
        .attr("y", settings.position.y)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //d3.tsv("data.tsv", function(error, data) {
  //  data.forEach(function(d) {
  //    d.date = parseDate(d.date);
  //    d.value = +d.close;
  //  });
    var data = settings.data;
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      
  }
}