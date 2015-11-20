var dataGlobal = null ;

function ChartOption( columnsNumber , aggregatorType, binsNumber){
    return {
        number_of_bins: binsNumber,
        column_s: columnsNumber,
        agg_type: aggregatorType,    //count, sum, mean, std, min, max, variance
    };
};

function updateDropdownColumn(columnsList){
    var selectedColumn = $("#columnsSelector option:selected").val() 
    $("#columnsSelector").empty();
    var selectedColumn = selectedColumn >= columnsList.lenght ? 0 : selectedColumn ;
    for (var i = 0; i < columnsList.length; i++) {
        $("#columnsSelector").append('<option value="'+ i +'">'+ (columnsList[i]) +'</option>');
    };
    $("#columnsSelector").val(selectedColumn);
};

function drawchart(){

        // read parameters
    var currentAggregator = $( "#aggregatorSelector option:selected" ).text(),
        selectedColumn = $("#columnsSelector option:selected").val();

    //updateDropdownColumn(columnsNumber, selectedColumn ); // update the number of columns of the file
    var myChart = histogramChart(dataGlobal, ChartOption(selectedColumn,currentAggregator,20));
};


// Method that checks that the browser supports the HTML5 File API
function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    isCompatible = true;
    }
    return isCompatible;
}

// Method that reads and processes the selected file
function upload(evt) {
if (!browserSupportFileUpload()) {
    alert('The File APIs are not fully supported in this browser!');
    } else {
        var data = null;
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            var csvData = event.target.result;
            data = $.csv.toArrays(csvData);
            if (data && data.length > 0) {
              console.log('Imported -' + data.length + '- rows successfully!');
              updateDropdownColumn(data[0]);
              dataGlobal = data ;
              drawchart();
            } else {
                alert('No data to import!');
            }
        };
        reader.onerror = function() {
            alert('Unable to read ' + file.fileName);
        };
    }
}


//=========================================================================================================
//Startup
$(document).ready(function() 
{

    // redraw the chart on change of aggregator or colums number
    $("#columnsSelector, #aggregatorSelector").change(function(){
        drawchart(); 
    });

    $("#fileElem").change(upload);

    // by default, draw for a arbitrary csv
    //drawchart();

}); 