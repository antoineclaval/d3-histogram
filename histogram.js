function histogramChart(dataset, myOptions)

{

	var _dataset = dataset.slice() ; // copy original dataset
	//=========================================================================================================================
	//svg dimensions and margins

	//var margin = {top: 20, right: 20, bottom: 20, left: 20};
	//var margin  = {top: 20, right: 20, bottom: 40, left: 60}

	var margintop = typeof(myOptions.margintop) !== "undefined" ? myOptions.margintop : 20;
	var marginbottom = typeof(myOptions.marginbottom) !== "undefined" ? myOptions.marginbottom : 20;
	var marginleft = typeof(myOptions.marginleft) !== "undefined" ? myOptions.marginleft : 30;
	var marginright = typeof(myOptions.marginright) !== "undefined" ? myOptions.marginright : 20;


	var margin = {
		top: margintop,
		right: marginright,
		bottom: marginbottom,
		left: marginleft
	};

	var width = typeof(myOptions.width) !== "undefined" ? myOptions.width : 400;
	var height = typeof(myOptions.height) !== "undefined" ? myOptions.height : 300;
	var padding = typeof(myOptions.padding) !== "undefined" ? myOptions.padding : 0;

	var w1 = 400; //width
	var h1 = 300; //height

	var width = w1 - margin.left - margin.right;
	var height = h1 - margin.top - margin.bottom;
	var padding = 0;
	//=========================================================================================================================



	//=========================================================================================================================
	//column to sample in the input data

	//number of bins (bars) in the histogram;
	var number_of_bins = typeof(myOptions.number_of_bins) !== "undefined" ? myOptions.number_of_bins : 10;

	//column to sample
	var column_s = typeof(myOptions.column_s) !== "undefined" ? myOptions.column_s : 1;

	//title 
	var column_t = typeof(myOptions.column_t) !== "undefined" ? myOptions.column_t : column_s;

	//=========================================================================================================================



	//=========================================================================================================================
	//aggregator type
	//count, mean, sum, min, max, std, variance
	var agg_type = typeof(myOptions.agg_type) !== "undefined" ? myOptions.agg_type : "count";
	//=========================================================================================================================



	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right      
	var xOffset = typeof(myOptions.xOffset) !== "undefined" ? myOptions.xOffset : 30;

	//offset of graph and axis from top      
	var yOffset = typeof(myOptions.yOffset) !== "undefined" ? myOptions.yOffset : 30;

	//offset of left axis and graph 
	var xa_start = typeof(myOptions.xa_start) !== "undefined" ? myOptions.xa_start : 0;

	//offset of bottom axis and graph
	var ya_start = typeof(myOptions.ya_start) !== "undefined" ? myOptions.ya_start : 0;

	//translate bottom axis 
	var shift_ax = typeof(myOptions.shift_ax) !== "undefined" ? myOptions.shift_ax : 0;

	//translate left axis     
	var shift_ay = typeof(myOptions.shift_ay) !== "undefined" ? myOptions.shift_ay : 0;
	//=========================================================================================================================


	//=========================================================================================================================
	//gap between bars
	//var gap = typeof(myOptions.gap) !== "undefined" ? myOptions.gap + xa_start : 1 + xa_start;
	var gap = typeof(myOptions.gap) !== "undefined" ? myOptions.gap + shift_ay : 1 + shift_ay;
	//=========================================================================================================================



	//=========================================================================================================================
	//Legend position
	var legend_x = typeof(myOptions.legend_x) !== "undefined" ? myOptions.legend_x : 0;
	var legend_y = typeof(myOptions.legend_y) !== "undefined" ? myOptions.legend_y : 0;
	//=========================================================================================================================



	//=========================================================================================================================
	//x label position
	var text_padding_axx = typeof(myOptions.text_padding_axx) !== "undefined" ? myOptions.text_padding_axx : width / 2 - margin.right;
	var text_padding_axy = typeof(myOptions.text_padding_axy) !== "undefined" ? myOptions.text_padding_axy : 35;
	//x label position

	//y label position
	var text_padding_ayx = typeof(myOptions.text_padding_ayx) !== "undefined" ? myOptions.text_padding_ayx : 40;
	var text_padding_ayy = typeof(myOptions.text_padding_ayy) !== "undefined" ? myOptions.text_padding_ayy : height / 2;
	//y label position

	//title position
	var title_x = typeof(myOptions.title_x) !== "undefined" ? myOptions.title_x : width / 2;
	var title_y = typeof(myOptions.title_y) !== "undefined" ? myOptions.title_y : 10;
	//title position


	//show title and additional title parameters
	//yes or no
	var show_title = typeof(myOptions.show_title) !== "undefined" ? myOptions.show_title : "no";
	var title_auto_label = typeof(myOptions.title_auto_label) !== "undefined" ? myOptions.title_auto_label : "yes";
	var title_label = typeof(myOptions.title_label) !== "undefined" ? myOptions.title_label : "{title_label: Chart title}";
	//show title


	//axes legend parameters
	//yes or no
	var xa_show_legend = typeof(myOptions.xa_show_legend) !== "undefined" ? myOptions.xa_show_legend : "yes";
	var xa_auto_legend = typeof(myOptions.xa_auto_legend) !== "undefined" ? myOptions.xa_auto_legend : "yes";
	var xa_legend = typeof(myOptions.xa_legend) !== "undefined" ? myOptions.xa_legend : "{axis label: label}";

	var ya_show_legend = typeof(myOptions.ya_show_legend) !== "undefined" ? myOptions.ya_show_legend : "yes";
	var ya_auto_legend = typeof(myOptions.ya_auto_legend) !== "undefined" ? myOptions.ya_auto_legend : "yes";
	var ya_legend = typeof(myOptions.ya_legend) !== "undefined" ? myOptions.ya_legend : "{axis label: label}";
	//axes legend parameters


	//show text on bars
	var show_bar_text = typeof(myOptions.show_bar_text) !== "undefined" ? myOptions.show_bar_text : "no";
	var bar_f = typeof(myOptions.bar_f) !== "undefined" ? myOptions.bar_f : ".2f";
	//show text on bars


	//bars colors.  The bar can be positive or negative
	var bar_color = typeof(myOptions.bar_color) !== "undefined" ? myOptions.bar_color : "steelblue";
	var bar_neg_color = typeof(myOptions.bar_neg_color) !== "undefined" ? myOptions.bar_neg_color : "brown";
	//bars colors.  The bar can be positive or negative


	//x, y axes font size
	var axes_font_size = typeof(myOptions.axes_font_size) !== "undefined" ? myOptions.axes_font_size : 10;
	//x, y axes font size


	//axes number ticks
	var x_ticks = typeof(myOptions.x_ticks) !== "undefined" ? myOptions.x_ticks : 10;
	var y_ticks = typeof(myOptions.y_ticks) !== "undefined" ? myOptions.y_ticks : 10;
	//axes number ticks

	//plot inner frame
	var plot_frame = typeof(myOptions.plot_frame) !== "undefined" ? myOptions.plot_frame : "no";


	//axes and tooltio number format
	//examples: .d .f .2f .2r
	var ax_f = typeof(myOptions.ax_f) !== "undefined" ? myOptions.ax_f : ".d";
	var ay_f = typeof(myOptions.ay_f) !== "undefined" ? myOptions.ay_f : ".d";
	var tooltip_f = typeof(myOptions.tooltip_f) !== "undefined" ? myOptions.tooltip_f : ".4f";
	//axes and tooltio number format


	//transition parameters
	var enable_transition = typeof(myOptions.enable_transition) !== "undefined" ? myOptions.enable_transition : "yes";
	var transition_color = typeof(myOptions.transition_color) !== "undefined" ? myOptions.transition_color : "orange";
	var transition_duration = typeof(myOptions.transition_duration) !== "undefined" ? myOptions.transition_duration : 250;
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== "undefined" ? myOptions.enable_tooltip : "yes";
	//transition parameters
	//=========================================================================================================================



	//=========================================================================================================================	

	//var keys = Object.keys(_dataset[0]); //get keys outside the loop.  Same as the previous method but we do not use d3 
	//console.log(keys)

	//get id of header to plot as title and axis name
	var xLabel = _dataset[0][column_s];
	var tLabel = _dataset[0][column_t];
	_dataset.shift();// delete first line of data containing header. 
	//=========================================================================================================================


	//=========================================================================================================================
	// cast data and make sure it's readable
	_dataset.forEach(function(d)
	{
		d.forEach(function(cell,i)
		{
			modified = Number(cell);
			d[i] = (typeof cell === "string" && !isNaN(modified)) ? modified : cell;
		});

	});
	//=========================================================================================================================


	//=========================================================================================================================
	//map data to new arrays
	//in this case we are mapping the data in column_s of _dataset
	//can be a good idea to add a loop here to map all columns
	var mapdata = _dataset.map(function(d)
	{
		return d[column_s];
	});

	//=========================================================================================================================



	//=========================================================================================================================
	//create the histogram with the number of bins defined by number_of_bins	
	var myHistogram = d3.layout.histogram()
		.bins(number_of_bins)(mapdata); //the data is coming from mapdata

	//console.log(myHistogram);
	//=========================================================================================================================



	//=========================================================================================================================
	// call aggregators function

	var aggregator = aggregators(myHistogram, agg_type);

	//console.log(aggregator);
	//=========================================================================================================================



	//=========================================================================================================================
	//create scaling functions
	var xScale = d3.scale.linear()
		.domain([d3.min(mapdata), d3.max(mapdata)])
		//.domain([0,d3.max(mapdata)])
		//.range([xa_start, width - xOffset])
		.range([shift_ay, width - xOffset])
		.nice(); //fit nice the axis


	if (agg_type == "count" || agg_type == "std" || agg_type == "variance")
	{
		var yScale = d3.scale.linear()
			.domain([0, d3.max(aggregator)])
			//.range([height - ya_start, yOffset])
			.range([height - shift_ax, yOffset])
			.nice();
	}
	else
	{
		var yScale = d3.scale.linear()
			//.domain([0, d3.max(myHistogram, function(d) { return d.y; })])				//return the y value of all bins, equivalent to previous function.  I found this easier
			//.domain([0, d3.max(aggregator)])												//return the y value of all bins, equivalent to previous function.  I found this easier
			.domain([d3.min(aggregator), d3.max(aggregator)])
			//.range([height,0])	
			//.range([height,yOffset])
			//.range([height - ya_start, yOffset]) //To reverse y axis and we add offset
			.range([height - shift_ax, yOffset])
			.nice(); //fit nice the axis	
	};

	//=========================================================================================================================



	//=========================================================================================================================
	//Create axes.  We need to draw them on the svg, this is done at the end
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(x_ticks)
		//.ticks(5);
		//.ticks(number_of_bins)
		.tickFormat(d3.format(ax_f));

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(y_ticks)
		//.ticks(5);
		.tickFormat(d3.format(ay_f));


	if (plot_frame == "yes")
	{
		xAxis.outerTickSize(-height + yOffset + shift_ax);
		yAxis.outerTickSize(-width + xOffset + shift_ay);
	};
	//=========================================================================================================================



	//=========================================================================================================================
	//tooltip function
	//taken form http://bl.ocks.org/Caged/6476579
	if (agg_type == "count")
	{
		tooltip_f = ".f"
	};

	var tip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-10, 0])
		//Set or get a tip's HTML content
		//Initialize tooltip 
		.html(function(d, i)
		{
			return "<span style='color:white;font-size:10px'>" + agg_type + ": </span> <span style='color:red;font-size:10px'>" + d3.format(tooltip_f)(aggregator[i]) + "</span>";
		});
	//=========================================================================================================================



	//=========================================================================================================================
	//create the svg where we are going to plot the histogram
	//add svg to DOM
	var mySvg = d3.select("div#graphContainer")
   		.classed("svg-container", true) //container class to make it responsive
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 400 300")
		.classed("svg-content-responsive", true)
		.attr("id", "chart") //add style to svg, defined in main.css													
		//.attr("width", width + margin.left + margin.right) //The svg does not have margin
		//.attr("height", height + margin.top + margin.bottom) //The svg does not have margin
		//Responsive svg
		//.call(responsivefy)
		.append("g") // Y label ( aggregator type)		
		.attr("transform", "translate(" + 2 * margin.left + ",0)"); //to traslate whole svg			

	//=========================================================================================================================


	//=========================================================================================================================
	//bin the data to the document
	//the data is coming from histogram
	var bars = mySvg.selectAll(".bar") //style defined in main.css
		.data(myHistogram);

	//=========================================================================================================================


	bars.enter().append("g")
		.attr("fill", "#800");



	//exit 
    bars.exit()
	    .transition()
	    .duration(3000)
	    .ease("exp")
	    .attr("width", 0)
	    .remove();


	//=========================================================================================================================
	//Invoke the tip in the context of your visualization 
	//apply the tooltip to the svg
	mySvg.call(tip);

	//This will add the tooltips
	if (enable_tooltip == "yes")
	{
		bars
			.on("mouseover", tip.show)
			.on("mouseout", tip.hide)
	};
	//=========================================================================================================================



	//=========================================================================================================================
	//append the data to the actual bars
	//remember the bars goes from top to bottom

	myRect = bars.append("rect") //create the bars using rect
		//I added d3.min(mapdata) because the histogram does not start from 0
		    .transition()
    .duration(300)
    .ease("quad")
		.attr("x", function(d)
		{
			return xScale(d.x);
		}) //starts from the left corner.  It is function of x, which is computed in the histogram
		//.attr("y", 0)																//starts from the top, no edge swapping
		//.attr("y", function (d) {return yScale(d.y)})													//swap y axis
		.attr("y", function(d, i)
		{
			return yScale(aggregator[i]);
		}) //swap y axis
		//the width of each bar, for strictly positive values in x and minumum x equal to zero
		//.attr("width", function(d){ return xScale(d.dx) - gap})	
		//the width of each bar, for neg/pos values in x							
		//.attr("width", xScale(d3.min(mapdata)  + myHistogram[0].dx) - gap )			
		.attr("width", xScale(xScale.domain()[0] + myHistogram[0].dx) - gap) //when using .nice ()														
		//.attr("height", function(d){ return height - yScale(d.y)})							//the frequency of the bin or the height (bar)
		.attr("height", function(d, i)
		{
			return height - yScale(aggregator[i]) - shift_ax;
		}) //aggregator or the height (bar)
		.style("fill", function(d, i)
		{
			return aggregator[i] < 0 ? bar_neg_color : bar_color;
		});


	// Add MouseOver effect to the rect objects.
	d3.selectAll("rect")
               .on("mouseover", function(d)
               {
                       //change fill
                       d3.select(this).style("fill", transition_color);
               })
               //transition out of bar color
               .on("mouseout", function(d, i)
               {
                       d3.select(this)
                               .transition()
                               .duration(transition_duration)
                               .style("fill", bar_color)
                               .style("fill", function()
                               {
                                       return aggregator[i] < 0 ? bar_neg_color : bar_color;
                               });
               });




	//=========================================================================================================================
	//create a group where to apply the axes

	var group = mySvg.append("g")
		//.attr("class", "axis")  										//Assign "axis" class
		.classed("axis", true) //Assign "axis" class
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(0," + (height - shift_ax) + ")") //translate axis from top to bottom
		.call(xAxis);

	if (xa_show_legend == "yes")
	{
		if (xa_auto_legend == "yes")
		{
			xLabel = xLabel;
		}
		else
		{
			xLabel = xa_legend;
		};

		group.append("text")
			.attr("y", text_padding_axy)
			.attr("x", text_padding_axx)
			.style("font-family", "sans-serif")
			.style("font-size", axes_font_size)
			.style("font-weight", "bold")
			.style("fill", "black")
			.style("text-anchor", "middle")
			.text(function()
			{
				return xLabel;
			});
	};

	var group = mySvg.append("g")
		.classed("axis", true) //Assign "axis" class
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(" + shift_ay + ",0)")
		.call(yAxis);

	if (ya_show_legend == "yes")
	{
		if (ya_auto_legend == "yes")
		{
			yLabel = agg_type;
		}
		else
		{
			yLabel = ya_legend;
		};

		group.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -text_padding_ayx)
			.attr("x", -text_padding_ayy)
			//.attr("y", 6)
			//.attr("dy", ".71em")
			//.attr("class", "label")
			.style("font-family", "sans-serif")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.style("fill", "black")
			.style("text-anchor", "middle")
			//.style("text-anchor", "end")
			//.text("Count");
			.text(yLabel);
	};

	//=========================================================================================================================
	//FUNCTIONS HERE
	//=========================================================================================================================

	//=========================================================================================================================
	//Aggregators
	function aggregators(myHistogram, agg_type)
	{
		var aggregator = [];

		if (agg_type == "count")
		{
			var count = 0;
			myHistogram.forEach(function(d, i)
			{
				aggregator.push(myHistogram[i].length);

				//console.log(d)
			});
		}
		else if (agg_type == "sum")
		{
			myHistogram.forEach(function(d, i)
			{
				var sum = 0;
				d.forEach(function(point)
				{
					sum += point;
				});

				//sum=ss.sum(myHistogram[i])

				aggregator.push(sum);
			});
		}
		else if (agg_type == "max")
		{
			var max = 0;
			myHistogram.forEach(function(d, i)
			{
				if (myHistogram[i].length == 0)
				{
					max = 0;
				}
				else
				{
					max = d3.max(myHistogram[i]);
				}
				aggregator.push(max);
			});
		}
		else if (agg_type == "min")
		{
			var min = 0;
			myHistogram.forEach(function(d, i)
			{
				if (myHistogram[i].length == 0)
				{
					min = 0;
				}
				else
				{
					min = d3.min(myHistogram[i]);
				};
				aggregator.push(min);
			});
		}
		else if (agg_type == "mean")
		{
			myHistogram.forEach(function(d, i)
			{
				if (myHistogram[i].length == 0)
				{
					aggregator.push(0);
				}
				else
				{
					mean = ss.mean(myHistogram[i]);
					aggregator.push(mean);
				};
			});
		}
		else if (agg_type == "std")
		{
			myHistogram.forEach(function(d, i)
			{
				if (myHistogram[i].length == 0)
				{
					aggregator.push(0);
				}
				else
				{
					std = ss.sampleStandardDeviation(myHistogram[i]);
					aggregator.push(std);
				};
			});
		}
		else if (agg_type == "variance")
		{
			myHistogram.forEach(function(d, i)
			{
				if (myHistogram[i].length == 0)
				{
					aggregator.push(0);
				}
				else
				{
					variance = ss.sampleVariance(myHistogram[i]);
					aggregator.push(variance);
				};
			});
		}
		else
		{
			console.log("Aggregator not in list.\nValid options: count, sum, min, max, mean, std, variance")
		};

		//console.log(aggregator)

		return aggregator;
	};
	//Aggregators
	//=========================================================================================================================



}