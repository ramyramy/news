
var AmChartUtil = {

	createChart : function() {
		var chart = new AmCharts.AmSerialChart();
		chart.fontSize = 9;
		chart.mouseWheelZoomEnabled = true;
		chart.theme = 'light';
		chart.startDuration =1;
		chart.startEffect = 'easeOutSine';
		
		//CHART CURSOR
		//차트를 마우스로 선택할때 사용. 선택 범위를 이용한 줌 기능등에 사용됨
        var cursor = new AmCharts.ChartCursor();
        chart.addChartCursor(cursor);
		
		return chart;
	},
	
	createCategoryAxis : function(chart) {
		if (chart == null) return null;
		var categoryAxis = chart.categoryAxis;
		
		categoryAxis.gridPostion = 'start';
		categoryAxis.minorGridEnabled = true;
		categoryAxis.resizeEnabled = true;
		categoryAxis.autoRotateCount = 7; // 컬럼의 개수가 7개 이상이면 세로로 표시
		categoryAxis.autoRotateAngle = 65;
		categoryAxis.gridCount = 10;
		categoryAxis.startOnAxis = true;	// 차트 양쪽 이격공간 없앰
		
		return categoryAxis;
		
	},
	
	createValueAxis : function() {
		var valueAxis = new AmCharts.ValueAxis()
		valueAxis.axisAlpha = 0;
		valueAxis.fontSize = 9;
		
		return valueAxis;
	},
	

	createGraph : function() {
		var graph = new AmCharts.AmGraph();
		
		graph.type = 'line';
		graph.lineColor = '#fcd202';
		graph.lineThickness = 1;
		graph.lineAlpha = 0.9;
		// graph.fillAlphas = 0.3;
		
		return graph;
	},
	
	createColumnGraph : function() {
		var graph = new AmCharts.AmGraph();
		
		graph.type = 'column';
		graph.lineColor = '#fcd202';
		graph.lineThickness = 1;
		graph.lineAlpha = 0.9;
		graph.fillAlphas = 0.3;
		graph.clustered = false;
		
		return graph;
	},
	
	createLegend : function() {
		var legend = new AmCharts.AmLegend();
		legend.valueWidth = 70;
		
		return legend;
		
	}
	
};