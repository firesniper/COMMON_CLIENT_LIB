let fs = require ( "fs" ) ;



// console.log ( "global:" , global.fs ) ;
Object.defineProperties
(
    String.prototype ,
    {
        "getFileNameFromUri" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ()
            {
                let args = Array.prototype.slice ( arguments ) ;
                let $this = this ;
                return $this.slice ( $this.lastIndexOf ( "/" ) ) ;
            }
        } ,
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
                let parentNodeDef = this.indexOf ( "<head" ) > -1 ? "head" : undefined ;
                parentNode = parentNode ? parentNode : parentNodeDef ;
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
                // let headStr3 = headStr2.split ( "\n" ) ; 
                let headStr3 = headStr2.placeHolderToN ().split ( "\n" ) ; 

                // console.log ( "headStr3:" , headStr3 ) ;
                return { 
                    "content" : headStr3 ,
                    "parentWrap" : parentWrap
                } ;
            } 
        },
        "placeHolderToN" : {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ()
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = this ;
                // console.log ( "this:" , this ) ;
                return $this.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" )  ;
                
            }
        }
    }
    
) ;
Object.defineProperties
(
    Array.prototype ,
    {
        "hasSamePointerInAry" :
        {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( val )
            {
                let args = Array.prototype.slice.call ( arguments ) ;
                let $this = this ;
                let res = false ;
                /*for ( let ele in $this ) 
                {
                    if ( $this[ ele ] == val  ) 
                    {
                        res = true ;
                        break ;
                    } ;
                } ;*/
                for ( let i = 0 ; i < $this.length ; i++ ) 
                {
                    if ( $this[ i ] == val  ) 
                    {
                        res = true ;
                        break ;
                    } ;
                } ;
                return res ;
            }
        } ,
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
                hfA01 : for ( let be = 0 ; be < bAry.length ; be++ )
                {
                    console.log ( "$this[ be ]:" , $this ) ;
                    console.log ( "bAry [ be ]:" , bAry  ) ;
                    for ( let ce = 0 ; ce < $this.length ; ce++ )
                    {

                        if ( bAry[ be ].caseQuote () == $this[ ce ].caseQuote () ) continue hfA01 ;
                        if ( !ary.hasSamePointerInAry ( bAry[ be ] ) )
                        ary[ inc++ ] = bAry[ be ] ;
                    } ;
                     
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

` ;
console.log ( "begin" ) ;
// console.log ( "readerStream:" , readerStream.on ) ;





let cpJs = 
{

    init : function ( _inputUri , _outputDir , _outputFile , sourceStrB1 ) 
    {
        /*let inputUri 
        // = "public/node_js/webpack.html" 
        ;
        let outputDir 
        // = "public/node_js/html/" 
        ;
        let outputFile 
        // = "output.html" 
        ;*/

        let inputUri = _inputUri ;
        let outputDir = _outputDir ;
        let outputFile = _outputFile ;


        let outputUri = outputDir + outputFile ;
        // let readerStream = fs.createReadStream ( inputUri ) ;
        let glob = require ( "glob" ) ;
        var testFn = function ( cb ) 
        {
            console.log ( "testFn" ) ;
            cb () ;
        } ;
        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' + [ 'public/node_js/*.{htm,html}' , "" ].join ( "," ) + '}' , 
                { 
                    cwd : './' , 
                    mark : true 
                } , 
                function ( err , fileList )
                {
                    if ( err )
                    {
                        console.log ( "err:" , err ) ;
                        return ;
                    } ;
                    console.log ( "fileList1:" , fileList ) ;
                    Function.prototype.fileList = fileList ;
                    let getReadStreamAry = function ( fileList )
                    {
                        let readStreamAry = [] ;
                        for ( let i = 0 ; i < fileList.length ; i++ ) 
                        {
                            readStreamAry[ i ] = fs.createReadStream ( fileList[ i ] ) ; 
                            readStreamAry[ i ].setEncoding ( "utf-8" ) ;
                        } ;
                        return readStreamAry ;
                    } ;
                    let readStreamAry = getReadStreamAry ( fileList ) ;
                    
                    


                    var fnL = function ( uri  )
                    {
                        fs.readdir 
                        (
                            uri ,
                            function ( err , dirs )
                            {
                                let x = 2 ;
                                let inc = 0 ;
                                // console.log ( "dirs:" , dirs ) ;
                                // var fnL2 = function ()
                                // {
                                        // console.log ( "dirs0:" , dirs ) ;
                                        if ( dirs == undefined ) return ;
                                        hfA01 : for ( var i = 0 ; i < dirs.length ; i++ ) 
                                        { 
                                            // console.log ( "dirs[ %i ]:" , i , dirs[ i ] ) ;
                                            let Dirf = dirs [ i ] ;
                                            if ( Dirf.indexOf ( "." ) > 0 ) continue hfA01 ;
                                            console.log ( "Dirf:" , Dirf ) ;
                                            // if ( i >= dirs.length ) return ;
                                            /*fs.readdir 
                                            (
                                                dirs [ i ] ,
                                                function ( err , dirs2 )
                                                {
                                                    console.log ( "dirs2:" , dirs2 ) ;
                                                    // fnL ( dirs2 ) ;
                                                }
                                            ) ;*/
                                            if ( Dirf == undefined ) continue hfA01 ;
                                            fnL (  Dirf ) ;
                                        } ;       
                                // } ;
                                /*inc ++ ;
                                if ( inc >= x ) return ;
                                fnL ( Dirf ) ;*/
                                    
                                
                            }
                        ) ;
                    } ;
                    // fnL ( "./" ) ;
                    

                    let getResDataStr = function ( pc , readStreamAry , inc )
                    {
                        console.log ( "pc:" ,  pc ) ;
                        let targetA1 = pc.contentWrap (  ).content ;
                        console.log ( "targetA1:" , targetA1 ) ;

                        /*let sourceStrA2 = sourceStrA1.join ( "" ).contentWrap ().content ;
                        console.log ( "sourceStrA2:" , sourceStrA2 ) ;*/
                        let sourceData = sourceStrB1.contentWrap (  ) ;
                        console.log ( "sourceData.content:" , sourceData.content ) ;

                        let resDiffAry = targetA1.excludeOverlap ( sourceData.content ) ;
                        console.log ( " resDiffAry:" ,  resDiffAry ) ;

                        let resDiffAry2 = targetA1.concat ( resDiffAry ) ;
                        console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

                        let parentWrap = sourceData.parentWrap ;
                        let headStr4 = ( parentWrap[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + parentWrap[ parentWrap.length - 1 ] ) ;
                        console.log ( "headStr4:" , headStr4 ) ;
                        let resData = pc.placeHolder( /.*/ig ) ;
                        let resData2 = resData[ 0 ].replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
                        console.log ( "resData2:" , resData2
                        // .replace ( /(?:\$placeHolderA1){1,}/ig , "\n" ) 
                        .placeHolderToN () 
                        ) ;
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
                        return resData2 ;
                        
                    } ;

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( arg0 , readStreamAry , inc )
                            {

                                console.log ( "this.path:" , this.path ) ;
                                let resDataStr = getResDataStr ( arg0 , readStreamAry , inc ) ;
                                fs.writeFile 
                                ( 
                                    outputDir + this.path.getFileNameFromUri () , 
                                    // resDataStr.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" )
                                    resDataStr.placeHolderToN () 
                                    ,
                                    function ( a ) 
                                    {
                                        console.log ( "outputUri:" , outputUri ) ;
                                        /*let writerStream = fs.createWriteStream ( outputDir + this.path.getFileNameFromUri () ) ;
                                        
                                        writerStream.write ( resDataStr.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" ) , "utf8" ) ;
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
                                ) ;
                            }
                            
                        ) ;
                    } ;
                    // console.log ( "this:", global  ) ;
                    // Glob.fileList = fileList ;
                    return fileList ;
                }    
            ) 
            /*testFn ( function () { 
                console.log ( "12123" ) ; 
                Function.prototype.fileList = "fileList" ;
            } )*/ 
        ) ;
        promiseA01.then
        (
            function ( arg0 )
            {
                // console.log ( "arg0:" , arg0 ) ;
                console.log ( "Function.prototype.fileList:", Function.prototype.fileList ) ;
                
                
            } ,
            function ( reject )
            {
                // console.log ( "reject:" , reject ) ;
            }
        ) ;
        
        /*let fileList = glob 
        ( 
            '{' + [ 'public/node_js/*.{htm,html}' , "" ].join ( "," ) + '}' , 
            { 
                cwd : './' , 
                mark : true 
            } , 
            function ( err , fileList )
            {
                if ( err )
                {
                    console.log ( "err:" , err ) ;
                    return ;
                } ;
                console.log ( "fileList1:" , fileList ) ;
                Function.prototype.fileList = fileList ;
                return fileList ;
            }    
        ) ;
        console.log ( "Function.prototype.fileList:", Function.prototype.fileList ) ;*/

        
      /*  readerStream.on
        (
            "data" ,
            fnA01
        ) ;*/
        /*let promise = Promise.resolve
        (
            readerStream.on
            (
                "data" ,
                function ( chunk , fnA01 )
                {
                    console.log ( "chunk:" ,  chunk ) ;
                
                }
            ) 
        ) ;

        promise.then
        (
            function ( readerStream )
            {
                readerStream.on
                (
                    "data" ,
                    fnA01
                ) ;
            } 
            ,
            function ()
            {

            }
        ) ;*/

    } 
} ;

module.exports = cpJs ;
