exports.paths = {
  	"home" : {
		"default" : "/admin",		
	},
	"settings" : {
		"default" 	: "/admin/settings"
	},
	"posts" : {
		"default" 	: "/posts",
		"new"		: "/posts",		
		"single" 	: "/posts/:id",
		"update" 	: "/posts/:id",
		"delete" 	: "/posts/:id"
	},
	"genericView" : {
		"default"	: "/admin/:view"
	}
}