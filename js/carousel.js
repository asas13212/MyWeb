/* ================= 轮播图脚本 =================
   卡片式轮播：中间的当前图清晰，左右各露出前后一张的虚影 */
(function () {
    'use strict';

    var carousel = document.querySelector('.carousel');
    var track = document.querySelector('.carousel-track');
    if (!carousel || !track) return;    // 页面没有轮播时直接退出

    var slides = track.children;        // 所有图片
    var total = slides.length;
    var index = 0;                      // 当前显示的图片下标
    var timer = null;                   // 自动播放定时器
    var INTERVAL = 3000;                // 自动播放间隔（毫秒）

    var dotsBox = document.querySelector('.carousel-dots');
    var btnPrev = document.querySelector('.carousel-btn.prev');
    var btnNext = document.querySelector('.carousel-btn.next');

    // 1. 根据图片数量生成底部圆点
    for (var i = 0; i < total; i++) {
        var dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', String(i));
        dotsBox.appendChild(dot);
    }

    // 2. 更新画面：把当前图平移到容器正中央，并只让它变清晰（加 .is-active）
    function update() {
        var slide = slides[index];
        var containerCenter = carousel.offsetWidth / 2;                    // 容器中心 x
        var slideCenter = slide.offsetLeft + slide.offsetWidth / 2;        // 当前图中心 x

        // 平移轨道，让当前图居中；两侧的图自然露出成虚影
        track.style.transform = 'translateX(' + (containerCenter - slideCenter) + 'px)';

        // 只给当前图加 is-active（清晰），其余保持虚影状态
        for (var j = 0; j < total; j++) {
            slides[j].classList.toggle('is-active', j === index);
        }

        // 高亮对应的圆点
        for (var k = 0; k < dotsBox.children.length; k++) {
            dotsBox.children[k].className = 'carousel-dot' + (k === index ? ' active' : '');
        }
    }

    // 3. 切换函数
    function next() { index = (index + 1) % total; update(); }
    function prev() { index = (index - 1 + total) % total; update(); }
    function goTo(i) { index = i; update(); }

    // 4. 自动播放：开始 / 停止
    function start() {
        stop();
        timer = setInterval(next, INTERVAL);
    }
    function stop() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    // 5. 绑定事件：箭头、圆点、悬停暂停
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
    dotsBox.addEventListener('click', function (e) {
        var idx = e.target.getAttribute('data-index');
        if (idx !== null) goTo(parseInt(idx, 10));
    });
    carousel.addEventListener('mouseenter', stop);   // 鼠标悬停暂停
    carousel.addEventListener('mouseleave', start);  // 移开恢复自动播放

    // 6. 窗口尺寸变化时重新计算居中位置
    window.addEventListener('resize', update);

    // 7. 先定位一次，再启动自动播放
    update();
    start();
})();