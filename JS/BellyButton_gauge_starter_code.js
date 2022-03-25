// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var result = sampleArray[0];
    // 2. Create a variable that holds the first sample in the metadata array.
    
    var result1 = metaArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids
    var otu_labels = result.otu_labels
    var sample_values = result.sample_values;
    console.log(otu_ids)
    console.log(otu_labels)
    console.log(sample_values)

    // 3. Create a variable that holds the washing frequency.
    var washing = parseFloat(result1.wfreq)
    console.log(washing)

    // Create the yticks for the bar chart.

    var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar",barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble",bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washing,
        gauge: {
          axis: {range : [null,10],tickwidth:1},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "limegreen" },
            { range: [8, 10], color: "green" }]
        },
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number"
  
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } }; 
     
  

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
}
