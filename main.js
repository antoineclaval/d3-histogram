function ChartOption( columnsNumber , aggregatorType, binsNumber){
    return {
        number_of_bins: binsNumber,
        column_s: columnsNumber,
        agg_type: aggregatorType,    //count, sum, mean, std, min, max, variance
    };
};

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
      fileList.innerHTML = files[0].name ;
                  drawchart();
  }
}

function updateDropdownColumn(columnsNumber){
    console.log("updateDropdownColumn "+columnsNumber);
    $("#columnsSelector").empty();
    for (var i = 0; i <= columnsNumber; i++) {
        $("#columnsSelector").append('<option value="'+i+'">'+(i+1)+'</option>');
    };
};

function drawchart(){
    var currentColumnsNumber = $("#columnsSelector option:selected").text() ,
        currentAggregator = $( "#aggregatorSelector option:selected" ).text() ,
        currentOptions = ChartOption(currentColumnsNumber,currentAggregator,20) ,
        currentFile = $("#fileList").text();
    $("#chart").remove();

    //Begin read csv
    d3.csv(currentFile, function(error, inputdata)
    {
            var myChart = histogramChart(inputdata, currentOptions);
            var columns = Object.keys( inputdata[0] );  // then taking the first row object and getting an array of the keys
            updateDropdownColumn(columns.length );
    });
    //End read csv
};


//=========================================================================================================
//Startup
$(document).ready(function() 
{
    var fileElem = $("#fileElem") ,
        fileList = $("#fileList");

    $("#fileSelect").click(function (e) {
      if (fileElem) {
        fileElem.click();
      }
      e.preventDefault(); // prevent navigation to "#"
    });

    $("#columnsSelector, #aggregatorSelector").change(function(){
        drawchart(); // redraw the chart on change of aggregator or colums number
    });
    drawchart();

}); 