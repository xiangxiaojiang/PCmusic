var index=0;//初始索引
var li=$(".banner ul li");//获取li元素
var img=$(".music .m-img img");//获取图片
var text=$(".music .m-text");//获取文本
var prey=$(".music .m-prey");//获取上一首按钮
var play=$(".music .m-play");//获取播放按钮
var next=$(".music .m-next");//获取下一首按钮
var mp3=$(".music .m-mp3");//获取媒体元素
var flag=false;//歌曲是否播放 true播放 false暂停
var close=true;//播放器是否显示 true显示 false隐藏

li.click(function(){
	//获取初始index
	index=$(this).index();
	//播放歌曲
	show();
});
function show(){
	//封装函数，方便调用
	change_bg(index+1);//更换背景图片
	change_img_text(index+1);//更换播放器图片文字
	//函数从0开始计数 加一方便使用
	change_btn_title();//更换按钮title
	play_mp3();//播放歌曲
}
function change_bg(idx){
	$("body").css({
		"background":"url(img/xz"+idx+".jpg)no-repeat",
		"background-size":"cover"
	});
}
//以上是更换背景图片

//更换播放器图片文字
function change_img_text(idx){
	img.attr("src","img/"+idx+".jpg");//更换播放器图片
	text.html(li.eq(index).attr("title"));//更换歌名
}
//更换播放暂停按钮及title
function change_btn_title(){
	play.removeClass("m-play");//移除原有样式
	play.addClass("m-pause");//添加新的样式
	play.attr("title","暂停");//更换title
}

//播放歌曲
function play_mp3(){
	mp3.attr("src",li.eq(index).attr("datasrc"));
	mp3.get(0).play();
	flag=true;
}

//歌曲播放暂停功能
play.click(function(){
	if (flag) {
		mp3.get(0).pause();
		play.removeClass("m-pause");
		play.addClass("m-play");
		play.attr("title","播放");
		flag=false;
	}
	else{
		mp3.get(0).play();
		play.removeClass("m-play");
		play.addClass("m-pause");
		play.attr("title","暂停");
		flag=true;
		change_bg(index+1);
	}
});
/*上一首*/
prey.click(function(){
	index--;
	if(0>index){
		index=li.length-1;
	}
	show();
});
/*下一首*/
next.click(function(){
	index++;
	if(li.length-1<index){
		index=0;
	}
	show();
});

//播放器的打开与收起
$(".m-close").click(function(){
	if(close){
		$(this).addClass("m-open");
		$(this).attr("title","打开");
		$(".music").animate({"left":"-530px"},1000);
		close=false;
	}
	else{
		$(this).removeClass("m-open");
		$(this).attr("title","收起");
		$(".music").animate({"left":"0px"},800);
		close=true;
	}
});