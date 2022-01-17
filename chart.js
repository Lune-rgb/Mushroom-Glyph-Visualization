// set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 30, left: 60 },
    width = document.body.clientWidth - margin.left - margin.right,
    height = document.body.clientHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

//red=e, orange=o, brown=n, purple=u, gray=g, yellow=y
//white=w, red=e, gray=g, brown=n
const mushroomcolor = d3.scaleOrdinal()
    .domain(["e", "o", "n", "u", "g", "y", "w"])
    .range(["#D1161B", "#E07839", "#615332", "#762163", "#4D4D4D", "#E0AC31", "#F9EBCB"])

//spring=s, summer=u, autumn=a, winter=w
const bgcolor = d3.scaleOrdinal()
    .domain(["s", "u", "a", "w"])
    .range(["#DEA0BA", "#A7D396", "#DEC895", "#95ABDE"])

function getcsv() {
    return d3.csv("./data.csv")

async function askfordata() {
    data = await getcsv();
    // console.log(data);
    // for (var i = 0; i < data.length; i++) {
    //     var cla = data[i].cla;
    //     var dia = data[i]["cap-diameter"];
    //     var col = data[i]["cap-color"];
    //     console.log("cla: " + cla + "\n" +
    //         "dia: " + dia + "\n" +
    //         "col: " + col);
    // }

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 5; j++) {
            const number = j * 6 + i
            console.log(data[number])
            console.log(i, j)
            chart(i, j, data[number])
        }
    }
}

function chart(x, y, data) {
    // function drawGlyph(xPos,yPos) {
    svg
        // .selectAll("bot")
        // .data(data)
        // .enter()
        .append("rect")
        .attr("x", (x * (document.body.clientWidth - 700)) / 6)
        .attr("y", (y * document.body.clientHeight) / 5)
        .attr("rx", 15)
        .attr("ry", 15)
        .attr("width", 200)
        .attr("height", 200)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", bgcolor(data.season))

    svg
        .append("rect")
        .attr("x", (x * (document.body.clientWidth - 700)) / 6 + 100 - (data["stem-width"]) * 1)
        .attr("y", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7)
        .attr("width", data["stem-width"] * 2)
        .attr("height", data["stem-height"] * 7)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", mushroomcolor(data["stem-color"]))

    svg
        // .data(data)
        // .enter()
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 100)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7)
        .attr("rx", data["cap-diameter"] * 5.5)
        .attr("ry", data["cap-diameter"] * 2)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", mushroomcolor(data["cap-color"]))

    svg
        .append("rect")
        .attr("x", (x * (document.body.clientWidth - 700)) / 6 + 100 - (data["stem-width"]) * 1.5 + data["cap-diameter"] / 10)
        .attr("y", (y * document.body.clientHeight) / 5 + 250 - data["stem-height"] * 7 + data["cap-diameter"] / 20)
        .attr("width", data["has-ring"] * 50)
        .attr("height", data["has-ring"] * 15)
        .attr("rx", 7)
        .attr("ry", 7)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 90 + data["cap-diameter"] / 10)
        .attr("cy", (y * document.body.clientHeight) / 5 + 210 - data["stem-height"] * 7 + data["cap-diameter"] / 20)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 110 + data["cap-diameter"] * 3)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7 - data["cap-diameter"] * 1.2)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 50 + data["cap-diameter"] / 3)
        .attr("cy", (y * document.body.clientHeight) / 5 + 197 - data["stem-height"] * 7 - data["cap-diameter"])
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 100 + data["cap-diameter"] * 5)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7 - data["cap-diameter"] / 5)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 160 - data["cap-diameter"] * 2.1)
        .attr("cy", (y * document.body.clientHeight) / 5 + 215 - data["stem-height"] * 7 - data["cap-diameter"] * 0.5)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 110 - data["cap-diameter"] * 1.2)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7 - data["cap-diameter"] * 0.7)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 100 - data["cap-diameter"] * 4.5)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7 + data["cap-diameter"] * 0.6)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("ellipse")
        .attr("cx", (x * (document.body.clientWidth - 700)) / 6 + 100 + data["cap-diameter"] * 1.3)
        .attr("cy", (y * document.body.clientHeight) / 5 + 200 - data["stem-height"] * 7 - data["cap-diameter"] * 1.8)
        .attr("rx", data["poison"] * 12)
        .attr("ry", data["poison"] * 8)
        .style("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "white")

    svg
        .append("path")
        .attr("x", (x * (document.body.clientWidth - 700)) / 6)
        .attr("y", (y * document.body.clientHeight) / 5)
        .attr("d", function () {
            if (data["habitat"] == "m") {
                return "M113,94.78a36,36,0,0,0-.67-6.06l-.17-.77-.75.17A19.5,19.5,0,0,0,106.79,90a19.79,19.79,0,0,0-4,2.92l-.4.4a10.62,10.62,0,0,0-1-2.63c-.9-1.6-1.91-1.94-2.6-1.94-1.52,0-2.81,1.61-3.5,4.28l-.46-.46a19.23,19.23,0,0,0-4-2.92,19.5,19.5,0,0,0-4.64-1.92l-.75-.17-.17.77a37.22,37.22,0,0,0-.67,6.06,32.31,32.31,0,0,0,.31,5.75,21.13,21.13,0,0,0,1.79,6,16.82,16.82,0,0,0,3.48,4.73,19.44,19.44,0,0,0,3.95,2.92,19.18,19.18,0,0,0,4.64,1.92l.75.18,0-.06a21.07,21.07,0,0,0,5.23-2.54,17.37,17.37,0,0,0,6-6.8,20.82,20.82,0,0,0,1.79-6A32.26,32.26,0,0,0,113,94.78Zm-14.16-4.4c.8,0,1.84,1.66,2.29,4.46a15.75,15.75,0,0,0-1.79,2.86c-.15.3-.29.62-.42.94-.18-.45-.36-.88-.57-1.29a16.07,16.07,0,0,0-1.75-2.81C97.1,91.84,98.11,90.38,98.86,90.38ZM98.93,109a36.17,36.17,0,0,1-.48,5,19,19,0,0,1-3.51-1.56,16.47,16.47,0,0,1-6.74-7c-1.77-3.62-2-8-2-11a37.47,37.47,0,0,1,.49-5,19,19,0,0,1,3.5,1.56,16.43,16.43,0,0,1,6.75,7A24.25,24.25,0,0,1,98.93,109Zm10.61-3.2c-2.46,5-7.21,7.37-9.54,8.25a38.39,38.39,0,0,0,.48-5,32.28,32.28,0,0,0-.32-5.75A23.22,23.22,0,0,0,99.7,101h0a15.89,15.89,0,0,1,1-2.64,16.43,16.43,0,0,1,6.75-7A19,19,0,0,1,111,89.9a37.47,37.47,0,0,1,.49,5C111.56,97.87,111.3,102.22,109.54,105.84Z"

            }
            if (data["habitat"] == "l") {
                return "M113.73,87.2h-.06a1,1,0,0,0-.25,0c-3.1.41-10.89.46-14.11.46h-.44a12,12,0,0,0-4.74.91C88.26,91.11,86,97.35,88,105.7c0,.07,0,.11,0,.15a2.49,2.49,0,0,0,.2.6,37.22,37.22,0,0,0-3.7,5,.85.85,0,0,0,.34,1.18,1.07,1.07,0,0,0,.46.11.93.93,0,0,0,.79-.43,33.55,33.55,0,0,1,3.31-4.48c1.69,1.15,4.9,1.76,9.9,1.92h.38a11.43,11.43,0,0,0,8.61-3.75c5.46-6.2,7.1-15.79,7.25-16.75a1.56,1.56,0,0,0,0-.31A1.76,1.76,0,0,0,113.73,87.2Zm-18.83,3a10.14,10.14,0,0,1,4-.75h.44c2.9,0,8.39,0,12.07-.27-4.2,2.23-14.39,8.06-21.75,15.73C89.07,102.26,87.56,93.3,94.9,90.15Zm12,14.72a9.58,9.58,0,0,1-7.2,3.13h-.32c-3-.09-7.07-.43-8.77-1.51,8-8.57,20.1-15,23-16.49C113,92.71,111.16,100,106.86,104.87Z"

            }
            if (data["habitat"] == "g") {
                return "M116.54,85.79a.84.84,0,0,1,.85.83.74.74,0,0,1,0,.33c-3.07,8.8-7.63,12.11-15.68,14h0a22,22,0,0,0-1.87,6.75.83.83,0,0,1-1.65,0,4.81,4.81,0,0,0-1.41-2.89l.3-.17c-3.83,2.23-6.07,2.36-9.07,1.27l-.71-.27-.44-.16a3.78,3.78,0,0,0-2.36-.19.86.86,0,0,1-.82-1.41c5.74-6.8,10.79-8,14.68-3.08a.89.89,0,0,1-.13,1.22A.81.81,0,0,1,97,102c-2.78-3.49-6.2-3.13-10.6,1.39l-.22.23.14,0c.23.05.47.11.72.19l.26.08.31.12.65.24a7.12,7.12,0,0,0,6.7-.4,11.7,11.7,0,0,0-5.09-.33.84.84,0,0,1-.92-.77.87.87,0,0,1,.73-1h0c4.53-.49,7.38.58,8.88,2.67l.06.08.08-.33a26.42,26.42,0,0,1,8.48-13.28l.36-.31a.81.81,0,0,1,1.17.12.9.9,0,0,1-.11,1.22,27.49,27.49,0,0,0-5.93,7c6.24-1.68,9.93-4.49,12.56-11.09l.09-.23h-.27l-.75.06c-10.18.78-14.62,4.24-13.79,10.36l0,.22a.86.86,0,0,1-.69,1,.83.83,0,0,1-1-.71h0c-1.24-8,4.83-12.26,17.61-12.72Z"

            }
            if (data["habitat"] == "d") {
                return "M114.16,100.1a6.11,6.11,0,0,0-1.94-4.5,5.16,5.16,0,0,0,.22-1.51,5.45,5.45,0,0,0-10.86-.53,4.1,4.1,0,0,0-4.06,1c-.14.15-.28.3-.41.47a15.42,15.42,0,0,0-1.45-5.89c-1.06-2.12-2.55-3.28-4.18-3.28S88.37,87,87.31,89.11a17.85,17.85,0,0,0,0,14.3,5.69,5.69,0,0,0,3.3,3.17v5.88H88.66a.86.86,0,1,0,0,1.72H110a.86.86,0,1,0,0-1.72h-1.84v-6.12a6.27,6.27,0,0,0,6-6.24ZM107,90.42a3.68,3.68,0,0,1,3.7,3.68,3.73,3.73,0,0,1-.29,1.43l-.26.6.52.41a4.49,4.49,0,0,1,1.76,3.56,4.55,4.55,0,0,1-4.57,4.53,5,5,0,0,1-1.43-.22,5.21,5.21,0,0,0-2-6.57,3.15,3.15,0,0,0,0-.44,4,4,0,0,0-1.11-2.76h0a3.68,3.68,0,0,1,3.13-4.17A3.27,3.27,0,0,1,107,90.42Zm-9,7.73v-.79a2.33,2.33,0,0,1,4.65.08,2,2,0,0,1-.09.61l-.21.72.68.31a3.51,3.51,0,0,1,1.75,4.67,3.57,3.57,0,0,1-4.33,1.88l-.39-.13-.35.22a4.14,4.14,0,0,1-5.69-1.24,4.05,4.05,0,0,1,1.25-5.64,3.56,3.56,0,0,1,1-.45.88.88,0,0,0,.35-.1,4.11,4.11,0,0,1,.6-.08Zm-9.18,4.49a16.22,16.22,0,0,1,0-12.77c.75-1.47,1.7-2.32,2.62-2.32s1.88.85,2.62,2.32a14.61,14.61,0,0,1,1.32,6.39c0,.2,0,.41,0,.61a5.79,5.79,0,0,0-3.33,7.52l.17.39a1.72,1.72,0,0,1-.77.19C90.56,105,89.61,104.12,88.86,102.64Zm3.48,3.93a3.4,3.4,0,0,0,.88-.36,5.89,5.89,0,0,0,4.31,1.87,5.69,5.69,0,0,0,1.53-.2v4.58H92.34Zm8.45,5.89v-4.93s0,0,0-.07a5.32,5.32,0,0,0,4.64-1.58,8,8,0,0,0,1,.31v6.27Z"

            }

        })
        .style("transform", `translate(${(x * (document.body.clientWidth - 700)) / 6 + 75}px,${(y * document.body.clientHeight) / 5 + 75}px)`)
        .style("stroke", "black")
        .style("stroke-width", 1)
}
