(function(window){var svgSprite='<svg><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M941.6624305 863.56207312L863.56207312 941.6624305 512.05523407 590.15559015 160.54839372 941.6624305 82.44803633 863.56207312 433.95487668 512.05523407 82.44803633 160.54839372 160.54839372 82.44803633 512.05523407 433.95487668 863.56207312 82.44803633 941.6624305 160.54839372 590.15559015 512.05523407 941.6624305 863.56207312Z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M451.96692383 62l120.06615234 0 0 900-120.06615234 0 0-900Z"  ></path><path d="M62 451.96692383l900 0 0 120.06615234-900 0 0-120.06615234Z"  ></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M946.08125 935.39375c20.53125-20.41875-0.73125-38.75625-0.73125-38.75625L790.94375 742.625c52.2-69.01875 92.53125-163.8 92.53125-257.23125 0-225.61875-181.63125-408.4875-406.06875-408.4875C253.30625 76.90625 71.675 259.775 71.675 485.3375c0 225.50625 181.63125 408.43125 405.73125 408.54375 96.075 0 205.36875-54.05625 274.78125-109.85625l153.95625 153.5625c0.05625 0 15.075 22.66875 39.9375-2.19375zM229.625 734.80625a352.4625 352.4625 0 0 1-102.76875-249.58125A352.29375 352.29375 0 0 1 229.625 235.8125a346.95 346.95 0 0 1 247.8375-103.3875c93.88125 0 181.63125 36.675 247.89375 103.33125a351.5625 351.5625 0 0 1 102.9375 249.525 350.94375 350.94375 0 0 1-102.9375 249.525 345.54375 345.54375 0 0 1-247.89375 103.1625 345.31875 345.31875 0 0 1-247.8375-103.1625z"  ></path></symbol><symbol id="icon-checked" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 620.8c-95.5 0-172.8-77.4-172.8-172.8 0-95.5 77.4-172.8 172.8-172.8 95.5 0 172.8 77.4 172.8 172.8 0 95.5-77.3 172.8-172.8 172.8z" fill="#666666" ></path></symbol><symbol id="icon-check" viewBox="0 0 1024 1024"><path d="M512 960C265 960 64 759 64 512S265 64 512 64s448 201 448 448-201 448-448 448z m0-862.8C283.3 97.2 97.2 283.3 97.2 512c0 228.7 186.1 414.8 414.8 414.8S926.8 740.7 926.8 512c0-228.7-186.1-414.8-414.8-414.8z" fill="#666666" ></path></symbol><symbol id="icon-delete" viewBox="0 0 1024 1024"><path d="M924.7 170H99.3c-14.9 0-26.9 11.9-26.9 26.5S84.5 223 99.3 223h825.4c14.9 0 26.9-11.9 26.9-26.5 0-14.7-12-26.5-26.9-26.5z m-556.2-53h305c14.9 0 26.9-11.9 26.9-26.5S688.3 64 673.5 64h-305c-14.9 0-26.9 11.9-26.9 26.5-0.1 14.6 12 26.5 26.9 26.5z m80.7 686.8V362.3c0-14.6-12.1-26.5-26.9-26.5-14.9 0-26.9 11.9-26.9 26.5v441.5c0 14.6 12.1 26.5 26.9 26.5 14.8 0 26.9-11.9 26.9-26.5z m179.4 0V362.3c0-14.6-12.1-26.5-26.9-26.5-14.9 0-26.9 11.9-26.9 26.5v441.5c0 14.6 12.1 26.5 26.9 26.5 14.9 0 26.9-11.9 26.9-26.5zM817 280c-14.9 0-26.9 11.9-26.9 26.5V854c0 29.3-24.1 53-53.8 53H287.7c-29.7 0-53.8-23.7-53.8-53V306.5c0-14.6-12.1-26.5-26.9-26.5-14.9 0-26.9 11.9-26.9 26.5v582.8c0 39 32.1 70.6 71.8 70.6h520.4c39.6 0 71.8-31.6 71.8-70.6V306.5C844 291.9 831.9 280 817 280z" fill="#666666" ></path></symbol><symbol id="icon-next" viewBox="0 0 1024 1024"><path d="M751.2 472.9L352.3 80.2c-22-21.6-57.6-21.6-79.5 0-22 21.6-22 56.7 0 78.3L631.9 512 272.8 865.5c-22 21.6-22 56.7 0 78.3 22 21.6 57.6 21.6 79.5 0l398.8-392.7c22.1-21.6 22.1-56.6 0.1-78.2z" fill="#666666" ></path></symbol><symbol id="icon-record" viewBox="0 0 1024 1024"><path d="M688.4 708.2H335.8c-16.2 0-29.4 9.4-29.4 21s13.2 21 29.4 21h352.6c16.2 0 29.4-9.4 29.4-21-0.1-11.5-13.2-21-29.4-21z m0 0" fill="#666666" ></path><path d="M655.3 64.9v0.8c-3.7 0-19.4-1.5-58.8-0.8H251.3c-64.9 0-117.5 52.6-117.5 117.4V841c0 64.8 52.6 117.4 117.5 117.4h521.6c64.9 0 117.5-52.6 117.5-117.4V299.8L655.3 64.9z m178.2 236.8l-119.4-1.9h3.9c-27.3 0-65.6-26.3-65.6-58.7l-1-121.4 182.1 182z m6 547.6c0 33.2-27 60.2-60.2 60.2H244.8c-33.2 0-60.2-27-60.2-60.2V174c0-33.2 27-60.2 60.2-60.2h353.1c-0.5 72.1 0.9 120.3 0.9 120.3 0 66.4 53.9 120.3 120.4 120.3h120.4l-0.1 494.9z m0 0" fill="#666666" ></path><path d="M688.4 532.3H335.8c-16.2 0-29.4 9.4-29.4 21s13.2 21.1 29.4 21.1h352.6c16.2 0 29.4-9.4 29.4-21.1-0.1-11.6-13.2-21-29.4-21z m0 0M543.8 356.3H324.7c-10.1 0-18.3 9.4-18.3 21s8.2 21.1 18.3 21.1h219.1c10.1 0 18.3-9.4 18.3-21.1 0-11.6-8.2-21-18.3-21z m0 0" fill="#666666" ></path></symbol><symbol id="icon-return" viewBox="0 0 1024 1024"><path d="M274.6 480.7l416.2-405c16.1-15.6 42.1-15.6 58.1 0 16.1 15.6 16.1 41 0 56.6L358.7 512l390.2 379.7c16.1 15.6 16.1 41 0 56.6-16.1 15.6-42.1 15.6-58.1 0l-416.2-405c-8.8-8.6-12.3-20.1-11.4-31.3-0.9-11.2 2.6-22.7 11.4-31.3z" fill="#666666" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)