$(document).ready(function(){
		var videoinfo=window.location.search.split('&');
		var tab=videoinfo[0].substring(5,videoinfo[0].length);
		var index=videoinfo[1].substring(6,videoinfo[1].length);
		var num=Math.ceil(Math.random()*5);
		var num1=Math.ceil(Math.random()*5);
		var vlist=tranarr(localStorage.getItem(tab));
		if(num !=num1){
			addvlist(num,vlist,tab)
			addvlist(num1,vlist,tab)
		}else{
			num1++
			addvlist(num,vlist,tab)
			addvlist(num1,vlist,tab)
		}
		var a='http://cdn.guaiguaixueche.com/'+vlist[index].converted_path,
			i='http://cdn.guaiguaixueche.com/'+vlist[index].pic_path;
			getCont(a,i)
		//视频播放函数
		function getCont(a,i){
			var flashvars={
				f:'ckplayer/m3u8.swf',
				//f:'../../ckplayer/m3u8.swf',
				a:a,//调用的视频
				s:4,//swf视频流方式，该swf文件向播放器发送视频流
				c:0,//播放器找不到ckstyle()函数，则会自动请求ckplayer.xml
				l:'', //前置广告地址 
				t:'',//前置广告的播放时间
				p:'1',//设置视频是否自动播放
				e:'1',//设置循环播放2为暂停播放并且不调用广告
				i:i,//暂停或默认不加载时候显示预加载图片在播放器上
				};
			var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
			var video=[a]; 
			CKobject.embed('ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',false,flashvars,video,params);
		}
		
		
		//字符串转化为数组函数
		function tranarr(str){
			var arr;
			arr = str.split("&&")
			for(var i=0;i<arr.length;i++){
				arr[i]=JSON.parse(arr[i])
			}
			return arr
		}
		//创建推荐视频列表
		function addvlist(index,arr,tab){
			var pic_path='http://cdn.guaiguaixueche.com/'+arr[index].pic_path,
				video_path='http://cdn.guaiguaixueche.com/'+arr[index].converted_path;
				time=parseInt(arr[index].duration/60)+":"+arr[index].duration%60;
    		var	cor=$('<div class="col s12"></div>'),
    			z_depth=$('<a href="video.html?tab='+tab+'&index='+index+'" class="col s12 gg-video-card z-depth-2"></a>'),
    			img=$('<img class="gg-video-card-thumb" src='+pic_path+'></img>'),
    			textbox=$('<div class="gg-video-card-text"></div>'),
    			div1=$('<div class="gg-video-card-title">'+arr[index].title+'</div>'),
    			div2=$('<div class="gg-video-card-dru">'+time+'</div>'),
    			div3=$('<div class="gg-video-card-des">'+arr[index].description+'</div>'),
    			div4=$('<div class="gg-video-card-play-count"><img src="../../images/video/play-count-icon.svg">'+arr[index].down+'</div>');
    			textbox.append(div1);
    			textbox.append(div2);
    			textbox.append(div3);
    			textbox.append(div4);
    			z_depth.append(img);
    			z_depth.append(textbox);
    			cor.append(z_depth);
    		$(".row").append(cor);
		}
		
	})