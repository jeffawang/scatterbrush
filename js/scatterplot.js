function scatterplot(){
    var that = this
    this.width = 600;
    this.height = 600;
    this.radius = 4;
    this.margins = {
        "top"    : 10,
        "bottom" : 10,
        "left"   : 10,
        "right"  : 10 };
    this.margined = {
        "left"   : this.margins['left'],
        "top"    : this.margins['top'],
        "right"  : this.width  - this.margins['right'],
        "bottom" : this.height - this.margins['bottom'],
        "width"  : this.width  - this.margins['right']   - this.margins['left'],
        "height" : this.height - this.margins['bottom']  - this.margins['top'] };
    this.defaultExtent = [[100,100],[300,300]];
    this.svg = d3.select("body")
        .append("svg")
          .attr("class", "main")
          .attr("width", this.width)
          .attr("height", this.height)
        .append("g")
          .attr("class", "main");
    that.x = d3.scale.identity().domain([that.margined['left'], that.margined['right']]);
    that.y = d3.scale.identity().domain([that.margined['top'], that.margined['bottom']]);
    this.brush = d3.svg.brush()
        .x(this.x)
        .y(this.y)
        .extent(this.defaultExtent)
    this.data = d3.range(1000).map(function() {
        return [that.margined["left"] + that.radius + Math.random() * (that.margined["width"] - 2 * that.radius),
                that.margined["top"] + that.radius + Math.random() * (that.margined["height"] - 2 * that.radius)];
    });
    this.quadtree = d3.geom.quadtree()
        .extent([[-1,1], [this.width + 1, this.height + 1]])
        (this.data);
    this.point = this.svg.selectAll(".point")
        .data(this.data)
        .enter().append("circle")
          .attr("class", "point")
          .attr("cx", function(d) { return d[0] })
          .attr("cy", function(d) { return d[1] })
          .attr("r", this.radius);

    this.brushg = this.svg.append("g")
      .attr("class", "brush")
      .call(this.brush)

    this.brushstarted = function() {
      console.log("started brushing")
    }
    this.brushed = function() {
      var extent = that.brush.extent();
      that.point.each(function(d) { d.selected = false });
      that.search(that.quadtree, extent[0][0], extent[0][1], extent[1][0], extent[1][1]);
      that.point.classed("selected", function(d) { return d.selected });
    }
    this.brushended = function() {
      console.log("brush ended")
    }
    this.brush
        .on("brushstart", this.brushstarted)
        .on("brush", this.brushed)
        .on("brushend", this.brushended)

    this.search = function(quadtree, x0, y0, x3, y3) {
      quadtree.visit(function(node, x1, y1, x2, y2) {
        var p = node.point;
        if (p) p.selected = (p[0] >= x0) && (p[0] < x3) && (p[1] >= y0) && (p[1] < y3);
        return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
      });
    }
    this.brushg.call(this.brush.event) // do it once
}
