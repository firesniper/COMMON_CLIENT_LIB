let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;

console.log ( "begin" ) ;


let cpJs = 
{

    init : function ( putPath , sourceStrB1 , globPg , baseUrl ) 
    {
         nodeCommonLib.init ( baseUrl ) ;
        // putPath.inputDir = putPath.inputUri.getDirFileFromUri ().dir ;
        // let inputUri = putPath.inputUri ;
       

        let outputDir = putPath.outputDir ? putPath.outputDir : undefined ;
         
        if ( outputDir )
        {
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
        } ;

        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' 
                + globPg.regAry.join ( "," ) 
                + '}' 
                ,
 
                { 
 
                    "cwd" : globPg.cwd , 
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
                    
                    

                    

                    let getResDataStr = function ( data , readStreamAry , inc )
                    {
                        console.log ( "data:" ,  data ) ;
                        let targetAryA1 = data.contentWrap ( "head" ).contentAry ;
                        console.log ( "targetAryA1:" , targetAryA1 ) ;
                        
                        let sourceDataPg = sourceStrB1.contentWrap ( "head" ) ;
                        console.log ( "sourceDataPg.contentAry:" , sourceDataPg.contentAry ) ;

                        let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPg.contentAry ) ;
                        console.log ( " resDiffAry:" ,  resDiffAry ) ;

                        let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
                        console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

                        let parentWrapAry = sourceDataPg.parentWrapAry ;
                        let headStr4 = ( parentWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + parentWrapAry[ parentWrapAry.length - 1 ] ) ;
                        console.log ( "headStr4:" , headStr4 ) ;
                        
                        let resData = data.tokenToPlaceHolder( "head" ) ;
                        console.log ( "resData:" , resData ) ;
                        let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
                        console.log ( "resData2:" , resData2.placeHolderToToken ( "head" ) ) ;
                        let resData3 = resData2.placeHolderToToken ( "head" ) ;
                        console.log ( "resData3:" , resData3.placeHolderToToken ( "head" ) ) ;
                        
                        /*if ( data.indexOf ( "<body" ) > -1 )
                        {
                            let bodyStr = data.tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
                            console.log ( "bodyStr:" , bodyStr ) ;

                            // let bodyStr2 = bodyStr.tokenToPlaceHolder () ;
                            let bodyStr3 = bodyStr[ 0 ].placeHolderToToken () ;
                            console.log ( "bodyStr3:" , bodyStr3 ) ;
                        } ;*/
                        let bodyStr = data.contentWrap ( "body" ).partDomStr ;
                        let bodyStr2 = bodyStr.placeHolderToToken ( "body" ) ;

                        console.log ( "bodyStr2:" , bodyStr2 ) ;
                        
                        return resData3 ;
                        
                    } ;

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( arg0 , readStreamAry , inc )
                            {
                                let thisComUri = 
                                (
                                    this.path.getDirFileFromUri ().dir  
                                    + this.path.getDirFileFromUri ().file 
                                    // + ".dev"
                                    + this.path.getDirFileFromUri ().ext
                                ).reglation1 ( "" )  ;
                                console.log ( "thisComUri：" , thisComUri ) ;
                                let $this = this ;
                                let $thisPath = this.path ;
                                console.log ( "this.path:" , this.path ) ;
                                let resDataStr = getResDataStr ( arg0 , readStreamAry , inc ) ;
                                let writerStream = fs.createWriteStream 
                                ( 
                                    thisComUri
                                ) ;
                                        
                                writerStream.write 
                                ( 
                                    resDataStr , 
                                    "utf8" 
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
                                        
                                        globPg = {
                                            "cwd" : "./" ,
                                            "regAry" : [ $thisPath , "" ]
                                        } ;
                                        
                                                cpJs.init 
                                                ( putPath , sourceStrB1 , globPg )  ;
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
            function ( arg0 )
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
