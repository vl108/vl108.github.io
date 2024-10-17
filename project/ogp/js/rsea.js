Number.prototype.currency = function(){
	var value = parseInt(this);
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};
Number.prototype.percent = function(){
	var value = parseInt(this);
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

(function(){


	function RSObject(){
	}

	RSObject.prototype.zeroFill = function(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
	RSObject.prototype.validStr = function(name,msg){
		if( $("[name='"+name+"']").val() == undefined || $("[name='"+name+"']").val().trim() == '' ){
			if(msg){
				alert(msg);
			}
			$("[name='"+name+"']").focus();
			return false;
		}
		return true;
	}
	RSObject.prototype.validNumber = function(name,msg){
		if( $("[name='"+name+"']").val() == undefined || $("[name='"+name+"']").val().trim() == ''  || !$.isNumeric( $("[name='"+name+"']").val().trim() ) ){
			if(msg){
				alert(msg);
			}
			$("[name='"+name+"']").focus();
			return false;
		}
		return true;
	}
	RSObject.prototype.validChecked = function(name,msg){
		if($("[name='"+name+"']:checked").val() == undefined) {
			if(msg){
				alert(msg);
			}
			return false;
		}
		return true;
	}

	RSObject.prototype.contentsCss   = function(){
		return ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' ];
	}

	RSObject.prototype.parseHTML = function(value){
		return $($.parseHTML(value));
	}
	RSObject.prototype.postSubmit = function(action,json){
		var $form = $('<form/>');
		$form.attr('action',action);
		$form.attr('method','post');
		$form.attr('accept-charset','utf-8');

		var recurSive = function($form,key,object){
			if(typeof object == "string" || typeof object == "number"){
				$form.append( $('<input/>').attr('type','hidden').attr('name', key).val(object ));
			}else if(typeof json[key] == "object"){
				if(object instanceof Array){
					if(object.length != 0 && typeof object[0] == "object") {
						$form.append( $('<input/>').attr('type','hidden').attr('name', key).val(JSON.stringify(object)));
					}else{
						$form.append( $('<input/>').attr('type','hidden').attr('name', key).val(object.join(',')));
					}
				}else{
					$form.append( $('<input/>').attr('type','hidden').attr('name', key).val(JSON.stringify(object)));
				}
			}
		};
		for(var key in json){
			if(!this.isEmpty(json[key])){
				recurSive($form,key,json[key]);
			}
		}
		$('body').append($form);
		$form.submit();
	}

	RSObject.prototype.isEmpty = function(value){
		if(value == undefined || value == null || ( value.trim != undefined && value.trim() == '')) {
			return true;
		}
		return false;
	}

	RSObject.prototype.randomize = function(num){
		return Math.floor((Math.random() * num)+1);
	}

	RSObject.prototype.modal = function(url,param){
		var $q = $.Deferred();
		param = param ? param  : {};
		$.ajax({
			type : 'GET',
			url :  url+'?'+ $.param(param),
			cache : false,
			success : function(data){
				var $data = $(data);
				$q.resolve($data);
				$('body').append($data);
				$data.modal();
				$data.on('hidden.bs.modal' , function() {
					$data.remove();
				});
			},
			error : function(error){
				$q.reject();
			}
		});
		return $q.promise();
	}

	RSObject.prototype.pagination = function(_pagination,__clicked){
		var __ul = $("<ul class='pagination'/>");
		var __prev = $("<li/>").append( $("<a href='#' aria-label='Previous'/>")
										.append( $("<span aria-hidden='true'/>").text('«')));
		var __next = $("<li/>").append( $("<a href='#' aria-label='Next'/>")
										.append( $("<span aria-hidden='true'/>").text('»')));

		if(_pagination.isExistPrev){
			__prev.click(function(){
				__clicked(_pagination.pagePrev);
			});
		}else{
			__prev.click(function(){return false;});
			__prev.addClass('disabled');
		}
		if(_pagination.isExistNext){
			__next.click(function(){
				__clicked(_pagination.pageNext);
			});
		}else{
			__next.click(function(){return false;});
			__next.addClass('disabled');
		}
		__ul.append(__prev);
		for(var i=_pagination.pageStart;i<=_pagination.pageEnd;i++){
			var __cur = $("<li/>").append( $("<a href='#'/>"));
			if( i == _pagination.page){
				__cur.addClass('active');
			}
			__cur.children().data('page',i).text(i);
			__cur.children().text(i).click(function(){
				__clicked($(this).data('page'));
				return false;
			});;
			__ul.append( __cur);
		}
		__ul.append(__next);
		return __ul;
	}
	RSObject.prototype.createSE = function(element){
		var oEditors = [];
		var sLang = "ko_KR";
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: element,
			sSkinURI: "/modules/smarteditor2/SmartEditor2Skin.html",
			htParams : {
				bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				//bSkipXssFilter : true,		// client-side xss filter 무시 여부 (true:사용하지 않음 / 그외:사용)
				//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
				fOnBeforeUnload : function(){
					//alert("완료!");
				},
				I18N_LOCALE : sLang
			},
			fOnAppLoad : function(){
				//예제 코드
				//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
			},
			fCreator: "createSEditor2"
		});
		return oEditors;
	}
	RSObject.prototype.ckeditor = function(type){

		if(type == 'default'){
			return {
				skin : 'moono-lisa',
				toolbar : 'standard',
				allowedContent : true,
				resize_enabled : false,
				autoGrow_onStartup : false,
				toolbarGroups: [
					{"name":"basicstyles","groups":["basicstyles"]},
					{"name":"links","groups":["links"]},
					{"name":"document","groups":["mode"]},
					{"name":"insert","groups":["insert"]},
					{"name":"paragraph","groups":[ 'list', 'indent', 'align']}
				],
				removeButtons : 'Save,NewPage,Preview,Print,Image,Flash,PageBreak,Iframe,sourcearea',
				extraPlugins :'simage,liststyle',
				removePlugins : 'sourcedialog',
				imageUploadURL: '/file/ckUpload2',
				enterMode : CKEDITOR.ENTER_BR,
				contentsCss : $rsea.contentsCss()
			}
		}
	}

	RSObject.prototype.array2Json = function(array,keyName){
		var json = {};
		$(array).each(function(){
			var key = this[keyName];
			json[key] = this;
		});
		return json
	}
	RSObject.prototype.number = function(value){
		value = parseFloat(value);
	    if(value==0) return 0;
	    var reg = /(^[+-]?\d+)(\d{3})/;
	    var n = (value + '');
	    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
	    return n;
	}

	RSObject.prototype.numberFloat = function(value){
		value = parseFloat(value);
	    return isNaN(value) ? undefined : value;
	}
	RSObject.prototype.numberInt= function(value){
		value = parseInt(value);
	    return isNaN(value) ? undefined : value;
	}

	RSObject.prototype.createArray = function(count){
		var returnVal = [];
		for(var i=0;i<count;i++){
			returnVal.push({});
		}
	    return returnVal;
	}
	RSObject.prototype.copy = function(json){
		return $.extend({}, json);
	}

	RSObject.prototype.html = function(source){
		return new HTMLBinder(source);
	}
	RSObject.prototype.timeTiMili = function(value){
		if(!value) return undefined;
		var hour = parseInt(value.split(':')[0]);
		if(hour == undefined) return undefined;
		return hour*60*60*1000 - 9*60*60*1000;
	}

	RSObject.prototype.onlyNumber = function($input){
		$input.keyup(function(e){
			e = e || window.event;
			e.target.value = e.target.value.replace(/[^0-9]/g, "");
			e.returnValue = false;
		});
	}

	RSObject.prototype.addr = function(form,element,callback){
		if(window.daum == undefined){
			$.getScript('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js', function(data, textStatus, jqxhr){
				if(textStatus == 'success'){
					$rsea.addr(form,element,callback);
				}
			});
		}else{
			daum.postcode.load(function(){
				var post = new daum.Postcode({
					oncomplete : function(data){
		 				var fullAddr = data.address;
		                var extraAddr = '';
		                if(data.addressType === 'R'){
		                    if(data.bname !== ''){ extraAddr += data.bname; }
		                    if(data.buildingName !== ''){ extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
		                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		                }
						form.$zipcode.val(data.zonecode);
						form.$addr1.val(fullAddr);
						if(element){
							element.style.display = 'none';
						}
						if(callback) callback();
					},
					onresize : function(size){
					},
					 width : '100%',
					 height : '100%'
				});
				if(element){
					post.embed(element);
					element.style.display = 'block';
				}else{
					post.open();
				}
			});
		}
	}
	RSObject.prototype.cookie = function(key,value,expireDay){
		if(value == undefined){
			var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
			  return value? value[2] : null;
		}else{
			 var date = new Date();
			 date.setTime(date.getTime() + expireDay*24*60*60*1000);
			 document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
		}
	}
	RSObject.prototype.getCookie = function(name){
	    var cookieValue=null;
	    if(document.cookie){
	        var array=document.cookie.split((escape(name)+'='));
	        if(array.length >= 2){
	            var arraySub=array[1].split(';');
	            cookieValue=unescape(arraySub[0]);
	        }
	    }
	    return cookieValue;
	}
	
	RSObject.prototype.isEmail = function(email) {
		var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(email);
	}
	
	RSObject.prototype.isMobile = function(phoneNum) {
		phoneNum = phoneNum.replace(/\-/gi,'');
		phoneNum = phoneNum.replace(/\./gi,'');
		var regExp =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
		var myArray;
		if(regExp.test(phoneNum)){
			myArray = regExp.exec(phoneNum);
			return true;
		} else {
			return false;
		}
	}

	RSObject.prototype.getByteLength = function(s){
		if (s == null || s.length == 0) {
			return 0;
		}
		var size = 0;

		for ( var i = 0; i < s.length; i++) {
			size += this.charByteSize(s.charAt(i));
		}
		return size;
	}

	RSObject.prototype.charByteSize = function(ch){
		if (ch == null || ch.length == 0) {
			return 0;
		}
		var charCode = ch.charCodeAt(0);
		if (charCode <= 0x00007F) {
			return 1;
		} else if (charCode <= 0x0007FF) {
			return 2;
		} else if (charCode <= 0x00FFFF) {
			return 3;
		} else {
			return 4;
		}
	}

	if(!window.$rsea){
		window.$rsea = new RSObject();
		$(document).ready(function(){
			$("[only-number-tag]").each(function(){
				$rsea.onlyNumber( $(this) );
			});
		});
	}


	function HTMLBinder(html){
		this.html = html;
	}
	HTMLBinder.prototype.bind = function(key,value){
		var regex = new RegExp('{{'+key+'}}','gi');
		this.html = this.html.replace(regex, value);
	}
	HTMLBinder.prototype.source = function(){
		return this.html;
	}
})();

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};




