(function(a,b){var c={uploadedfile_size_exceeds:"file size ({$f_size}) limit exceeds allowed size",file_size_exceeds:"{$item} exceeds allowed size",file_type_invalid:"{$item}: filetype invalid",file_exists:"file {$file} already exists",directory_exists:"directory {$file} already exists",directory_created:"Directory {$dir} successfully created in {$path}",invalid_destination:"invalid destination: {$dir}",invalid_mimetype:"file type {$mimetype} not allowed",confirm_file_deletion:"Are you shure you want to delete {$file}? This step cannot be undone.",confirm_directory_deletion:"Are you shure you want to delete {$dir}? {$dir2} contains {$dircount} directories and {$filecount} files that will be deleted. This step cannot be undone.",file_select_limit_exceed:"Can't select more than {$count} files",unsaved_changes:"There are unsaved changes. Do you really want to continue?"},d=[],e=/\{\$.*?\}/g;a(["jquery","underscore"],function(a,e){function g(b,c,e){e=typeof e=="boolean"?e:!0,this.type=!b&&c.status===400?"error":c.success?"success":b,this.msgObj=this.type==="success"?c.success:this.type==="error"?e?a.parseJSON(c.responseText).STATUS_ERROR.error:c.error:{},d.push(this.parseMessage()),this.displayMessage()}var f={};e.each(c,function(a,b){f[a]=!1}),b.Language.add(f),g.prototype={parseMessage:function(){return b.Language.get(this.msgObj.message,this.msgObj.context)},displayMessage:function(){var a=d.length>1?0:4e3,c=this,e=d.shift();b.Message.fade("silence",10),b.Message.post(e,c.type),setTimeout(function(){setTimeout(function(){b.Message.clear(c.type)},300)},a)}},e.extend(g,c);return g})})(this.define,this.Symphony)