$(function(){
	var postNav = $('.post-nav');			
	var postNavOffsetTop = postNav.offset().top;
	var highlightTitle = postNav.find('.highlight-title');
	
	var articleHead = $('.article').find('h1, h2, h3');
	// 根据内容中的标题生成导航
	var navItems = "";
	articleHead.each(function(index){
		$(this).attr('id', "title-" + (index + 1));
		navItems += '<li><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</a></li>';
	});
	if(navItems == "") {postNav.hide();return;}
	postNav.find('ul').append(navItems);
	
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		
		// 判断是否固定导航
		(postNavOffsetTop - scrollTop <= 0) ? postNav.addClass('fixed') : postNav.removeClass('fixed');
		
		// 判断是否切换导航标题（设置高亮）
		if(articleHead.eq(0).offset().top - scrollTop < 40) {
			highlightTitle.show()
			var index = 0;
			articleHead.each(function(i) {
				// 计算接近移动到头部隐藏区域的元素
				if(scrollTop + 20  > articleHead.eq(i).offset().top) {
					index = i;
				}
			});
			// 激活高亮
			postNav.find('li').eq(index).addClass('active').siblings().removeClass('active');
			highlightTitle.css('top', index * 30);
		} else {
			postNav.find("li").removeClass("active");
			highlightTitle.hide();
		}
	});
});