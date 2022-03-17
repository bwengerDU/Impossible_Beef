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
    var washingFreq = parseflot(metaResult.wfreq);
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
          {range: [2,4], color: "blue"},
          {range: [4,6], color: "purple"},
          {range: [6,8], color: "orange"},
          {range: [8,10], color: "yellow"},
        ],
        bar: {color: 'black'}
      }
    }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 400,
      margin: {t:0, b:0},
      paper_bgcolor: 'red'
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
