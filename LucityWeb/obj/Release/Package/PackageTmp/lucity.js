//Prevents console log errors in IE when developer tools are not open
if (!window.console) console = { log: function () { } };

(function (Lucity, undefined)
{
    /**
     * @ngdoc function
     * @name Lucity
     * @id Lucity
     * @description
     *
     * Set up our Lucity website parameters for AngularJS.
     **/
    Lucity.Version 		= "0.0.0";
    Lucity.PartialsPath = "/partials";
    Lucity.Modules 		= {};
    Lucity.Service 		= {};
    Lucity.Factory 		= {};
    Lucity.Configs 		= {};
    Lucity.Filters 		= {};
    Lucity.Controllers 	= {};
    Lucity.Directives = {};
    Lucity.Json = {
        "Calendar":     "resources/data/Calendar.json",
        "Team":         "resources/data/lucity_team.json",
        "Testimonials": "resources/data/testimonials.json",
        "Blogs": "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=http://blog.lucity.com/feed/",
        "YouTubePlaylist": "resources/data/YouTubePlayListMockup.json",
        "YouTubeVideoList": "resources/data/LucityUTube.json",
        "Careers": "/resources/data/Careers.json"
    };

    //YouTube playlist feed:
    //https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2C+id%2C+localizations%2C+player%2C+snippet%2C+status&channelId=UCSBBCEWsSEqzuf6nxS-xGsw&key=AIzaSyBclgmgFXlZTwT68_bPy66X8HIaqGUU9Xs


}(window.Lucity = window.Lucity || {} ));

(function (Modules, undefined)
{
    /**
     * @ngdoc object
     * @id Lucity
     * @name Lucity
     * @description
     *
     * This Module initializes the Lucity Angular module.
     **/
    Modules.Lucity = angular.module("lucity", ['ngRoute', 'ngSanitize']);

}(Lucity.Modules = Lucity.Modules || {}));


(function (Configs, undefined) {
    Lucity.Modules.Lucity.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
          'self',
          'http://*.lucity.com/**']);
    }]);
}(Lucity.Configs = Lucity.Configs || {}));

(function (Configs, undefined) {
    Lucity.Modules.Lucity.run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeSuccess", function () {
        if ($location.path().indexOf("/Company/Management-Team/") > -1) {
            $('html, body').animate({
                scrollTop: $("#MemberBio").offset().top - 120
            }, 1000);
        }
        if ($location.path().indexOf("/Company/Careers/") > -1) {
            $('html, body').animate({
                scrollTop: $("#CareerPath").offset().top - 120
            }, 1000);
        }
        else {
                window.scrollTo(0, 0);
            }
        });
    });
}(Lucity.Configs = Lucity.Configs || {}));





(function (Filters, undefined)
{
    Lucity.Modules.Lucity
        .filter('reverse', function() {
            return function(input, uppercase) {
                input = input || '';
                var out = "";
                for (var i = 0; i < input.length; i++) {
                    out = input.charAt(i) + out;
                }
                // conditional based on optional argument
                if (uppercase) {
                    out = out.toUpperCase();
                }
                return out;
            };
        })
        .filter('split', function() {
            return function(input, splitChar, splitIndex) {
                return input.split(splitChar)[splitIndex];
            }
        })
        .filter('replace', function(){
            return function(input, replacedText, replacementText){
                return input.replace(replacedText, replacementText);
            }
        });
}(Lucity.Controllers = Lucity.Controllers || {} ));


(function (Configs, undefined)
{
    Lucity.Modules.Lucity.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: Lucity.PartialsPath + '/home.html'
            })
            .when('/Company', {
                templateUrl: Lucity.PartialsPath + '/Company/company.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Management-Team', {
                templateUrl: Lucity.PartialsPath + '/Company/Management-Team.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Management-Team/:member', {
                templateUrl: Lucity.PartialsPath + '/Company/Management-Team.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Careers', {
                templateUrl: Lucity.PartialsPath + '/Company/Careers/Careers.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Careers/:career', {
                templateUrl: Lucity.PartialsPath + '/Company/Careers/Careers.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Events', {
                templateUrl: Lucity.PartialsPath + '/Company/events.html',
                caseInsensitiveMatch: true
            })
            .when('/Software', {
                templateUrl: Lucity.PartialsPath + '/Software/software.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Enterprise-Asset-Management-Software', {
                templateUrl: Lucity.PartialsPath + '/Software/EAMS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Maintenance-Management-Software', {
                templateUrl: Lucity.PartialsPath + '/Software/MMS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Geographic-Information-System', {
                templateUrl: Lucity.PartialsPath + '/Software/GIS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Deployment-Integration-Reporting', {
                templateUrl: Lucity.PartialsPath + '/Software/General.html',
                caseInsensitiveMatch: true
            })
            .when('/resources', {
                templateUrl: Lucity.PartialsPath + '/resources.html',
                caseInsensitiveMatch: true
            })
            .otherwise({
                redirectTo: '/',
                templateUrl: Lucity.PartialsPath + '/home.html'
            });
    }]);

    Lucity.Modules.Lucity.config(['$locationProvider', function ($locationProvider)
    {
        $locationProvider.html5Mode(true);
    }]);
}(Lucity.Configs = Lucity.Configs || {} ));


(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubePlaylistCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var playlistPromise = genericGetService.getData(Lucity.Json.YouTubePlaylist);
            playlistPromise.then(function (response) {
                $scope.YouTubePlaylists = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));





(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubeVideoListCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var videoListPromise = genericGetService.getData(Lucity.Json.YouTubeVideoList);
            videoListPromise.then(function (response) {
                $scope.YouTubeVideoList = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));





(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("BlogsCtrl", ['$scope', 'blogsService',
        function ($scope, blogsService)
        {
            var blogsPromise = blogsService.getBlogs();
            blogsPromise.then(function (data)
            {
                $scope.blog = data.responseData.feed;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));


(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CalendarCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var calendarPromise = genericGetService.getData(Lucity.Json.Calendar);
            calendarPromise.then(function (response) {
                $scope.calendar = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));





(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CareersCtrl", ['$scope', '$routeParams', 'genericGetService',
        function ($scope, $routeParams, genericGetService) {

            var emailLink = "mailto:jobs@lucity.com?subject=I'd like to work at Lucity!&amp;body=Here's why I'd be a great fit...";

            var careerListPromise = genericGetService.getData(Lucity.Json.Careers);
            careerListPromise.then(function (response) {
                $scope.careerList = response.data.careers;
                $scope.emailLink = encodeURI(emailLink);
            });

            if ($routeParams.career) {
                emailLink = "mailto:jobs@lucity.com?subject=I'd like to be a " + $routeParams.career.split('-').join(' ') + " at Lucity!&amp;body=Here's why I'd be a great fit...";
                $scope.career = $routeParams.career.split('-').join(' ');
                $scope.careerPath = Lucity.PartialsPath + "/Company/Careers/" + $routeParams.career + ".html"
                $scope.emailLink = encodeURI(emailLink);
            }
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));


(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("CompanyCtrl", ['$scope', '$routeParams', 'genericGetService',
        function ($scope, $routeParams, genericGetService, selectedMemberFilter)
        {
            $scope.career = $routeParams.career;
            $scope.showVideo = false;

            var promise = genericGetService.getData(Lucity.Json.Team);
            promise.then(function (response)
            {
                $scope.team = response.data.team;

                angular.forEach($scope.team.members, function(value, key){
                    value.restName = value.name.split(' ').join('-');
                    value.selected = $routeParams.member == value.restName;
                });
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));


(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("resourcesSearchCtrl", ['$scope', "$sce", 
        function ($scope, $sce) {
            $scope.resourceSearch = {
                "v" : "latest",
                "s" : "",
                "t" : "help"
            };

            $scope.resourceSearchSubmitForm = function () {
                var resourceSearchGetString = 'http://help.lucity.com/' + "portal/#v=" + encodeURIComponent($scope.resourceSearch.v) + "&s=" + encodeURIComponent($scope.resourceSearch.s) + "&t=" + encodeURIComponent($scope.resourceSearch.t) + "&n=5&p=1&c=1111111111111";
                $("#resourceSearch").attr("href", resourceSearchGetString);
                resourceSearch.click();
            }
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));


(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("SupportCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService)
        {
            var supportPromise = genericGetService.getData(Lucity.Json.Testimonials);
            supportPromise.then(function (response)
            {
                $scope.randomTestimonial = response.data.testimonials[Math.floor((Math.random() * response.data.testimonials.length))];
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));


(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("TalkingHeadCtrl", ['$scope', '$filter', 'genericGetService',
        function ($scope, $filter, genericGetService) {
            var talkingHeadPromise = genericGetService.getData(Lucity.Json.Testimonials);
            talkingHeadPromise.then(function (response) {
                var homePageTestimonials = $filter('filter')(response.data.testimonials, { keywords: 'homePage' });
                $scope.randomTalkingHead = homePageTestimonials[Math.floor((Math.random() * homePageTestimonials.length))];
                $scope.randomTalkingHeadImg = response.data.heads[Math.floor((Math.random() * response.data.heads.length))];
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));


(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("TestimonialsCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var testimonialsPromise = genericGetService.getData(Lucity.Json.Testimonials);
            testimonialsPromise.then(function (response) {
                $scope.testimonials = response.data.testimonials;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));


(function (Service, undefined)
{
    Lucity.Modules.Lucity.service("blogsService", ['$http', '$q', function ($http, $q)
    {
        var deferred = $q.defer();

        $.ajax({url: Lucity.Json.Blogs,
            success: function(data){
                deferred.resolve(data);
            },
            error: function(error){
            },
            dataType: 'jsonp'
        });

        this.getBlogs = function ()
        {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {} ));


(function (Services, undefined) {
    Lucity.Modules.Lucity.service("genericGetService", ['$http', '$q',
        function ($http, $q) {
            this.getData = function (url) {
                var deferred = $q.defer();

                $http.get(url).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        }]);
}(Lucity.Service = Lucity.Service || {}));


/*
 Copyright 2011-2013 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

function X2JS(config) {
	'use strict';
		
	var VERSION = "1.1.5";
	
	config = config || {};
	initConfigDefaults();
	initRequiredPolyfills();
	
	function initConfigDefaults() {
		if(config.escapeMode === undefined) {
			config.escapeMode = true;
		}
		config.attributePrefix = config.attributePrefix || "_";
		config.arrayAccessForm = config.arrayAccessForm || "none";
		config.emptyNodeForm = config.emptyNodeForm || "text";
		if(config.enableToStringFunc === undefined) {
			config.enableToStringFunc = true; 
		}
		config.arrayAccessFormPaths = config.arrayAccessFormPaths || []; 
		if(config.skipEmptyTextNodesForObj === undefined) {
			config.skipEmptyTextNodesForObj = true;
		}
		if(config.stripWhitespaces === undefined) {
			config.stripWhitespaces = true;
		}
		config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];
	}

	var DOMNodeTypes = {
		ELEMENT_NODE 	   : 1,
		TEXT_NODE    	   : 3,
		CDATA_SECTION_NODE : 4,
		COMMENT_NODE	   : 8,
		DOCUMENT_NODE 	   : 9
	};
	
	function initRequiredPolyfills() {
		function pad(number) {
	      var r = String(number);
	      if ( r.length === 1 ) {
	        r = '0' + r;
	      }
	      return r;
	    }
		// Hello IE8-
		if(typeof String.prototype.trim !== 'function') {			
			String.prototype.trim = function() {
				return this.replace(/^\s+|^\n+|(\s|\n)+$/g, '');
			}
		}
		if(typeof Date.prototype.toISOString !== 'function') {
			// Implementation from http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
			Date.prototype.toISOString = function() {
		      return this.getUTCFullYear()
		        + '-' + pad( this.getUTCMonth() + 1 )
		        + '-' + pad( this.getUTCDate() )
		        + 'T' + pad( this.getUTCHours() )
		        + ':' + pad( this.getUTCMinutes() )
		        + ':' + pad( this.getUTCSeconds() )
		        + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
		        + 'Z';
		    };
		}
	}
	
	function getNodeLocalName( node ) {
		var nodeLocalName = node.localName;			
		if(nodeLocalName == null) // Yeah, this is IE!! 
			nodeLocalName = node.baseName;
		if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
			nodeLocalName = node.nodeName;
		return nodeLocalName;
	}
	
	function getNodePrefix(node) {
		return node.prefix;
	}
		
	function escapeXmlChars(str) {
		if(typeof(str) == "string")
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
		else
			return str;
	}

	function unescapeXmlChars(str) {
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, '\/');
	}
	
	function toArrayAccessForm(obj, childName, path) {
		switch(config.arrayAccessForm) {
		case "property":
			if(!(obj[childName] instanceof Array))
				obj[childName+"_asArray"] = [obj[childName]];
			else
				obj[childName+"_asArray"] = obj[childName];
			break;		
		/*case "none":
			break;*/
		}
		
		if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
			var idx = 0;
			for(; idx < config.arrayAccessFormPaths.length; idx++) {
				var arrayPath = config.arrayAccessFormPaths[idx];
				if( typeof arrayPath === "string" ) {
					if(arrayPath == path)
						break;
				}
				else
				if( arrayPath instanceof RegExp) {
					if(arrayPath.test(path))
						break;
				}				
				else
				if( typeof arrayPath === "function") {
					if(arrayPath(obj, childName, path))
						break;
				}
			}
			if(idx!=config.arrayAccessFormPaths.length) {
				obj[childName] = [obj[childName]];
			}
		}
	}
	
	function fromXmlDateTime(prop) {
		// Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
		// Improved to support full spec and optional parts
		var bits = prop.split(/[-T:+Z]/g);
		
		var d = new Date(bits[0], bits[1]-1, bits[2]);			
		var secondBits = bits[5].split("\.");
		d.setHours(bits[3], bits[4], secondBits[0]);
		if(secondBits.length>1)
			d.setMilliseconds(secondBits[1]);

		// Get supplied time zone offset in minutes
		if(bits[6] && bits[7]) {
			var offsetMinutes = bits[6] * 60 + Number(bits[7]);
			var sign = /\d\d-\d\d:\d\d$/.test(prop)? '-' : '+';

			// Apply the sign
			offsetMinutes = 0 + (sign == '-'? -1 * offsetMinutes : offsetMinutes);

			// Apply offset and local timezone
			d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
		}
		else
			if(prop.indexOf("Z", prop.length - 1) !== -1) {
				d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));					
			}

		// d is now a local time equivalent to the supplied time
		return d;
	}
	
	function checkFromXmlDateTimePaths(value, childName, fullPath) {
		if(config.datetimeAccessFormPaths.length > 0) {
			var path = fullPath.split("\.#")[0];
			var idx = 0;
			for(; idx < config.datetimeAccessFormPaths.length; idx++) {
				var dtPath = config.datetimeAccessFormPaths[idx];
				if( typeof dtPath === "string" ) {
					if(dtPath == path)
						break;
				}
				else
				if( dtPath instanceof RegExp) {
					if(dtPath.test(path))
						break;
				}				
				else
				if( typeof dtPath === "function") {
					if(dtPath(obj, childName, path))
						break;
				}
			}
			if(idx!=config.datetimeAccessFormPaths.length) {
				return fromXmlDateTime(value);
			}
			else
				return value;
		}
		else
			return value;
	}

	function parseDOMChildren( node, path ) {
		if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
			var result = new Object;
			var nodeChildren = node.childNodes;
			// Alternative for firstElementChild which is not supported in some environments
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx);
				if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
					var childName = getNodeLocalName(child);
					result[childName] = parseDOMChildren(child, childName);
				}
			}
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
			var result = new Object;
			result.__cnt=0;
			
			var nodeChildren = node.childNodes;
			
			// Children nodes
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx); // nodeChildren[cidx];
				var childName = getNodeLocalName(child);
				
				if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
					result.__cnt++;
					if(result[childName] == null) {
						result[childName] = parseDOMChildren(child, path+"."+childName);
						toArrayAccessForm(result, childName, path+"."+childName);					
					}
					else {
						if(result[childName] != null) {
							if( !(result[childName] instanceof Array)) {
								result[childName] = [result[childName]];
								toArrayAccessForm(result, childName, path+"."+childName);
							}
						}
						(result[childName])[result[childName].length] = parseDOMChildren(child, path+"."+childName);
					}
				}								
			}
			
			// Attributes
			for(var aidx=0; aidx <node.attributes.length; aidx++) {
				var attr = node.attributes.item(aidx); // [aidx];
				result.__cnt++;
				result[config.attributePrefix+attr.name]=attr.value;
			}
			
			// Node namespace prefix
			var nodePrefix = getNodePrefix(node);
			if(nodePrefix!=null && nodePrefix!="") {
				result.__cnt++;
				result.__prefix=nodePrefix;
			}
			
			if(result["#text"]!=null) {				
				result.__text = result["#text"];
				if(result.__text instanceof Array) {
					result.__text = result.__text.join("\n");
				}
				if(config.escapeMode)
					result.__text = unescapeXmlChars(result.__text);
				if(config.stripWhitespaces)
					result.__text = result.__text.trim();
				delete result["#text"];
				if(config.arrayAccessForm=="property")
					delete result["#text_asArray"];
				result.__text = checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
			}
			if(result["#cdata-section"]!=null) {
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];
				if(config.arrayAccessForm=="property")
					delete result["#cdata-section_asArray"];
			}
			
			if( result.__cnt == 1 && result.__text!=null  ) {
				result = result.__text;
			}
			else
			if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
				result = '';
			}
			else
			if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
				if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
					delete result.__text;
				}
			}
			delete result.__cnt;			
			
			if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
				result.toString = function() {
					return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
				};
			}
			
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
			return node.nodeValue;
		}	
	}
	
	function startTag(jsonObj, element, attrList, closed) {
		var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
		if(attrList!=null) {
			for(var aidx = 0; aidx < attrList.length; aidx++) {
				var attrName = attrList[aidx];
				var attrVal = jsonObj[attrName];
				if(config.escapeMode)
					attrVal=escapeXmlChars(attrVal);
				resultStr+=" "+attrName.substr(config.attributePrefix.length)+"='"+attrVal+"'";
			}
		}
		if(!closed)
			resultStr+=">";
		else
			resultStr+="/>";
		return resultStr;
	}
	
	function endTag(jsonObj,elementName) {
		return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
	}
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
		if((config.arrayAccessForm=="property" && endsWith(jsonObjField.toString(),("_asArray"))) 
				|| jsonObjField.toString().indexOf(config.attributePrefix)==0 
				|| jsonObjField.toString().indexOf("__")==0
				|| (jsonObj[jsonObjField] instanceof Function) )
			return true;
		else
			return false;
	}
	
	function jsonXmlElemCount ( jsonObj ) {
		var elementsCnt = 0;
		if(jsonObj instanceof Object ) {
			for( var it in jsonObj  ) {
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				elementsCnt++;
			}
		}
		return elementsCnt;
	}
	
	function parseJSONAttributes ( jsonObj ) {
		var attrList = [];
		if(jsonObj instanceof Object ) {
			for( var ait in jsonObj  ) {
				if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf(config.attributePrefix)==0) {
					attrList.push(ait);
				}
			}
		}
		return attrList;
	}
	
	function parseJSONTextAttrs ( jsonTxtObj ) {
		var result ="";
		
		if(jsonTxtObj.__cdata!=null) {										
			result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
		}
		
		if(jsonTxtObj.__text!=null) {			
			if(config.escapeMode)
				result+=escapeXmlChars(jsonTxtObj.__text);
			else
				result+=jsonTxtObj.__text;
		}
		return result;
	}
	
	function parseJSONTextObject ( jsonTxtObj ) {
		var result ="";

		if( jsonTxtObj instanceof Object ) {
			result+=parseJSONTextAttrs ( jsonTxtObj );
		}
		else
			if(jsonTxtObj!=null) {
				if(config.escapeMode)
					result+=escapeXmlChars(jsonTxtObj);
				else
					result+=jsonTxtObj;
			}
		
		return result;
	}
	
	function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList ) {
		var result = ""; 
		if(jsonArrRoot.length == 0) {
			result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
		}
		else {
			for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
				result+=startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
				result+=parseJSONObject(jsonArrRoot[arIdx]);
				result+=endTag(jsonArrRoot[arIdx],jsonArrObj);						
			}
		}
		return result;
	}
	
	function parseJSONObject ( jsonObj ) {
		var result = "";	

		var elementsCnt = jsonXmlElemCount ( jsonObj );
		
		if(elementsCnt > 0) {
			for( var it in jsonObj ) {
				
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				
				var subObj = jsonObj[it];						
				
				var attrList = parseJSONAttributes( subObj )
				
				if(subObj == null || subObj == undefined) {
					result+=startTag(subObj, it, attrList, true);
				}
				else
				if(subObj instanceof Object) {
					
					if(subObj instanceof Array) {					
						result+=parseJSONArray( subObj, it, attrList );					
					}
					else if(subObj instanceof Date) {
						result+=startTag(subObj, it, attrList, false);
						result+=subObj.toISOString();
						result+=endTag(subObj,it);
					}
					else {
						var subObjElementsCnt = jsonXmlElemCount ( subObj );
						if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
							result+=startTag(subObj, it, attrList, false);
							result+=parseJSONObject(subObj);
							result+=endTag(subObj,it);
						}
						else {
							result+=startTag(subObj, it, attrList, true);
						}
					}
				}
				else {
					result+=startTag(subObj, it, attrList, false);
					result+=parseJSONTextObject(subObj);
					result+=endTag(subObj,it);
				}
			}
		}
		result+=parseJSONTextObject(jsonObj);
		
		return result;
	}
	
	this.parseXmlString = function(xmlDocStr) {
		var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
		if (xmlDocStr === undefined) {
			return null;
		}
		var xmlDoc;
		if (window.DOMParser) {
			var parser=new window.DOMParser();			
			var parsererrorNS = null;
			// IE9+ now is here
			if(!isIEParser) {
				try {
					parsererrorNS = parser.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
				}
				catch(err) {					
					parsererrorNS = null;
				}
			}
			try {
				xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
				if( parsererrorNS!= null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
					//throw new Error('Error parsing XML: '+xmlDocStr);
					xmlDoc = null;
				}
			}
			catch(err) {
				xmlDoc = null;
			}
		}
		else {
			// IE :(
			if(xmlDocStr.indexOf("<?")==0) {
				xmlDocStr = xmlDocStr.substr( xmlDocStr.indexOf("?>") + 2 );
			}
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	};
	
	this.asArray = function(prop) {
		if(prop instanceof Array)
			return prop;
		else
			return [prop];
	};
	
	this.toXmlDateTime = function(dt) {
		if(dt instanceof Date)
			return dt.toISOString();
		else
		if(typeof(dt) === 'number' )
			return new Date(dt).toISOString();
		else	
			return null;
	};
	
	this.asDateTime = function(prop) {
		if(typeof(prop) == "string") {
			return fromXmlDateTime(prop);
		}
		else
			return prop;
	};

	this.xml2json = function (xmlDoc) {
		return parseDOMChildren ( xmlDoc );
	};
	
	this.xml_str2json = function (xmlDocStr) {
		var xmlDoc = this.parseXmlString(xmlDocStr);
		if(xmlDoc!=null)
			return this.xml2json(xmlDoc);
		else
			return null;
	};

	this.json2xml_str = function (jsonObj) {
		return parseJSONObject ( jsonObj );
	};

	this.json2xml = function (jsonObj) {
		var xmlDocStr = this.json2xml_str (jsonObj);
		return this.parseXmlString(xmlDocStr);
	};
	
	this.getVersion = function () {
		return VERSION;
	};
	
}


function X2JS(v){var q="1.1.5";v=v||{};h();r();function h(){if(v.escapeMode===undefined){v.escapeMode=true;}v.attributePrefix=v.attributePrefix||"_";v.arrayAccessForm=v.arrayAccessForm||"none";v.emptyNodeForm=v.emptyNodeForm||"text";if(v.enableToStringFunc===undefined){v.enableToStringFunc=true;}v.arrayAccessFormPaths=v.arrayAccessFormPaths||[];if(v.skipEmptyTextNodesForObj===undefined){v.skipEmptyTextNodesForObj=true;}if(v.stripWhitespaces===undefined){v.stripWhitespaces=true;}v.datetimeAccessFormPaths=v.datetimeAccessFormPaths||[];}var g={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function r(){function x(z){var y=String(z);if(y.length===1){y="0"+y;}return y;}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"");};}if(typeof Date.prototype.toISOString!=="function"){Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+x(this.getUTCMonth()+1)+"-"+x(this.getUTCDate())+"T"+x(this.getUTCHours())+":"+x(this.getUTCMinutes())+":"+x(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2,5)+"Z";};}}function t(x){var y=x.localName;if(y==null){y=x.baseName;}if(y==null||y==""){y=x.nodeName;}return y;}function o(x){return x.prefix;}function p(x){if(typeof(x)=="string"){return x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");}else{return x;}}function j(x){return x.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/");}function l(B,y,A){switch(v.arrayAccessForm){case"property":if(!(B[y] instanceof Array)){B[y+"_asArray"]=[B[y]];}else{B[y+"_asArray"]=B[y];}break;}if(!(B[y] instanceof Array)&&v.arrayAccessFormPaths.length>0){var x=0;for(;x<v.arrayAccessFormPaths.length;x++){var z=v.arrayAccessFormPaths[x];if(typeof z==="string"){if(z==A){break;}}else{if(z instanceof RegExp){if(z.test(A)){break;}}else{if(typeof z==="function"){if(z(B,y,A)){break;}}}}}if(x!=v.arrayAccessFormPaths.length){B[y]=[B[y]];}}}function a(C){var A=C.split(/[-T:+Z]/g);var B=new Date(A[0],A[1]-1,A[2]);var z=A[5].split(".");B.setHours(A[3],A[4],z[0]);if(z.length>1){B.setMilliseconds(z[1]);}if(A[6]&&A[7]){var y=A[6]*60+Number(A[7]);var x=/\d\d-\d\d:\d\d$/.test(C)?"-":"+";y=0+(x=="-"?-1*y:y);B.setMinutes(B.getMinutes()-y-B.getTimezoneOffset());}else{if(C.indexOf("Z",C.length-1)!==-1){B=new Date(Date.UTC(B.getFullYear(),B.getMonth(),B.getDate(),B.getHours(),B.getMinutes(),B.getSeconds(),B.getMilliseconds()));}}return B;}function n(A,y,z){if(v.datetimeAccessFormPaths.length>0){var B=z.split(".#")[0];var x=0;for(;x<v.datetimeAccessFormPaths.length;x++){var C=v.datetimeAccessFormPaths[x];if(typeof C==="string"){if(C==B){break;}}else{if(C instanceof RegExp){if(C.test(B)){break;}}else{if(typeof C==="function"){if(C(obj,y,B)){break;}}}}}if(x!=v.datetimeAccessFormPaths.length){return a(A);}else{return A;}}else{return A;}}function w(z,E){if(z.nodeType==g.DOCUMENT_NODE){var F=new Object;var x=z.childNodes;for(var G=0;G<x.length;G++){var y=x.item(G);if(y.nodeType==g.ELEMENT_NODE){var D=t(y);F[D]=w(y,D);}}return F;}else{if(z.nodeType==g.ELEMENT_NODE){var F=new Object;F.__cnt=0;var x=z.childNodes;for(var G=0;G<x.length;G++){var y=x.item(G);var D=t(y);if(y.nodeType!=g.COMMENT_NODE){F.__cnt++;if(F[D]==null){F[D]=w(y,E+"."+D);l(F,D,E+"."+D);}else{if(F[D]!=null){if(!(F[D] instanceof Array)){F[D]=[F[D]];l(F,D,E+"."+D);}}(F[D])[F[D].length]=w(y,E+"."+D);}}}for(var A=0;A<z.attributes.length;A++){var B=z.attributes.item(A);F.__cnt++;F[v.attributePrefix+B.name]=B.value;}var C=o(z);if(C!=null&&C!=""){F.__cnt++;F.__prefix=C;}if(F["#text"]!=null){F.__text=F["#text"];if(F.__text instanceof Array){F.__text=F.__text.join("\n");}if(v.escapeMode){F.__text=j(F.__text);}if(v.stripWhitespaces){F.__text=F.__text.trim();}delete F["#text"];if(v.arrayAccessForm=="property"){delete F["#text_asArray"];}F.__text=n(F.__text,D,E+"."+D);}if(F["#cdata-section"]!=null){F.__cdata=F["#cdata-section"];delete F["#cdata-section"];if(v.arrayAccessForm=="property"){delete F["#cdata-section_asArray"];}}if(F.__cnt==1&&F.__text!=null){F=F.__text;}else{if(F.__cnt==0&&v.emptyNodeForm=="text"){F="";}else{if(F.__cnt>1&&F.__text!=null&&v.skipEmptyTextNodesForObj){if((v.stripWhitespaces&&F.__text=="")||(F.__text.trim()=="")){delete F.__text;}}}}delete F.__cnt;if(v.enableToStringFunc&&(F.__text!=null||F.__cdata!=null)){F.toString=function(){return(this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");};}return F;}else{if(z.nodeType==g.TEXT_NODE||z.nodeType==g.CDATA_SECTION_NODE){return z.nodeValue;}}}}function m(E,B,D,y){var A="<"+((E!=null&&E.__prefix!=null)?(E.__prefix+":"):"")+B;if(D!=null){for(var C=0;C<D.length;C++){var z=D[C];var x=E[z];if(v.escapeMode){x=p(x);}A+=" "+z.substr(v.attributePrefix.length)+"='"+x+"'";}}if(!y){A+=">";}else{A+="/>";}return A;}function i(y,x){return"</"+(y.__prefix!=null?(y.__prefix+":"):"")+x+">";}function s(y,x){return y.indexOf(x,y.length-x.length)!==-1;}function u(y,x){if((v.arrayAccessForm=="property"&&s(x.toString(),("_asArray")))||x.toString().indexOf(v.attributePrefix)==0||x.toString().indexOf("__")==0||(y[x] instanceof Function)){return true;}else{return false;}}function k(z){var y=0;if(z instanceof Object){for(var x in z){if(u(z,x)){continue;}y++;}}return y;}function b(z){var y=[];if(z instanceof Object){for(var x in z){if(x.toString().indexOf("__")==-1&&x.toString().indexOf(v.attributePrefix)==0){y.push(x);}}}return y;}function f(y){var x="";if(y.__cdata!=null){x+="<![CDATA["+y.__cdata+"]]>";}if(y.__text!=null){if(v.escapeMode){x+=p(y.__text);}else{x+=y.__text;}}return x;}function c(y){var x="";if(y instanceof Object){x+=f(y);}else{if(y!=null){if(v.escapeMode){x+=p(y);}else{x+=y;}}}return x;}function e(z,B,A){var x="";if(z.length==0){x+=m(z,B,A,true);}else{for(var y=0;y<z.length;y++){x+=m(z[y],B,b(z[y]),false);x+=d(z[y]);x+=i(z[y],B);}}return x;}function d(D){var x="";var B=k(D);if(B>0){for(var A in D){if(u(D,A)){continue;}var z=D[A];var C=b(z);if(z==null||z==undefined){x+=m(z,A,C,true);}else{if(z instanceof Object){if(z instanceof Array){x+=e(z,A,C);}else{if(z instanceof Date){x+=m(z,A,C,false);x+=z.toISOString();x+=i(z,A);}else{var y=k(z);if(y>0||z.__text!=null||z.__cdata!=null){x+=m(z,A,C,false);x+=d(z);x+=i(z,A);}else{x+=m(z,A,C,true);}}}}else{x+=m(z,A,C,false);x+=c(z);x+=i(z,A);}}}}x+=c(D);return x;}this.parseXmlString=function(z){var B=window.ActiveXObject||"ActiveXObject" in window;if(z===undefined){return null;}var A;if(window.DOMParser){var C=new window.DOMParser();var x=null;if(!B){try{x=C.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI;}catch(y){x=null;}}try{A=C.parseFromString(z,"text/xml");if(x!=null&&A.getElementsByTagNameNS(x,"parsererror").length>0){A=null;}}catch(y){A=null;}}else{if(z.indexOf("<?")==0){z=z.substr(z.indexOf("?>")+2);}A=new ActiveXObject("Microsoft.XMLDOM");A.async="false";A.loadXML(z);}return A;};this.asArray=function(x){if(x instanceof Array){return x;}else{return[x];}};this.toXmlDateTime=function(x){if(x instanceof Date){return x.toISOString();}else{if(typeof(x)==="number"){return new Date(x).toISOString();}else{return null;}}};this.asDateTime=function(x){if(typeof(x)=="string"){return a(x);}else{return x;}};this.xml2json=function(x){return w(x);};this.xml_str2json=function(x){var y=this.parseXmlString(x);if(y!=null){return this.xml2json(y);}else{return null;}};this.json2xml_str=function(x){return d(x);};this.json2xml=function(y){var x=this.json2xml_str(y);return this.parseXmlString(x);};this.getVersion=function(){return q;};}