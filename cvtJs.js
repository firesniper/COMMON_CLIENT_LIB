Object.defineProperties 
(
    String.prototype ,
    {
        "formatToRegStr" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( a )
            {
                var defCharAry = [ "/" , "\\" ] ; 
                // console.log ( "this:" , this ) ;
                var thisAry = this.split ( "" ) ;
                for ( var i = 0 ; i < thisAry.length ; i++ )
                {
                    thisAry[ i ] =  "\\" + thisAry[ i ] ;
                } ;
                // this = thisAry.join ( "" ) ;
                return thisAry.join ( "" ) ;
                /*var reg = new RegExp 
                ( 
                    "[" + defCharAry.join( "" ) + "]" , 
                    "ig" 
                ) ;
                var defCharStr = this ;
                for ( var i = 0 ; i < defCharAry.length ; i++ )
                {
                    defCharStr = defCharStr.replace 
                    ( 
                        reg , "\\" + defCharAry[ i ] 
                    ) ;
                } ;*/
                
            }
        }
    }
) ;  
var fs = require ( "fs" ) ;
var inputFile = "./public/node_js/input.txt" ;

var  iptRs = fs.createReadStream ( inputFile ) ;
iptRs.setEncoding ( "utf-8" ) ;
iptRs.on (
    "data" ,
    function ( chunk )
    {
        // console.log ( "chunk :" , chunk ) ;
        // chunk = chunk.toString() ;
        // console.log ( typeof chunk ) ;
        var reserved0 = { "placeHolder1" : "\\//" } ; 
        console.log ( "window:" , Object.defineProperties ) ;    
        console.log ( "Array:" , Array ) ; 
        // var reserved = { "placeHolder1" : /\\\/\//ig }  ;
        var reserved = {} ;
        for ( var pA in reserved0  )
        {
            var RegStr = reserved0[ pA ].formatToRegStr () ;
            reserved[ pA ] =  new RegExp ( RegStr , "ig" ) ;
        } ;
        console.log ( "reserved0 Format: " , reserved0[ "placeHolder1" ].formatToRegStr (  ) ) ; 
        console.log ( reserved[ "placeHolder1" ].test ( chunk ) ) ;
        // console.log ( reserved[ "placeHolder1" ].exec ( chunk ) ) ;
      /*  var matchRes = "" ;
        matchRes = chunk.match ( reserved[ "placeHolder1" ] ) ;
        var resChunk = chunk.replace 
        ( 
             /\\\/\//ig  , 
            "placeHolder1" 
        ) ; */
        var resChunk = "" ;
        for ( var p in reserved )
        {
            /*console.log ( "p:" , p ) ;
            console.log ( "reserved[ p ] :" , reserved[ p ] ) ;*/
            // var regReserved = new RegExp () ;
            // var resServeReg = new RegExp ( reserved[ p ] , "ig" ) ;
            // console.log ( reserved[ p ].test ( chunk ) ) ;
            resChunk = chunk.replace ( reserved[ p ] , p ) ; 
             
        } ;
        // console.log ( "matchRes:" , matchRes ) ;
        // console.log ( "resChunk:" , resChunk ) ;
        var regStr = 
        [ 
            "console.log(.*).*\\r\\n" 
            ,
            "\\/\\/.*\\r\\n" 
            , 
            "\\/\\*.*\\*\\/"
        ] ;
        var regStr2 = 
        [ 
            /console.log\(.*\).*(;|\r\n)/ig 
            ,
            /\/\/.*\r\n/ig
            , 
            /\/\*.*\*\//ig 
        ] ;
           
        var regRes = resChunk ;
        for ( var i = 0 ; i < regStr.length ; i++ )
        {
            //  var reg = new RegExp ( regStr[ i ] , "ig" ) ;
            //  regRes += chunk.match ( reg , "" ) ;
             regRes = regRes.replace ( regStr2[ i ] , "" ) ;
        } ;
        
        var resChunk2 = regRes ;
        for ( var p in reserved0 )
        {
            // var regReserved = new RegExp () ;
            resChunk2 = resChunk2.replace ( new RegExp( p , "ig" ) , reserved0[ p ] ) ; 
        } ;
        console.log ( "resChunk2：" , resChunk2 ) ;
        /*console.log ( "regRes:" , reserved[ "placeHolder1" ].test( regRes ) ) ;
        console.log ( "regRes:" , new RegExp ( Object.keys( reserved ) [ 0 ] ).test( regRes ) ) ;*/
    }
) ;
Promise.resolve
(

) ;
