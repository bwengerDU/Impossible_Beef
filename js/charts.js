function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var  ids = result.otu_ids;
    var labels = result.otu_labels.slice(0, 10).reverse();
    var values = result.sample_values.slice(0,10).reverse();

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = ids.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values,
      y: yticks,
      type: "bar",
      orientation: "h",
      text: labels
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Top-10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 2-Bubble Chart
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: ids,
      y: values,
      mode: 'markers',
      text: labels,
      marker: {
        size: values,
        color: ids,
        colorscale: 'rainbow'
      }  
    }
  ];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU IDs'},
      margins: {t:10},
      mode: 'closest',
      height: 600,
      width: 800,
      paper_bgcolor: 'white',
      plot_bgcolor: 'white'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
  });
// Deliverable 3
// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    console.log(samplesArray);

    // Create a variable that filters the samples for the object with the desired sample number.
    var samplesObject = samplesArray.filter(samplesObject => samplesObject.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata;
    var metaObject = metadataArray.filter(metaObject => metaObject.id == sample);
    console.log(metaObject);  
    // Create a variable that holds the first sample in the array.
    var sampleResult = samplesObject[0];
    console.log(sampleResult);

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaResult = metaObject[0];
    console.log(metaResult);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sampleResult.otu_ids;
    var otu_labels = sampleResult.otu_labels;
    var sample_values = sampleResult.sample_values;
    console.log(otu_ids);



    // 3. Create a variable that holds the washing frequency.
    var washingFreq = parseFloat(metaResult.wfreq);
    console.log(washingFreq);
   
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(x => 'OTU ${x}').reverse();
    console.log(yticks);
    
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot('bar', barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: {x: [0,1], y: [0,1]},
      value: washingFreq,
      type: 'indicator',
      mode: 'gauge+number',
      gague: {
        axis: {range: [0,10]},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "lightgreen"},
          {range: [8,10], color: "green"},
        ],
        bar: {color: 'black'}
      }
    }];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 400,
      margin: {t:0, b:0},
      paper_bgcolor: 'cyan'
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
}