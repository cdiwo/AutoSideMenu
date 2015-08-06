$(function() {

    // 生成菜单
    var html = '';
    $('h1, h2, h3').each(function(i){
        $(this).attr('id', 'article-header' + i);
        html += '<li><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</a></li>';
    });
    $('.post-nav ul.article-index').append(html);

    var articleHead = $('.article').find('h1, h2, h3');
    var highlightTitle = $('.post-nav').find('.highlight-title');

    // 监听滚动事件
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();

        // 判断第1个标题是否滚动到隐藏区域
        if(articleHead.eq(0).offset().top - scrollTop < 40) {
            highlightTitle.show()

            var index = 0;
            articleHead.each(function(i) {
                // 计算接近移动到头部隐藏区域的元素
                if(scrollTop + 20  > articleHead.eq(i).offset().top) {
                    index = i;
                }
            });

            // 更新导航样式
            $('.article-index li').eq(index).addClass('active').siblings().removeClass('active');
            highlightTitle.css('top', index * 30);

        } else {
            $('.article-index li').removeClass('active');
            highlightTitle.hide();
        }
    });

});