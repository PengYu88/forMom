tsc.ContentDefault = {
		
	init: function() {
		
		// 线上商品数量（近7日）
		tsc.ContentDefault.onlineGoodsSumWeek();
		
		// 线上商品数量（本月）
		// tsc.ContentDefault.onlineGoodsSumMonth();
		
		// 线上商品数量（近7日）
		tsc.ContentDefault.orderTrendWeek();
		
		// 线上商品数量（本月）
		tsc.ContentDefault.orderTrendMonth();
	},
	
	// 线上商品数量（近7日）
	onlineGoodsSumWeek: function(){
		
		$.getJSON("data/charts_week.json", function(rs) {

			$('#tab_online_goods_sum_week').highcharts({
				title: {
					text: ''
				},
		        credits: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
				xAxis: {
					categories: rs.data.categories
				},
				yAxis: {
					title: {
						text: '线上商品数量（个）'
					}
				},
				tooltip: {
					valueSuffix: '线上商品数量（个）'
				},
				series: [{
		            name: "线上商品数量",
		            data: rs.data.data
		        }]
			});
	  	});
	},
	
	// 订单趋势（近7日）
	orderTrendWeek: function(){
		
		$.getJSON("data/charts_week.json", function(rs) {

			$('#tab_order_trend_week').highcharts({
				title: {
					text: ''
				},
		        credits: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
				xAxis: {
					categories: rs.data.categories
				},
				yAxis: {
					title: {
						text: '线上商品数量（个）'
					}
				},
				tooltip: {
					valueSuffix: '线上商品数量（个）'
				},
				series: [{
		            name: "线上商品数量",
		            data: rs.data.data
		        }]
			});
	  	});
	},
	
	// 订单趋势（本月）
	orderTrendMonth: function(){
		
		$('#tab_order_trend_month').width($('#tab_order_trend_week').width());
		
		$.getJSON("data/charts_month.json", function(rs) {

			$('#tab_order_trend_month').highcharts({
				title: {
					text: ''
				},
		        credits: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
				xAxis: {
					categories: rs.data.categories
				},
				yAxis: {
					title: {
						text: '线上商品数量（个）'
					}
				},
				tooltip: {
					valueSuffix: '线上商品数量（个）'
				},
				series: [{
		            name: "线上商品数量",
		            data: rs.data.data
		        }]
			});
	  	});
	},
}

$(function(){
	tsc.ContentDefault.init();
});