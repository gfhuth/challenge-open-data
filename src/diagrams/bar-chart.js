import * as d3 from "d3"
//import parseCSV from "../script.js"

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar-chart")
    .append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
//TODO : récupérer en CSV les plats à plot (faire attention à la structure avec sous-groupes)
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then( function(data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1) //TODO check right separation

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map(d => (d.group))

    // Add X axis
    const x = d3.scaleBand()
        .domain(groups) //liste des plats
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 60]) //TODO récupérer valeurs max en Y selon features
        .range([ height, 0 ]); 
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a']) //TODO : dynamiser l'attribution des couleurs en fonction du nb d'ingrédient

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
        .keys(subgroups)
        (data)

    // Show the bars
    svg.append("g")
        .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d.data.group))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width",x.bandwidth())
})