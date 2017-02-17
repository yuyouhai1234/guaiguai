$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	!function(){function c(){
		b.style.fontSize=Math.min(window.innerWidth,640)/320*a+"px"}
	if(window.addEventListener){
		var a=20,b=document.getElementsByTagName("html").item(0);window.addEventListener("resize",c),c()}
	}();
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		//shuaxinscroll();
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	var arr=[];
	$.ajax({
		url:'https://guaiguaixueche.com.cn/api/list/platform',
		type:"post",
		dataType:'json',
		async:false,
		cache: false,
		success:function(data){
			if(data.code=="success"){
				var list=data.list;
				for(var i=0;i<list.length;i++){
					var proDl=$('<dl class="product-list-dl"></dl>');
					var proDt=$('<dt class="product-pic"></dt>');
					var proDd=$('<dd class="product-cont"></dd>');
					var proPic=$('<img src="../../images/newslisttupian.png">');
					var proName=$('<div class="cont-main"><span class="cont-tit">产品名称：</span><b class="cont-diff">'+list[i].product_name+'</b></div>')					
					var proPiece=$('<div class="cont-main"><span class="cont-tit">价格区间：</span>￥<b class="cont-diff">'+list[i].price_range+'</b></div>')
					$('.product-list-box').append(proDl);
					proDl.append(proDt);
					proDl.append(proDd);
					proDt.append(proPic);
					proDd.append(proName);
					proDd.append(proPiece);
					arr.push(list[i].design_id)
					$(".product-list-dl").on("tap",function(){
						var index=$('.product-list-dl').index($(this));
						localStorage.setItem('design_id',arr[index]);						
						window.open('product_detail.html','_self');
					})
				}
				shuaxinscroll()
			}
		}
	})

	

})