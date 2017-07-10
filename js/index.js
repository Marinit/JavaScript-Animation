window.addEventListener("load", function () {

	var menu = $('#menu');
	
	$(menu).css({ 'top' :'50px','z-index' : '1000'});
	$(menu).find('>div').css({ 'width' : '120px', 'bottom' : '0px', 'lineHeight': '85px', 'position' : 'absolute', 'top': 'inherit' }).wrapAll($('<div>').css({ "position" : "relative", "height" : "100px"})).on("mouseover", mouseMenu).on("mouseout", mouseMenu);
	
	function mouseMenu(e){
		
		var r = e.currentTarget,
			id_select = "#" + e.target.id.toString().substr(0,3);
			
		switch(e.type){
			case "mouseover":		
					
					TweenLite.to($(id_select), 0.9, {
						css : {
							height : "140px",
							width : "140px",
							lineHeight: "230px"
						}
					});
				break;
			case "mouseout":
					TweenLite.to($(id_select), 0.9, {
						css : {
							height : "100px",
							width : "120px",
							lineHeight: "85px"
						}
					});
				
			break;
		}
	}
	
	function getCoords(elem) { 
	
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return {
			top : Math.round(top),
			left : Math.round(left)
		};
	}
	
	$('#menu').css({'cursor' : 'pointer'});
	$('#menu').on("click", menuClick);	
	
	function menuClick(e) {

		if (e.target !== e.currentTarget && e.target !== e.currentTarget.firstElementChild) {
			
			var toY = getCoords($('#'+ e.target.id.toString().substr(0,3)+'_blc').get(0)).top; 

			TweenLite.to(window, 1.02, {scrollTo : {y : toY}});
			
		}
	}
	
	$('#slide>img'). each(function(){
		$(this).css({ 'transform' : 'rotate(225deg)'});
		$(this).on('click', slideClick);
	});
		
	$('#slide').css({ 'left' :'-600px'});
	$('#slide').attr('nu', 'true');
		
	function slideClick(){
		
		if ($('#slide').attr('nu') == 'true'){
			
			TweenLite.to($('#slide'), 0.9, {
						css : {
							left : "165px"
						},
						onComplete : function () { 
								TweenLite.to($('#slide>img'), 0.9, {
												css : {
													transform : "rotate(45deg)"
												}						
											})
							$('#slide').attr('nu', 'false');
						}
			});			
		} else {
			TweenLite.to($('#slide'), 0.9, {
						css : {
							left : "-600px"
						},
						onComplete : function () { 
								TweenLite.to($('#slide>img'), 0.9, {
													css : {
														transform : "rotate(225deg)"
													}
												})
							$('#slide').attr('nu', 'true');
						}
			});	
		}
	}
	
	$("#accord").css({ "left" : "25%"});
		
	$("#accord>div").each(function(){
		$(this).css({ "width" : "500px", "height" : "70px", "border-radius" : "40px 0 0 0"});
		
		$(this).find(">p").each(function(){
			$(this).css({ "transform" : "none", "position" : "static"});
		});
	});
	
	
	$("#accord").sl = null;	
	
	$("#accord").on("click", function(e){

		var parentSl = e.currentTarget;

		if (parentSl.sl && 	e.target !== parentSl){ 
			TweenLite.to(parentSl.sl, 0.3, {
				css : {
					height : "70px"
				}
			});
		} else {
			if (e.target === parentSl)
				return;
		};
		
		if (parentSl === e.target.parentNode){ 
			parentSl.sl = e.target;
		} else {
			if (parentSl === e.target.parentNode.parentNode)
				parentSl.sl = e.target.parentNode;
			else
				return; 
		};
		
		var toSlide = parentSl.sl.style.height  !== "500px" ? 500 : 70;

		TweenLite.to(parentSl.sl, 0.3, { 
			css : {
				height : toSlide + "px"
			}
		});
	});
		
	$("#abt_blc>img").each(function(){
		
		var time = 0.1 + Math.floor(Math.random() * 10) / 10,
			top = 3 * $("#abt_blc").height() * Math.floor(Math.random() * 100) / 500,
			left = 3 * $("#abt_blc").width() * Math.floor(Math.random() * 100) / 400,
			rotation = (Math.round(Math.random()) ? 1 : -1) * (150 * (Math.floor(Math.random() * 100) / 100) + 30 );
			
		TweenLite.to($(this), time, {
				css : {
					top : top +"px",
					left : left + "px",
					rotation : rotation + "deg"
				}
		});
	});
		
	var	prov = true;
	
	$("#logo").css({"top" : "230px", "transform" : "none"});
	$("#logo>img").css({"top" : "0px", "position" : "relative"});
	
	$("body").on("mousemove", move);
	
	
	function move (){

		if (parseInt($("#logo").css("top")) === 230 && prov) {
			
			$("body").off("mousemove", move);

			var a = Math.random() * 160 - 80;
			
			TweenLite.to($("#logo>img"), 0.2, {
				css : {
					top : "+=" + a + "px"
				},
				onComplete : function () { 
					TweenLite.to($("#logo>img"), 0.2, {
						css : {
							top : "0px"
						},
						onComplete : function () {
							$("body").on("mousemove", move);
						}
					});
				}
			});
		}
	};
	
	var nextFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;

	var lastScrTop = document.documentElement.scrollTop || document.body.scrollTop,
	deltaReturn = 0,
	deltaScroll = 0,
	nowLogoTop,
	nowScrTop,
	nowLogoLeft,
	logoTopStat = $("#logo").css("top"),
	logoLeftStat = $("#logo").css("left"),
	logoHeightStat = $("#logo").css("height");
	
	logoTopStat = parseInt(logoTopStat);
	logoLeftStat = parseInt(logoLeftStat);
	logoHeightStat = parseInt(logoHeightStat );
	nowLogoTop = parseInt($("#logo").css("top"));
	nowLogoLeft = parseInt($("#logo").css("left")); 
	
	mov(); 

	function mov() {

		nowScrTop = document.documentElement.scrollTop || document.body.scrollTop;

		if (lastScrTop === nowScrTop && nowLogoTop !== 230) {

			if (nowLogoTop >= logoTopStat + 40 || nowLogoTop <= logoTopStat - 40) {
				
				deltaReturn = nowLogoTop > logoTopStat ? -20 : 20;
				
			} else if (nowLogoTop !== logoTopStat) {
				
				deltaReturn = nowLogoTop > logoTopStat ? -1 : 1;
			}
			
			nowLogoTop = nowLogoTop + deltaReturn;
			$("#logo").css({"top" : nowLogoTop + "px"});

		} else { 
			if (lastScrTop !== nowScrTop) {

				deltaScroll = lastScrTop - nowScrTop;
				lastScrTop = nowScrTop;
				
				if(deltaScroll < 0){				
					if(-deltaScroll > logoTopStat - logoHeightStat - 40){
						nowLogoLeft = 0;
						prov = false;
						nowLogoTop = logoTopStat;
					}				
				} else {
					if((document.documentElement.clientHeight - nowLogoTop ) <= deltaScroll ) {
						nowLogoLeft = 0;
						prov = false;
						nowLogoTop = logoTopStat;
					}
				}	
				
				nowLogoTop = nowLogoTop + deltaScroll;
				$("#logo").css({"top" : nowLogoTop + "px"});				
				
				$("#logo").css({"left" : nowLogoLeft + "px"});
			} else {
				if(nowLogoLeft > 0 && nowLogoLeft < Math.round(logoLeftStat - (logoLeftStat / 5))) {
					nowLogoLeft += 50;
				} else {
					if(nowLogoLeft < logoLeftStat) {
						nowLogoLeft += 2;
					} else {
						prov = true;
					}
				}
				
				$("#logo").css({"left" : nowLogoLeft + "px"});
			}
		}

		nextFrame(mov);
	}

	$(window).on("scroll", scrollEffect);
	$(window).on("resize", scrollEffect);
	
	function scrollEffect(){

		var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			windHeight = window.innerHeight,
			heightBlock = parseInt($("#srv_blc").height());
			
		$("#srv_blc").css({"background-position" : ((docScrollTop - (windHeight * 5 - windHeight/ 2 + 100)) * 130 / windHeight) + "px 0%"});
		$("#slt_blc #img3").css({"top" : ( heightBlock / 5 + docScrollTop - heightBlock * 2) + "px"});
		$("#cnt_blc #img4").css({"top" : ( heightBlock / 5 + docScrollTop - heightBlock * 3) + "px"});
		
	};
	$("#slt_blc").append($('<div>').css({ "position" : "absolute", "top" : "350px", "width": "190px", "left" : "50%", "margin-left" : "-95px"}));
		
	var images = function(){
		
		function constructor(selfBox) {			
			this.box = selfBox;
			this.boxImages = [];
			this.count = 0;
		};
		
		constructor.prototype.addImage = function(src){
			var image = $('<img>').attr('src', src);
			
			this.count++;
			
			$(image).css({'position': 'absolute', 'top': '0','right': '0','z-index':  this.count});

			this.boxImages[this.count - 1] = image;
			this.box.append(image);
		};
		
		constructor.prototype.getQueue = function() {
			return this.boxImages;
		}
		
		return constructor;
	}();
	
	var sliderImages = function(){
				
		function effect(img, queue, type, elems, func){
			
			TweenLite.to(img, 0.5, {
					css : {
						right : "190px",
					},
					onComplete : function () { 					
						$(img).css({'z-index': ((type) ? "0" : (queue.length + 1).toString())});
							
							TweenLite.to(img, 0.7, {
								css : {
									right : "0px",
								},								
								onComplete : function () {
									
									refresh(queue, type);									
									editEvent(elems, func, true);
								}
							});
					}
			});
			
		}
		
		function refresh(queue, type){
			
			var copyQueue = queue,
				count = queue.length;
				copyActiveElement = (type) ? queue[count - 1] : queue[0];
					
			delete copyQueue[(type) ? (count - 1) : 0];
			
			if(type) {				
				for(var i = count - 1; i > 0; i--){
					copyQueue[i] = copyQueue[i-1];
					$(copyQueue[i-1]).css({'z-index':(i + 1).toString()});
				}
			} else {				
				for(var i = 0; i < (count - 1); i++){
					copyQueue[i] = copyQueue[i+1];
					$(copyQueue[i]).css({'z-index':(i + 1).toString()});
				}
			}
			
			$(copyActiveElement).css({'z-index':((type) ? "1" : count.toString())});			
			copyQueue[(type) ? 0 : (count - 1)] = copyActiveElement;

		}
		
		function editEvent(elems, func, type){
			
			$(elems).each(function(){
				if(type) {
					$(this).on("click", func);
				} else {
					$(this).off("click", func);
				}
			});	
		}
		
		function constructor(selfQueue) {
			this.queue = selfQueue;
			this.count = selfQueue.length;
		}
		
		constructor.prototype.prev = function(elems, func) {
			
			editEvent(elems, func, false);
			
			effect(this.queue[this.count - 1], this.queue, true, elems, func);
			
		};
		
		constructor.prototype.next = function(elems, func) {
			
			editEvent(elems, func, false);
			
			effect(this.queue[0], this.queue, false, elems, func);
			
		};
		
		return constructor;
	}();
	
	var masImg = new images($("#slt_blc div:last-child"));
	
	masImg.addImage("img/nightlife1.jpg");
	masImg.addImage("img/nightlife2.jpg");
	masImg.addImage("img/nightlife3.jpg");
	
	var slider = new sliderImages(masImg.getQueue());
	
	$('#prev, #next').addClass("slider-btn");
		
	var sliderBtn = $(".slider-btn");
	
	$(".slider-btn").each(function(){
	
		$(this).on("click", funEvent);
		$(this).on("mouseover", funEvent);
		$(this).on("mouseout", funEvent);
	});
	
	function funEvent(e) {
		var sld = e.currentTarget;
	
		switch (e.type) {

			case "click":	
				if(sld.id == "prev") {
					slider.prev(sliderBtn, funEvent);
				} else if(sld.id == "next"){
					slider.next(sliderBtn, funEvent);
				}			
				break;
			case "mouseover":
				$(sld).css({'background-color':'#000000', 'color':'#ffffff'});
				break;
			case "mouseout":
				$(sld).css({'background-color':'#eee', 'color':'#000000'});
				break;

		}
	}
}, false);