let fs = require ( "fs" ) ;

let node_common_lib = 
{
    init : function ()
    {
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
                        console.log ( "parentWrap:" ,  parentWrap ) ;
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
                        let headStr3 = headStr2.placeHolderToN () ;
                        let headAry = headStr3.split ( "\n" ) ; 
                        let nonNullAry = headAry.hasNullPointer().content ;
                        console.log ( "nonNullAry:" , nonNullAry ) ;
                        return { 
                            "content" : nonNullAry ,
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
                        let res = $this.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" ) ;
                        console.log ( "res:" , res ) ;
                        return res ;
                        
                    }
                }
            }
            
        ) ;
        Object.defineProperties
        (
            Array.prototype ,
            {
                "getReadStreamAry" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let readStreamAry = [] ;
                        for ( let i = 0 ; i < $this.length ; i++ ) 
                        {
                            readStreamAry[ i ] = fs.createReadStream ( $this[ i ] ) ; 
                            readStreamAry[ i ].setEncoding ( "utf-8" ) ;
                        } ;
                        return readStreamAry ;
                    }
                } ,
                "hasNullPointer" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let ary = [] ;
                        let inc = 0 ;
                        let flag = false ;
                        hfA02 : for ( let i = 0 ; i < $this.length ; i++ )
                        {
                            if 
                            (
                                $this[ i ] == null || 
                                $this[ i ] == undefined || 
                                $this[ i ] == ""
                            )
                            {
                                flag = true ;
                                continue hfA02 ;
                            }
                            else 
                            {
                                
                                ary[ inc ] = $this[ i ] ;
                                ++inc ;
                            } ;
                            
                        } ;
                        console.log ( "ary:" , ary ) ;
                        return { 
                            flag : flag ,
                            content : ary 
                        } ;
                    }
                } ,
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

                                if 
                                ( 
                                    bAry[ be ].caseQuote () == $this[ ce ].caseQuote () 
                                )
                                { 
                                    continue hfA01 ; 
                                }
                                else if 
                                ( 
                                    ce == $this.length - 1 && 
                                    !ary.hasSamePointerInAry ( bAry[ be ] ) 
                                )
                                { 
                                    
                                    ary[ inc ] = bAry[ be ] ; 
                                    ++inc ;
                                } ;
                            } ;
                            
                        } ;
                        return ary ;
                    }
                }
            }
            
        ) ;
    }
     
} ;


module.exports = node_common_lib ;