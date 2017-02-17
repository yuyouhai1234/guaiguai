$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}	
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	var browser = {
	   	versions: function () {
		    var u = navigator.userAgent, app = navigator.appVersion;
		    return {//移动终端浏览器版本信息
		     trident: u.indexOf('Trident') > -1, //IE内核
		     presto: u.indexOf('Presto') > -1, //opera内核
		     webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		     gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		     mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
		     ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		     android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		     iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		     iPad: u.indexOf('iPad') > -1, //是否iPad
		     webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		    };
	   } (),
	   language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var yueDet=localStorage.getItem('person_id');
	var newNet=window.open('','_self');
	var arr=[];
	$.ajax({
		type: "POST",
		url:'https://guaiguaixueche.com.cn/api/list/coach',
		data: {person_id:yueDet},
		async:false, 
		success: function(data){
			if(data.code=="success"){					
				var teaList=data.content;
				if(teaList.length==0){
					alert('暂无教练信息');
					setTimeout(function(){
						newNet.location="../../index.html";
					},100);
					//window.open('../../index.html','_self');
				}else{
					for(var i=0;i<teaList.length;i++){
						var coachDl=$('<dl class="coach-list"></dl>');
						var coachDt=$('<dt class="coach-pic"></dt>');
						var coachDd=$('<dd class="coach-msg"></dd>');
						var teaPic=$('<img src="'+teaList[i].coach_icon+'">');
						var teaName=$('<p class="j-teaName">教练名称：<span>'+teaList[i].coach_name+'</span></p>');
						var teaTel=$('<p class="j-teaName">联系电话：<span>'+teaList[i].telephone+'</span></p>');
						var skill=$('<div class="coach-eva skill-containter" skill="'+teaList[i].train_skills+'">培训技能：</div>');
						var att=$('<div class="coach-eva attitude-cont" skill="'+teaList[i].service_attitude+'">服务态度：</div>');
						var health=$('<div class="coach-eva health-cont" skill="'+teaList[i].car_health+'">车辆卫生：</div>');
						var teaBtn=$('<input type="button" value="预约" class="coachBtn"/>');
						var skillBox=$('<span class="skill-box"><span class="add-star"></span><span class="del-star"></span></span>');
						var attBox=$('<span class="attitude-box"><span class="add-star"></span><span class="del-star"></span></span>');
						var healthBox=$('<span class="health-box"><span class="add-star"></span><span class="del-star"></span></span>')
						$('.coach-list-box').append(coachDl);
						coachDl.append(coachDt);
						coachDl.append(coachDd);
						coachDt.append(teaPic);
						coachDd.append(teaName);
						coachDd.append(teaTel);
						skill.append(skillBox)
						coachDd.append(skill);
						att.append(attBox);
						coachDd.append(att);
						health.append(healthBox);
						coachDd.append(health);
						coachDd.append(teaBtn);	
						arr.push(teaList[i].coach_id);
						$('.coachBtn').on('tap',function(){
							var index=$('.coachBtn').index($(this));
							localStorage.setItem('coach_id',arr[index]);
							/*setTimeout(function(){
								newNet.location="bespeak.html";
							}, 100);*/
							window.open('bespeak.html')
						})
						showStar($('.skill-box'),$('.skill-box .del-star'),$('.skill-containter'));
						showStar($('.attitude-box'),$('.attitude-box .del-star'),$('.attitude-cont'));
						showStar($('.health-box'),$('.health-box .del-star'),$('.health-cont'));
					}
				}
				shuaxinscroll()
			}else if(data.code=="already"){
				localStorage.setItem('coach_id',data.content);
				setTimeout(function(){
					newNet.location="bespeak.html";
				}, 100)						
			}else if(data.code=="fail"){
				alert(data.content);
				if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					setTimeout(function(){
						newNet.location="../../index.html";
					},50)
				}
				if(browser.versions.android) {
					history.back();
				}
				
			}else if(data.code=="error"){
				alert(data.content);
				if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					setTimeout(function(){
						newNet.location="../../index.html";
					},50)
				}
				if(browser.versions.android) {
					history.back();
				}
			}else if(data.code=='over'){
				alert(data.content);
				if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					setTimeout(function(){
						newNet.location="../../index.html";
					},50)
				}
				if(browser.versions.android) {
					history.back();
				}
			}
			
		}			
	})
	
	function showStar(obj1,obj2,obj3){
		for(var i=0;i<obj3.length;i++){
			var con_wid=obj1.eq(i).outerWidth();
	        var del_star=obj2.eq(i);
	        var n=obj3.eq(i).attr('skill')
	        var del_move=(n*con_wid)/5;
	        del_star.css('backgroundPosition',-del_move+"px 0px");
	        del_star.css('left',del_move+"px");
		}
        
   	}	
})