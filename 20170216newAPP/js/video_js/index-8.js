$(document).ready(function(){
    	$('.slider').slider({
            height: 152,
            interval:3000
        });
    	$('ul.tabs').tabs();
    	
    	var videoARR;
    	$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com/ggxc/who',
				dataType:'json',
				async:false,
				contentType:'application/json;charset=utf-8',
				success:function(data){
					var path=hex_md5(data.ip);
					//console.log(path)
					$.ajax({
						type:"post",
						url:'https://guaiguaixueche.com/video/list',
						data:JSON.stringify({rnd:path}),
						dataType:'json',
						async:false,
						contentType:'application/json;charset=utf-8',
						success:function(data){
							//console.log(data)
							videoARR = data.list;
						}		
					})
				}		
			})
    	
    	var kemuer=[],xuechejiqiao=[],kemusan=[],chexuetang=[];
    	for(var i=0;i<videoARR.length;i++){
    		for(var i=0;i<videoARR.length;i++){
                    if(videoARR[i].video_type == 4){
                      kemuer.push(videoARR[i])
                    }else if(videoARR[i].video_type == 5){
                      kemusan.push(videoARR[i])
                    }else if(videoARR[i].video_type == 6){
                      xuechejiqiao.push(videoARR[i])
                    }else if(videoARR[i].video_type == 7){
                      chexuetang.push(videoARR[i])
                    }
                }
    	}
    	
    	
    	partarr(0,xuechejiqiao)
//  	partarr(1,kemuer)
//  	partarr(2,kemusan)
//  	partarr(3,chexuetang)
		$('.tabA').off().one('tap',function(){//点击tab再执行加载
    		var a=$('.tabA').index($(this));
    		if(a == 1){
    			partarr(1,kemuer)
    		}else if(a == 2){
    			partarr(2,kemusan)
    		}else if(a == 3){
    			partarr(3,chexuetang)
    		}
    		$('.gg-video-content').css('display','none').eq(a).css('display','block')
    	})
		
		
		function partarr(a,arr){
			var divid;
			if(a == 0){
				divid="tab1"
				addlist(divid,arr,'xuechejiqiao')
			}else if(a == 1){
				divid="tab2"
				addlist(divid,arr,'kemuer')
			}else if(a == 2){
				divid="tab3"
				addlist(divid,arr,'kemusan')
			}else if(a == 3){
				divid="tab4"
				addlist(divid,arr,'chexuetang')
			}
		}
    	function addlist(divid,arr,tab){
    		var	row=$('<div class="row"></div>');
    			//console.log(arr)
    			//console.log(divid)
    		for(var i=0;i<arr.length;i++){
    			var pic_path='http://cdn.guaiguaixueche.com/'+arr[i].pic_path,
    				video_path='http://cdn.guaiguaixueche.com/'+arr[i].converted_path;
    				time=parseInt(arr[i].duration/60)+":"+arr[i].duration%60;
	    		var	cor=$('<div class="col s12"></div>'),
	    			z_depth=$('<a href="video.html?tab='+tab+'&index='+i+'" class="col s12 gg-video-card z-depth-2"></a>'),
	    			//z_depth=$('<a href="video_play.html?tab="'+tab+"&index="+i+ 'class="col s12 gg-video-card z-depth-2"></a>'),
	    			img=$('<img class="gg-video-card-thumb" src='+pic_path+'></img>'),
	    			textbox=$('<div class="gg-video-card-text"></div>'),
	    			div1=$('<div class="gg-video-card-title">'+arr[i].title+'</div>'),
	    			div2=$('<div class="gg-video-card-dru">'+time+'</div>'),
	    			div3=$('<div class="gg-video-card-des">'+arr[i].description+'</div>'),
	    			div4=$('<div class="gg-video-card-play-count"><img src="../../images/video/play-count-icon.svg">'+arr[i].down+'</div>');
	    			textbox.append(div1);
	    			textbox.append(div2);
	    			textbox.append(div3);
	    			textbox.append(div4);
	    			z_depth.append(img);
	    			z_depth.append(textbox);
	    			cor.append(z_depth);
	    			row.append(cor);
    		}
    		$("#"+divid).append(row);
    	}
		//数组转化为字符串存储
		var kemuerstr = transtr(kemuer),
			xuechejiqiaostr = transtr(xuechejiqiao),
			kemusanstr = transtr(kemusan),
			chexuetangstr = transtr(chexuetang);
			localStorage.setItem('kemuer',kemuerstr)
			localStorage.setItem('xuechejiqiao',xuechejiqiaostr)
			localStorage.setItem('kemusan',kemusanstr)
			localStorage.setItem('chexuetang',chexuetangstr)
		function transtr(arr){
			var str="";
			for(var i=0;i<arr.length;i++){
				var str1=JSON.stringify(arr[i])+"&&"
				str+=str1
			}
			str=str.substring(0,str.length-2)
			return str
		}
	})