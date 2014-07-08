
var barchart = {
  generate: function(settings){

    var margin = settings.margin;//{top: 20, right: 20, bottom: 30, left: 40},
    width = settings.size.width - margin.left - margin.right,
    height = settings.size.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d){
        var splited = d.split(",");
        return splited[0] + " '"+splited[1].slice(-2);
    });
/*
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
*/
    var svg = settings.container.append("svg")
    .attr("x", settings.position.x)
    .attr("y", settings.position.y)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = settings.data
  //  d3.tsv("data.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
/*
    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");
*/


    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.label); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });

    var fmt = this.toCurrency;

    svg.selectAll(".bar-label")
    .data(data)
    .enter().append("text")
    .attr("class", "bar-label")
    .attr("x", function(d) { return x(d.label)+5;})
    .attr("y", function(d) { return y(d.value)+15; })
    .text(function(d){ return fmt(d.value); })
    .attr("font-family", "Verdana")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "white");
    //});
  },
  toCurrency : function(number){
    if (number>Math.pow(10,12)){
        return "$"+Math.round(number/Math.pow(10,12))+"T";
    }else if (number>Math.pow(10,9)){
        return "$"+Math.round(number/Math.pow(10,9))+"B";
    }else if (number>Math.pow(10,6)){
        return "$"+Math.round(number/Math.pow(10,6))+"M";
    }else if (number>Math.pow(10,3)){
        return "$"+Math.round(number/Math.pow(10,3))+"K";
    }else{ 
        return "$"+Math.round(number);
    }
  }
}