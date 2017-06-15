let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;
// console.log ( "nodeCommonLib:" , nodeCommonLib ) ;
// nodeCommonLib.init () ;
// console.log ( "global:" , global.fs ) ;


/*let sourceStrA1 = [ 
'<meta charset=\'utf-8\' />',
'<meta  content=\'no-cache\' http-equiv=\'cache-control\' />',
'<meta name=\'viewport\' content=\'width=device-width, height=device-height, user-scalable=no, initial-scale=1.0 ,minimum-scale=1.0,maximum-scale=1.0\' />' 
] ;*/
/*let sourceStrB1 = 
`

` ;*/
console.log ( "begin" ) ;


let cpJs = 
{

    init : function ( putPath , sourceStrB1 , globPg ) 
    {
         

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
                    

                    let getResDataStr = function ( data , readStreamAry , inc )
                    {
                        console.log ( "data:" ,  data ) ;
                        let targetAryA1 = data.contentWrap (  ).contentAry ;
                        console.log ( "targetAryA1:" , targetAryA1 ) ;
                        
                        let sourceDataPg = sourceStrB1.contentWrap (  ) ;
                        console.log ( "sourceDataPg.contentAry:" , sourceDataPg.contentAry ) ;

                        let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPg.contentAry ) ;
                        console.log ( " resDiffAry:" ,  resDiffAry ) ;

                        let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
                        console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

                        let parentWrapAry = sourceDataPg.parentWrapAry ;
                        let headStr4 = ( parentWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + parentWrapAry[ parentWrapAry.length - 1 ] ) ;
                        console.log ( "headStr4:" , headStr4 ) ;
                        let resData = data.tokenToPlaceHolder(  ) ;
                        let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
                        console.log ( "resData2:" , resData2.placeHolderToToken () ) ;
                        
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
                                    resDataStr.placeHolderToToken ()  , 
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

                                fs.watch 
                                ( 
                                    $thisPath , 
                                    function ( a , b ) 
                                    {
                                         

                                        cpJs.init 
                                        ( putPath , sourceStrB1 , globPg )  ;

                                        
                                    } 
                                ) ;
                                /*fs.writeFile 
                                ( 
                                    // outputDir
                                    this.path.getDirFileFromUri ().dir  
                                    + this.path.getDirFileFromUri ().file 
                                    + ".dev"
                                    + this.path.getDirFileFromUri ().ext
                                    , 
                                    // resDataStr.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" )
                                    resDataStr.placeHolderToToken () 
                                    ,
                                    function ( a ) 
                                    {
                                        console.log ( "outputUri:" , outputUri ) ;
                                       
                                    } 
                                ) ;*/
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
