import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//TODO : fonction pour appeler graphe avec les plats -> contient titre + ingrédients + valeur (pour chaque ingrédient) => formatb cf valeur de data
function createBarChart(data, features, targetElement) {
    // ---------- Constants ----------
    const margin = { top: 0, right: 30, bottom: 30, left: 30 },
        width = targetElement.getBoundingClientRect().width - margin.left - margin.right, //TODO : size them dynamically
        height = 400 - margin.top - margin.bottom,
        padding = 0;
    // ---------- Append the svg object to the body of the page ----------
    const svg = d3
        .select(targetElement)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    // ---------- Creation of separated stack bars ----------

    if (!features) features = [];
    const datasets = features.map((feature) =>
        d3
            .stack()
            .keys(() => {
                var ingredients = []; //list of keys
                Object.entries(data).forEach(([typeName, typeIngr]) => {
                    Object.keys(typeIngr[feature]).forEach((ingr, value) => {
                        if (!ingredients.includes(ingr)) ingredients.push(ingr); //add to list (no duplicata!!!)
                    });
                });
                return ingredients;
            })
            .value((obj, key) => obj[feature][key])(data)
    );

    const num_groups = datasets.length;

    // ---------- Gestion des graphiques ----------
    const xlabels = data.map(function (d) {
        return d["Plate"];
    });

    // Add X axis
    const x = d3
        .scaleBand()
        .domain(xlabels)
        .range([padding, width])
        .padding([0.2]);

    // Add Y axis -> cacher l'axe et mettre label sur chaque barre ?
    const y1domain_max = d3.max(
        datasets[0].map(function (row) {
            return d3.max(
                row.map(function (d) {
                    return d[1];
                })
            );
        })
    );
    const y2domain_max = d3.max(
        datasets[1].map(function (row) {
            return d3.max(
                row.map(function (d) {
                    return d[1];
                })
            );
        })
    );

    const y_1 = d3
        .scaleLinear() // value for type1
        .domain([0, y1domain_max])
        .range([height, 0]);

    const y_2 = d3
        .scaleLinear() // value for type2
        .domain([0, y2domain_max])
        .range([height, 0]);

    const xaxis = d3.axisBottom(x);
    const y1axis = d3.axisLeft(y_1);
    const y2axis = d3.axisRight(y_2);

    const accent_green = d3.scaleOrdinal(d3.schemeGreens[6]); //! LES MEMES INGREDIENTS N'ONT PAS MEME COULEUR
    const accent_red = d3.scaleOrdinal(d3.schemeReds[6]);

    const getColor = (i) => {
        if (i%2==0) return accent_green;
        else return accent_red
    }


    // ---------- Dessin des barres ----------
    d3.range(num_groups).forEach(function (gnum) {
        svg.selectAll("g.group" + gnum)
            .data(datasets[gnum])
            .enter()
            .append("g")
            .attr("fill", getColor(gnum)) 
            .attr("class", "group " + gnum)
            .selectAll("rect")
            .data((d) => d)
            .join("rect")
                .attr(
                    "x",
                    (d, i) => x(xlabels[i]) + (x.bandwidth() / num_groups) * gnum
                )
                .attr("y", (d,i) => {
                    if (gnum % 2 == 0) {
                        return y_1(d[1]);
                    } else {
                        return y_2(d[1]);
                    }
                })
                .attr("width", x.bandwidth() / num_groups)
                .attr("height", (d) => {
                    if (gnum % 2 == 0) {
                        return y_1(d[0]) - y_1(d[1]) || 0;
                    } else {
                        return y_2(d[0]) - y_2(d[1]) || 0;
                    }
                })
                .attr(
                    "id",
                    (d,i,...args) => {
                        //console.log(d.data);
                        return String("ing"); }
                )
                .on("mouseover", function (event,d) { // What happens when user hover a bar          
                    // // Reduce opacity of all rect to 0.2
                    // svg.selectAll(".group").style("opacity", 0.2)
          
                    // // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
                    // svg.selectAll("#" + this.id).style("opacity",1)
                    // //console.log(svg.selectAll("#" + this.id))
                    // svg.selectAll("#"+this.id)
                    //     .attr("title", "ingr")
                })
                .on("mouseleave", function (event,d) { // When user do not hover anymore
          
                    // // Back to normal opacity: 1
                    // svg.selectAll(".group")
                    //     .style("opacity",1)
                    // svg.selectAll("#"+this.id)
                    //     .attr("title", "")
                })
    });

    // ---------- Dessin des axes ----------
    svg.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);

    svg.append("g")
        .attr("class", "axis y1")
        .attr("transform", "translate(" + padding + ",0)")
        .call(y1axis);
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", padding)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .text(features[0]) ;//TODO : pretty scale name

    svg.append("g")
        .attr("class", "axis y2")
        .attr("transform", "translate(" + width + ",0)")
        .call(y2axis);
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", width)
        .attr("dy", "-0.5em")
        .attr("transform", "rotate(-90)")
        .text(features[1]) ;//TODO : pretty scale name
    
}

//!NOTE : That is the expected format for calling the next function (Plate, type1 and type2 must have these names)
const datas = [
    {
        Plate: "cat1",
        type1: { a: 100, b: 150 },
        type2: { a: 200, b: 250 },
    },
    {
        Plate: "cat2",
        type1: { a: 300 },
        type2: { a: 400 },
    },
    {
        Plate: "cat3",
        type1: { a: 500, b: 550 },
        type2: { a: 600, b: 650 },
    },
    {
        Plate: "cat4",
        type1: { a: 700 },
        type2: { a: 800 },
    },
];

// createBarChart(datas); // First call to draw
export { createBarChart, datas };
