// 공통 함수 정의
function fnLogin() { location.href = "project-login.html"; }
function fnstoreList(num, kind) { location.href = "project-board.html?kind=" + num + "&THEME=" + kind; }
function fnSearch() { location.href = "project-search.html"; }
function fnMyPage() { location.href = "project-mypage.html"; }

// 시계
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById("clock");
    if (clockEl) clockEl.innerText = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// DOM 준비 후 header/footer 로드
$(document).ready(function () {
    $("#header-container").load("header.html", function (response, status, xhr) {
        if (status == "error") {
            console.error("header 로드 실패: " + xhr.status + " " + xhr.statusText);
        }
    });

    $("#footer-container").load("footer.html", function (response, status, xhr) {
        if (status == "error") {
            console.error("footer 로드 실패: " + xhr.status + " " + xhr.statusText);
        }
    });
});

function checkLoginStatus() {
    // sessionStorage에서 아이디와 권한 가져오기
    const userId = sessionStorage.getItem('sessionId');
    const userStatus = sessionStorage.getItem('sessionStatus'); // 예: "ADMIN" / "USER"
    this.isLoggedIn = !!userId;

    // 로그인/로그아웃 버튼
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.textContent = this.isLoggedIn ? '로그아웃' : '로그인';
        authBtn.onclick = () => {
            if (this.isLoggedIn) {
                // 로그아웃 처리
                sessionStorage.clear();
                this.isLoggedIn = false;
                authBtn.textContent = '로그인';
                document.getElementById('admin-btn').style.display = 'none';
                location.href = "project-login.html";
            } else {
                // 로그인 페이지 이동
                location.href = "project-login.html";
            }
        };
    }

    // 관리자 버튼
    const adminBtn = document.getElementById('admin-btn');
    if (adminBtn) {
        if (userStatus === 'A') {
            adminBtn.style.display = 'inline-block';
            adminBtn.onclick = () => {
                // 관리자 페이지 이동
                location.href = "project-admin.html";
            };
        } else {
            adminBtn.style.display = 'none';
        }
    }
}
