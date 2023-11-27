import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 20, left: 50},
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
    const ingredients = data.columns.slice(1) //TODO check right separation
    
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const plates = data.map(d => (d.group))

    console.log(plates, ingredients)
    
    // Add X axis
    const x = d3.scaleBand()
        .domain(plates)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y_1 = d3.scaleLinear() // first value
        .domain([0, 60]) //TODO récupérer valeurs max en Y selon features
        .range([ height, 0 ]); 
    svg.append("g")
        .call(d3.axisLeft(y_1));
    
    const y_2 = d3.scaleLinear()// second value
        .domain([0, 60]) //TODO récupérer valeurs max en Y selon features
        .range([ height, 0 ]); 
    svg.append("g")
        .call(d3.axisRight(y_2)); //TODO : put on full right

    // Another scale for subgroup position?
    const xSubgroup = d3.scaleBand()
        .domain(ingredients)
        .range([0, x.bandwidth()])
        .padding([0.05])


    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
        .domain(ingredients)
        .range(['#e41a1c','#377eb8','#4daf4a']) 
        //TODO :  faire une liste de couleur (bouclera naturellement sur range si tailles différentes)
    

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
        .keys(ingredients)
        (data)

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the data = loop key per key = group per group
        .data(data)
        .join("g")
            .attr("transform", d => `translate(${x(d.group)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return ingredients.map(function(key) { return {key: key, value: d[key]}; }); })
        .join("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y_1(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y_1(d.value))
            .attr("fill", d => color(d.key));
    })