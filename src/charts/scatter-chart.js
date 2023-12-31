import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Specify the chart’s dimensions.
const width = 928;
const height = 600;
const marginTop = 25;
const marginRight = 20;
const marginBottom = 35;
const marginLeft = 40;


export function scatter_plot(ingredients ,xAtt, yAtt){
    ingredients = Object.values(ingredients)
    // Prepare the scales for positional encoding.
    const x = d3.scaleLinear()
        .domain(d3.extent(ingredients, d => d[xAtt])).nice()
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain(d3.extent(ingredients, d => d[yAtt])).nice()
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Create the axes.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(xAtt));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yAtt));

    // Create the grid.
    svg.append("g")
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .selectAll("line")
            .data(x.ticks())
            .join("line")
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d))
            .attr("y1", marginTop)
            .attr("y2", height - marginBottom))
        .call(g => g.append("g")
            .selectAll("line")
            .data(y.ticks())
            .join("line")
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d))
            .attr("x1", marginLeft)
            .attr("x2", width - marginRight));

    // Add a layer of dots.
    svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(ingredients)
        .join("circle")
        .attr("cx", d => x(d[xAtt]))
        .attr("cy", d => y(d[yAtt]))
        .attr("r", 3);

    // Add a layer of labels.
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("text")
        .data(ingredients)
        .join("text")
        .attr("dy", "0.35em")
        .attr("x", d => x(d[xAtt]) + 7)
        .attr("y", d => y(d[yAtt]))
        .text(d => d.name);
    return svg.node();
}

