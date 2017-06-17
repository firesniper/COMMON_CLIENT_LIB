let fs = require ( "fs" ) ;

let node_common_lib = 
{
    init : function ( baseUrl )
    {
        console.log ( "baseUrl:" , baseUrl ) ;
        Object.defineProperties
        (
            String.prototype ,
            {
                "getDirFileFromUri" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice ( arguments ) ;
                        let $this = this ;
                        return {
                            dir : $this.slice ( 0 , $this.lastIndexOf ( "/" ) ) ,
                            file : $this.slice 
                            ( 
                                $this.lastIndexOf ( "/" ) , 
                                $this.lastIndexOf ( "." ) 
                            ) ,
                            ext : $this.slice
                            (
                                $this.lastIndexOf ( "." ) 
                            )
                        } ;
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
                "toTagRegStrPg" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let res = $this.match( /(?: |all)/ig ) ? 
                        { 
                            wrapAndContent : ".*" ,
                            wrap : ""
                        }  : 
                        { 
                            wrapAndContent : new RegExp 
                            ( 
                                "<" + $this + ".*>.*<\\/" + $this + ">" ,
                                "ig"
                            ) ,
                            wrap : new RegExp 
                            ( 
                                "(?:<" + $this + ">|<\\/" + $this + ">)" , 
                                "ig"
                            )
                        } ;
                        return res ;
                    }
                } 
                ,
                "contentWrap" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode )
                    {
                        let parentNodeDef = "all" ;
                        parentNode = parentNode && this.indexOf ( "<" + parentNode ) > -1 ? parentNode : parentNodeDef ;
                        console.log ( "parentNode:" , parentNode ) ;
                        let parentTagRegStrPg = parentNode.toTagRegStrPg () ;
                        console.log ( "parentTagRegStrPg:" , parentTagRegStrPg ) ;
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        console.log ( "%this:" ,  this ) ;
                        if (  $this.constructor.name != "String" )
                        { 
                            throw new TypeError ( "isn't String type" ) ; 
                            // return ;
                        } ;
                        // $this = $this.caseQuote () ;
                        let allDomStr = $this.tokenToPlaceHolder ( parentNode ) ;
                        console.log ( "allDomStr:" , allDomStr ) ;
                        console.log ( "parentTagRegStrPg.wrapAndContent:" , parentTagRegStrPg.wrapAndContent ) ;
                        let partDomStr = allDomStr.match 
                        ( 
                              parentTagRegStrPg.wrapAndContent  
                        ) ;
                        console.log ( "partDomStr:" , partDomStr ) ;

                        let parentWrapAry = partDomStr[ 0 ].match 
                        (  parentTagRegStrPg.wrap ) ;
                        console.log ( "parentWrapAry:" ,  parentWrapAry ) ;

                        let domContentStr = partDomStr[ 0 ]
                        .replace 
                        (  
                             parentTagRegStrPg.wrap != /(?:)/ig ?
                             parentTagRegStrPg.wrap : "" 
                            , 
                            "" 
                        )
                        // .rSpace_aNl ( ) ;
                        // console.log ( "domContentStr:" , domContentStr ) ;
                        console.log ( "domContentStr:" , domContentStr ) ;
                        // let partDomStr3 = domContentStr.split ( "\n" ) ; 
                        let domContentStr2 = domContentStr.placeHolderToToken ( parentNode ) ;
                        console.log ( "domContentStr2:" , domContentStr2 ) ;
                        let domContentAry = domContentStr2.split ( "\n" ) ; 
                        let nonNullAry = domContentAry.hasNullPointer().content ;
                        console.log ( "nonNullAry:" , nonNullAry ) ;
                        return { 
                            "partDomStr" : partDomStr[ 0 ] ,
                            "contentAry" : nonNullAry ,
                            "parentWrapAry" : parentWrapAry
                        } ;
                    } 
                } ,
                "placeHolderTokenMap" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : {
                        "all" : {} ,
                        "headReg" :
                            {
                            "$PH_n_r"  :   [ /(?:\n|\r)/ig , "\n" ] ,
                            "$PH_t"    :   [ /(?:\t\|\x09|\cI|\v)/ig , "\t" ] ,
                            "$PH_space":   [ /(?: )/ig , " " ] 
                        }
                        ,
                        "bodyReg" : {
                            "$PH_url"  :   [ 
                                /(?:url\(.*\:\d+\/)/ig , 
                                "url(" + baseUrl + "\/" 
                                ] 
                                ,
                            "$PH_src"  :   [ 
                                /(?:src.*=.*(?:'|").*\:\d+\/)/ig , 
                                'src = "' + baseUrl + "\/" 
                                ]
                        }
                        

                    } 
                } ,
                "placeHolderTokenMapFn" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let PHTMap = 
                        {
                            "all" : {} ,
                            "headReg" :
                            {
                                "$PH_n_r"  :   [ /(?:\n|\r)/ig , "\n" ] ,
                                "$PH_t"    :   [ /(?:\t\|\x09|\cI|\v)/ig , "\t" ] ,
                                "$PH_space":   [ /(?: )/ig , " " ] 
                            }
                            ,
                            "bodyReg" : 
                            {
                                "$PH_url"  :   
                                [ 
                                    /(?:url\(.*\:\d+\/)/ig , 
                                    "url(" + baseUrl + "\/" 
                                ] 
                                ,
                                "$PH_src"  :   
                                [ 
                                    /(?:src.*=.*(?:'|").*\:\d+\/)/ig , 
                                    'src = "' + baseUrl + "\/" 
                                ]
                            }
                            
                        } ;
                        console.log ( "PHTMap:" , PHTMap ) ;
                        // phtm.all = {} ;
                        /*for ( let ele in phtm ) 
                        {
                            Object.keys ( phtm ) ;
                        } ;*/
                        let newPgp = {} ;
                        for 
                        ( 
                            let i = 0 , mapKeys = Object.keys ( PHTMap ) ; 
                            i < mapKeys.length ; 
                            i ++ 
                        )
                        {
                            newPgp = Object.assign ( newPgp , PHTMap[ mapKeys[ i ] ] ) ;
                        } ;
                        PHTMap.all = newPgp ;
                        console.log ( "all:" , PHTMap ) ;
                        return PHTMap ;
                    }  
                } ,
                "tokenToPlaceHolder" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode , phTokenMap )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = args[ 1 ] ? args[ 1 ] : this ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : String.prototype.placeHolderTokenMapFn()[ parentNode + "Reg" ] ;
                        console.log ( "phTokenMap:" , phTokenMap ) ;
                        let resTkToPh = $this ;
                        for ( let ele in phTokenMap )
                        {
                            resTkToPh = resTkToPh.replace 
                            ( 
                                phTokenMap[ ele ][ 0 ] , 
                                ele  
                            ) ;
                        } ;
                                /*resTkToPh = resTkToPh.replace ( /(?:\n|\r)/ig , "$PH_n_r" )
                                .replace ( /(?:\t\|\x09|\cI|\v)/ig , "$PH_t" ) 
                                .replace ( /(?: )/ig , "$PH_space" ) */
                                /*.match ( /[^\f\n\r\t\v]/ig )
                                .join ( "" ) ; */
                        console.log ( "resTkToPh:" , resTkToPh ) ;
                        return resTkToPh.match ( /[^\f\n\r\t\v]/ig ).join ( "" ) ;        
                    }
                } ,
                "placeHolderToToken" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode , phTokenMap )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        // console.log ( "this:" , this ) ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : String.prototype.placeHolderTokenMapFn()[ parentNode + "Reg" ] ;
                        let phRes = $this ;
                        console.log ( "phTokenMap:" , phTokenMap ) ;
                        for ( let ele in phTokenMap )
                        {
                            phRes = phRes.replace 
                            ( 
                                new RegExp ( "(?:\\" + ele + ")" , "ig" ) , 
                                phTokenMap[ ele ][ 1 ] 
                            ) ;
                        } ;
                        // phRes = $this.replace ( new RegExp ( "(?:\\$PH_n_r\\$){1,}"  ) , "\n" ) ;
                        console.log ( "phRes:" , phRes ) ;
                        return phRes ;
                        
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
                "unique" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        return Array.from 
                            ( new Set ( this ) ) ;
                    }
                } ,
                "unique2" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        var json = {} ;
                        var result = [] ;
                        this.forEach
                        (
                            function ( value )
                            {
                                var type = Object.prototype.toString
                                .call ( value ).match ( /\s(\w+)/ )[ 1 ]
                                .toLowerCase () ;
                                if ( !( ( type + '-' + value ) in json ) )
                                {
                                    json[ type + '-' + value ] = true ; 
                                    result.push ( value ) ;
                                } ;
                            }
                        )
                        return result;
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
                } ,
                "insertEle" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( index , val )
                    {
                        let arts = Array.prototype.slice.call ( argumets ) ;
                        let $this = this ;
                        let ary1 = $this.slice ( 0 , index ) ;
                        let ary2 = $this.slice ( index ) ;
                        let ary3 = ary1.push ( val ) ; 
                        return ary3.concat ( ary2 ) ; 
                    } 
                } ,
            }
            
        ) ;

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
                } ,
                "countOf" : {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( token )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let tokenCount = 0 ;
                        for ( let i = 0 ; i < $this.length ; i ++ ) 
                        {
                            if ( $this[ i ] === token )
                            {
                                tokenCount ++ ;
                            } ;
                        } ;
                        
                        return tokenCount ;
                    } 
                } ,
                "indexOfBackNum" : {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( token , num )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let $thisAry = $this.split ( "" ) ;
                        let indexCount = 0 ;
                        let $thisStr1 = $this ;
                        for ( let i = 0 ; i < $this.countOf ( "." ) ; i ++ ) 
                        {
                            ++ indexCount  ;
                            if ( indexCount >= num ) break ;
                            $thisStr1 = $thisStr1.slice ( 0 , $thisStr1.lastIndexOf ( "." ) ) ;
                            
                        } ;
                        let resIndex = $thisStr1.lastIndexOf ( token ) ;
                        return resIndex ;
                    } 
                } ,
                "reglation1" : {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( repStr )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let $this = this ;
                        let str1 = $this.slice ( $this.lastIndexOf ( "." ) ) ;
                        /*$this = str1 == ".html" ? 
                                $this : 
                                str1 == ".htm" ? 
                                $this.replace ( new RegExp ( str1 + "$" ) , ".html" )
                                : null ;*/
                        let str2 = $this.slice ( $this.indexOfBackNum ( "." , 2 ) ) ;
                        let resStr = $this.replace 
                        ( 
                            new RegExp ( str2 + "$" ) , 
                            str1 == ".htm" ? ".html" : str1
                        ) ;
                        return resStr ;
                    } 
                }
            }
        ) ; 

    }
     
} ;


module.exports = node_common_lib ;
