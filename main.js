var fix_body_length = "no" //yes or no

//These options will fix the body width and number of columns
if (fix_body_length == "yes")
{
    var body_width = 800
    var svg_per_row = 2
    //document.body.style.width = '800px';
    //$('body').css('width', '800px');
    $('body').css('width', body_width);

    var width = body_width / svg_per_row
    var aspect_ratio = 1 //height-to-width
    var height = width * aspect_ratio
}

myOptions = {
    //responsive: "no",
    //width: 400, 
    //height: 400,
    width: width,           //use this option when using fix_body_length
    height: height,         //use this option when using fix_body_length
    // margintop: 20,
    // marginbottom: 20,
    // marginleft: 30,
    // marginright: 20,
    //padding: 0,
    number_of_bins: 20,
    column_s: 2,
    agg_type: "count",    //count, sum, mean, std, min, max, variance
    //xOffset: 60,
    // yOffset: 30,
    // shift_ax: 10,
    // shift_ay: 10,
    // gap: 1.0,        //gap between bars
    //legend_x: 0,
    //legend_y: 0,
    // text_padding_axx: 250,
    // text_padding_axy: 35,
    // text_padding_ayx: 50,
    // text_padding_ayy: 200,
    // show_title: 'yes',
    // title_auto_label: 'no',
    // title_label: 'Histogram',
    // title_x: 250,
    // title_y: 20,
    //xa_show_legend: "yes",
    //xa_auto_legend: "no",
    //xa_legend: "This is a manual legend",
    //ya_show_legend: "yes",
    //ya_auto_legend: "yes",
    //ya_legend: "This is a manual legend",
    //show_bar_text: "yes",
    //bar_f: ".2f",
    //bar_color: "steelblue",
    //bar_neg_color: "brown",
    // ax_f: ".d",    //.d, 2f, .4r
    // ay_f: ".d",
    // x_ticks: 5,
    // y_ticks: 5,
    //axes_font_size: 10,
    // tooltip_f: ".4f",
    // enable_transition: "yes",
    // transition_color: "orange",    
    // transition_duration: 250,  
    // enable_tooltip: "yes",
    //plot_frame: "yes",
}

//To clone myOptions.  Doing options2 = options1 does not work
var options1 = jQuery.extend(true, {}, myOptions); //clone object
//     options1.column_s = 2;




//=========================================================================================================
//jQuery
$(document).ready(function() 
{
    console.log("ready");
    //Begin read csv
    d3.csv('dace2_csv.csv', function(error, inputdata)
    {
            var myChart = histogramChart(inputdata, options1);
            //var myChart = lineChart(inputdata,options2);
            //var myChart = lineChart(inputdata,{id1:"myChart2"},{column_y:2, responsive:"yes"});  
    //=========================================================================================================================
    });
    //End read csv

}); //close jQuery