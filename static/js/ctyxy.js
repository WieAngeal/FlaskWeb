$(function() {
	echarts_1();
	echarts_2();
	echarts_3();
	echarts_4();
	echarts_5();

	echarts_21();
	echarts_22();
	echarts_23();
	echarts_24();
	echarts_25();

	get_data();

	function get_data() {
		var echart_1 = echarts.init(document.getElementById('echart_1'));
		var echart_2 = echarts.init(document.getElementById('echart_2'));
		var echart_3 = echarts.init(document.getElementById('echart_3'));
		var echart_4 = echarts.init(document.getElementById('echart_4'));
		var echart_5 = echarts.init(document.getElementById('echart_5'));
		var echart_21 = echarts.init(document.getElementById('echart_21'));
		var echart_22 = echarts.init(document.getElementById('echart_22'));
		var echart_23 = echarts.init(document.getElementById('echart_23'));
		var echart_24 = echarts.init(document.getElementById('echart_24'));
		var echart_25 = echarts.init(document.getElementById('echart_25'));

		$.ajax({
         	type : "GET",
			async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
         	url : "/api/logodata",    //请求发送server api
         	dataType : "json",        //返回数据形式为json
         	success : function(result) {
				//请求成功时执行该函数内容，result即为服务器返回的json对象
				if (result) {
					console.log(result);
					var month = [];
					var datatype = [];
					var sxzz_num = [];
					var sxzz_used = [];
					var yxy_diagnum = [];
					var yxy_callnum = [];
					var yxy_film = [];
					var yxy_uv = [];
					var yxy_pv = [];
					var yxy_daypv = [];
					var yxy_ainum = [];
					var yxy_oss = [];
					var fjzl_hospital = [];
					var yxy_aihospital = [];
					var yxy_hospital = [];

					for(var i=0;i<result.length;i++){
						month.push(result[i]["month"]);   //挨个取出名称并填入类别数组
						sxzz_num.push((result[i]["sxzz_num"]));
						sxzz_used.push(result[i]["sxzz_used"]);
						yxy_diagnum.push(result[i]["yxy_diagnum"]);
						yxy_callnum.push(result[i]["yxy_callnum"]);
						yxy_film.push(result[i]["yxy_film"]);
						yxy_uv.push(result[i]["yxy_uv"]);
						yxy_pv.push(result[i]["yxy_pv"]);
						yxy_daypv.push(result[i]["yxy_daypv"]);
						yxy_ainum.push(result[i]["yxy_ainum"]);
						yxy_oss.push(result[i]["yxy_oss"]);
						fjzl_hospital.push(result[i]["fjzl_hospital"]);
						yxy_aihospital.push(result[i]["yxy_aihospital"]);
						yxy_hospital.push(result[i]["yxy_hospital"]);
					}

					echart_1.setOption({
						series: [{
							name: '实际完成',
							type: 'bar',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: sxzz_num
						}]
					});
					echart_2.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: sxzz_used
						}]
					});
					echart_3.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_diagnum
						}]
					});
					echart_4.setOption({
						series: [{
							name: '实际完成',
							type: 'bar',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_callnum
						}]
					});
					echart_5.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_film
						}]
					});
					echart_21.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_uv
						}]
					});
					echart_22.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_pv
						}]
					});
					echart_23.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_oss
						}]
					});
					echart_24.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: fjzl_hospital
						}]
					});
					echart_25.setOption({
						series: [{
							name: '实际完成',
							type: 'line',  // line bar pie scatter effectScatter radar(雷达) tree treemap sunburst boxplot candlestick
							data: yxy_hospital
						}]
					});
				}
			},
			error : function(errorMsg) {
				//请求失败时执行该函数
				alert("图表请求数据失败!");
			}
    	});
	}

	function echarts_1() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_1'));
		var data_ai = [];
		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '4%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_2() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_2'));
		var data_ai = [];

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '4%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_3() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_3'));
		var data_ai = [];

		// ******* 这段请求已成功获取到数据并加载到前端页面，备份此处
		// $.ajax({
        //  	type : "get",
		// 	async : false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        //  	url : "/api/logodata",    //请求发送到Servlet处
        //  	dataType : "json",        //返回数据形式为json
        //  	success : function(result) {
		// 		//请求成功时执行该函数内容，result即为服务器返回的json对象
		// 		if (result) {
		// 			console.log(result);
		// 			var names = [];
		// 			for(var i=0;i<result.length;i++){
		// 				names.push(result[i]["yxy_ainum"]);    //挨个取出名称并填入类别数组
		// 			}
		// 			console.log(names);
		// 			data_ai = names;
		// 		}
		// 	},
		// 	error : function(errorMsg) {
		// 		//请求失败时执行该函数
		// 		alert("图表请求数据失败!");
		// 	}
    	// });

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					lineStyle: {
						color: '#dddc6b'
					}
				}
			},
			// legend: {
			// 	top: '0%',
			// 	data: ['安卓', 'IOS'],
			// 	textStyle: {
			// 		color: 'rgba(255,255,255,.5)',
			// 		fontSize: '12',
			// 	}
			// },
			grid: {
				left: '10',
				top: '3',
				right: '10',
				bottom: '0',
				containLabel: true
			},

			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.2)'
					}
				},
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12']
			},
			{
				axisPointer: {
					show: false
				},
				axisLine: {
					show: false
				},
				position: 'bottom',
				offset: 20,
			}],

			yAxis: [{
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},

				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_4() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_4'));
		var data_ai = [];

		// ******* 这段请求已成功获取到数据并加载到前端页面，备份此处
		// $.ajax({
        //  	type : "get",
		// 	async : false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        //  	url : "/api/logodata",    //请求发送到Servlet处
        //  	dataType : "json",        //返回数据形式为json
        //  	success : function(result) {
		// 		//请求成功时执行该函数内容，result即为服务器返回的json对象
		// 		if (result) {
		// 			console.log(result);
		// 			var names = [];
		// 			for(var i=0;i<result.length;i++){
		// 				names.push(result[i]["yxy_ainum"]);    //挨个取出名称并填入类别数组
		// 			}
		// 			console.log(names);
		// 			data_ai = names;
		// 		}
		// 	},
		// 	error : function(errorMsg) {
		// 		//请求失败时执行该函数
		// 		alert("图表请求数据失败!");
		// 	}
    	// });

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					lineStyle: {
						color: '#dddc6b'
					}
				}
			},
			// legend: {
			// 	top: '0%',
			// 	data: ['安卓', 'IOS'],
			// 	textStyle: {
			// 		color: 'rgba(255,255,255,.5)',
			// 		fontSize: '12',
			// 	}
			// },
			grid: {
				left: '10',
				top: '3',
				right: '10',
				bottom: '0',
				containLabel: true
			},

			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.2)'
					}
				},
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12']
			},
			{
				axisPointer: {
					show: false
				},
				axisLine: {
					show: false
				},
				position: 'bottom',
				offset: 20,
			}],

			yAxis: [{
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},

				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_5() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_5'));
		var data_ai = [];

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},

			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '2%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}

	function echarts_21() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_21'));
		var data_ai = [];

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '4%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_22() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_22'));
		var data_ai = [];

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '4%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_23() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_23'));
		var data_ai = [];

		// ******* 这段请求已成功获取到数据并加载到前端页面，备份此处
		// $.ajax({
        //  	type : "get",
		// 	async : false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        //  	url : "/api/logodata",    //请求发送到Servlet处
        //  	dataType : "json",        //返回数据形式为json
        //  	success : function(result) {
		// 		//请求成功时执行该函数内容，result即为服务器返回的json对象
		// 		if (result) {
		// 			console.log(result);
		// 			var names = [];
		// 			for(var i=0;i<result.length;i++){
		// 				names.push(result[i]["yxy_ainum"]);    //挨个取出名称并填入类别数组
		// 			}
		// 			console.log(names);
		// 			data_ai = names;
		// 		}
		// 	},
		// 	error : function(errorMsg) {
		// 		//请求失败时执行该函数
		// 		alert("图表请求数据失败!");
		// 	}
    	// });

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					lineStyle: {
						color: '#dddc6b'
					}
				}
			},
			// legend: {
			// 	top: '0%',
			// 	data: ['安卓', 'IOS'],
			// 	textStyle: {
			// 		color: 'rgba(255,255,255,.5)',
			// 		fontSize: '12',
			// 	}
			// },
			grid: {
				left: '10',
				top: '3',
				right: '10',
				bottom: '0',
				containLabel: true
			},

			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.2)'
					}
				},
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12']
			},
			{
				axisPointer: {
					show: false
				},
				axisLine: {
					show: false
				},
				position: 'bottom',
				offset: 20,
			}],

			yAxis: [{
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},

				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_24() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_24'));
		var data_ai = [];

		// ******* 这段请求已成功获取到数据并加载到前端页面，备份此处
		// $.ajax({
        //  	type : "get",
		// 	async : false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        //  	url : "/api/logodata",    //请求发送到Servlet处
        //  	dataType : "json",        //返回数据形式为json
        //  	success : function(result) {
		// 		//请求成功时执行该函数内容，result即为服务器返回的json对象
		// 		if (result) {
		// 			console.log(result);
		// 			var names = [];
		// 			for(var i=0;i<result.length;i++){
		// 				names.push(result[i]["yxy_ainum"]);    //挨个取出名称并填入类别数组
		// 			}
		// 			console.log(names);
		// 			data_ai = names;
		// 		}
		// 	},
		// 	error : function(errorMsg) {
		// 		//请求失败时执行该函数
		// 		alert("图表请求数据失败!");
		// 	}
    	// });

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					lineStyle: {
						color: '#dddc6b'
					}
				}
			},
			// legend: {
			// 	top: '0%',
			// 	data: ['安卓', 'IOS'],
			// 	textStyle: {
			// 		color: 'rgba(255,255,255,.5)',
			// 		fontSize: '12',
			// 	}
			// },
			grid: {
				left: '10',
				top: '3',
				right: '10',
				bottom: '0',
				containLabel: true
			},

			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.2)'
					}
				},
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12']
			},
			{
				axisPointer: {
					show: false
				},
				axisLine: {
					show: false
				},
				position: 'bottom',
				offset: 20,
			}],

			yAxis: [{
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12,
					},
				},

				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,.1)'
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
	function echarts_25() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echart_25'));
		var data_ai = [];

		option = {
			//  backgroundColor: '#00265f',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},

			grid: {
				left: '0%',
				top: '10px',
				right: '0%',
				bottom: '2%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1)",
						width: 1,
						type: "solid"
					},
				},

				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					// rotate:50,
					show: true,
					splitNumber: 15,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					//formatter: '{value} %'
					show: true,
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: '12',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,.1	)",
						width: 1,
						type: "solid"
					},
				},
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)",
					}
				}
			}],
			series: [{
				name: '实际完成',
				type: 'bar',
				barWidth: '35%',
				// smooth: false,
				// symbol: 'circle',
				// symbolSize: 4,
				// showSymbol: true,
				lineStyle: {
					normal: {
						color: '#0184d5',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 132, 213, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(1, 132, 213, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						// color: '#0184d5',
						// borderColor: 'rgba(221, 220, 107, .1)',
						// borderWidth: 12
						color: '#218435',
						opacity: 1,
						barBorderRadius: 5,
					}
				},
				data: data_ai
			},
			{
				name: '目标',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: true,
				lineStyle: {
					normal: {
						color: '#00d887',
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 216, 135, 0.4)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 216, 135, 0.1)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
					}
				},
				itemStyle: {
					normal: {
						color: '#00d887',
						borderColor: 'rgba(221, 220, 107, .1)',
						borderWidth: 12
					}
				},
				data: [6, 5, 5, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
			},
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",
		function() {
			myChart.resize();
		});
	}
})