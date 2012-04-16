(function(a,b,c){c(["jquery","underscore","backbone","collections/col_directories","templates/_templates","modules/mod_sysmessage","modules/mod_byteconverter"],function(a,c,d,e,f,g,h){var i,j,k,l,m={};k=function(){function i(a){a==="add"?this.$el.addClass("file-selected"):a==="remove"&&this.$el.removeClass("file-selected")}function g(){var a=b.Context.get("root"),c=/image\/.*/.test(this.model.get("type"))?"/image/1/0/150"+this.model.get("src").substr((a+"/workspace").length):"/extensions/filemanager/assets/images/file-preview.png";return a+c}function e(a){a.preventDefault(),a.stopPropagation(),this.close()}return d.View.extend({events:{"click.meta .close":e},initialize:function(){var a;this._rendered=!1,this.$el.on("destroyed",c.bind(this.remove,this)),a=c.bind(i,this),this.options.parentView.on("select",a).on("unselect",a)},render:function(){var a,b;if(this._rendered)return this;a=c.extend(this.model.toJSON(),{preview:g.call(this),size:h(this.model.get("size"))+" ("+this.model.get("size")+")"}),b=f.meta(a),this.el.innerHTML=b,this._rendered=!0;return this},open:function(b){var c=this,d=a("#file-"+this.options.parentView.model.id);if(!this._rendered){this.render(),this.open(b);return this}this.$el.insertAfter(d),this.delegateEvents(),b?this.$el.css({display:"block"}):this.$el.slideDown(),this._open=!0,this.trigger("open",this),console.log(d[0].className,d.hasClass("selected")),d.hasClass("selected")?i.call(this,"add"):this.options.parentView.model.get("selected")&&i.call(c,"add"),console.log(c.options.parentView.model),setTimeout(function(){console.log(c.options.parentView.model.get("selected"))},2e3);return this},close:function(a){var b=this;this._open=!1,this.$el.slideUp(function(){a?b.$el.remove():b.undelegateEvents()}),!a&&this.trigger("close",this)},remove:function(){this.undelegateEvents(),this.trigger("remove")}})}(),k.makeView=function(){if(this instanceof d.View)return new k({parentView:this,tagName:"li",model:this.model,id:"meta-for-"+this.model.id,className:"meta-view",idPrefix:"meta-for-"});throw"makeView called with wrong context"},i=function(){function a(a){var b,c;a===this.model&&this._metaView&&(b=this._metaView,c=a.get("dir").get("path"),this._metaView.close(!0))}return d.View.extend({initialize:function(){this.model.collection.on("remove",c.bind(a,this))},render:function(a){a=a||{};var b=this,d=f.files(c.extend(this.model.toJSON(),{settings:a}));this.el.innerHTML+=d,setTimeout(function(){b.$el.find("#preview-"+b.model.id).on("click.file",c.bind(b.showMetaInfo,b))},0)},setMetaView:function(){var a=this.model.get("path"),b=this.dirView,c;this._metaView||(c=b.model.collection.cid,this._metaView=k.makeView.call(this),this._metaView.on("open",function(){m[c][a]=!0}).on("close",function(){delete m[c][a]}))},showMetaInfo:function(a){a.preventDefault(),a.stopPropagation(),this.setMetaView(),this._metaView.open()}})}(),j=function(){function g(){var b={},d=this.$el.find(".toolbar:first");c.each(a,function(a){var c=d.find("."+a);c.length&&(b[a]=c)}),this._tasks=b}function e(a,b){this._tasks[a]&&this._tasks[a].addClass("disabled")}function b(a,b){this._tasks[a]&&this._tasks[a].removeClass("disabled")}var a="upload create move delete".split(" ");return d.View.extend({events:{},initialize:function(){var a=this;this.fileViews=[],this._files={},this.on("enabletask",c.bind(b,this)).on("disabletask",c.bind(e,this))},render:function(a,b,d){var e=this,h=c.clone(a),j,k=this.model.get("parent"),l=this.model.get("files"),m;this.$el.html(f.dirs(c.extend(this.model.toJSON(),{settings:c.extend(h,b)}))),m=this.$el.find("#sub-"+this.model.id),l&&(l.on("remove",c.bind(e.model.collection.trigger,e.model.collection,"remove")),l.each(function(a){var c=new i({el:m,model:a});c.dirView=e,e._files[a.get("path")]=c,e.fileViews.push(c),c.render(b)})),j=k?document.getElementById("sub-"+k.id):document.getElementById("dir-list-root"),j&&!d&&this.$el.appendTo(j),g.call(this),this.model.get("state")==="open"&&this.$el.addClass(this.model.get("state")),d&&this.trigger("update",this)},getFileByPath:function(a){return this._files[a]},getSubDirs:function(){var a=this.model.get("subdirs")}})}(),l=function(){function w(a){var b=c.keys(m[this.collection.cid]),d,e,f=[],g=this.getDirViewByModel(a);!b.length||c.each(b,function(a){d=g.getFileByPath(a),d&&(d.setMetaView(),d._metaView.open(!0))})}function v(){this.$el.find(".draggable:not(.ui-draggable)").trigger("mouseenter").end().find(".droppable:not(.ui-droppable)").trigger("mouseenter")}function u(){var b=this,d=this.$el.find(".droppable:not(.ui-droppable)");d.droppable({drop:c.bind(o,this),greedy:!0,tolerance:"intersect",hoverClass:"dropover",scope:"moveable",over:function(c,d){var e=a(this).parent();e.hasClass("open")||(a(this).on("dropout",function(a,c){b.closeDir(e)}),b.openDir(e))}}),d.on("destroyed",s);return this}function t(){var a=this.$el.find(".draggable:not(.ui-draggable)");a.draggable({revert:!0,revertDuration:120,cursor:"move",axis:"y",handle:".move",opacity:.7,snap:!0,zIndex:2700,scope:"moveable"}),a.on("destroyed",r);return this}function s(){a(this).droppable("destroy")}function r(){a(this).draggable("destroy")}function q(b){b.preventDefault(),b.stopPropagation();var d;if(!!/droppable/.test(b.target.className)){d=a(b.target).add(".droppable"),d.droppable({drop:c.bind(o,this),greedy:!0,tolerance:"intersect",hoverClass:"dropover",scope:"moveable"});return this}}function p(b){b.preventDefault(),b.stopPropagation();var c;if(!!/draggable/.test(b.target.className)){c=a(b.target),c.draggable({revert:!0,revertDuration:120,cursor:"move",axis:"y",handle:".move",opacity:.7,snap:!0,zIndex:2700,scope:"moveable"});return this}}function o(b,c){b.preventDefault(),b.stopPropagation();var d=c.draggable,e=/file-/.test(d[0].className)?"file":"dir",f=a(b.target).parent()[0].id,g=e==="file"?d.parents().filter("li.dir")[0].id:d.parent()[0].id,h=e==="file"?d[0].id.substr(5):undefined;this.collection.moveItem({type:e,destination:f,source:g,file:h})}function n(a){a=a instanceof d.Model?a:this.collection.get(a.directory.id);return this.renderPart(a)}function l(a,b){var c=b.find("input[type=text]").val();this.collection.createDir(c,a).always(function(){b.off("click",".confirm"),b.remove()}).always(function(a){console.log("_createDir",a);var b=new g(null,a)})}function k(a,b,c){var d=/dir/.test(a.id);d||this.trigger("select","remove",a.toJSON());return i.call(this,a.id,d?"dir":"file")}function i(b,c){if(!this instanceof d.View)throw"function called with wrong context";var e=c==="file"?a("#file-"+b):a("#"+b),f=a([e,e.find(".dir-header")]).filter(function(){return this.data("draggable")||this.data("droppable")});this.dirViews[b]&&delete this.dirViews[b],e.detach(),setTimeout(function(){e.remove()},100);return this}function h(b,c){var d=a(b.target),e=d.parent(),f=this.getFile(e),g=c==="add"?"select":"unselect",h=c==="add"?!0:!1;c==="add"?e.addClass("selected"):c==="remove"&&e.removeClass("selected",h),this.trigger("select",c,f.toJSON()),f.set("selected",h),this.getDirViewByModel(f.get("dir")).getFileByPath(f.get("path")).trigger(g,c)}return d.View.extend({events:{"click.dritree .toolbar":"tasks","click.dirtree .dir-header":"toggleDir","click.dirtree .file:not(.selected) > .text":"select","click.dirtree .file.selected > .text":"unselect","click.dirtree .file > .toolbar > .delete":"deleteFile","click.dirtree .dir-header > .toolbar > .delete":"deleteDir","click.dirtree .dir-header > .toolbar > .create":"createDir"},initialize:function(){this.collection=new e,this.dirViews={},this.collection.addSetting("field_id",this.options.field_id),this.collection.populate(),this.collection.deferred.done(c.bind(this.render,this)),this.collection.on("add",c.bind(this.renderPart,this)),this.collection.on("remove",c.bind(k,this)),this.collection.on("update",c.bind(w,this)),m[this.collection.cid]={}},tasks:function(b){var c=a(b.target).parents().filter("li").find("ul")[0].id.substr(4),d=b.target.className.split(" ")[1];this.trigger(d,this.collection.get(c));return!1},select:function(a){h.call(this,a,"add")},unselect:function(a){h.call(this,a,"remove")},selectById:function(a){this.filesById(a).addClass("selected");return this},unselectById:function(a){this.filesById(a).removeClass("selected");return this},filesById:function(a){return this.$el.find(c.isArray(a)?"#file-"+a.join(", #file-"):"#file-"+a)},getFile:function(a){var b=a.parent()[0].id.substr(4);return this.collection.getFile(a[0].id.split("file-")[1],b)},confirm:function(a){return confirm(a)},deleteDir:function(c){var d=this.collection.get(a(c.target).parents().filter(".dir")[0].id),e=b.Language.get(g.confirm_directory_deletion,{dir:d.get("name"),dir2:d.get("name"),dircount:d.get("subdirs")?d.get("subdirs").length:0,filecount:d.get("files")?d.get("files").models.length:0});this.confirm(e)&&this.collection.deleteItem(d,"dir")},deleteFile:function(c){var d=a(c.target),e=d.parents().filter(".file"),f=e.parent(),h=this.getFile(e),i=b.Language.get(g.confirm_file_deletion,{file:"test"});this.confirm(i)&&this.collection.deleteItem(h,"file")},createDir:function(b){var d=a(b.target),e=this.collection.get(d.parents().filter(".dir")[0].id),g=a(f.newdir({parent:e.get("path"),level:~~e.get("level")+1}));a("#sub-"+e.id).prepend(g),this.openDir(d.parents().filter(".dir")),g.on("click",".add",c.bind(l,this,e,g)),g.on("click",".cancel",function(){g.remove()})},toggleDir:function(b){var c,d,e,f,e;b.preventDefault(),b.stopPropagation(),c=a(b.target).parents().filter(".dir:not(#dir-list-root)").first(),d=c.find("> .sub-dir"),f=c.hasClass("open")?"close":"open",e=f==="open"?"openDir":"closeDir",this[e](c)},openDir:function(a){a.find("> .sub-dir").slideDown(),a.addClass("open"),this.collection.get(a[0].id).set("state","open")},closeDir:function(a){a.find("> .sub-dir").slideUp(),a.removeClass("open"),this.collection.get(a[0].id).set("state","close")},enableTask:function(a,b){this.dirViews[b.id].trigger("enabletask",a)},disableTask:function(a,b){this.dirViews[b.id].trigger("disabletask",a)},renderPart:function(a){var b,d=this.dirViews[a.id]?!0:!1;d?(b=this.dirViews[a.id],b.model=a):(b=new j({tagName:"li",id:a.id,className:"dir level-"+a.get("level"),model:a}),this.dirViews[a.id]=b),b.render(this.options.dirSettings,this.options.fileSettings,d),d&&c.isArray(a.get("subdirs"))&&c.each(a.get("subdirs"),c.bind(n,this)),d&&this.trigger("update",b),t.call(this),u.call(this)},render:function(){var a=this;this.el.innerHTML=f.dirtree({name:this.options.baseName}),this.collection.each(c.bind(this.renderPart,this))},getSubdirsFromView:function(a,b){var d=this,e=a.model.get("subdirs"),f=[];e&&c.each(e,function(a){d.dirViews[a.id]&&(f.push(d.dirViews[a.id]),b&&a.get("subdirs")&&f.push.apply(f,d.getSubdirsFromView(d.dirViews[a.id],!0)))});return f},getDirViewByModel:function(a){return this.dirViews[a.id]},getDirViewById:function(a){return this.dirViews[a]}})}();return l})})(this,this.Symphony,this.define)