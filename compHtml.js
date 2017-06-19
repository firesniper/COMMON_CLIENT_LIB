let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;

console.log ( "begin" ) ;

let getResLessSassStr = function ( srcDataStr )
{
    console.log ( "srcDataStr:" ,  srcDataStr ) ;

    let lessSassStr = srcDataStr.contentWrap ( "lessSass" ).partDomStr ;
    console.log ( "lessSassStr:" , lessSassStr ) ;
    let lessSassStr2 = lessSassStr.placeHolderToToken ( "lessSass" ) ;
    console.log ( "lessSassStr2:" , lessSassStr2 ) ;

    

    return lessSassStr2 ;
} ;

let getResJsStr = function ( chunk )
{
    console.log ( "chunk :" , chunk ) ;
        
    let regStr = 
    [ 
        // "console.log.*(?:;|\\r\\n)" 
        // ,
        "\\/\\/.*\\r\\n" 
        , 
        "\\/\\*.*\\*\\/"
    ] ;
    let regStr2 = 
    [ 
        /console.log.*(?:;|\r\n)/ig 
        ,
        /\/\/.*\r\n/ig
        , 
        /\/\*.*\*\//ig 
    ] ;
        
    let regRes = chunk ;
    for ( let i = 0 ; i < regStr.length ; i++ )
    {

            regRes = regRes.replace ( regStr2[ i ] , "" ) ;
    } ;
    
    console.log ( "regRes:" , regRes ) ;
    return regRes ;
} ;

let getResJsStr2 = function ( srcDataStr )
{
    console.log ( "srcDataStr :" , srcDataStr ) ;
        
    let jsStr = srcDataStr.contentWrap ( "js" ).partDomStr ;
    console.log ( "jsStr:" , jsStr ) ;
    let jsStr2 = jsStr.placeHolderToToken ( "js" ) ;
    console.log ( "jsStr2:" , jsStr2 ) ;
        
    return jsStr2 ;
} ;                    

let getResHTMLStr = function ( srcDataStr , injSrcStr )
{
    console.log ( "srcDataStr:" ,  srcDataStr ) ;
    let targetAryA1 = srcDataStr.contentWrap ( "head" ).contentAry ;
    console.log ( "targetAryA1:" , targetAryA1 ) ;
    
    let sourceDataPgp = injSrcStr.contentWrap ( "head" ) ;
    console.log ( "sourceDataPgp.contentAry:" , sourceDataPgp.contentAry ) ;

    let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPgp.contentAry ) ;
    console.log ( " resDiffAry:" ,  resDiffAry ) ;

    let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
    console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

    let parentWrapAry = sourceDataPgp.parentWrapAry ;
    let headStr4 = ( parentWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + parentWrapAry[ parentWrapAry.length - 1 ] ) ;
    console.log ( "headStr4:" , headStr4 ) ;
    
    let resData = srcDataStr.tokenToPlaceHolder( "global" ) ;
    console.log ( "resData:" , resData ) ;
    let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
    console.log ( "resData2:" , resData2  ) ;
    
    
    /*if ( srcDataStr.indexOf ( "<body" ) > -1 )
    {
        let bodyStr = srcDataStr.tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
        console.log ( "bodyStr:" , bodyStr ) ;

        // let bodyStr2 = bodyStr.tokenToPlaceHolder () ;
        let bodyStr3 = bodyStr[ 0 ].placeHolderToToken () ;
        console.log ( "bodyStr3:" , bodyStr3 ) ;
    } ;*/
    let bodyStr = srcDataStr.contentWrap ( "body" ).partDomStr ;
    let bodyStr2 = bodyStr.placeHolderToToken ( "body" ) ;
    let resData3 = resData2.replace ( /<body.*>.*<\/body>/ig , bodyStr2 ) ;
    console.log ( "bodyStr2:" , bodyStr2 ) ;

    let resData4 = resData3.placeHolderToToken ( "global" ) ;
    console.log ( "resData4:" , resData4  ) ;

    return resData4 ;
    
} ;


let cpJs = 
{

    init : function ( putPath , injSrcStr , globPgp , baseUrl ) 
    {
         nodeCommonLib.init ( baseUrl ) ;
        // putPath.inputDir = putPath.inputUri.getDirFileFromUri ().dir ;
        // let inputUri = putPath.inputUri ;
       



        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' 
                + globPgp.regPattAry.join ( "," ) 
                + '}' 
                ,
 
                { 
 
                    "cwd" : globPgp.cwd ? globPgp.cwd : "./" , 
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

                    let readStreamAry = fileList.getReadStreamAry ( ) ;
                    
                    

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( srcDataStr )
                            {
                                let $this = this ;
                                let $thisPath = this.path ;
                                console.log ( "this.path:" , this.path ) ;

                                let outputDir = putPath.outputDir ? putPath.outputDir : this.path.getDirFileFromUri ().dir ;
         
                                let outputUri =  this.path.getOutputUri ( outputDir ) ;
                                console.log ( "outputUri：" , outputUri ) ;

                                outputUri.validDesDirFileFromUri ( outputDir ) ;

                                
                                let resDataStr = 
                                this.path.validSrcFileFromUri ().ext 
                                ? 
                                ( 
                                    this.path.validSrcFileFromUri ().ext.match ( /(?:.htm|.html)/ig ) 
                                    ?
                                    getResHTMLStr ( srcDataStr , injSrcStr ) 
                                    :
                            
                                    this.path.validSrcFileFromUri ().ext.match ( /(?:.less|.sass|.scss)/ig ) 
                                    ?
                                    getResLessSassStr
                                    (
                                        srcDataStr 
                                    )
                                    :
                                    getResJsStr2 ( srcDataStr )
                                )
                                : 
                                null ;
                                console.log ( "resDataStr:" , resDataStr ) ;

                              

                                let writerStream = fs.createWriteStream 
                                ( 
                                    outputUri
                                ) ;
                                console.log ( "writerStream:" , writerStream ) ;        
                                writerStream.write 
                                ( 
                                    resDataStr , 
                                    "utf-8" 
                                ) ;
                                writerStream.end () ;
                                writerStream.on
                                (
                                    "finish" ,
                                    function ()
                                    {
                                        console.log ( "finish" ) ;
                                    }
                                ) ;
                                fs.unwatchFile
                                (
                                    $thisPath , 
                                    function ( a , b , c )
                                    {
                                        console.log ( "watcha:" , a ) ;
                                        console.log ( "watchb:" , b ) ;
                                        console.log ( "watchc:" , c ) ;
                                    }
                                ) ;
                                
                                fs.watch 
                                ( 
                                    $thisPath , 
                                    function ( a , b , c ) 
                                    {
                                        console.log ( "$thisPath:" , $thisPath ) ;
                                        
                                        globPgp = {
                                            "cwd" : "./" ,
                                            "regPattAry" : [ $thisPath , "" ]
                                        } ;
                                        
                                        cpJs.init 
                                        ( putPath , injSrcStr , globPgp , baseUrl )  ;
                                        let st01 = setTimeout 
                                        (
                                            function ()
                                            {

                                            } ,
                                            0
                                        ) ;
                                        clearTimeout ( st01 ) ;
                                        

                                        
                                    } 
                                ) ;
                                

                            }
                            
                        ) ;
                    } ;
 
                    return fileList ;
                }    
            ) 
            
        ) ;
        promiseA01.then
        (
            function ( srcDataStr )
            {
                // console.log ( "arg0:" , arg0 ) ;
                // console.log ( "Function.prototype.fileList:", Function.prototype.fileList ) ;
                
                
            } ,
            function ( reject )
            {
                // console.log ( "reject:" , reject ) ;
            }
        ) ;
        
        

    } 
} ;

module.exports = cpJs ;
