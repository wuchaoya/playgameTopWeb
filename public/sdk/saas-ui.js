var CP_InputCreate=function(t,e,n,o,i,_,u){function c(){h&&(clearInterval(h),h=null),E&&(clearTimeout(E),E=null),y&&(clearTimeout(y),y=null)}function l(t,e,n){if(!v.isStoped()&&!v.isReconnecting()){if(Cloudplay.sendCountly(countly_event_id_map.input_socket_connecting),n>=u)return Cloudplay.sendCountly(countly_event_id_map.input_socket_connect_failed),void C.emit(CP_CONSTANT.EVENT_RECONNECT,CP_CONSTANT.GET_CLOUD_SERVICE_TYPE_REFRESH_TOKEN);c(),m=new WebSocket(t,e);var o=!1,r=m;m.onopen=function(){return r!=m?void Cloudplay.sendCountly(countly_event_id_map.input_socket_check_failed,"onopen"):(Cloudplay.sendCountly(countly_event_id_map.input_socket_connect_opend),o=!0,void(h=setInterval(function(){var t="ping:"+Date.now();CP_UTILS.websocket_send(m,t)},i||6e4)))},m.onmessage=function(t){if(r!=m)return void Cloudplay.sendCountly(countly_event_id_map.input_socket_check_failed,"onmessage");var e=t.data;";"==e.charAt(e.length-1)&&(e=e.substr(0,e.length-1));var n=null,o=e.indexOf(":");switch(n=o>=0?e.substr(0,o).toLowerCase():e.toLowerCase()){case"pong":var i=Date.now(),u=e.substr(o+1),c=i-u;Cloudplay.sendCountly(countly_event_id_map.input_socket_ping_pong_delay_time,c),c>=_&&Cloudplay.sendCountly(countly_event_id_map.input_socket_ping_pong_delay_max,c);break;case"startIM".toLowerCase():Cloudplay.sendCountly(countly_event_id_map.input_socket_start_im);var l=e.indexOf(",");if(l==-1||l<o)break;var a=parseFloat(e.substr(o+1,l-(o+1))),s=parseFloat(e.substr(l+1));C.emit("cp.start_im",a,s);break;case"stopIM".toLowerCase():Cloudplay.sendCountly(countly_event_id_map.input_socket_stop_im),C.emit("cp.stop_im")}},m.onclose=function(i){if(r!=m)return void Cloudplay.sendCountly(countly_event_id_map.input_socket_check_failed,"onclose");var _=i&&i.code?i.code:-1;return Cloudplay.sendCountly(countly_event_id_map.input_socket_connect_closed,_),a(),o?void(y=setTimeout(function(){__hmLogWarn(null,CP_ERROR_MAP.input_socket_close_and_refresh_token),C.emit(CP_CONSTANT.EVENT_RECONNECT,CP_CONSTANT.GET_CLOUD_SERVICE_TYPE_REFRESH_TOKEN)},3e3)):void(E=setTimeout(function(){l(t,e,n+1)},3e3))}}}function r(){return m?void __hmLogError(null,CP_ERROR_MAP.input_socket_connect_multi_time):void l(n,o,0)}function a(){c(),CP_UTILS.websocket_close(m,!1),m=null,C.emit("cp.stop_im"),p()}function s(t){if(p(),f=document.getElementById(t),!f)return void __hmLogError(null,CP_ERROR_MAP.js_player_object_not_found);var e=f.getBoundingClientRect();g.x=e.left,g.y=e.top,g.width=e.right-e.left,g.height=e.bottom-e.top,f.addEventListener("touchstart",S,T),f.addEventListener("touchmove",O,T),f.addEventListener("touchend",I,T),f.addEventListener("touchcancel",b,T),setTimeout(function(){var e=d();e<0&&($(".cpPlayerDivClass").css({top:0-e+"px"}),s(t))},200)}function d(){var t=document.getElementById("cpPlayerDivId"),t=t.getBoundingClientRect();return t.top}function p(){f&&(f.removeEventListener("touchstart",S,T),f.removeEventListener("touchmove",O,T),f.removeEventListener("touchend",I,T),f.removeEventListener("touchcancel",b,T),f=null)}var v=t,C=v.eventEmitter(),m=null,h=null,E=null,y=null,f=null,T=!0,g={x:0,y:0,width:0,height:0},k=1,L=2,P=3,R=function(t){var e=t-g.x;return e<0&&(e=0),e>g.width&&(e=g.width),(e/g.width).toFixed(4)},N=function(t){var e=t-g.y;return e<0&&(e=0),e>g.height&&(e=g.height),(e/g.height).toFixed(4)},w=function(t,e,n){t.preventDefault(),t.stopPropagation();for(var o=0;o<t.changedTouches.length;o++){var i=t.changedTouches[o],_=R(i.clientX),u=N(i.clientY),c=CP_UTILS.orientation();if("portrait"==c){var l=_;_=u,u=1-l}window.CP_ENABLE_DEBUG;var r="mouse:"+e+":"+_+","+u;CP_UTILS.websocket_send(m,r)}},S=function(t){w(t,k,"_onTouchStart"),C.emit(CP_CONSTANT.EVENT_TOUCH_START)},O=function(t){w(t,P,"_onTouchMove")},I=function(t){w(t,L,"_onTouchEnd")},b=function(t){w(t,L,"_onTouchCancel")};return{connectSocket:r,close:function(){a()},startInputListener:s,stopInputListener:p}};
var CP_CloudplayUIInit=function(t,e){function n(){var t=CP_sessionStorage.getItem(CP_CONSTANT.SESSION_STORAGE_GAME_OPTION_KEY);return t&&t.isPortrait}function i(t){t.preventDefault()}function a(e,i){if(t(e).length>1)return __hmLogWarn(null,CP_ERROR_MAP.multi_player),O.emit(CP_CONSTANT.EVENT_STOP_GAME,CP_STRING.CREATE_PLAYER_FAILED+-2),!1;if(t(e).length<=0)return __hmLogError(null,CP_ERROR_MAP.no_player_wrap),O.emit(CP_CONSTANT.EVENT_STOP_GAME,CP_STRING.CREATE_PLAYER_FAILED+-3),!1;V=e,b=i,t(V).on("contextmenu",function(t){t.preventDefault()});var a=null;return a=R?{containerId:t(V).attr("id"),width:h.width,height:h.height,videoUrl:"ws://"+h.ip+":"+h.videoPort+"/",audioUrl:"ws://"+h.ip+":"+h.audioPort,isPortraitGame:h.isPortraitGame}:{containerId:t(V).attr("id"),width:i.videoWidth,height:i.videoHeight,videoUrl:i.videoUrl,audioUrl:i.audioUrl,isPortraitGame:n()},(D=CP_JsPlayerInit(O,a))?(D.start(),G.startInputListener(D.id()),!0):void O.emit(CP_CONSTANT.EVENT_STOP_GAME,CP_STRING.CREATE_PLAYER_FAILED+-1)}function o(t,e,n,i){L=e,U=n,w=i}function s(t){Cloudplay.sendCountly(countly_event_id_map.start_revolution),Cloudplay.sceneChange("play",{cur_rate:-1}),M=t.videoHeight/t.videoWidth,a(V,t)}function r(t){return D&&D.enableAudio(t)}function l(t){D&&D.stop(!0),D=null,G&&(G.close(),G=null)}function _(){return D&&D.isPlaying()}function u(){return-1}function d(){return!1}function c(t,e,n){}function p(t,e){G&&(G.close(),G=null);var i=t;R&&(i="ws://"+h.ip+":"+h.inputPort+"/testingBackDoor"),G=CP_InputCreate(y,n(),i,e,w.ping_interval_time,w.ping_delay_time,3),G.connectSocket()}function P(t){this.stopPlay(!1),m(!1),t&&f(CP_CONSTANT.UI_MESSAGE_TYPE_SYSTEM,t)}function C(){}function T(){function e(){null!==D&&D.playAudio()}if(void 0!=w.floating_app_name){t(".floatingBar").length>0&&t(".floatingBar").remove();var i="longname";n()&&(i="");var a="pause";null!==D&&D.isAudioPlaying()&&(a="");var o='<div id="audioPlayingBtn" class="music '+a+'">                <span class="start-btn"><img src="'+x+'/music@2x.png" alt="" /></span>                <span class="pause-btn"></span>            </div>',s="/ios.png";if(CP_UTILS.detectOS()==CP_CONSTANT.OS_ANDROID&&(s="/android.png"),html='<div class="floatingBar" id="floatingBar">                    <div class="time">                        <p class="img"><img src="'+x+'/timeing.png"  /></p>                        <p class="text"><span class="countdownNumber" ></span>秒</p>                    </div>                    '+o+'                    <span class="game-img"><img src="'+w.floating_icon_url+'" alt="" /></span>                    <span class="game-name '+i+'">'+w.floating_app_name+'</span>                    <span class="game-btn">                        <a class="ios _aLink" target="_blank" href="'+w.floating_app_url+'"><img src="'+x+s+'" alt="" /></a>                    </span>                </div>',n()||!CP_UTILS.isSupportDevice()?(t("#playGameBox").append(html),CP_UTILS.isSupportDevice()||m(!1)):t(V).append(html),null!=D){var r=D.landscapeStyleCount(),l=CP_UTILS.orientation();if("landscape"==l){if(CP_UTILS.isIniOSWeixin()&&CP_UTILS.isIphone6Plus()){var _=CP_UTILS.getIOSVersion();parseFloat(_)>=11&&(r.fbTop="10px")}if(t(".floatingBar").css({width:r.fbWidth,left:r.fbLeft,top:r.fbTop,height:r.fbHeight}),n()){t(".floatingBar").addClass("rotate-90");var u=CP_UTILS.floatingBarPosition();if(u<0){var d=parseInt(r.fbTop)-u;t(".floatingBar").css({top:d+"px"})}}}var c=document.getElementById("audioPlayingBtn");if(c&&c.addEventListener("touchend",e,!0),CP_UTILS.isSupportDevice()&&null!=b&&b.remindTime!=-1){var p;b&&null!=b.remindTime&&"null"!=b.remindTime&&(p=Math.round(b.remindTime/1e3),g(p))}else E()}}}function g(e){H!=-1&&clearInterval(H),e>999&&E(),H=setInterval(function(){e>=1?(e--,t(".countdownNumber").html(e),e<=999&&t(".floatingBar > .time").css({display:"block"})):m(!0)},1e3)}function E(){t(".floatingBar > .time").css({display:"none"})}function m(e){H!=-1&&(clearInterval(H),H=-1,t("#audioPlayingBtn").addClass("pause"),E(),e&&O.emit(CP_CONSTANT.EVENT_STOP_GAME,L.prompt_game_over))}function f(e,i){var a="",o="",s="";switch(T(),m(),e){case CP_CONSTANT.UI_MESSAGE_TYPE_UNSUPPORT:a="unsupported",o="您的设备暂不支持",s="systemUnsupported";break;case CP_CONSTANT.UI_MESSAGE_TYPE_SYSTEM:a="system",o=i,s="systemInfo";break;case CP_CONSTANT.UI_MESSAGE_TYPE_REFRESH_REQUIRED:a="system",o=i,s="systemInfo refreshPage"}t(".systemInfo").remove(),Cloudplay.sendCountly(countly_event_id_map.show_info_page,o?encodeURIComponent(o):"");var r='<div id="backgroundCover" class="backgroundCover '+s+'">                    <a class="bgUpInfomationBox">                         <i class="'+a+'"></i>                         <p class="p2">'+o+"</p>                    </a>                </div>",l=CP_UTILS.getScreenWidthHeight(),_=l.width,u=l.height;n()?t("#playGameBox").append(r):t(V).append(r),t("#playGameBox .backgroundCover").css({width:_,height:u}),I(),e==CP_CONSTANT.UI_MESSAGE_TYPE_REFRESH_REQUIRED&&t(".refreshPage").on("touchend",function(){window.location.reload()})}function I(){var e=document.getElementById("backgroundCover"),n=e.getBoundingClientRect();n.top<0&&t(".backgroundCover").css({top:Math.abs(n.top)+"px",left:"0px"})}function S(){t("."+W).remove()}function v(){t("."+F).remove()}function A(t){O.emit("cp.get_notice",B,t)}function N(){var e=CP_UTILS.getScreenWidthHeight(),n=e.width,i=e.height;null==D&&(t(".floatingBar").removeClass("rotate90 rotate-90").css({left:"0px",top:"0px",width:"100%"}),t(".systemInfo").closest(".cpPlayerDivClass").removeClass("rotate90").css({left:"0px",top:"0px",width:n,height:i}),I()),t(".backgroundCover").css({width:n,height:i,left:0,top:0});var a=CP_UTILS.floatingBarPosition();a<0&&t(".floatingBar").css({top:0-a+"px"})}var h={ip:"172.16.40.218",videoPort:9911,audioPort:7766,inputPort:7681,width:720,height:404,isPortraitGame:!1},R=!1,y=e,O=y.eventEmitter();O||__hmLogError(null,CP_ERROR_MAP.eventEmitterIsNull);var L={},U={},w={},B=1,b=null,D=null,G=null,Y="",M="",k=CP_UTILS.getBasePath("saas-sdk.js");k||(k=CP_UTILS.getBasePath("cloudplay.js"));var x=k+"images",V=function(){document.getElementById(CP_CONSTANT.UI_PLAYER_CONTAINER_ID)||(__hmLogError(null,CP_ERROR_MAP.player_container_not_exist),CP_UTILS.alert("div: id = "+CP_CONSTANT.UI_PLAYER_CONTAINER_ID+" is NOT exist")),t("."+CP_CONSTANT.UI_PLAYER_DIV_CLASS).remove();var e='<div class="'+CP_CONSTANT.UI_PLAYER_DIV_CLASS+'" id="'+CP_CONSTANT.UI_PLAYER_DIV_ID+'"></div>';return t("#"+CP_CONSTANT.UI_PLAYER_CONTAINER_ID).append(e),"."+CP_CONSTANT.UI_PLAYER_DIV_CLASS}();document.getElementById(CP_CONSTANT.UI_PLAYER_CONTAINER_ID).addEventListener("touchmove",i,!0),O.on("cp.get_notice",function(t,e){});var H=-1,W="messageView",F="downloadView";return window.onresize=function(){if(N(),null!=D){var t=CP_UTILS.orientation();"landscape"==t?D.landscapeUiRebuid():D.portraitUiRebuid(),G.startInputListener(D.id())}},O.on(CP_CONSTANT.EVENT_ORIENTATION_CHANGE,function(t){}),O.on(CP_CONSTANT.EVENT_PLAYER_READY,function(){T(),Y="been_ready"}),O.on(CP_CONSTANT.EVENT_PLAYER_AUDIO_START_PLAYING,function(){t("#audioPlayingBtn").removeClass("pause")}),window.onpopstate=function(t){v()},t(document).on("click","._aLink",function(t){Cloudplay.sendCountly(countly_event_id_map.click_download)}),{setAuthData:o,startPlay:s,enableAudio:r,stopPlay:l,isPlayerRunning:_,curResId:u,isUserSelectedResMode:d,askQueuing:c,setCurrentResId:C,connectInputSocket:p,stop:P,showMessageView:f,hideMessageView:S,showWarnToast:A}};