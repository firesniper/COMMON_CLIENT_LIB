let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;

let nodeCommonLib = require ( "./node_common_lib/node_common_lib.js" ) ;
// console.log ( "nodeCommonLib:" , nodeCommonLib ) ;
nodeCommonLib.init () ;
// console.log ( "global:" , global.fs ) ;


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

    init : function ( putPath , sourceStrB1 , globPg ) 
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

        let inputUri = putPath.inputUri ;
        let outputUri = putPath.outputUri ;

        let outputDir = outputUri.outputDir ? outputUri.outputDir : undefined ;
        let outputFile = outputUri.getDirFileFromUri ().file ;


        // let outputUri = outputDir + outputFile ;
        // let readerStream = fs.createReadStream ( inputUri ) ;
        

        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                /*'{' 
                + [ 
                    // 'public/node_js/*.{htm,html}' ,
                    
                    globPg.regStr  
                    , ""
                ].join ( "," ) 
                + '}' 
                ,*/
                "{public/node_js/!(*.dev*).html,}" 
                , 
                { 
                    // cwd : './' ,
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
                                    // outputDir
                                    this.path.getDirFileFromUri ().dir  
                                    + this.path.getDirFileFromUri ().file 
                                    + ".dev"
                                    + this.path.getDirFileFromUri ().ext
                                    , 
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
