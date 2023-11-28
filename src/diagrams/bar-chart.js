import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//TODO : fonction pour appeler graphe avec les plats -> contient titre + ingrédients + valeur (pour chaque ingrédient) => formatb cf valeur de data
function createBarChart(data, origin) { 
    // ---------- Constants ----------
    const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    padding = 40;
    // ---------- Append the svg object to the body of the page ----------
    var svg = d3.select(origin)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    // ---------- Creation of separated stack bars ----------
	var datasets = [
        d3.stack()
            .keys(()=>{
            var ingredients = []; //list of keys
            Object.entries(data).forEach(([typeName,typeIngr]) => {
                Object.keys(typeIngr['type1']).forEach(
                    (ingr, value) => {
                        if (!ingredients.includes(ingr)) ingredients.push(ingr) //add to list (no duplicata!!!)
                    } 
                    )
                })
                return ingredients
            })
            .value((obj, key) => obj.type1[key])(data), 
        d3.stack()
            .keys(()=>{
            var ingredients = []; //list of keys
            Object.entries(data).forEach(([typeName,typeIngr]) => {
                Object.keys(typeIngr['type2']).forEach(
                    (ingr, value) => {
                        if (!ingredients.includes(ingr)) ingredients.push(ingr) //add to list
                    } 
                    )
                })
                return ingredients
            })
            .value((obj, key) => obj.type2[key])(data)
    ];
            
            
    var num_groups = datasets.length;

    // ---------- Gestion des graphiques ----------
    var xlabels = data.map(function(d) {
        return d['Plate']
    });
    
    // Add X axis
    const x = d3.scaleBand()
    .domain(xlabels)
    .range([padding, width])
    .padding([0.2])
    
    
    // Add Y axis -> cacher l'axe et mettre label sur chaque barre ?
    var y1domain_max = d3.max(datasets[0].map(function(row) {
        return d3.max(row.map(function(d) {
            return d[1];
        }));
    }));
    var y2domain_max = d3.max(datasets[1].map(function(row) {
        return d3.max(row.map(function(d) {
            return d[1];
        }));
    }));
            
    const y_1 = d3.scaleLinear() // value for type1 
    .domain([0, y1domain_max])
    .range([ height, 0 ]); 
    
    const y_2 = d3.scaleLinear() // value for type2
    .domain([0, y2domain_max])
    .range([ height, 0 ]); 
    
    var xaxis = d3.axisBottom(x);
    var y1axis = d3.axisLeft(y_1);
    var y2axis = d3.axisRight(y_2);
    
    var accent_green = d3.scaleOrdinal(d3.schemeGreens[6]); //! LES MEMES INGREDIENTS N'ONT PAS MEME COULEUR
    var accent_red = d3.scaleOrdinal(d3.schemeReds[6]);
    
    // ---------- Dessin des barres ----------
    d3.range(num_groups).forEach(function(gnum) {
        svg.selectAll('g.group' + gnum)
        .data(datasets[gnum])
        .enter()
        .append('g')
        .attr('fill', accent_green) //TODO modify color domain to split with two colors scheme (worth it?)
        .attr('class', 'group' + gnum)
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', (d, i) => x(xlabels[i]) + (x.bandwidth() / num_groups) * gnum)
        .attr('y', d => {
            if (gnum%2 == 0) {return(y_1(d[1]));} else {return(y_2(d[1]))}})
        .attr('width', x.bandwidth() / num_groups)
        .attr('height', d => {
            if (gnum%2 == 0) {return y_1(d[0]) - y_1(d[1]);} else {return (y_2(d[0]) - y_2(d[1]));}}); 
    });
    
    // ---------- Dessin des axes ----------
    svg.append('g')
    .attr('class', 'axis x')
    .attr('transform', 'translate(0,' + (height) + ")")
    .call(xaxis);
    svg.append('g')
    .attr('class', 'axis y1')
    .attr('transform', 'translate(' + padding + ",0)")
    .call(y1axis);
    svg.append('g')
    .attr('class', 'axis y2')
    .attr('transform', 'translate(' + (width) + ",0)")
    .call(y2axis);
}


//!NOTE : That is the expected format for calling the next function (Plate, type1 and type2 must have these names)
var datas = [{
    Plate: "cat1",
    type1: {a:100, b:150},
    type2: {a:200, b:250},
},
{
    Plate: "cat2",
    type1: {a:300},
    type2: {a:400},
},
{
    Plate: "cat3",
    type1: {a:500, b:550},
    type2: {a:600, b:650},
},
{
    Plate: "cat4",
    type1: {a:700},
    type2: {a:800},
}
];
        
        
createBarChart(datas) // First call to draw
export {createBarChart, datas};