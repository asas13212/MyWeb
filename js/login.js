/* ================= 登录页脚本 ================= */
(function () {
    'use strict';

    var form = document.getElementById('loginForm');
    var errorEl = document.getElementById('formError');
    if (!form || !errorEl) return;    // 找不到表单时直接退出

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单默认提交刷新页面

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;

        // 简单校验：用户名和密码都不能为空
        if (!username) { errorEl.textContent = '请输入用户名'; return; }
        if (!password) { errorEl.textContent = '请输入密码'; return; }

        // 校验通过：清空错误提示，保存用户名并跳回首页
        errorEl.textContent = '';
        localStorage.setItem('gw_user', JSON.stringify({ name: username }));
        window.location.href = 'index.html';
    });
})();