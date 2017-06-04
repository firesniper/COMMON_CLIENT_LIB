let fs = require ( "fs" ) ;
let inputFile = "public/node_js/webpack.html" ;
let outputDir = "public/node_js/html/" ;
let outputFile = "output.html" ;
let outputUri = outputDir + outputFile ;

let readerStream = fs.createReadStream ( inputFile ) ;
readerStream.setEncoding ( "utf-8" ) ;
// console.log ( "global:" , global.fs ) ;
Object.defineProperties
(
    String.prototype ,
    {
        "placeHolder" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( parentRegPg , b )
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = args[ 1 ] ? args[ 1 ] : this ;
                return $this
                        .toString ()
                        .replace ( /(?:\n|\r)/ig , "$placeHolderA1" ) 
                        .match ( /[^\f\n\r\t\v]/ig )
                        .join ( "" )
                        .match 
                        ( 
                            // new RegExp( parentRegPg.a , "ig" ) 
                            parentRegPg
                        ) ;
            }
        } ,
        "rSpace_aNl" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( a )
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = args[ 0 ] ? args[ 0 ] : this ;
                return $this
                // .replace ( />.*</ig , ">\n<" ) 
                // .replace ( /^.*</ig , "<" )
                // .replace ( /\/.*>.*$/ig , ">" )
                // .replace ( /\/>.*</ig , "/>\n<" ) ;
            }
        } ,
        "caseQuote" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( a )
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = args[ 0 ] ? args[ 0 ] : this ;
                return $this.toLowerCase().replace ( /(?:\'|\")/ig , "" ).replace ( / /ig , "" )  ;
            }
        } 
        ,
        "contentWrap" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( parentNode )
            {
                let parentRegPg = null ;
                switch ( parentNode )
                {
                    case "head" :
                        parentRegPg = 
                        { 
                            a :  "<head.*>.*<\\/head>"  ,
                            b :  "(?:<head>|<\\/head>)" 
                        } ;
                    break ;
                    case "body" :
                        parentRegPg = 
                        { 
                            a :  "<body.*>.*<\\/body>"  ,
                            b :  "(?:<body>|<\\/body>)"
                        } ;
                    break ;
 
                    case undefined :
                        parentRegPg = 
                        { 
                            a :  ".*"  ,
                            b : ""
                        } ;
                    break ;
 
                } ;
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = this ;
                
                if (  $this.constructor.name != "String" )
                { 
                    throw new TypeError ( "is\'nt String type" ) ; 
                    // return ;
                } ;
                // $this = $this.caseQuote () ;
                let headStr = $this.placeHolder( new RegExp( parentRegPg.a , "ig" ) ) ;
                console.log ( "headStr:" , headStr ) ;
                let parentWrap = headStr[ 0 ].match ( new RegExp ( parentRegPg.b , "ig" ) ) ;
                let headStr2 = headStr[ 0 ]
                .replace 
                (  
                    new RegExp ( parentRegPg.b , "ig" ) != /(?:)/ig ?
                    new RegExp ( parentRegPg.b , "ig" ) : "" 
                    , 
                    "" 
                )
                // .rSpace_aNl ( ) ;
                // console.log ( "headStr2:" , headStr2 ) ;
                console.log ( "headStr2:" , headStr2 ) ;
                let headStr3 = headStr2.split ( "\n" ) ; 
                // console.log ( "headStr3:" , headStr3 ) ;
                return { 
                    "content" : headStr3 ,
                    "parentWrap" : parentWrap
                } ;
            }
        }
    }
    
) ;
Object.defineProperties
(
    Array.prototype ,
    {
        "excludeOverlap" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( bAry , aAry )
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = args[ 1 ] ? args[ 1 ] : this ;
                let ary = [] ;
                let inc = 0 ;
                hfA01 : for ( var be = 0 ; be < $this.length ; be++ )
                {
                    if ( $this[ be ].caseQuote () === bAry [ be ].caseQuote () ) continue hfA01 ;
                     
                    ary[ inc++ ] = bAry[ be ] ;
                } ;
                return ary ;
            }
        }
    }
    
) ;

let sourceStrA1 = [ 
'<meta charset=\'utf-8\' />',
'<meta  content=\'no-cache\' http-equiv=\'cache-control\' />',
'<meta name=\'viewport\' content=\'width=device-width, height=device-height, user-scalable=no, initial-scale=1.0 ,minimum-scale=1.0,maximum-scale=1.0\' />' 
] ;
let sourceStrB1 = 
`
<head>
<meta charset='utf-8' />
<meta http-equiv='cache-control' content='no-cache' />
<meta  content='width=device-width,name='viewport  ' height=device-height, user-scalable=no, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0' />
</head>
` ;
console.log ( "begin" ) ;
// console.log ( "readerStream:" , readerStream.on ) ;



let promise = Promise.resolve
(
    readerStream.on
    (
        "data" ,
        function ( chunk )
        {
            console.log ( "chunk:" ,  chunk ) ;
            /*let buf = new Buffer ( chunk ) ;
            let buf2 = buf.toString ( "utf-8" ) ;
            console.log ( "buf2:" ,  buf2 ) ;*/
        /* let targetA1 = chunk.contentWrap( "head" ).content ;
            console.log ( "targetA1:" , targetA1 ) ;

            let sourceStrA2 = sourceStrA1.join ( "" ).contentWrap ().content ;
            console.log ( "sourceStrA2:" , sourceStrA2 ) ;
            let sourceData = sourceStrB1.contentWrap ( "head" ) ;
            console.log ( "sourceData.content:" , sourceData.content ) ;

            let resAry = targetA1.excludeOverlap ( sourceData.content ) ;
            let parentWrap = sourceData.parentWrap ;
            let resData = parentWrap[ 0 ] + resAry + parentWrap[ parentWrap.length - 1 ] ;
            console.log ( "resAry:" , resData ) ;*/
            /*let writerStream = fs.createWriteStream ( outputFile ) ;
            writerStream.write ( resData , "utf8" ) ;
            writerStream.end () ;
            writerStream.on
            (
                "finish" ,
                function ()
                {
                    console.log ( "finish" ) ;
                }
            ) ;*/
        }
    ) 
) ;

promise.then
(
    function ( a )
    {
        // console.log ( "a:" , a ) ;
        a.on
        (
            "data" ,
            function ( pc )
            {
                console.log ( "pc:" , typeof pc ) ;
                let targetA1 = pc.contentWrap( "head" ).content ;
                console.log ( "targetA1:" , targetA1 ) ;

                let sourceStrA2 = sourceStrA1.join ( "" ).contentWrap ().content ;
                console.log ( "sourceStrA2:" , sourceStrA2 ) ;
                let sourceData = sourceStrB1.contentWrap ( "head" ) ;
                console.log ( "sourceData.content:" , sourceData.content ) ;

                let resAry = targetA1.excludeOverlap ( sourceData.content ) ;
                console.log ( " resAry:" ,  resAry ) ;

                // let resAry2 = targetA1.concat ( resAry ) ;
                // console.log ( " resAry2:" ,  resAry2 ) ;
                let parentWrap = sourceData.parentWrap ;
                let headStr4 = ( parentWrap[ 0 ] + "\n" + resAry.join( "\n" ) + "\n" + parentWrap[ parentWrap.length - 1 ] ) ;
                console.log ( "headStr4:" , headStr4 ) ;
                let resData = pc.placeHolder( /.*/ig ) ;
                let resData2 = resData[ 0 ].replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
                console.log ( "resData2:" , resData2.replace ( /\$placeHolderA1/ig , "\n" ) ) ;
                fs.existsSync 
                (
                    outputDir
                    ,
                    function ( flag )
                    {
                        if ( flag ) return ; 
                        fs.mkdirSync ( outputDir ) ;

                    }
                ) ;
                fs.writeFile 
                ( 
                    outputUri , 
                    function ( a ) 
                    {
                        console.log ( "outputUri:" , outputUri ) ;
                        let writerStream = fs.createWriteStream ( outputUri ) ;
                        
                        writerStream.write ( resData2.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" ) , "utf8" ) ;
                        writerStream.end () ;
                        writerStream.on
                        (
                            "finish" ,
                            function ()
                            {
                                console.log ( "finish" ) ;
                            }
                        ) ;
                    } 
                ) ;
                
            } 
        ) ;
    }
    ,
    function ()
    {}
) ;