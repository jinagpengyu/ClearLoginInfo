// 监听 id=clearButton 按钮的点击事件
document.getElementById("clearButton").addEventListener("click", function() {
  console.log("There is clear button");
  clearWebsiteInfo();
});

document.getElementById("clear-cookie-btn").addEventListener("click", function() {
    ClearCookie();
});

function clearWebsiteInfo() {
  // 在这里添加清除网站信息的代码
  console.log("Clearing website info...");
}
// 清除当前网页的Session 信息   
function ClearSession(){
  console.log("Clearing session info...");
}

// 清除当前页面的Cookie 
function ClearCookie(){
    console.log("Clearing cookie info...");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("Current active tab URL: ", tabs[0].url);
        if (tabs[0] && tabs[0].url) {
            chrome.cookies.getAll({url: tabs[0].url}, function(cookies) {
                if (cookies.length > 0) {
                    cookies.forEach(function(cookie) {
                        const protocol = cookie.secure ? "https://" : "http://";
                        const cookieUrl = protocol + cookie.domain + cookie.path;
                        chrome.cookies.remove({url: cookieUrl, name: cookie.name});
                    });
                    console.log("Cookies have been cleared.");
                } else {
                    console.log("No cookies found for this URL.");
                }
            });
        }
    });
}