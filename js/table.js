function datatable() {
    var that = this;
    this.data = [];
    this.table = d3.select("body")
        .append("table")
    this.headtr = this.table.append("tr")
}
