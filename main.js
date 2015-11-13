function ChartOption( columnsNumber , aggregatorType, binsNumber){
    return {
        number_of_bins: binsNumber,
        column_s: columnsNumber,
        agg_type: aggregatorType,    //count, sum, mean, std, min, max, variance
    };
};

function updateDropdownColumn(columnsNumber, currentColumns){
    $("#columnsSelector").empty();
    for (var i = 0; i < columnsNumber; i++) {
        $("#columnsSelector").append('<option value="'+i+'">'+(i+1)+'</option>');
    };
    if( columnsNumber < currentColumns){ // a previousely loaded csv had a greater number of columns
        currentColumnsNumber = 0; // forget about the previous selected columns.
    }
    $("#columnsSelector").val(currentColumns);

};

function drawchart(csvFile){

    // read parameters
    var currentColumnsNumber = $("#columnsSelector option:selected").val() ,
        currentAggregator = $( "#aggregatorSelector option:selected" ).text() ,
        currentOptions = ChartOption(currentColumnsNumber,currentAggregator,20) ;

    var currentFile = csvFile === undefined  ? $("#fileElem").val() : csvFile ;

    $("#chart").remove();

    //Begin read csv
    d3.csv(currentFile, function(error, inputdata)
    {
            var columns = Object.keys( inputdata[0] );  // then taking the first row object and getting an array of the keys
            updateDropdownColumn(columns.length, currentColumnsNumber ); // update the number of columns of the file
            var myChart = histogramChart(inputdata, currentOptions);

    });
    //End read csv
};


//=========================================================================================================
//Startup
$(document).ready(function() 
{

    // redraw the chart on change of aggregator or colums number
    $("#columnsSelector, #aggregatorSelector, #fileElem").change(function(){
        drawchart(); 
    });

    // by default, draw for a arbitrary csv
    drawchart("dace1_csv.csv");

}); 