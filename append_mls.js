;( function ( $html , $head , $body ) {
"use strict" ;

$html = "0" in $html ? $html[ 0 ] : $html ;
$head = "0" in $head ? $head[ 0 ] : $head ;
$body = "0" in $body ? $body[ 0 ] : $body ;
if ( $body.length > 0 && $body[ 0 ] ) 
{
	var $script = $body.getElementsByTagName( "script" ) ;
	$script = "0" in $script ? $script[ 0 ] : $script ;
} ;


void function () 
{

if ( !Object.assign ) 
{
	Object.defineProperty(
		Object , 
		"assign" ,
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( target , firstSource ) 
			{
				"use strict" ;
				if ( target === undefined || target == null )
					throw new TypeError( "Cannot convert first argument to object" ) ;
				var to = Object( target ) ;
				for ( var i = 1 ; i < arguments.length ; i++ ) 
				{
					var nextSource = arguments[ i ] ;
					if ( nextSource === undefined || nextSource == null ) continue ;
					var keysArray = Object.keys( Object( nextSource ) ) ;
					for ( var nextIndex = 0 , len = keysArray.length ; nextIndex < len ; nextIndex++ ) 
					{
						var nextKey = keysArray[ nextIndex ] ;
						var desc = Object.getOwnPropertyDescriptor( nextSource , nextKey ) ;
						if ( desc !== undefined && desc.enumerable ) to[ nextKey ] = nextSource[ nextKey ] ;
					} ;
				} ;
				return to ;
			} ,
		}
	) ;
} ;

Object.defineProperty(
	Object.prototype ,
	"thisOrArgs" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( unit ) 
		{
			try 
			{
				var args = Array.prototype.slice.call( arguments ) ; 
				unit = ( args.length == 1 && unit ) ? 
					   unit = args[ args.length - 1 ] : 
					   this ;
				if ( typeof obj === "string" ) 
				{
					return obj ;
				}
				else
				{
					throw new TypeError( "not string" ) ;
					return false ;
				} ;
			}
			catch ( e )
			{
				throw e ;

			} ;

		} ,
	} 
) ;

Object.defineProperty(
	Object.prototype ,
	"verifyType" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value :	function ( unit )
		{
			var args = Array.prototype.slice.call( arguments ) ;
			unit = this.parseArgs( arguments , 1 , unit ) ;
			var type = "" ;
			switch ( unit )
			{
				case undefined :
					return undefined ;
				break ;
				case null :
					return null ;
				break ;
			} ;
			if ( typeof unit === "object" )
			{
				return  ( "name" in unit.constructor ) ? 
						unit.constructor.name : 
						"length" in unit ? 
						"Array" :
						"Object" ;
			}
			else if ( typeof unit !== "object" )
			{
				return typeof unit ;
			} ;
// 				type = ( typeof unit == "object" ) ? unit.constructor.name : typeof unit ;
			return type ;
		} ,
	}
) ;

Object.defineProperty(
	Object.prototype ,
	"argsConvertAry" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( paireGroup )
		{
			paireGroup.__proto__ = Array.prototype ;
			console.log("paireGroup",paireGroup);
			return paireGroup ;
		} ,
	}
) ;

Object.defineProperty(
	Object.prototype ,
	"objConvertAry" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( paireGroup )
		{
			var args = Array.prototype.slice.call( arguments ) ;
			paireGroup = ( args.length == 1 && paireGroup ) ? 
						 paireGroup = args[ args.length - 1 ] : 
						 this ;
			console.log("paireGroup:",paireGroup);
			var ary = [] ;

			for ( var obje in paireGroup )
			{
				if ( paireGroup.hasOwnProperty( obje ) )
				{

						ary.push( paireGroup[ obje ] ) ;

				} ;
			} ;
			console.log("ary:",ary);
			return ary ;
		} ,
	}
) ;

Object.defineProperty(
	Object.prototype ,
	"objToAry" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( paireGroup )
		{
			console.log("this:",this);
			var ary = [] ;
			if ( Object.prototype.verifyType( paireGroup ) !== "Object" )
			{
				console.log("Object.prototype.verifyType(paireGroup):" , Object.prototype.verifyType(paireGroup));
				return ;
			} ;

			var callBackFn = paireGroup.isArguments(  )[ "callBackFn" ] ;
			console.log("callBackFn:",callBackFn);
			ary = callBackFn( paireGroup ) ;
			return ary ;
		} ,
	}
) ;

Object.defineProperty(
	Object.prototype ,
	"isArguments" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( paireGroup ) 
		{
			var args = Array.prototype.slice.call( arguments ) ;
			paireGroup = ( args.length == 1 && paireGroup ) ? 
						 paireGroup = args[ args.length - 1 ] : 
						 this ;
			var flag = null ;
			var callBackFn = null ;
			if ( "callee" in paireGroup )
			{
				flag = true ;
				callBackFn = Object.prototype.argsConvertAry ;
			}
			else if 
			(
				( "callee" in paireGroup ) === false
			)
			{
				flag = false ;
				callBackFn = Object.prototype.objConvertAry ;
			} ;
			console.log("callBackFn",callBackFn);
			return { flag : flag , callBackFn : callBackFn , } ;
		} ,
	}
) ;
	
Object.defineProperty(
	Object.prototype ,
	"parseArgs" ,
	{
		enumerable : false ,
		configurable : true , 
		writable : true ,
		value : function ( args , numLength , unit ) 
		{
			if ( ( "callee" in args ) == false ) 
			{ 
				throw new TypeError( "necessary arguments" ) ;
				return ;
			} ;
			args = Array.prototype.slice.call( args ) ;
			var result = ( args.length == numLength && unit ) ?
						 args[ args.length - 1 ] :
						 this ;
			return result ;
		} ,
	}

) ; 

Object.defineProperty(
	Object.prototype ,
	"insertAfter" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( govern , refe , injection )
		{
			if ( arguments.hasNullPointer().flag ) return ;
			var args = Array.prototype.slice.call( arguments ) ;
// 			if ( $args == null || $args == undefined ) return ;
			injection = ( args.length == 3 && injection ) ? 
						injection = args[ args.length - 1 ] : 
						this ;
			govern.insertBefore( injection , refe.nextSibling ) ;
		} ,
	}
) ;

Object.defineProperty(
	String.prototype ,
	"crtTagEles" ,
	{
		enumerable : false ,
		configurable : true ,
		writable : true ,
		value : function ( attrObj , tagType ) 
		{
// 			if ( arguments.hasNullPointer().flag ) return ;
			var args = Array.prototype.slice.call( arguments ) ;
// 			if ( !$args ) return  ;
// 			tagType = ( args.length == 2 && tagType ) ? 
// 					  tagType = args[ args.length - 1 ] : 
// 					  this ;
			tagType = this.parseArgs( arguments , 2 , tagType ) ;
			var ele = document.createElement( tagType ) ;
			for ( var _key in attrObj )
			{
				ele.setAttribute( _key , attrObj[ _key ] ) ;
			} ;
			return ele ;
		} ,
	}
) ;

Object.defineProperty(
	Object.prototype ,
	"haveAnyProperty" ,
	{
		enumerable : false ,
		configurable : false ,
		writable : true ,
		value : function ( )
		{
			var res = null ;
			for ( var k in this )
			{
				if ( this.hasOwnProperty( k ) )
				{
					return true ;
				} ; 
			} ;
			return false ;
		} ,
	}
) ;
Object.defineProperty(
	Object.prototype ,
	"hasNullPointer" ,
	{
		enumerable : false ,
		configurable : false ,
		writable : false ,
		value : function ( unitsGroup ) 
		{
			var args = Array.prototype.slice.call( arguments ) ;
			unitsGroup = ( args.length == 1 && unitsGroup && unitsGroup != undefined && unitsGroup != null ) ? 
						 unitsGroup = args[ args.length - 1 ] : 
						 this ;
			var unitA = ( unitsGroup.verifyType() === "Object" ) ? 
						new Object() : 
						( unitGroup.verifyType() === "Array" ) ?
						new Array() :
						null ;
			var unitB = null ;
			var flag = false ;
			var nullPointInc = { indicatorA : 0 , indicatorB : 0 , } ; 
			var unitsGroupLength = { indicatorA : 0 , indicatorB : 0 , } ;
			hfa01 : for ( var indicatorA in unitsGroup ) 
			{
				++unitsGroupLength.indicatorA ;
				if ( !unitsGroup[ indicatorA ] ) ++nullPointInc.indicatorA ;

				if ( nullPointInc.indicatorA == unitsGroupLength.indicatorA ) 
				{ 
					return { unit : null , flag : true , } ; 
				} ;
				if 
				( 
					!unitsGroup[ indicatorA ] 
					|| unitsGroup.hasOwnProperty( indicatorA ) == false
				) 
				{
					console.log( "unitsGroup[%o]:" , indicatorA , unitsGroup[ indicatorA ] ) ;
// 					throw new TypeError( unitsGroup + "[" + indicateA +"]" + "nullPoint" ) ;
					flag = true ;
					
					continue hfa01 ;
				} ;
				
				switch ( unitsGroup[ indicatorA ].verifyType() )
				{
					case "Object" :
						unitB = new Object() ;
					break ;
					case "Array" :
						unitB = new Array() ;
					break ;
				} ; 
				hfa02 : for ( var indicatorB in unitsGroup[ indicatorA ] ) 
				{
					++unitsGroupLength.indicatorB ;
					if ( !unitsGroup[ indicatorA ][ indicatorB ] ) ++nullPointInc.indicatorB ;
// 					if ( unitsGroupLength.indicatorB == nullPointInc.indicatorB ) 
// 					{
						
// 					} ;
					if 
					( 
						 !unitsGroup[ indicatorA ][ indicatorB ] 
						 || unitsGroup[ indicatorA ].hasOwnProperty( indicatorB ) == false 
					) 
					{
						console.log( "unitsGroup[ indicatorA ][ indicatorB ]" , unitsGroup[ indicatorA ][ indicatorB ] ) ;
						flag = true ;
						
						continue hfa02 ;
					} ;

					unitB[ indicatorB ] = unitsGroup[ indicatorA ][ indicatorB ] ;
				} ;
				if ( unitB.haveAnyProperty() == false ) continue hfa01 ;
				unitA[ indicatorA ] = unitB ;
			} ;
			return { 
						unit : unitA.haveAnyProperty() ? unitA : null , 
						flag : flag , 
					} ;
		} ,
	}
) ;

Object.defineProperty( 
	Object.prototype ,
	"hasSubTagName" ,
	{
		enumerable : false ,
		configurable : false ,
		writable : false ,
		value : function ( subTagName , domCollection ) 
		{
			var args = Array.prototype.slice.call( arguments ) ;
			domCollection = ( args.length == 2 && domCollection ) ?
							domCollection = args[ args.length - 1 ] : 
							this ;
			
			for ( var subDom in domCollection ) 
			{ 
				if ( domCollection[ subDom ].tagName == subTagName && domCollection.hasOwnProperty( subDom ) ) 
				{
					return true ;
				} ; 
			} ;
			return false ;
		} ,
	}
) ;

if ( "baseURI" in document == false ) 
{
	Object.defineProperty(
		document ,
		"baseURI" ,
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : (  document.querySelector( "base" ) 
						&& "href" in document.querySelector( "base" ) ?
						document.querySelector( "base" ).href : "" ) ,
		} 
	) ;
} ;



}() ;

console.log("objToAry:",(Object.prototype.objToAry({a:"a",b:"b"})));

String.prototype.getSchema = function ( schemaRegStr , virtualPath , urlStr ) 
{
	var args = Array.prototype.slice.call( arguments ) ;
	var urlStrDef = location.href ? location.href : document.URL ? document.URL : urlStr ? urlStr : this ;
	urlStr = ( args.length == 3 && urlStr ) ? 
			 urlStr = args[ args.length - 1 ] : 
			 typeof this === 'string' ?
			 this :
			 urlStrDef ;
	var virtualPathDef = "\\/\\w+" ;
	virtualPath = ( !virtualPath && virtualPath === undefined && virtualPath == null ) ?
				  virtualPathDef :
				  ( virtualPath = virtualPath.toString().match( /\d+/ig ) ) ? 
				  ( function () 
				  {
				  	
				  	virtualPath = new Number( virtualPath.join( "" ) ) ;
					var str = "\\/\\w+" ;
					for ( var i = 0 ; i <= virtualPath ; i++ ) 
					{
						virtualPathDef += virtualPathDef ;
					} ;
					return virtualPathDef ;
				  } )() : 
				  ( typeof virtualPath === "string" ) ?
				  virtualPath :
				  virtualPathDef ;
	var schemaRegStrDef = "^file:\\/\\/\\/[A-Za-z]:|(^http:\\/\\/(127.0.0.1:\\d+|localhost:\\d+|\\w+.\\w+.\\w+)?)?" ;
	schemaRegStr = ( schemaRegStr !== undefined && schemaRegStr !== null ) ? schemaRegStr : schemaRegStrDef ;

	
	var regExpObj = new RegExp( schemaRegStr += virtualPath  , "ig" ) ;
	var regResStr = urlStr.match( regExpObj ) ;
	return regResStr ;
} ;

Function.prototype.callerArgs = function ()
{

	if ( typeof this !== "function" )
	{
		throw new TypeError( "type funtion" ) ;
	}
	var thisArgs = Array.prototype.slice.call( this.arguments ) ;
	console.log("this:",thisArgs);
	console.log("this:",thisArgs[0]);
	console.log("this:",thisArgs.callee);
	console.log("this:",thisArgs.hasOwnProperty("callee"));
	var thisCallerArgs = Array.prototype.slice.call( this.caller.arguments ) ;
	var argsObj = null ;
	var argsAry = null ; 
	if 
	( 
		this.caller 
		&& thisCallerArgs 
		&& thisCallerArgs == thisArgs[ 0 ] 
	)
	{
		argsObj = thisCallerArgs ;
// 		if(args.constructor.name == "Object"){
// 			args = Function.operateType.objToAry(args);
// 		}
// 		else if(args.constructor.name == "Array"){
// 			return args;
// 		}
// 		return args;
	}
	else if ( thisCallerArgs != thisArgs[ 0 ] )
	{
		argsObj = thisArgs[ 0 ] ;
// 		return args;
	} ;

	argsAry = Function.operateType.objToAry( argsObj ) ;
	console.log("args:",argsAry);
	return argsAry ;
} ;

String.prototype.surfix = function ( jectStr )
{
	console.log( "arguments:",arguments );
	var args = Array.prototype.slice.call( arguments ) ;
	jectStr = ( args.length == 1 && jectStr ) ? 
			  jectStr = args[ args.length - 1 ] : 
			  this ;
	console.log("jectStr:",jectStr );
// 		if($args.length || $args.hasOwnProperty("callee")){ return false}
	var regRes  = jectStr.match( /(\.css|\.js)/i )[ 0 ] ;

	switch ( regRes )
	{
		case ".css" :
			return regRes ;
		break ;

		case ".js" :
			return regRes ;
		break ;
	} ;
} ;

String.prototype.prefix = function ( jectStr ) 
{
	var args = Array.prototype.slice.call( arguments ) ;
	jectStr = ( args.length == 1 && jectStr ) ? 
			  jectStr = args[ args.length - 1 ] : 
			  this ;
	
	var prefix = jectStr.match( /\.{0,1}\/|http:\/\// )[ 0 ] ;
	return prefix ;
} ;

Boolean.prototype.isAsynLoadFn = function ( coupleFnObj , isAsyn ) 
{
	try
	{
		isAsyn = this ? this : isAsyn ;
		isAsyn =  ( isAsyn !== undefined && isAsyn !== null && typeof isAsyn === "boolean" ) ? isAsyn : false ;
	}
	catch ( e )
	{
		throw new TypeError( "is boolean type error" ) ;
	} ;

	var callBackFn = null ;
	switch ( isAsyn ) 
	{
		case true :
			callBackFn = coupleFnObj.Asyn ;
		break ;
		case false :
			callBackFn = coupleFnObj.Syn ;
		break ;
		
	} ;
	return callBackFn ;
} ;




var newFn = 
{
	scIns : function ( )
	{
		newFn.scIns.prototype.insObj = this.__proto__ ;
		newFn.scIns.prototype.inc = { a : 0 , b : 0, c : 0 } ;
		newFn.scIns.prototype.tmpv = { a : null} ;

		newFn.scIns.prototype.generateEle = function ( url , surfix ) 
		{
			switch ( surfix )
			{
				case ".css" :
					return url.crtTagEles(
						
						{
							"href" : url ,
							"type" : "text/css" ,
							"rel" : "stylesheet"
						} ,
						"link" 
					) ;
				break ;

				case ".js" :
					return url.crtTagEles(
						
						{
							"src" : url ,
							"type" : "text/javascript" ,
						} ,
						"script" 
					) ;
				break ;
			}
		};

		newFn.scIns.prototype.crtEleObj = function ( urlObj )
		{
			console.log("urlObj:", urlObj) ;
			if ( !urlObj || urlObj == undefined || urlObj == null ) 
			{
				throw new TypeError( "null point error" ) ;
				return false ;
			} ;
// 			urlObj = urlObj.objConvertAry() ;
			var cssEleObj = {} ;
			var surfix = "" ;
			var ele = null ;
			var eleAry = [] ;
			var eleObj = {} ;
			af01 : for ( var o in urlObj )
			{
				eleAry = [] ;
				if ( urlObj.hasOwnProperty( o ) !== true ) continue af01 ;
				af02 : for ( 
					var i in urlObj[ o ]  
				)
				{
					if ( urlObj[ o ].hasOwnProperty( i ) !== true ) continue af02 ;
					console.log( urlObj[ o ][ i ] );
					var paireUnit = urlObj[ o ][ i ] ;
					switch ( paireUnit.verifyType(  ) ) 
					{
						case "string" :
							console.log( "surfix:" , paireUnit.surfix(  ) );
							surfix = paireUnit.surfix(  ) ;
							ele = newFn.scIns.prototype.insObj.generateEle( paireUnit , surfix ) ;
						break ;

						case "Object" :
							ele = String.prototype.crtTagEles(
								paireUnit ,
								"meta" 
							) ;
						break ;
					} ;
					console.log("ele:" ,ele);
// 					eleAry[ i ] = ele ;
					eleAry.push( ele ) ;
				}
				eleObj[ o ] = eleAry ;
			}
			console.log("eleObj:" , eleObj);
			return eleObj ;
		} ;

		newFn.scIns.prototype.load_sc = function ( scArr , label , isAsyn ) 
		{
			console.log("arguments:" , arguments );
			var inc = { a : 0 , b : 0 , c : 0 , } ;
			console.log("label:" , newFn.scIns.prototype.insObj.label);
	// 		newFn.scIns.prototype.insObj.inc[ label ] = 0;

	// 		newFn.scIns.prototype.insObj.appendSc2( scArr , label , inc );
			var fn = Function.isAsynLoadFn( newFn.scIns.prototype.appendSc , isAsyn ) ;
			fn( scArr[ label ] , label , inc ) ;
		} ;
		newFn.scIns.prototype.appendSc = function ( scArr , label , isAsyn , inc ) 
		{
			inc = 
			inc ? 
			inc : 
			( function ( label ) 
				{
					var obj = {} ;
					obj[ label ] = 0 ;
					return obj ;
				}
			)( label ) ;
			var mainCallBack = 
			{
				Syn : function ( scArr , label , inc ) 
				{
					if ( scArr[ label ] == null || scArr[ label ] === undefined || inc[ label ] >= scArr[ label ].length ) 
					{
						inc[ label ] = 0 ;
						return ;
					} ;

					console.log( "scArr[this.inc[label]]:" , scArr[ label ][ inc[ label ] ] );
					var scEle = scArr[ label ][ inc[ label ] ] ;
// 					var tagType = scEle.href ? 
// 								  scEle.href.surfix() : 
// 								  scEle.src ?
// 								  scEle.src.surfix() :
// 								  "css" ;

					var tagType = ( "href" in scEle ) ? 
								  scEle.href.surfix() : 
								  ( "src" in scEle ) ?
								  scEle.src.surfix() :
								  "meta" ;

// 					var tagType = (function () 
// 					{
// 						var tagType = "" ;
// 						if ( scEle.hasOwnProperty("href") ) 
// 						{
// 							tagType = scEle.href.surfix() ;
// 						} 
// 						else if ( scEle.hasOwnProperty("src") )
// 						{
// 							tagType = scEle.src.surfix() ;
// 						}
// 						else
// 						{
// 							tagType = "css" ;
// 						};
// 						return tagType ;
// 					})();

					switch ( tagType ) 
					{
						case ".css" :
							$head.appendChild( scEle ) ;
						break ;
						case "meta" :
							$head.appendChild( scEle ) ;
						break ;
						case ".js" :
// 							$body.insertBefore( scEle , $script[ $script.length - 1 ] ) ;
							$body.appendChild( scEle ) ;
						break ;
					} ;
					scEle.addEventListener(
						"load" ,
						function ( event ) 
						{
							console.log(newFn.scIns.prototype.insObj,event);
							if ( inc[ label ] < scArr[ label ].length ) 
							{
								inc[ label ]++ ;
								mainCallBack.Syn( scArr , label , inc ) ;
							} ;
						}
					) ;
				} ,
				Asyn : function ( scArr , label , inc ) 
				{
					for ( var i = 0 ; i < scArr[ label ].length ; i++ )
					{
						$head.appendChild( scArr[ label ][ i ] ) ;
					} ;
				} ,
			} ;
// 			var callBackFn = isAsyn.isAsynLoadFn( mainCallBack , isAsyn );
			var callBackFn = isAsyn ? mainCallBack.Asyn : mainCallBack.Syn ;

			callBackFn( scArr , label , inc ) ;
		} ;

		newFn.scIns.prototype.distribute = function ( urlObj , isAsyn )
		{
			console.log("arguments:" , arguments );
			isAsyn = isAsyn && typeof isAsyn === "boolean" ? isAsyn : false ;
			if ( urlObj.verifyType() == "Object")  urlObj = urlObj.objConvertAry() ;
			var urlObj = newFn.scIns.prototype.insObj.crtEleObj( urlObj ) ;

			var mainCallBack = 
			{
				Syn : function ( urlObj  )
				{
					try
					{


						var recursionLoop = function ( urlObj , indicator , isAsyn ) 
						{
							indicator = indicator ? indicator : 0 ; 
							if ( indicator >= urlObj.length ) return ;

							newFn.scIns.prototype.appendSc( urlObj , indicator , isAsyn ) ;
							recursionLoop( urlObj , ++indicator , isAsyn ) ;
// 							void function () 
// 							{
// 								window.setTimeout(
// 									function ( urlObj , indicator , isAsyn ) 
// 									{
// 										recursionLoop( urlObj , ++indicator , isAsyn ) ;
// 									} , 
// 									100 
// 								) ;
// 							}() ;
						} ;
// 						recursionLoop( urlObj , 0 , false ) ;
						for ( var indicator in urlObj ) 
						{
							newFn.scIns.prototype.appendSc( urlObj ,  indicator  , false ) ;

							var csto = window.setTimeout(
								function () 
								{

								} ,
								1111111111110
							) ;
							window.clearTimeout( csto ) ;
						} ;
					}
					catch ( e )
					{
						console.log("e:",e);
					} ;


// 					var sv01 = setInterval (
// 						function ()
// 						{

// 							newFn.scIns.prototype.appendSc( urlObj , "1" , false ) ;
// 							setInterval(
// 								function ()
// 								{

// 									newFn.scIns.prototype.appendSc( urlObj , "2" , true ) ;
// 								} ,
// 								0
// 							) ;
// 						} ,
// 						0
// 					) ;
// 					console.log("sv01" , sv01);

				} ,
				Asyn : function ( urlObj ) 
				{
					try
					{

						for ( var indicator in urlObj ) 
						{
// 							urlObj [ indicator ] ;
							newFn.scIns.prototype.appendSc( urlObj ,  indicator  , false ) ;

							var csto = window.setTimeout(
								function () 
								{
// 									newFn.scIns.prototype.appendSc( urlObj , indicator , false ) ;
// 									window.clearTimeout( csto ) ;
								} ,
								1111111111110
							) ;
							window.clearTimeout( csto ) ;
						} ;
					}
					catch ( e )
					{
						console.log("e:",e);
					} ;

				} ,
			} ;
// 			var callBackFn = Boolean.prototype.isAsynLoadFn( mainCallBack , isAsyn );
			var callBackFn = isAsyn ? mainCallBack.Asyn : mainCallBack.Syn ;

			callBackFn( urlObj ) ;
		} ;

	} ,
	

} ;

var pathStr = "" ;


var append_mls = 
{
	parseStr : function () 
	{
		console.log("arguments",arguments);
		console.log("this:",this);
// 		console.log("callee:",arguments.callee);
		var $args = Array.prototype.slice.call( arguments )[ 0 ];
		console.log("$args:",$args);
// 		var $args=Array.prototype.slice.call(arguments);
		if ( $args == null || $args == undefined ) 
		{
			$args[0]="../../";
			$args[1]="";
			$args[2]="";

		}
		
	// 	getPath.surfix();
// 		console.log("getPath:",getPath);

		pathStr = {
				dirA01:	[$args[0],"code_common/"],
				dirB01:	[$args[1],"css/"],
				dirC01:	[$args[2],"jiaoben_loading_3025/css/"],

		}
		console.log("pathStr:",pathStr);
	} ,
	appendCssJs : function ( urlObj , isAsyn )
	{
		var scIns_InsObj = new newFn.scIns() ;
		console.log("scIns_InsObj:",scIns_InsObj) ;
		var defUrlObj = { 0 : [] , 1 : [] , 2 : [] } ;
		var resUrlObj = Object.assign( defUrlObj , urlObj.link ) ; 
		var nonp_resUrlObj = resUrlObj.hasNullPointer() ;
		scIns_InsObj.distribute( nonp_resUrlObj.unit , isAsyn ) ;
	} ,
	appendScript : function ( urlObj , isAsyn )
	{
		$body = document.getElementsByTagName( "body" )[ 0 ] ;
		$script = $body.getElementsByTagName( "script" );
		console.log("arguments:",arguments);
		var scIns_InsObj = new newFn.scIns() ;
		console.log("scIns_InsObj:",scIns_InsObj);
		var defUrlObj = { 0 : {} , 1 : {} , 2 : {} } ;
		var resUrlObj = Object.assign( defUrlObj , urlObj.script ) ; 
		var nonp_resUrlObj = resUrlObj.hasNullPointer() ;
		scIns_InsObj.distribute( nonp_resUrlObj.unit , isAsyn ) ;
	} ,
	appendMeta : function ( urlObj , isAsyn )
	{
		var scIns_InsObj = scInsSinIns ;
		console.log("scIns_InsObj:",scIns_InsObj);
		var defUrlObj = { 0 : [] , 1 : [] , 2 : [] } ;
		var resUrlObj = Object.assign( defUrlObj , urlObj.meta ) ; 
		var nonp_resUrlObj = resUrlObj.hasNullPointer() ;
		var metaEleObj = scIns_InsObj.crtEleObj( nonp_resUrlObj.unit ) ;
		scIns_InsObj.appendSc( metaEleObj , 0 , isAsyn ) ;
	} ,
	appendBase : function ( schemaRegStr , virtualPath , baseHref ) 
	{
		if ( document.querySelector( "base" ) ) return ;
		var args = Array.prototype.slice.call( arguments ) ;
		var regResStr = String.prototype.getSchema( schemaRegStr , virtualPath ) ;
		
		var baseEle = document.createElement( "base" ) ;

		baseEle.setAttribute( "href" , ( args.length == 1 ) ? baseHref = args[ 0 ] : regResStr[ 0 ] + "/"  ) ;
		$head.insertBefore( baseEle , $head.firstElementChild ) ;

	} ,
	invokeJson : function ( url ) 
	{
// 		if ( url.lastIndexOf( "/" ) != url.length - 1  
// 			&& url[ url.length - 1 ] != "/" )
// 		{
// 			url += "/" ;
// 		} ;
		var randomFnName = "jsonp" + parseInt( Math.random( 9 ) * 10 ) ;
		if ( url.indexOf( "?" ) == "-1" ) 
		{
			url += "?jsonp=" ;
		} 
		else
		{
			url += url.indexOf( "jsonp=" ) == "-1" ? "&jsonp=" : "" ;	
		} ;
// 		url += url.indexOf( "?" ) ? "" : "&" ;
// 		url += url.indexOf( "jsonp" ) ? "" : "jsonp" ;
		url += randomFnName ; 

		window.scEleA2 = "script".crtTagEles( { src : url , type : "text/javascript" , } ) ;
		var randomTagId = "id_" + randomFnName ;
		scEleA2.id = randomTagId ;
		$head.appendChild( scEleA2 ) ;
		var randomTagDom = document.getElementById( randomTagId ) ;
		console.log("scEleA2:",scEleA2);
		
		var fnName = /(?:\?|&)jsonp=?\w+/.exec( url ) ;
		var obj = 
		{
			fnName : function ( arg1 ) 
			{
				console.log("skdjfalsdfjkl:" ,arg1);
			} ,
		} ;
// 		obj.fnName();
		window[ randomFnName ] = function ( arg1 ) 
		{
			console.log("skdjfalsdfjkl:" ,arg1);
			window[ randomFnName ] = undefined ;

			randomTagDom.parentNode.removeChild( randomTagDom ) ;
		} ;
	} ,

} ;
// appendcss.parseStr({a:"a",b:"b"});


window.$append_mls = append_mls ;
const scInsSinIns = new newFn.scIns() ;
window.$scInsSinIns = scInsSinIns ;
$append_mls.appendBase() ;
})
(
	document.getElementsByTagName( "html" ),
	document.getElementsByTagName( "head" ),
	document.getElementsByTagName( "body" )
);
// appendcss.parseStr({a:"a",b:"b"});