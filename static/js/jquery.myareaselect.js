//百度地图选取点
(function ($, window, document, undefined) {

    //配置参数
    var defaults = {
        docallback: null,
        initcallback:null,
        hidelm: "",
        isout:false,
		serverurl: "http://127.0.0.1:5000/api/district"
    };

    var AreaSelect = function (element, options) {
        //全局变量
        var opts = options,//配置
			$obj = $(element);//容器
        //绑定事件
        this.eventBind = function () {
            var self = this;
            $obj.bind("mouseover", function () {
                if ($obj.find(".ui-area-content-wrap").css("display") == "none") {
                    $obj.find(".ui-area-content-wrap").show();
                    $obj.find(".ui-area-text-wrap").addClass("hover-area-text-wrap");
                }
                if (!opts.isout) {
                    opts.isout = true;
                    $obj.bind("mouseout", function () {
                        $obj.find(".ui-area-text-wrap").removeClass("hover-area-text-wrap");
                        $obj.find(".ui-area-content-wrap").hide();
                    });
                }
            });

            $obj.on('click', ".ui-area-tab .ui-switchable-item", function () {
                if (!$(this).hasClass("ui-area-current")) {
                    var aindex = $(this).index();
                    console.log(aindex);
                    $(this).addClass('ui-area-current').siblings('a.ui-switchable-item').removeClass('ui-area-current');
                    $obj.find('.ui-area-content .ui-switchable-panel').eq(aindex).addClass('active-panel').siblings('div.ui-switchable-panel').removeClass('active-panel');
                }
            });

            $obj.on('click', ".ui-area-content-list li", function () {
                $obj.unbind("mouseout");
                opts.isout = false;

                if (!$(this).hasClass("active")) {
                    $(this).addClass('active').siblings('li').removeClass('active');
                    var aindex = $(this).parent().parent().index();
                    var valelm = $(this).find("a");
                    $obj.find('.ui-area-tab .ui-switchable-item').eq(aindex).find("em").text(valelm.text());
                    $obj.find('.ui-area-tab .ui-switchable-item').eq(aindex).attr("title", valelm.text());
					var addr_id = valelm.attr("data-id");  //获取当前选中的地址的唯一ID。
                    $("#" + opts.hidelm).val(addr_id);
					console.log(addr_id);
                    var length = $obj.find('.ui-area-content .ui-switchable-panel').length;
                    for (var i = aindex + 1; i < length; i++) {
                        $obj.find('.ui-area-tab .ui-switchable-item').eq(aindex + 1).remove();
                        $obj.find('.ui-area-content .ui-switchable-panel').eq(aindex + 1).remove();
                    }

                    var title = "";
                    $obj.find('.ui-area-tab .ui-switchable-item em').each(function () {
                        title += $(this).text() + "/";
                    });
                    title = title.substr(0, title.length - 1);
                    console.log(title);
                    var titleobj = $obj.find(".ui-area-text");
                    $(titleobj).attr("title", title);
                    $(titleobj).text(title);

                    self.loadOne();
                }
                else {
                    try
                    {
                        var aindex = $(this).parent().parent().index();
                        $obj.find('.ui-switchable-panel').eq(aindex + 1).addClass('active-panel').siblings('.ui-switchable-panel').removeClass('active-panel');
                        $obj.find('.ui-switchable-item').eq(aindex + 1).addClass('ui-area-current').siblings('.ui-switchable-item').removeClass('ui-area-current');
                    }
                    catch (e) { }

                   
                }
            });

        };

        //加载
        this.loadOne = function () {
            var self = this;
            var curid = $("#" + opts.hidelm).val();
            handleDataWithAjax(opts.serverurl, "get", { action: "list", areaid: curid }, function (req_state, data) {
                if (req_state && data.state) {
                    if (data.list.length > 0) {
                        self.addAraeTab(data.list);
                    }
                    else {
                        $obj.find(".ui-area-text-wrap").removeClass("hover-area-text-wrap");
                        $obj.find(".ui-area-content-wrap").hide();
                       
                    }
                }
                else {
                    setErrMsgAjax(data);
                }
            });
        }
        //加载
        this.loadAll = function () {
            $obj.html("");
            var curthis = this;
            var html = '<div class="ui-area-text-wrap">';
            html += '<div class="ui-area-text" title="">请选择区域</div>';
            html += '<b></b>';
            html += '</div>',
            html += '<div class="ui-area-content-wrap">',
            html += ' <div class="ui-area-tab">',
            html += '</div>',
            html += '<div class="ui-area-content">',
            html += '</div>',
            html += '</div>',
            $obj.append(html);
            var curid = $("#" + opts.hidelm).val();
           
            handleDataWithAjax(opts.serverurl, "get", { action: "init", areaid: curid }, function (req_state, data) {
                if (req_state && data.state) {
                    if (curid == "" || curid == 0) {
                        curthis.addAraeTab(data.list);
                    }
                    else {
                        for (var i = data.list.length-1; i > -1; i--) {
                            var area = data.list[i];
                            curthis.addAraeTab(area.sList, area.code);
                            if (i == 0) {
                                if (area.cList.length > 0) {
                                    curthis.addAraeTab(area.cList, null, true);
                                }
                            }
                        }
                    }
                    if (opts.initcallback != null) {
                        opts.initcallback($(".ui-area-text").text().replace(/\//g,""));
                    }
                }
                else {
                    setErrMsgAjax(data);
                }
            });
        }

        //初始化
        this.init = function () {
            $obj.addClass("ui-area-wrap");
            this.loadAll();
            this.eventBind();
        };
        this.init();

        //添加一个选项卡
        this.addAraeTab = function (list, id, isNotSwitch) {
            var curtclass =  "";
            var curpclass = "";
            if (!isNotSwitch) {
                $obj.find(".ui-area-tab .ui-switchable-item").removeClass("ui-area-current");
                $obj.find(".ui-area-content .ui-switchable-panel").removeClass("active-panel");
                curtclass = "ui-area-current";
                curpclass = "active-panel";
            }
           
             
            if (id == null) {

                $obj.find(".ui-area-tab").append('<a class="ui-switchable-item ' + curtclass + '"><em>请选择</em> <i></i></a>');
            }
            var content = '<div class="ui-switchable-panel ' + curpclass + '">';
            content+=' <ul class="ui-area-content-list">';
            for (var i = 0; i < list.length; i++) {
                var area = list[i];
                if (area.code == id) {
                    content += '<li class="active"> <a href="javascript:void(0)" data-id="' + area.code + '" title="' + area.name + '">' + area.name + '</a></li>';
                    $obj.find(".ui-area-tab").append('<a class="ui-switchable-item ui-area-current"><em>' + area.name + '</em> <i></i></a>');
                    var titleobj = $obj.find(".ui-area-text");
                    if ($(titleobj).attr("title") == "") {
                        $(titleobj).attr("title", area.name);
                        $(titleobj).text(area.name);
                    }
                    else {
                        var title = $(titleobj).attr("title");
                        $(titleobj).attr("title", title + "/" + area.name);
                        $(titleobj).text(title + "/" + area.name);
                    }
                }
                else {
                    content += '<li> <a href="javascript:void(0)" data-id="' + area.code + '" title="' + area.name + '">' + area.name + '</a></li>';
                }
            }
            content += '</ul>';
            content += '</div>';
            $obj.find(".ui-area-content").append(content);
            
        }

    };

    $.fn.areaselect = function (parameter) {
        var areaselect_elm = null;
        var options = $.extend({}, defaults, parameter);
        this.each(function () {
            areaselect_elm = new AreaSelect(this, options);
        });
        return areaselect_elm;
    };

})(jQuery, window, document);


function handleDataWithAjax(url, method, params, callbackFunc) {
    if (typeof (url) != "string") {
        throw new Error("url必须是字符串");
    }
    if (typeof (method) != "string") {
        throw new Error("method必须是字符串");
    }

    if (url == "") {
        throw new Error("url不能为空");
    }
    var tmp = method.toLowerCase();
    if (tmp != "post" && tmp != "get") {
        throw new Error("method类型不正确");
    }
    if (typeof (params) != "object" || params == null) {
        params = {};
    }
    if (typeof (callbackFunc) != "function") {
        throw new Error("没有定义处理响应的回调函数");
    }

    $.ajax({
        type: method,
        url: url + '?random' + Math.random(),
        data: params,
        dataType: "json",
        success: function (data) {
            callbackFunc(true, data);
        },
        error: function (xhr, type, err) {
            callbackFunc(false, xhr.status + " : " + err);
        }
    });
}

function setErrMsgAjax(data) {
    alert(JSON.stringify(data));
}