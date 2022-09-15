// Source: core.lisp  
// Build Time: 2022-09-15 11:34:23
// Version: 2022.09.15.11.34
export const DLISP_ENV_VERSION='2022.09.15.11.34';




var { get_next_environment_id, check_true, get_outside_global, subtype, lisp_writer, clone, LispSyntaxError } = await import("./lisp_writer.js");
export async function environment_boot(Environment)  {
{
    await Environment.set_global("defmacro",async function(name,arg_list,...body) {
        let macro_name;
        let macro_args;
        let macro_body;
        let source_details;
        macro_name=name;
        macro_args=arg_list;
        macro_body=body;
        source_details={
            eval_when:{
                compile_time:true
            },name:await (async function(){
                if (check_true (await (await Environment.get_global("starts_with?"))("=:",name))){
                    return await name["substr"].call(name,2)
                } else {
                    return name
                }
            })(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args)
        };
        {
            return ["=:defglobal",macro_name,["=:fn",macro_args,].concat(macro_body),["=:quote",source_details]]
        }
    },{
        eval_when:{
            compile_time:true
        },description:"simple defmacro for bootstrapping and is replaced by the more sophisticated form.",requires:["starts_with?","as_lisp"]
    });
    await Environment.set_global("read_lisp",(await Environment.get_global("reader")),{
        requires:["reader"]
    });
    await Environment.set_global("desym",async function(val) {
        let strip;
        strip=async function(v) {
            return (""+ await (await Environment.get_global("as_lisp"))(v))
        };
        return await async function(){
            if (check_true ((val instanceof String || typeof val==='string'))) {
                return await strip(val)
            } else if (check_true ((val instanceof Array))) {
                return await (async function() {
                    let __for_body__3=async function(v) {
                        return await strip(v)
                    };
                    let __array__4=[],__elements__2=val;
                    let __BREAK__FLAG__=false;
                    for(let __iter__1 in __elements__2) {
                        __array__4.push(await __for_body__3(__elements__2[__iter__1]));
                        if(__BREAK__FLAG__) {
                             __array__4.pop();
                            break;
                            
                        }
                    }return __array__4;
                     
                })()
            } else {
                return val
            }
        } ()
    },{ "eval_when":{ "compile_time":true
},"name":"desym","macro":true,"fn_args":"(val)","description":"Given a value or arrays of values, return the provided symbol in it's literal, quoted form, e.g. (desym myval) => \"myval\"","usage":["val:string|array"],"tags":["symbol","reference","literal","desymbolize","dereference","deref","desym_ref"],"requires":["as_lisp","is_string?","is_array?"]
});
await Environment.set_global("desym_ref",async function(val) {
    return ["=:+","",["=:as_lisp",val]]
},{ "eval_when":{ "compile_time":true
},"name":"desym_ref","macro":true,"fn_args":"(val)","description":["=:+","Given a value will return the a string containing the desymbolized value or values. ","Example: <br>","(defglobal myvar \"foo\")<br>","(defglobal myarr [ (quote myvar) ])<br>","(desym_ref myarr) => (myvar)<br>","(desym_ref myarr.0) => myvar<br>","(subtype (desym_ref myarr.0)) => \"String\""],"usage":["val:*"],"tags":["symbol","reference","syntax","dereference","desym","desym_ref"]
});
await Environment.set_global("deref",async function(val) {
    return ["=:let",[["=:mval",val]],["=:if",["=:and",["=:is_string?","=:mval"],["=:starts_with?","=:","=:mval"]],["=:->","=:mval","substr",2],"=:mval"]]
},{ "eval_when":{ "compile_time":true
},"name":"deref","macro":true,"fn_args":"(val)","description":["=:+","If the value that the symbol references is a binding value, aka starting with '=:', then return the symbol value ","instead of the value that is referenced by the symbol. This is useful in macros where a value in a form is ","to be used for it's symbolic name vs. it's referenced value, which may be undefined if the symbol being ","de-referenced is not bound to any value. <br>","Example:<br>","Dereference the symbolic value being held in array element 0:<br>","(defglobal myvar \"foo\")<br>","(defglobal myarr [ (quote myvar) ])<br>","(deref my_array.0) => \"my_var\"<br>","(deref my_array) => [ \"=:my_var\" ]<br>","<br>In the last example, the input to deref isn't a string and so it returns the value as is.  See also desym_ref."],"tags":["symbol","reference","syntax","dereference","desym","desym_ref"],"usage":["symbol:string"]
});
await Environment.set_global("when",async function(condition,...mbody) {
    return ["=:if",condition,["=:do",].concat(mbody)]
},{ "eval_when":{ "compile_time":true
},"name":"when","macro":true,"fn_args":"(condition \"&\" mbody)","description":["=:+","Similar to if, but the body forms are evaluated in an implicit progn, if the condition form or expression is true. ","The function when will return the last form value.  There is no evaluation of the body if the conditional expression ","is false."],"usage":["condition:*","body:*"],"tags":["if","condition","logic","true","progn","conditional"]
});
await Environment.set_global("if_compile_time_defined",async function(quoted_symbol,exists_form,not_exists_form) {
    if (check_true (await (await Environment.get_global("describe"))(quoted_symbol))){
        return exists_form
    } else {
        return (not_exists_form|| [])
    }
},{ "eval_when":{ "compile_time":true
},"name":"if_compile_time_defined","macro":true,"fn_args":"(quoted_symbol exists_form not_exists_form)","description":"If the provided quoted symbol is a defined symbol at compilation time, the exists_form will be compiled, otherwise the not_exists_form will be compiled.","tags":["compile","defined","global","symbol","reference"],"usage":["quoted_symbol:string","exists_form:*","not_exists_form:*"],"requires":["describe"]
});
await Environment.set_global("defexternal",async function(name,value) {
    return ["=:let",[["=:symname",["=:desym",].concat(name)]],["=:do",["=:set_prop","=:globalThis","=:symname",value],["=:prop","=:globalThis","=:symname"]]]
},{ "eval_when":{ "compile_time":true
},"name":"defexternal","macro":true,"fn_args":"(name value)","description":"Given a name and a value, defexternal will add a globalThis property with the symbol name thereby creating a global variable in the javascript environment.","tags":["global","javascript","globalThis","value"],"usage":["name:string","value:*"]
});
await Environment.set_global("defun",async function(name,args,body,meta) {
    let fn_name;
    let fn_args;
    let fn_body;
    let source_details;
    fn_name=name;
    fn_args=args;
    fn_body=body;
    source_details=await (await Environment.get_global("add"))({
        name:await (async function(){
             return await (await Environment.get_global("unquotify"))(name) 
        })(),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function(){
        if (check_true (meta)){
            return meta
        } else {
            return new Object()
        }
    })());
    return ["=:do",["=:defglobal",fn_name,["=:fn",fn_args,fn_body],["=:quote",source_details]]]
},{ "eval_when":{ "compile_time":true
},"name":"defun","macro":true,"fn_args":"(name args body meta)","requires":["add","unquotify","as_lisp"]
});
await Environment.set_global("defun_sync",async function(name,args,body,meta) {
    let fn_name;
    let fn_args;
    let fn_body;
    let source_details;
    fn_name=name;
    fn_args=args;
    fn_body=body;
    source_details=await (await Environment.get_global("add"))({
        name:await (async function(){
             return await (await Environment.get_global("unquotify"))(name) 
        })(),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function(){
        if (check_true (meta)){
            return meta
        } else {
            return new Object()
        }
    })());
    return ["=:do",["=:defglobal",fn_name,["=:function",fn_args,fn_body],["=:quote",source_details]]]
},{ "eval_when":{ "compile_time":true
},"name":"defun_sync","macro":true,"fn_args":"(name args body meta)","description":["=:+","Creates a top level synchronous function as opposed to the default via defun, which creates an asynchronous top level function.","Doesn't support destructuring bind in the lambda list (args). ","Given a name, an argument list, a body and symbol metadata, will establish a top level synchronous function.  If the name is ","fully qualified, the function will be compiled in the current namespace (and it's lexical environment) and placed in the ","specified namespace."],"usage":["name:string","args:array","body:*","meta:object"],"tags":["define","function","synchronous","toplevel"],"requires":["add","unquotify","as_lisp"]
});
await Environment.set_global("macroexpand",async function(quoted_form) {
    let macro_name;
    let working_env;
    let macro_func;
    let expansion;
    macro_name=await (quoted_form && quoted_form["0"])["substr"].call((quoted_form && quoted_form["0"]),2);
    working_env=await Environment["get_namespace_handle"].call(Environment,await (await Environment.get_global("current_namespace"))());
    macro_func=await working_env["get_global"].call(working_env,macro_name);
    expansion=await (async function(){
        if (check_true ((macro_func instanceof Function&& await (await Environment.get_global("resolve_path"))(await (async function(){
            let __array_op_rval__5=macro_name;
             if (__array_op_rval__5 instanceof Function){
                return await __array_op_rval__5("eval_when","compile_time") 
            } else {
                return [__array_op_rval__5,"eval_when","compile_time"]
            }
        })(),(working_env && working_env["definitions"]))))){
            return await (async function(){
                let __apply_args__6=await (async function(){
                     return await quoted_form["slice"].call(quoted_form,1) 
                })();
                return ( macro_func).apply(this,__apply_args__6)
            })()
        } else {
            return quoted_form
        }
    })();
    return expansion
},{ "name":"macroexpand","fn_args":"(quoted_form)","description":"Given a quoted form, will perform the macro expansion and return the expanded form.","usage":["quoted_form:*"],"tags":["macro","expansion","debug","compile","compilation"],"requires":["current_namespace","is_function?","resolve_path"]
});
await Environment.set_global("macroexpand_nq",async function(form) {
    let macro_name;
    let macro_func;
    let expansion;
    macro_name=await (async function() {
        {
             let __call_target__=form[0], __call_method__="substr";
            return await __call_target__[__call_method__].call(__call_target__,2)
        } 
    })();
    macro_func=await Environment["get_global"].call(Environment,macro_name);
    expansion=await (async function(){
        if (check_true (macro_func instanceof Function)){
            return await (async function(){
                let __apply_args__8=await (async function(){
                     return await form["slice"].call(form,1) 
                })();
                return ( macro_func).apply(this,__apply_args__8)
            })()
        } else {
            return form
        }
    })();
    return ["=:quote",expansion]
},{ "eval_when":{ "compile_time":true
},"name":"macroexpand_nq","macro":true,"fn_args":"(form)","description":"[Deprecated] - use macroexpand.  The nq form takes a non quoted form and returns the expansion. Used primarily during early development.","usage":["form:*"],"tags":["macro","deprecated","expansion","debug","compile","compilation"],"deprecated":true,"requires":["is_function?"]
});
await Environment.set_global("check_type",async function(thing,type_name,error_string) {
    if (check_true (error_string)){
        return ["=:if",["=:not",["=:==",["=:sub_type",thing],type_name]],["=:throw","=:TypeError",error_string]]
    } else {
        return ["=:if",["=:not",["=:==",["=:sub_type",thing],type_name]],["=:throw","=:TypeError",["=:+","invalid type: required ",type_name," but got ",["=:sub_type",thing]]]]
    }
},{ "eval_when":{ "compile_time":true
},"name":"check_type","macro":true,"fn_args":"(thing type_name error_string)","description":"If the type of thing (ascertained by sub_type) are not of the type type_name, will throw a TypeError with the optional error_string as the error message.","usage":["thing:*","type_name:string","error_string:string"],"tags":["types","validation","type","assert"]
});
{
     Environment.set_global("get_object_path",function(refname) {
        if (check_true ((( refname["indexOf"].call(refname,".")>-1)|| ( refname["indexOf"].call(refname,"[")>-1)))){
            {
                let chars;
                let comps;
                let mode;
                let name_acc;
                chars=(refname).split("");
                comps=[];
                mode=0;
                name_acc=[];
                 ( function() {
                    let __for_body__12=function(c) {
                        return   (function(){
                            if (check_true (((c===".")&& (mode===0)))) {
                                {
                                    if (check_true (((name_acc && name_acc.length)>0))){
                                        {
                                            (comps).push((name_acc).join(""))
                                        }
                                    };
                                    return name_acc=[]
                                }
                            } else if (check_true (((mode===0)&& (c==="[")))) {
                                {
                                    mode=1;
                                    if (check_true (((name_acc && name_acc.length)>0))){
                                        {
                                            (comps).push((name_acc).join(""))
                                        }
                                    };
                                    return name_acc=[]
                                }
                            } else if (check_true (((mode===1)&& (c==="]")))) {
                                {
                                    mode=0;
                                    (comps).push((name_acc).join(""));
                                    return name_acc=[]
                                }
                            } else {
                                return (name_acc).push(c)
                            }
                        } )()
                    };
                    let __array__13=[],__elements__11=chars;
                    let __BREAK__FLAG__=false;
                    for(let __iter__10 in __elements__11) {
                        __array__13.push( __for_body__12(__elements__11[__iter__10]));
                        if(__BREAK__FLAG__) {
                             __array__13.pop();
                            break;
                            
                        }
                    }return __array__13;
                     
                })();
                if (check_true (((name_acc && name_acc.length)>0))){
                    (comps).push((name_acc).join(""))
                };
                return comps
            }
        } else {
            return  ( function(){
                let __array_op_rval__14=refname;
                 if (__array_op_rval__14 instanceof Function){
                    return  __array_op_rval__14() 
                } else {
                    return [__array_op_rval__14]
                }
            })()
        }
    },{ "name":"get_object_path","fn_args":"(refname)","description":"get_object_path is used by the compiler to take a string based notation in the form of p[a][b] or p.a.b and returns an array of the components.","tags":["compiler"],"usage":["refname:string"],"requires":["split_by","push","join"]
})
};
await Environment.set_global("do_deferred_splice",async function(tree) {
    let rval;
    let idx;
    let tval;
    let deferred_operator;
    rval=null;
    idx=0;
    tval=null;
    deferred_operator=(["=","$","&","!"]).join("");
    return await async function(){
        if (check_true ((tree instanceof Array))) {
            {
                rval=[];
                await (async function(){
                     let __test_condition__15=async function() {
                        return (idx<(tree && tree.length))
                    };
                    let __body_ref__16=async function() {
                        tval=tree[idx];
                        if (check_true ((tval===deferred_operator))){
                            {
                                idx+=1;
                                tval=tree[idx];
                                rval=await rval["concat"].call(rval,await (async function(){
                                     return await do_deferred_splice(tval) 
                                })())
                            }
                        } else {
                            (rval).push(await (async function(){
                                 return await do_deferred_splice(tval) 
                            })())
                        };
                        return idx+=1
                    };
                    let __BREAK__FLAG__=false;
                    while(await __test_condition__15()) {
                        await __body_ref__16();
                         if(__BREAK__FLAG__) {
                             break;
                            
                        }
                    } ;
                    
                })();
                return rval
            }
        } else if (check_true ((tree instanceof Object))) {
            {
                rval=new Object();
                await (async function() {
                    let __for_body__19=async function(pset) {
                        return await async function(){
                            rval[(pset && pset["0"])]=await (async function(){
                                 return await do_deferred_splice((pset && pset["1"])) 
                            })();
                            return rval;
                            
                        }()
                    };
                    let __array__20=[],__elements__18=await (await Environment.get_global("pairs"))(tree);
                    let __BREAK__FLAG__=false;
                    for(let __iter__17 in __elements__18) {
                        __array__20.push(await __for_body__19(__elements__18[__iter__17]));
                        if(__BREAK__FLAG__) {
                             __array__20.pop();
                            break;
                            
                        }
                    }return __array__20;
                     
                })();
                return rval
            }
        } else {
            return tree
        }
    } ()
},{ "name":"do_deferred_splice","fn_args":"(tree)","description":"Internally used by the compiler to facilitate splice operations on arrays.","usage":["tree:*"],"tags":["compiler","build"],"requires":["join","is_array?","push","is_object?","pairs"]
});
await Environment.set_global("define",async function(...defs) {
    let acc;
    let symname;
    acc=await (async function(){
         return ["=:progl"] 
    })();
    symname=null;
    await (async function() {
        let __for_body__24=async function(defset) {
            (acc).push(await (async function(){
                 return ["=:defvar",(defset && defset["0"]),(defset && defset["1"])] 
            })());
            symname=(defset && defset["0"]);
            (acc).push(await (async function(){
                 return ["=:set_prop",await (async function(){
                     return "=:Environment.global_ctx.scope" 
                })(),(""+ await (await Environment.get_global("as_lisp"))(symname)),symname] 
            })());
            if (check_true (((defset && defset["2"]) instanceof Object))){
                {
                    return (acc).push(await (async function(){
                         return [["=:set_prop",await (async function(){
                             return "=:Environment.definitions" 
                        })(),(""+ await (await Environment.get_global("as_lisp"))(symname)+ ""),(defset && defset["2"])]] 
                    })())
                }
            }
        };
        let __array__25=[],__elements__23=defs;
        let __BREAK__FLAG__=false;
        for(let __iter__22 in __elements__23) {
            __array__25.push(await __for_body__24(__elements__23[__iter__22]));
            if(__BREAK__FLAG__) {
                 __array__25.pop();
                break;
                
            }
        }return __array__25;
         
    })();
    return acc
},{ "eval_when":{ "compile_time":true
},"name":"define","macro":true,"fn_args":"(\"&\" defs)","usage":["declaration:array","declaration:array*"],"description":["=:+","Given 1 or more declarations in the form of (symbol value ?metadata), ","creates a symbol in global scope referencing the provided value.  If a ","metadata object is provided, this is stored as a the symbol's metadata."],"tags":["symbol","reference","definition","metadata","environment"],"requires":["push","as_lisp","is_object?"]
});
await Environment.set_global("defbinding",async function(...args) {
    let binding;
    let acc;
    binding=null;
    acc=await (async function(){
         return ["=:list"] 
    })();
    await (async function() {
        let __for_body__28=async function(bind_set) {
            return await async function(){
                if (check_true (((bind_set instanceof Array)&& (((bind_set && bind_set.length)===2)|| ((bind_set && bind_set.length)===3))&& ((bind_set && bind_set["1"]) instanceof Array)&& ((bind_set && bind_set["1"] && bind_set["1"]["length"])===2)))) {
                    {
                        binding=await (async function(){
                             return ["=:quotel",await (async function(){
                                 return ["=:bind",(bind_set && bind_set["1"] && bind_set["1"]["0"]),(bind_set && bind_set["1"] && bind_set["1"]["1"])] 
                            })()] 
                        })();
                        return (acc).push(await (async function(){
                             return ["=:defglobal",((await Environment.get_global("*namespace*"))+ "/"+ await (async function(){
                                let mval;
                                mval=(bind_set && bind_set["0"]);
                                if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                                    return await mval["substr"].call(mval,2)
                                } else {
                                    return mval
                                }
                            })()),await (async function(){
                                 return ["=:bind",(bind_set && bind_set["1"] && bind_set["1"]["0"]),(bind_set && bind_set["1"] && bind_set["1"]["1"])] 
                            })(),await (async function(){
                                if (check_true (((bind_set && bind_set["2"]) instanceof Object))){
                                    return await (await Environment.get_global("add"))(new Object(),(bind_set && bind_set["2"]),{
                                        initializer:binding
                                    })
                                } else {
                                    return {
                                        initializer:binding
                                    }
                                }
                            })()] 
                        })())
                    }
                } else {
                    throw new SyntaxError("defbinding received malform arguments");
                    
                }
            } ()
        };
        let __array__29=[],__elements__27=args;
        let __BREAK__FLAG__=false;
        for(let __iter__26 in __elements__27) {
            __array__29.push(await __for_body__28(__elements__27[__iter__26]));
            if(__BREAK__FLAG__) {
                 __array__29.pop();
                break;
                
            }
        }return __array__29;
         
    })();
    return acc
},{ "eval_when":{ "compile_time":true
},"name":"defbinding","macro":true,"fn_args":"(\"&\" args)","description":["=:+","Defines a global binding to a potentially native function.  This macro ","facilitates the housekeeping by keeping track of the source form ","used (and stored in the environment) so that the save environment ","facility can capture the source bindings and recreate it in the initializer ","function on rehydration.<br>","The macro can take an arbitrary amount of binding arguments, with the form: ","(symbol_name (fn_to_bind_to this))"],"usage":["binding_set0:array","binding_setN:array"],"tags":["toplevel","global","bind","environment","initialize"],"requires":["is_array?","push","*namespace*","is_string?","starts_with?","is_object?","add"]
});
await Environment.set_global("define_env",async function(...defs) {
    let acc;
    let symname;
    acc=await (async function(){
         return ["=:progl"] 
    })();
    symname=null;
    await (async function() {
        let __for_body__32=async function(defset) {
            (acc).push(await (async function(){
                 return ["=:defvar",(defset && defset["0"]),(defset && defset["1"])] 
            })());
            symname=(defset && defset["0"]);
            (acc).push(await (async function(){
                 return ["=:set_prop",await (async function(){
                     return "=:Environment.global_ctx.scope" 
                })(),(""+ await (await Environment.get_global("as_lisp"))(symname)),symname] 
            })());
            if (check_true (((defset && defset["2"]) instanceof Object))){
                return (acc).push(await (async function(){
                     return [["=:set_prop",await (async function(){
                         return "=:Environment.definitions" 
                    })(),(""+ await (await Environment.get_global("as_lisp"))(symname)+ ""),await (await Environment.get_global("add"))({
                        core_lang:true
                    },(defset && defset["2"]))]] 
                })())
            } else {
                return (acc).push(await (async function(){
                     return [["=:set_prop",await (async function(){
                         return "=:Environment.definitions" 
                    })(),(""+ await (await Environment.get_global("as_lisp"))(symname)+ ""),{
                        core_lang:true
                    }]] 
                })())
            }
        };
        let __array__33=[],__elements__31=defs;
        let __BREAK__FLAG__=false;
        for(let __iter__30 in __elements__31) {
            __array__33.push(await __for_body__32(__elements__31[__iter__30]));
            if(__BREAK__FLAG__) {
                 __array__33.pop();
                break;
                
            }
        }return __array__33;
         
    })();
    return acc
},{ "eval_when":{ "compile_time":true
},"name":"define_env","macro":true,"fn_args":"(\"&\" defs)","description":["=:+","define_env is a macro used to provide a dual definition on the top level: it creates a symbol via defvar in the ","constructed scope as well as placing a reference to the defined symbol in the scope object."],"usage":["definitions:array"],"tags":["environment","core","build"],"requires":["push","as_lisp","is_object?","add"]
});
await Environment.set_global("type",async function(x) {
    return await async function(){
        if (check_true ((null===x))) {
            return "null"
        } else if (check_true ((undefined===x))) {
            return "undefined"
        } else if (check_true ((x instanceof Array))) {
            return "array"
        } else {
            return typeof x
        }
    } ()
},{ "name":"type","fn_args":"(x)","usage":["value:*"],"description":"returns the type of value that has been passed.  Deprecated, and the sub_type function should be used.","tags":["types","value","what"]
});
await Environment.set_global("destructure_list",async function(elems) {
    let idx;
    let acc;
    let structure;
    let follow_tree;
    idx=0;
    acc=[];
    structure=elems;
    follow_tree=async function(elems,_path_prefix) {
        return await async function(){
            if (check_true ((elems instanceof Array))) {
                return await (await Environment.get_global("map"))(async function(elem,idx) {
                    return await follow_tree(elem,await (await Environment.get_global("add"))(_path_prefix,idx))
                },elems)
            } else if (check_true ((elems instanceof Object))) {
                return await (async function() {
                    let __for_body__36=async function(pset) {
                        return await follow_tree((pset && pset["1"]),await (await Environment.get_global("add"))(_path_prefix,(pset && pset["0"])))
                    };
                    let __array__37=[],__elements__35=await (await Environment.get_global("pairs"))(elems);
                    let __BREAK__FLAG__=false;
                    for(let __iter__34 in __elements__35) {
                        __array__37.push(await __for_body__36(__elements__35[__iter__34]));
                        if(__BREAK__FLAG__) {
                             __array__37.pop();
                            break;
                            
                        }
                    }return __array__37;
                     
                })()
            } else {
                return (acc).push(_path_prefix)
            }
        } ()
    };
    await follow_tree(structure,[]);
    return acc
},{ "name":"destructure_list","fn_args":"(elems)","description":"Destructure list takes a nested array and returns the paths of each element in the provided array.","usage":["elems:array"],"tags":["destructuring","path","array","nested","tree"],"requires":["is_array?","map","add","is_object?","pairs","push"]
});
await Environment.set_global("destructuring_bind",async function(bind_vars,expression,...forms) {
    let binding_vars;
    let preamble;
    let allocations;
    let expr_result_var;
    let paths;
    let bound_expression;
    let acc;
    binding_vars=bind_vars;
    preamble=[];
    allocations=[];
    expr_result_var=("=:"+ "_expr_"+ await (async function(){
         return await (await Environment.get_global("random_int"))(100000) 
    })());
    paths=await (async function(){
         return await (await Environment.get_global("destructure_list"))(binding_vars) 
    })();
    bound_expression=await (async function(){
        if (check_true (((expression instanceof Array)&& await (await Environment.get_global("starts_with?"))("=:",(expression && expression["0"]))))){
            {
                (allocations).push(await (async function(){
                     return [expr_result_var,expression] 
                })());
                return expr_result_var
            }
        } else {
            return expression
        }
    })();
    acc=await (async function(){
         return ["=:let"] 
    })();
    await (await Environment.get_global("assert"))(((bind_vars instanceof Array)&& await (async function(){
         return await (await Environment.get_global("is_value?"))(expression) 
    })()&& await (async function(){
         return await (await Environment.get_global("is_value?"))(forms) 
    })()),"destructuring_bind: requires 3 arguments");
    await (async function() {
        let __for_body__40=async function(idx) {
            return (allocations).push(await (async function(){
                 return [await (await Environment.get_global("resolve_path"))(paths[idx],binding_vars),await (async function(){
                     return await async function(){
                        if (check_true ((bound_expression instanceof Object))) {
                            return await (await Environment.get_global("resolve_path"))(paths[idx],bound_expression)
                        } else {
                            return (await (await Environment.get_global("conj"))(await (async function(){
                                let __array_op_rval__42=bound_expression;
                                 if (__array_op_rval__42 instanceof Function){
                                    return await __array_op_rval__42() 
                                } else {
                                    return [__array_op_rval__42]
                                }
                            })(),paths[idx])).join(".")
                        }
                    } () 
                })()] 
            })())
        };
        let __array__41=[],__elements__39=await (await Environment.get_global("range"))(await (await Environment.get_global("length"))(paths));
        let __BREAK__FLAG__=false;
        for(let __iter__38 in __elements__39) {
            __array__41.push(await __for_body__40(__elements__39[__iter__38]));
            if(__BREAK__FLAG__) {
                 __array__41.pop();
                break;
                
            }
        }return __array__41;
         
    })();
    (acc).push(allocations);
    acc=await (await Environment.get_global("conj"))(acc,forms);
    return acc
},{ "eval_when":{ "compile_time":true
},"name":"destructuring_bind","macro":true,"fn_args":"(bind_vars expression \"&\" forms)","description":["=:+","The macro destructuring_bind binds the variable symbols specified in bind_vars to the corresponding ","values in the tree structure resulting from the evaluation of the provided expression.  The bound ","variables are then available within the provided forms, which are then evaluated.  Note that ","destructuring_bind only supports destructuring arrays. Destructuring objects is not supported."],"usage":["bind_vars:array","expression:array","forms:*"],"tags":["destructure","array","list","bind","variables","allocation","symbols"],"requires":["random_int","destructure_list","is_array?","starts_with?","push","assert","is_value?","resolve_path","is_object?","join","conj","range","length"]
});
{
     Environment.set_global("split_by_recurse",function(token,container) {
        return   (function(){
            if (check_true ((container instanceof String || typeof container==='string'))) {
                return (container).split(token)
            } else if (check_true ((container instanceof Array))) {
                return  ( Environment.get_global("map"))(async function(elem) {
                    return  ( Environment.get_global("split_by_recurse"))(token,elem)
                },container)
            }
        } )()
    },{ "name":"split_by_recurse","fn_args":"(token container)","usage":["token:string","container:string|array"],"description":["=:+","Like split_by, splits the provided container at ","each token, returning an array of the split ","items.  If the container is an array, the function ","will recursively split the strings in the array ","and return an array containing the split values ","of that array.  The final returned array may contain ","strings and arrays."],"tags":["split","nested","recursion","array","string"],"requires":["is_string?","split_by","is_array?","map","split_by_recurse"]
})
};
await Environment.set_global("defmacro",async function(name,lambda_list,...forms) {
    let macro_name;
    let macro_args;
    let macro_body;
    let final_form;
    let macro_meta;
    let complex_lambda_list;
    let source_details;
    macro_name=name;
    macro_args=lambda_list;
    macro_body=forms;
    final_form=await (await Environment.get_global("last"))(forms);
    macro_meta=await (async function(){
        if (check_true (((final_form instanceof Object)&& await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))((final_form && final_form["description"])))&& await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))((final_form && final_form["usage"])))))){
            return (forms).pop()
        }
    })();
    complex_lambda_list=await (async function(){
         return await (await Environment.get_global("or_args"))(await (async function() {
            let __for_body__45=async function(elem) {
                return (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (async function(){
                     return await (await Environment.get_global("destructure_list"))(elem) 
                })()))>0)
            };
            let __array__46=[],__elements__44=lambda_list;
            let __BREAK__FLAG__=false;
            for(let __iter__43 in __elements__44) {
                __array__46.push(await __for_body__45(__elements__44[__iter__43]));
                if(__BREAK__FLAG__) {
                     __array__46.pop();
                    break;
                    
                }
            }return __array__46;
             
        })()) 
    })();
    source_details=await (await Environment.get_global("add"))({
        eval_when:{
            compile_time:true
        },name:await (async function(){
            if (check_true (await (await Environment.get_global("starts_with?"))("=:",name))){
                return await name["substr"].call(name,2)
            } else {
                return name
            }
        })(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args)
    },await (async function(){
        if (check_true (macro_meta)){
            return macro_meta
        } else {
            return new Object()
        }
    })());
    if (check_true (complex_lambda_list)){
        return ["=:defglobal",macro_name,["=:fn",["&","=:args"],["=:destructuring_bind",macro_args,"=:args",].concat(macro_body)],["=:quote",source_details]]
    } else {
        return ["=:defglobal",macro_name,["=:fn",macro_args,].concat(macro_body),["=:quote",source_details]]
    }
},{
    eval_when:{
        compile_time:true
    },description:("Defines the provided name as a compile time macro function in the current namespace environment. "+ "The parameters in the lambda list are destructured and bound to the provided names which are then "+ "available in the macro function.  The forms are used as the basis for the function with the final "+ "form expected to return a quoted form which is then as the expansion of the macro by the compiler. "+ "The body of forms are explicitly placed in a progn block.  Like with functions and defglobal, "+ "if the final argument to defmacro is an object, this will be used for the metadata associated with "+ "with the bound symbol provided as name.<br>Example:<br>"+ " (defmacro unless (condition `& forms)\n    `(if (not ,#condition)\n       (do \n         ,@forms))\n    {\n     `description: \"opposite of if, if the condition is false then the forms are evaluated\"\n     `usage: [\"condition:array\" \"forms:array\"]\n     `tags: [\"if\" \"not\" \"ifnot\" \"logic\" \"conditional\"]\n     }) "+ "<br>"+ "In the above example the macro unless is defined.  Passed arguments must be explicitly "+ "unquoted or an error may be thrown because the arguments condition and forms *may* not be "+ "defined in the final compilation environment.  Note that if the symbols used by the macro "+ "are defined in the final compilation scope, that this may cause unexpected behavior due to "+ "the form being placed into the compilation tree and then acting on those symbols. <br>"+ "Be aware that if a macro being defined returns an object (not an array) you should explicitly "+ "add the final metadata form to explictly ensure appropriate interpretation of the argument "+ "positions.<br><br>"+ "Since a macro is a function that is defined to operate at compile time vs. run time, the "+ "rules of declare apply.  Declaration operate normally and should be the first form in "+ "the block, or if using let, the first form after the allocation block of the let."),usage:["name:symbol","lambda_list:array","forms:array","meta?:object"],tags:["macro","define","compile","function"],requires:["last","is_object?","not","blank?","pop","or_args","length","flatten","destructure_list","add","starts_with?","as_lisp"]
});
await Environment.set_global("defun",async function(name,lambda_list,body,meta) {
    let fn_name;
    let fn_args;
    let fn_body;
    let fn_meta;
    let complex_lambda_list;
    let source_details;
    fn_name=name;
    fn_args=lambda_list;
    fn_body=body;
    fn_meta=meta;
    complex_lambda_list=await (async function(){
         return await (await Environment.get_global("or_args"))(await (async function() {
            let __for_body__49=async function(elem) {
                return (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (async function(){
                     return await (await Environment.get_global("destructure_list"))(elem) 
                })()))>0)
            };
            let __array__50=[],__elements__48=lambda_list;
            let __BREAK__FLAG__=false;
            for(let __iter__47 in __elements__48) {
                __array__50.push(await __for_body__49(__elements__48[__iter__47]));
                if(__BREAK__FLAG__) {
                     __array__50.pop();
                    break;
                    
                }
            }return __array__50;
             
        })()) 
    })();
    source_details=await (await Environment.get_global("add"))({
        name:await (async function(){
             return await (await Environment.get_global("unquotify"))(name) 
        })(),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function(){
        if (check_true (fn_meta)){
            {
                if (check_true ((fn_meta && fn_meta["description"]))){
                    await async function(){
                        fn_meta["description"]=(fn_meta && fn_meta["description"]);
                        return fn_meta;
                        
                    }()
                };
                return fn_meta
            }
        } else {
            return new Object()
        }
    })());
    if (check_true (complex_lambda_list)){
        return ["=:defglobal",fn_name,["=:fn",["&","=:args"],["=:destructuring_bind",fn_args,"=:args",fn_body]],["=:quote",source_details]]
    } else {
        return ["=:defglobal",fn_name,["=:fn",fn_args,fn_body],["=:quote",source_details]]
    }
},{ "eval_when":{ "compile_time":true
},"name":"defun","macro":true,"fn_args":"(name lambda_list body meta)","description":["=:+","Defines a top level function in the current environment.  Given a name, lambda_list,","body, and a meta data description, builds, compiles and installs the function in the","environment under the provided name.  The body isn't an explicit progn, and must be","within a block structure, such as progn, let or do."],"usage":["name:string:required","lambda_list:array:required","body:array:required","meta:object"],"tags":["function","lambda","define","environment"],"requires":["or_args","length","flatten","destructure_list","add","unquotify","as_lisp"]
});
await Environment.set_global("reduce",async function(...args) {
    let elem;
    let item_list;
    let form;
    elem=(args && args["0"] && args["0"]["0"]);
    item_list=(args && args["0"] && args["0"]["1"]);
    form=(args && args["1"]);
    return ["=:let",[["=:__collector",[]],["=:__result","=:nil"],["=:__action",["=:fn",[].concat(elem),form]]],["=:declare",["=:function","=:__action"]],["=:for_each",["=:__item",item_list],["=:do",["=:=","=:__result",["=:__action","=:__item"]],["=:if","=:__result",["=:push","=:__collector","=:__result"]]]],"=:__collector"]
},{ "eval_when":{ "compile_time":true
},"name":"reduce","macro":true,"fn_args":"((elem item_list) form)","description":"Provided a first argument as a list which contains a binding variable name and a list, returns a list of all non-null return values that result from the evaluation of the second list.","usage":[["binding-elem:symbol","values:list"],["form:list"]],"tags":["filter","remove","select","list","array"]
});
await Environment.set_global("is_nil?",async function(value) {
    return (null===value)
},{ "name":"is_nil?","fn_args":"(\"value\")","description":"for the given value x, returns true if x is exactly equal to nil.","usage":["arg:value"],"tags":["type","condition","subtype","value","what"]
});
await Environment.set_global("is_regex?",async function(x) {
    return (await (await Environment.get_global("sub_type"))(x)==="RegExp")
},{ "name":"is_regex?","fn_args":"(x)","description":"for the given value x, returns true if x is a Javascript regex object","usage":["arg:value"],"tags":["type","condition","subtype","value","what"],"requires":["sub_type"]
});
await Environment.set_global("bind_function",(await Environment.get_global("bind")),{
    description:"Reference bind and so has the exact same behavior.  Used for Kina legacy code. See bind description.",requires:["bind"]
});
await Environment.set_global("is_reference?",async function(val) {
    return ["=:and",["=:is_string?",val],["=:>",["=:length",val],2],["=:starts_with?",["=:quote","=:"],val]]
},{ "eval_when":{ "compile_time":true
},"name":"is_reference?","macro":true,"fn_args":"(val)","description":["=:+","Returns true if the quoted value is a binding string; in JSON notation this would be a string starting with \"=:\". ","Note that this function doesn't check if the provided value is a defined symbol, but only if it has been ","described in the JSON structure as a bounding string."],"usage":["val:string"],"tags":["reference","JSON","binding","symbol"]
});
await Environment.set_global("scan_str",async function(regex,search_string) {
    let result;
    let last_result;
    let totals;
    let strs;
    result=null;
    last_result=null;
    totals=[];
    strs=(""+ search_string);
    if (check_true (await (await Environment.get_global("is_regex?"))(regex))){
        {
            await async function(){
                regex["lastIndex"]=0;
                return regex;
                
            }();
            await (async function(){
                 let __test_condition__53=async function() {
                    return (await (async function(){
                        result=await regex["exec"].call(regex,strs);
                        return true
                    })()&& result&& await (async function(){
                        if (check_true (last_result)){
                            return await (await Environment.get_global("not"))(((result && result["0"])===(last_result && last_result["0"])))
                        } else {
                            return true
                        }
                    })())
                };
                let __body_ref__54=async function() {
                    last_result=result;
                    return (totals).push(await (await Environment.get_global("to_object"))(await (async function(){
                         return await (await Environment.get_global("map"))(async function(v) {
                            return await (async function(){
                                let __array_op_rval__55=v;
                                 if (__array_op_rval__55 instanceof Function){
                                    return await __array_op_rval__55(result[v]) 
                                } else {
                                    return [__array_op_rval__55,result[v]]
                                }
                            })()
                        },await (await Environment.get_global("keys"))(result)) 
                    })()))
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__53()) {
                    await __body_ref__54();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })()
        }
    } else {
        throw new Error(new ReferenceError(("scan_str: invalid RegExp provided: "+ regex)));
        
    };
    return totals
},{ "name":"scan_str","fn_args":"(regex search_string)","description":["=:+","Using a provided regex and a search string, performs a regex ","exec using the provided regex argument on the string argument. ","Returns an array of results or an empty array, with matched ","text, index, and any capture groups."],"usage":["regex:RegExp","text:string"],"tags":["regex","string","match","exec","array"],"requires":["is_regex?","not","push","to_object","map","keys"]
});
await Environment.set_global("remove_prop",async function(obj,key) {
    if (check_true (await (await Environment.get_global("not"))((undefined===obj[key])))){
        {
            {
                let val;
                val=obj[key];
                await (await Environment.get_global("delete_prop"))(obj,key);
                return val
            }
        }
    }
},{ "name":"remove_prop","fn_args":"(obj key)","usage":["obj:object","key:*"],"description":["=:+","If the provided key exists, removes the key from the provided object, ","and returns the removed value if the key exists, otherwise returned undefined."],"tags":["object","key","value","mutate","delete_prop","remove"],"requires":["not","delete_prop"]
});
await Environment.set_global("object_methods",async function(obj) {
    let properties;
    let current_obj;
    properties=new Set();
    current_obj=obj;
    await (async function(){
         let __test_condition__56=async function() {
            return current_obj
        };
        let __body_ref__57=async function() {
            await (await Environment.get_global("map"))(async function(item) {
                return await properties["add"].call(properties,item)
            },await Object.getOwnPropertyNames(current_obj));
            return current_obj=await Object.getPrototypeOf(current_obj)
        };
        let __BREAK__FLAG__=false;
        while(await __test_condition__56()) {
            await __body_ref__57();
             if(__BREAK__FLAG__) {
                 break;
                
            }
        } ;
        
    })();
    return await (async function() {
        {
             let __call_target__=await Array.from(await properties["keys"]()), __call_method__="filter";
            return await __call_target__[__call_method__].call(__call_target__,async function(item) {
                return item instanceof Function
            })
        } 
    })()
},{ "name":"object_methods","fn_args":"(obj)","description":"Given a instantiated object, get all methods (functions) that the object and it's prototype chain contains.","usage":["obj:object"],"tags":["object","methods","functions","introspection","keys"],"requires":["map","is_function?"]
});
await Environment.set_global("expand_dot_accessor",async function(val,ctx) {
    let comps;
    let find_in_ctx;
    let reference;
    let val_type;
    comps=(val).split(".");
    find_in_ctx=async function(the_ctx) {
        return await async function(){
            if (check_true (await (async function(){
                let __targ__58=(the_ctx && the_ctx["scope"]);
                if (__targ__58){
                     return(__targ__58)[reference]
                } 
            })())) {
                return await (async function(){
                    let __targ__59=(the_ctx && the_ctx["scope"]);
                    if (__targ__59){
                         return(__targ__59)[reference]
                    } 
                })()
            } else if (check_true ((the_ctx && the_ctx["parent"]))) {
                return await find_in_ctx((the_ctx && the_ctx["parent"]))
            }
        } ()
    };
    reference=(comps).shift();
    val_type=await find_in_ctx(ctx);
    return await async function(){
        if (check_true ((0===(comps && comps.length)))) {
            return reference
        } else if (check_true (((val_type instanceof Object)&& await (await Environment.get_global("contains?"))((comps && comps["0"]),await (async function(){
             return await (await Environment.get_global("object_methods"))(val_type) 
        })())&& await (await Environment.get_global("not"))(await val_type["propertyIsEnumerable"].call(val_type,(comps && comps["0"])))))) {
            return val
        } else {
            return (await (await Environment.get_global("conj"))(await (async function(){
                let __array_op_rval__60=reference;
                 if (__array_op_rval__60 instanceof Function){
                    return await __array_op_rval__60() 
                } else {
                    return [__array_op_rval__60]
                }
            })(),await (await Environment.get_global("flatten"))(await (async function() {
                let __for_body__63=async function(comp) {
                    if (check_true (await (await Environment.get_global("is_number?"))(comp))){
                        return ["[",comp,"]"]
                    } else {
                        return ["[\"",comp,"\"]"]
                    }
                };
                let __array__64=[],__elements__62=comps;
                let __BREAK__FLAG__=false;
                for(let __iter__61 in __elements__62) {
                    __array__64.push(await __for_body__63(__elements__62[__iter__61]));
                    if(__BREAK__FLAG__) {
                         __array__64.pop();
                        break;
                        
                    }
                }return __array__64;
                 
            })()))).join("")
        }
    } ()
},{ "name":"expand_dot_accessor","fn_args":"(val ctx)","description":"Used for compilation. Expands dotted notation of a.b.0.1 to a[\"b\"][0][1]","usage":["val:string","ctx:object"],"tags":["compiler","system"],"requires":["split_by","take","is_object?","contains?","object_methods","not","join","conj","flatten","is_number?"]
});
await Environment.set_global("getf_ctx",async function(ctx,name,_value) {
    if (check_true ((ctx&& (name instanceof String || typeof name==='string')))){
        return await async function(){
            if (check_true (await (await Environment.get_global("not"))((undefined===await (async function(){
                let __targ__65=(ctx && ctx["scope"]);
                if (__targ__65){
                     return(__targ__65)[name]
                } 
            })())))) {
                if (check_true (await (await Environment.get_global("not"))((_value===undefined)))){
                    {
                        await async function(){
                            let __target_obj__66=(ctx && ctx["scope"]);
                            __target_obj__66[name]=_value;
                            return __target_obj__66;
                            
                        }();
                        return _value
                    }
                } else {
                    return await (async function(){
                        let __targ__67=(ctx && ctx["scope"]);
                        if (__targ__67){
                             return(__targ__67)[name]
                        } 
                    })()
                }
            } else if (check_true ((ctx && ctx["parent"]))) {
                return await (await Environment.get_global("getf_ctx"))((ctx && ctx["parent"]),name,_value)
            } else {
                return undefined
            }
        } ()
    } else {
        throw new Error("invalid call to getf_ctx: missing argument/s");
        
    }
},{ "name":"getf_ctx","fn_args":"(ctx name _value)","description":"Used for compilation. Given a context structure, provides a utility function for retrieving a context value based on a provided identifier.","usage":["tree:array","name:string"],"tags":["compiler","system"],"requires":["is_string?","not","getf_ctx"]
});
await Environment.set_global("setf_ctx",async function(ctx,name,value) {
    let found_val;
    found_val=await (async function(){
         return await (await Environment.get_global("getf_ctx"))(ctx,name,value) 
    })();
    if (check_true ((found_val===undefined))){
        await async function(){
            let __target_obj__68=(ctx && ctx["scope"]);
            __target_obj__68[name]=value;
            return __target_obj__68;
            
        }()
    };
    return value
},{ "name":"setf_ctx","fn_args":"(ctx name value)","description":"Used for compilation. Given a context structure, provides a utility function for setting a context place with value.","usage":["tree:array","name:string","value:*"],"tags":["compiler","system"],"requires":["getf_ctx"]
});
await Environment.set_global("set_path",async function(path,obj,value) {
    let fpath;
    let idx;
    let rpath;
    let target_obj;
    fpath=await (async function(){
         return await clone(path) 
    })();
    idx=(fpath).pop();
    rpath=fpath;
    target_obj=null;
    target_obj=await (await Environment.get_global("resolve_path"))(rpath,obj);
    if (check_true (target_obj)){
        {
            return await async function(){
                target_obj[idx]=value;
                return target_obj;
                
            }()
        }
    } else {
        throw new RangeError(("set_path: invalid path: "+ path));
        
    }
},{ "name":"set_path","fn_args":"(path obj value)","description":["=:+","Given a path value as an array, a tree structure, and a value, ","sets the value within the tree at the path value, potentially overriding any existing value at that path.<br><br>","(defglobal foo [ 0 2 [ { `foo: [ 1 4 3 ] `bar: [ 0 1 2 ] } ] 3 ])<br>","(set_path [ 2 0 `bar 1 ] foo 10) => [ 0 10 2 ]<br>","foo => [ 0 2 [ { foo: [ 1 4 3 ] bar: [ 0 10 2 ] } ] 3 ]"],"tags":["resolve_path","path","set","tree","mutate"],"usage":["path:array","tree:array|object","value:*"],"requires":["pop","resolve_path"]
});
await Environment.set_global("minmax",async function(container) {
    let value_found;
    let smallest;
    let biggest;
    value_found=false;
    smallest=(await Environment.get_global("MAX_SAFE_INTEGER"));
    biggest=(-1* (await Environment.get_global("MAX_SAFE_INTEGER")));
    if (check_true ((container&& (container instanceof Array)&& (await (await Environment.get_global("length"))(container)>0)))){
        {
            await (async function() {
                let __for_body__72=async function(value) {
                    return (await (await Environment.get_global("is_number?"))(value)&& await (async function(){
                        value_found=true;
                        smallest=await Math.min(value,smallest);
                        return biggest=await Math.max(value,biggest)
                    })())
                };
                let __array__73=[],__elements__71=container;
                let __BREAK__FLAG__=false;
                for(let __iter__70 in __elements__71) {
                    __array__73.push(await __for_body__72(__elements__71[__iter__70]));
                    if(__BREAK__FLAG__) {
                         __array__73.pop();
                        break;
                        
                    }
                }return __array__73;
                 
            })();
            if (check_true (value_found)){
                return await (async function(){
                    let __array_op_rval__74=smallest;
                     if (__array_op_rval__74 instanceof Function){
                        return await __array_op_rval__74(biggest) 
                    } else {
                        return [__array_op_rval__74,biggest]
                    }
                })()
            } else {
                return null
            }
        }
    } else {
        return null
    }
},{ "name":"minmax","fn_args":"(container)","description":["=:+","Given an array container with numeric values, returns an array with smallest ","and largest values in the given array [ min, max ]<br>","(minmax [ 2 0 1 3]) -> [ 0 3 ]"],"usage":["container:array"],"tags":["min","max","array","number","range"],"requires":["MAX_SAFE_INTEGER","is_array?","length","is_number?"]
});
await Environment.set_global("aif",async function(test_expr,eval_when_true,eval_when_false) {
    return ["=:let",[["=:it",test_expr]],["=:if","=:it",eval_when_true,eval_when_false]]
},{ "eval_when":{ "compile_time":true
},"name":"aif","macro":true,"fn_args":"(test_expr eval_when_true eval_when_false)","description":["=:+","Anaphoric If - This macro defines a scope in which the symbol `it is used ","to store the evaluation of the test form or expression.  It is then available ","in the eval_when_true form and, if provided, the eval_when_false expression."],"usage":["test_expression:*","eval_when_true:*","eval_when_false:*?"],"tags":["conditional","logic","anaphoric","if","it"]
});
await Environment.set_global("ifa",async function(test,thenclause,elseclause) {
    return ["=:let",[["=:it",test]],["=:if","=:it",thenclause,elseclause]]
},{ "eval_when":{ "compile_time":true
},"name":"ifa","macro":true,"fn_args":"(test thenclause elseclause)","description":"Similar to if, the ifa macro is anaphoric in binding, where the it value is defined as the return value of the test form. Use like if, but the it reference is bound within the bodies of the thenclause or elseclause.","usage":["test:*","thenclause:*","elseclause:*"],"tags":["cond","it","if","anaphoric"]
});
await Environment.set_global("map_range",async function(n,from_range,to_range) {
    ;
    return ((to_range && to_range["0"])+ (((n- (from_range && from_range["0"]))/ ((from_range && from_range["1"])- (from_range && from_range["0"])))* ((to_range && to_range["1"])- (to_range && to_range["0"]))))
},{ "name":"map_range","fn_args":"(n from_range to_range)","usage":["n:number","from_range:array","to_range:array"],"tags":["range","scale","conversion"],"description":["=:+","Given an initial number n, and two numeric ranges, maps n from the first range ","to the second range, returning the value of n as scaled into the second range. "]
});
await Environment.set_global("range_inc",async function(start,end,step) {
    if (check_true (end)){
        return await (await Environment.get_global("range"))(start,await (await Environment.get_global("add"))(end,1),step)
    } else {
        return await (await Environment.get_global("range"))(await (await Environment.get_global("add"))(start,1))
    }
},{ "name":"range_inc","fn_args":"(start end step)","description":["=:+","Similar to range, but is end inclusive: [start end] returning an array containing values from start, including end. ","vs. the regular range function that returns [start end).  ","If just 1 argument is provided, the function returns an array starting from 0, up to and including the provided value."],"usage":["start:number","end?:number","step?:number"],"tags":["range","iteration","loop"],"requires":["range","add"]
});
 Environment.set_global("HSV_to_RGB",new Function("h, s, v","{\n        var r, g, b, i, f, p, q, t;\n        if (arguments.length === 1) {\n            s = h.s, v = h.v, h = h.h;\n        }\n        i = Math.floor(h * 6);\n        f = h * 6 - i;\n        p = v * (1 - s);\n        q = v * (1 - f * s);\n        t = v * (1 - (1 - f) * s);\n        switch (i % 6) {\n            case 0: r = v, g = t, b = p; break;\n            case 1: r = q, g = v, b = p; break;\n            case 2: r = p, g = v, b = t; break;\n            case 3: r = p, g = q, b = v; break;\n            case 4: r = t, g = p, b = v; break;\n            case 5: r = v, g = p, b = q; break;\n        }\n        return {\n            r: Math.round(r * 255),\n            g: Math.round(g * 255),\n            b: Math.round(b * 255)\n        }\n    }"));
await Environment.set_global("color_for_number",async function(num,saturation,brightness) {
    let h;
    let pos;
    let color_key;
    let rgb;
    let v;
    h=await Math.abs(await parseInt(num));
    pos=(8% h);
    color_key=[0,4,1,5,2,6,3,7];
    rgb=null;
    v=color_key[pos];
    ;
    h=await (async function(){
         return await (await Environment.get_global("map_range"))((360% (28* h)),[0,360],[0,1]) 
    })();
    v=await (async function(){
         return await (await Environment.get_global("map_range"))([v,[0,7],[0.92,1]]) 
    })();
    rgb=await (await Environment.get_global("HSV_to_RGB"))(h,saturation,brightness);
    return ("#"+ await (async function() {
        {
             let __call_target__=await (rgb && rgb["r"])["toString"].call((rgb && rgb["r"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })()+ await (async function() {
        {
             let __call_target__=await (rgb && rgb["g"])["toString"].call((rgb && rgb["g"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })()+ await (async function() {
        {
             let __call_target__=await (rgb && rgb["b"])["toString"].call((rgb && rgb["b"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })())
},{ "name":"color_for_number","fn_args":"(num saturation brightness)","usage":["number:number","saturation:float","brightness:float"],"description":"Given an arbitrary integer, a saturation between 0 and 1 and a brightness between 0 and 1, return an RGB color string","tags":["ui","color","view"],"requires":["map_range","HSV_to_RGB"]
});
await Environment.set_global("flatten_ctx",async function(ctx,_var_table) {
    let var_table;
    let ctx_keys;
    var_table=(_var_table|| new Object());
    ctx_keys=await (await Environment.get_global("keys"))(var_table);
    if (check_true ((ctx && ctx["scope"]))){
        {
            await (async function() {
                let __for_body__77=async function(k) {
                    if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("contains?"))(k,ctx_keys)))){
                        {
                            return await async function(){
                                var_table[k]=await (async function(){
                                    let __targ__80=(ctx && ctx["scope"]);
                                    if (__targ__80){
                                         return(__targ__80)[k]
                                    } 
                                })();
                                return var_table;
                                
                            }()
                        }
                    }
                };
                let __array__78=[],__elements__76=await (await Environment.get_global("keys"))((ctx && ctx["scope"]));
                let __BREAK__FLAG__=false;
                for(let __iter__75 in __elements__76) {
                    __array__78.push(await __for_body__77(__elements__76[__iter__75]));
                    if(__BREAK__FLAG__) {
                         __array__78.pop();
                        break;
                        
                    }
                }return __array__78;
                 
            })();
            if (check_true ((ctx && ctx["parent"]))){
                {
                    await (await Environment.get_global("flatten_ctx"))((ctx && ctx["parent"]),var_table)
                }
            };
            return var_table
        }
    }
},{ "name":"flatten_ctx","fn_args":"(ctx _var_table)","description":"Internal usage by the compiler, flattens the hierarchical context structure to a single level. Shadowing rules apply.","usage":["ctx_object:object"],"tags":["system","compiler"],"requires":["keys","not","contains?","flatten_ctx"]
});
await Environment.set_global("identify_symbols",async function(quoted_form,_state) {
    let acc;
    acc=[];
    _state=await (async function(){
        if (check_true (_state)){
            return _state
        } else {
            return new Object()
        }
    })();
    debugger;
    ;
    await async function(){
        if (check_true ((quoted_form instanceof Array))) {
            {
                return await (async function() {
                    let __for_body__83=async function(elem) {
                        return (acc).push(await (async function(){
                             return await (await Environment.get_global("identify_symbols"))(elem,_state) 
                        })())
                    };
                    let __array__84=[],__elements__82=quoted_form;
                    let __BREAK__FLAG__=false;
                    for(let __iter__81 in __elements__82) {
                        __array__84.push(await __for_body__83(__elements__82[__iter__81]));
                        if(__BREAK__FLAG__) {
                             __array__84.pop();
                            break;
                            
                        }
                    }return __array__84;
                     
                })()
            }
        } else if (check_true (((quoted_form instanceof String || typeof quoted_form==='string')&& await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
            (acc).push({
                name:await (await Environment.get_global("as_lisp"))(quoted_form),where:await (async function(){
                     return await (await Environment.get_global("describe"))(await (await Environment.get_global("as_lisp"))(quoted_form)) 
                })()
            })
        } else if (check_true ((quoted_form instanceof Object))) {
            await (async function() {
                let __for_body__87=async function(elem) {
                    return (acc).push(await (async function(){
                         return await (await Environment.get_global("identify_symbols"))(elem,_state) 
                    })())
                };
                let __array__88=[],__elements__86=await (await Environment.get_global("values"))(quoted_form);
                let __BREAK__FLAG__=false;
                for(let __iter__85 in __elements__86) {
                    __array__88.push(await __for_body__87(__elements__86[__iter__85]));
                    if(__BREAK__FLAG__) {
                         __array__88.pop();
                        break;
                        
                    }
                }return __array__88;
                 
            })()
        }
    } ();
    return ["=:quote",acc]
},{ "name":"identify_symbols","fn_args":"(quoted_form _state)","requires":["is_array?","push","identify_symbols","is_string?","starts_with?","as_lisp","describe","is_object?","values"]
});
await Environment.set_global("unless",async function(condition,...forms) {
    return ["=:if",["=:not",condition],["=:do",].concat(forms)]
},{ "eval_when":{ "compile_time":true
},"name":"unless","macro":true,"fn_args":"(condition \"&\" forms)","description":"opposite of if, if the condition is false then the forms are evaluated","usage":["condition:array","forms:array"],"tags":["if","not","ifnot","logic","conditional"]
});
await Environment.set_global("use_quoted_initializer",async function(...forms) {
    let insert_initializer;
    insert_initializer=async function(form) {
        let meta=form[3];
        ;
        if (check_true ((null==form[3]))){
            meta=await async function(){
                form[3]=new Object();
                return form;
                
            }()
        };
        return await async function(){
            if (check_true (((meta instanceof Array)&& (await (await Environment.get_global("resolve_path"))([3,1],form) instanceof Object)))) {
                {
                    await (await Environment.get_global("set_path"))([3,1,"initializer"],form,await (async function(){
                         return ["=:quotel",(form && form["2"])] 
                    })());
                    return form
                }
            } else if (check_true ((meta instanceof Object))) {
                {
                    {
                        await async function(){
                            let __target_obj__90=(form && form["3"]);
                            __target_obj__90["initializer"]=await (async function(){
                                 return ["=:quotel",(form && form["2"])] 
                            })();
                            return __target_obj__90;
                            
                        }();
                        return form
                    }
                }
            } else {
                {
                    await (await Environment.get_global("warn"))("use_quoted_initializer: cannot quote ",await (async function(){
                        if (check_true (((form && form["2"]) instanceof String || typeof (form && form["2"])==='string'))){
                            return (form && form["2"])
                        } else {
                            return form
                        }
                    })());
                    return form
                }
            }
        } ()
    };
    return await (async function() {
        let __for_body__93=async function(form) {
            form=await (async function(){
                 return await (await Environment.get_global("macroexpand"))(form) 
            })();
            if (check_true (((form instanceof Array)&& ((form && form["0"])==="=:defglobal")))){
                {
                    return await insert_initializer(form)
                }
            } else {
                return form
            }
        };
        let __array__94=[],__elements__92=forms;
        let __BREAK__FLAG__=false;
        for(let __iter__91 in __elements__92) {
            __array__94.push(await __for_body__93(__elements__92[__iter__91]));
            if(__BREAK__FLAG__) {
                 __array__94.pop();
                break;
                
            }
        }return __array__94;
         
    })()
},{ "eval_when":{ "compile_time":true
},"name":"use_quoted_initializer","macro":true,"fn_args":"(\"&\" forms)","description":" \nuse_quoted_initializer is a macro that preserves the source form in the symbol definition object. \nWhen the environment is saved, any source forms that wish to be preserved through the \nserialization process should be in the body of this macro.  This is a necessity for global \nobjects that hold callable functions, or functions or structures that require initializers,\nsuch as things that connect or use environmental resources.\n","usage":["forms:array"],"tags":["compilation","save_env","export","source","use","compiler","compile"],"requires":["is_array?","is_object?","resolve_path","set_path","warn","is_string?","macroexpand"]
});
await Environment.set_global("random_int",async function(...args) {
    let top;
    let bottom;
    top=0;
    bottom=0;
    if (check_true ((await (await Environment.get_global("length"))(args)>1))){
        {
            top=await parseInt((args && args["1"]));
            bottom=await parseInt((args && args["0"]))
        }
    } else {
        top=await parseInt((args && args["0"]))
    };
    return await parseInt(await (await Environment.get_global("add"))((await Math.random()* (top- bottom)),bottom))
},{ "name":"random_int","fn_args":"(\"&\" \"args\")","description":"Returns a random integer between 0 and the argument.  If two arguments are provided then returns an integer between the first argument and the second argument.","usage":["arg1:number","arg2?:number"],"tags":["rand","number","integer"],"requires":["length","add"]
});
await Environment.set_global("resolve_multi_path",async function(path,obj,not_found) {
    return await async function(){
        if (check_true ((obj instanceof Object))) {
            return await async function(){
                if (check_true (((await (await Environment.get_global("length"))(path)===1)&& ("*"===await (await Environment.get_global("first"))(path))))) {
                    return (obj|| not_found)
                } else if (check_true (((await (await Environment.get_global("length"))(path)===1)&& (obj[await (await Environment.get_global("first"))(path)] instanceof Object)))) {
                    return (obj[await (await Environment.get_global("first"))(path)]|| not_found)
                } else if (check_true (((await (await Environment.get_global("length"))(path)===1)&& await (await Environment.get_global("not"))((obj[await (await Environment.get_global("first"))(path)] instanceof Object))&& await (await Environment.get_global("not"))((null==obj[await (await Environment.get_global("first"))(path)]))))) {
                    return obj[await (await Environment.get_global("first"))(path)]
                } else if (check_true (((obj instanceof Array)&& ("*"===await (await Environment.get_global("first"))(path))))) {
                    return await (async function() {
                        let __for_body__97=async function(val) {
                            return await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
                        };
                        let __array__98=[],__elements__96=obj;
                        let __BREAK__FLAG__=false;
                        for(let __iter__95 in __elements__96) {
                            __array__98.push(await __for_body__97(__elements__96[__iter__95]));
                            if(__BREAK__FLAG__) {
                                 __array__98.pop();
                                break;
                                
                            }
                        }return __array__98;
                         
                    })()
                } else if (check_true (((obj instanceof Object)&& ("*"===await (await Environment.get_global("first"))(path))))) {
                    return await (async function() {
                        let __for_body__101=async function(val) {
                            return await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
                        };
                        let __array__102=[],__elements__100=await (await Environment.get_global("values"))(obj);
                        let __BREAK__FLAG__=false;
                        for(let __iter__99 in __elements__100) {
                            __array__102.push(await __for_body__101(__elements__100[__iter__99]));
                            if(__BREAK__FLAG__) {
                                 __array__102.pop();
                                break;
                                
                            }
                        }return __array__102;
                         
                    })()
                } else if (check_true ((await (await Environment.get_global("length"))(path)>1))) {
                    return await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),obj[await (await Environment.get_global("first"))(path)],not_found)
                }
            } ()
        } else {
            return not_found
        }
    } ()
},{ "name":"resolve_multi_path","fn_args":"(path obj not_found)","tags":["path","wildcard","tree","structure"],"usage":["path:array","obj:object","not_found:?*"],"description":"Given a list containing a path to a value in a nested array, return the value at the given path. If the value * is in the path, the path value is a wild card if the passed object structure at the path position is a vector or list.","requires":["is_object?","length","first","not","is_array?","resolve_multi_path","rest","values"]
});
await Environment.set_global("symbol_tree",async function(quoted_form,_state,_current_path) {
    let acc;
    let allocators;
    let uop;
    let get_allocations;
    let idx;
    let fval;
    let sym_paths;
    let is_root;
    acc=[];
    allocators={
        let:await (async function(){
             return [[1,"*",0]] 
        })(),defun:await (async function(){
             return [[1],[2,"*"]] 
        })()
    };
    uop=null;
    get_allocations=async function() {
        sym_paths=allocators[await (async function(){
             return await (await Environment.get_global("unquotify"))((quoted_form && quoted_form["0"])) 
        })()];
        if (check_true (sym_paths)){
            {
                return await (async function() {
                    let __for_body__105=async function(sym_path) {
                        fval=await (async function(){
                             return await (await Environment.get_global("resolve_multi_path"))(sym_path,quoted_form) 
                        })();
                        await console.log("Fval is: ",fval,"sym_path: ",sym_path,"current_path: ",_current_path," ",quoted_form);
                        uop=await (async function(){
                             return await (await Environment.get_global("unquotify"))((quoted_form && quoted_form["0"])) 
                        })();
                        if (check_true ((fval instanceof Array))){
                            return await (async function() {
                                let __for_body__109=async function(s) {
                                    s=await (async function(){
                                         return await (await Environment.get_global("unquotify"))(s) 
                                    })();
                                    if (check_true ((null==await (async function(){
                                        let __targ__111=(_state && _state["definitions"]);
                                        if (__targ__111){
                                             return(__targ__111)[fval]
                                        } 
                                    })()))){
                                        {
                                            await async function(){
                                                let __target_obj__112=(_state && _state["definitions"]);
                                                __target_obj__112[s]=[];
                                                return __target_obj__112;
                                                
                                            }()
                                        }
                                    };
                                    return (await (async function(){
                                        let __targ__113=(_state && _state["definitions"]);
                                        if (__targ__113){
                                             return(__targ__113)[s]
                                        } 
                                    })()).push({
                                        path:_current_path,op:uop
                                    })
                                };
                                let __array__110=[],__elements__108=fval;
                                let __BREAK__FLAG__=false;
                                for(let __iter__107 in __elements__108) {
                                    __array__110.push(await __for_body__109(__elements__108[__iter__107]));
                                    if(__BREAK__FLAG__) {
                                         __array__110.pop();
                                        break;
                                        
                                    }
                                }return __array__110;
                                 
                            })()
                        } else {
                            {
                                if (check_true ((null==await (async function(){
                                    let __targ__114=(_state && _state["definitions"]);
                                    if (__targ__114){
                                         return(__targ__114)[fval]
                                    } 
                                })()))){
                                    {
                                        await async function(){
                                            let __target_obj__115=(_state && _state["definitions"]);
                                            __target_obj__115[fval]=[];
                                            return __target_obj__115;
                                            
                                        }()
                                    }
                                };
                                return (await (async function(){
                                    let __targ__116=(_state && _state["definitions"]);
                                    if (__targ__116){
                                         return(__targ__116)[fval]
                                    } 
                                })()).push({
                                    path:_current_path,op:uop
                                })
                            }
                        }
                    };
                    let __array__106=[],__elements__104=sym_paths;
                    let __BREAK__FLAG__=false;
                    for(let __iter__103 in __elements__104) {
                        __array__106.push(await __for_body__105(__elements__104[__iter__103]));
                        if(__BREAK__FLAG__) {
                             __array__106.pop();
                            break;
                            
                        }
                    }return __array__106;
                     
                })()
            }
        }
    };
    idx=-1;
    fval=null;
    sym_paths=null;
    is_root=await (async function(){
        if (check_true ((_state==undefined))){
            return true
        } else {
            return false
        }
    })();
    _state=await (async function(){
        if (check_true (_state)){
            return _state
        } else {
            return {
                definitions:new Object()
            }
        }
    })();
    _current_path=(_current_path|| []);
    ;
    await console.log("symbol_tree: quoted_form: ",quoted_form,_current_path);
    await get_allocations();
    return await async function(){
        if (check_true ((quoted_form instanceof Array))) {
            {
                await (await Environment.get_global("map"))(async function(elem,idx) {
                    {
                        let it;
                        it=await (async function(){
                             return await (await Environment.get_global("symbol_tree"))(elem,_state,await (await Environment.get_global("conj"))(_current_path,idx)) 
                        })();
                        if (check_true (it)){
                            return (acc).push(it)
                        } else {
                            return 
                        }
                    }
                },quoted_form);
                if (check_true (is_root)){
                    return await (await Environment.get_global("add"))({
                        tree:acc
                    },_state)
                } else {
                    return acc
                }
            }
        } else if (check_true (((quoted_form instanceof String || typeof quoted_form==='string')&& await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
            {
                return await (await Environment.get_global("unquotify"))(quoted_form)
            }
        } else if (check_true ((quoted_form instanceof Object))) {
            {
                await (async function() {
                    let __for_body__119=async function(pset) {
                        {
                            let it;
                            it=await (async function(){
                                 return await (await Environment.get_global("symbol_tree"))((pset && pset["1"]),_state,await (await Environment.get_global("conj"))(_current_path,await (async function(){
                                    let __array_op_rval__121=(pset && pset["1"]);
                                     if (__array_op_rval__121 instanceof Function){
                                        return await __array_op_rval__121() 
                                    } else {
                                        return [__array_op_rval__121]
                                    }
                                })())) 
                            })();
                            if (check_true (it)){
                                return (acc).push(it)
                            } else {
                                return 
                            }
                        }
                    };
                    let __array__120=[],__elements__118=await (await Environment.get_global("pairs"))(quoted_form);
                    let __BREAK__FLAG__=false;
                    for(let __iter__117 in __elements__118) {
                        __array__120.push(await __for_body__119(__elements__118[__iter__117]));
                        if(__BREAK__FLAG__) {
                             __array__120.pop();
                            break;
                            
                        }
                    }return __array__120;
                     
                })();
                if (check_true (is_root)){
                    return await (await Environment.get_global("add"))({
                        tree:acc
                    },_state)
                } else {
                    return acc
                }
            }
        }
    } ()
},{ "name":"symbol_tree","fn_args":"(quoted_form _state _current_path)","description":"Given a quoted form as input, isolates the symbols of the form in a tree structure so dependencies can be seen.","usage":["quoted_form:quote"],"tags":["structure","development","analysis"],"requires":["unquotify","resolve_multi_path","is_array?","push","map","symbol_tree","conj","add","is_string?","starts_with?","is_object?","pairs"]
});
await Environment.set_global("except_nil",async function(items) {
    let acc=[];
    ;
    if (check_true (await (await Environment.get_global("not"))((await (await Environment.get_global("sub_type"))(items)=="array")))){
        items=[items]
    };
    await (async function() {
        let __for_body__124=async function(value) {
            if (check_true (await (await Environment.get_global("not"))((null==value)))){
                return (acc).push(value)
            }
        };
        let __array__125=[],__elements__123=items;
        let __BREAK__FLAG__=false;
        for(let __iter__122 in __elements__123) {
            __array__125.push(await __for_body__124(__elements__123[__iter__122]));
            if(__BREAK__FLAG__) {
                 __array__125.pop();
                break;
                
            }
        }return __array__125;
         
    })();
    return acc
},{ "name":"except_nil","fn_args":"(\"items\")","description":"Takes the passed list or set and returns a new list that doesn't contain any undefined or nil values.  Unlike no_empties, false values and blank strings will pass through.","usage":["items:list|set"],"tags":["filter","nil","undefined","remove","no_empties"],"requires":["not","sub_type","push"]
});
await Environment.set_global("each",async function(items,property) {
    return await async function(){
        if (check_true (((property instanceof String || typeof property==='string')|| await (await Environment.get_global("is_number?"))(property)))) {
            return await (await Environment.get_global("except_nil"))(await (async function() {
                let __for_body__128=async function(item) {
                    if (check_true (item)){
                        {
                            return item[property]
                        }
                    }
                };
                let __array__129=[],__elements__127=(items|| []);
                let __BREAK__FLAG__=false;
                for(let __iter__126 in __elements__127) {
                    __array__129.push(await __for_body__128(__elements__127[__iter__126]));
                    if(__BREAK__FLAG__) {
                         __array__129.pop();
                        break;
                        
                    }
                }return __array__129;
                 
            })())
        } else if (check_true ((await (await Environment.get_global("sub_type"))(property)=="array"))) {
            {
                let __collector;
                let __result;
                let __action;
                __collector=[];
                __result=null;
                __action=async function(item) {
                    let nl=[];
                    ;
                    await (async function() {
                        let __for_body__132=async function(p) {
                            return await async function(){
                                if (check_true ((p instanceof Array))) {
                                    return (nl).push(await (await Environment.get_global("resolve_path"))(p,item))
                                } else if (check_true (p instanceof Function)) {
                                    return (nl).push(await (async function(){
                                        let __array_op_rval__134=p;
                                         if (__array_op_rval__134 instanceof Function){
                                            return await __array_op_rval__134(item) 
                                        } else {
                                            return [__array_op_rval__134,item]
                                        }
                                    })())
                                } else {
                                    return (nl).push(item[p])
                                }
                            } ()
                        };
                        let __array__133=[],__elements__131=property;
                        let __BREAK__FLAG__=false;
                        for(let __iter__130 in __elements__131) {
                            __array__133.push(await __for_body__132(__elements__131[__iter__130]));
                            if(__BREAK__FLAG__) {
                                 __array__133.pop();
                                break;
                                
                            }
                        }return __array__133;
                         
                    })();
                    return nl
                };
                ;
                await (async function() {
                    let __for_body__137=async function(__item) {
                        __result=await __action(__item);
                        if (check_true (__result)){
                            return (__collector).push(__result)
                        }
                    };
                    let __array__138=[],__elements__136=items;
                    let __BREAK__FLAG__=false;
                    for(let __iter__135 in __elements__136) {
                        __array__138.push(await __for_body__137(__elements__136[__iter__135]));
                        if(__BREAK__FLAG__) {
                             __array__138.pop();
                            break;
                            
                        }
                    }return __array__138;
                     
                })();
                return __collector
            }
        } else if (check_true ((await (await Environment.get_global("sub_type"))(property)=="AsyncFunction"))) {
            {
                let __collector;
                let __result;
                let __action;
                __collector=[];
                __result=null;
                __action=async function(item) {
                    return await (async function(){
                        let __array_op_rval__139=property;
                         if (__array_op_rval__139 instanceof Function){
                            return await __array_op_rval__139(item) 
                        } else {
                            return [__array_op_rval__139,item]
                        }
                    })()
                };
                ;
                await (async function() {
                    let __for_body__142=async function(__item) {
                        __result=await __action(__item);
                        if (check_true (__result)){
                            return (__collector).push(__result)
                        }
                    };
                    let __array__143=[],__elements__141=items;
                    let __BREAK__FLAG__=false;
                    for(let __iter__140 in __elements__141) {
                        __array__143.push(await __for_body__142(__elements__141[__iter__140]));
                        if(__BREAK__FLAG__) {
                             __array__143.pop();
                            break;
                            
                        }
                    }return __array__143;
                     
                })();
                return __collector
            }
        } else if (check_true ((await (await Environment.get_global("sub_type"))(property)=="Function"))) {
            {
                let __collector;
                let __result;
                let __action;
                __collector=[];
                __result=null;
                __action=async function(item) {
                    return await (async function(){
                        let __array_op_rval__144=property;
                         if (__array_op_rval__144 instanceof Function){
                            return await __array_op_rval__144(item) 
                        } else {
                            return [__array_op_rval__144,item]
                        }
                    })()
                };
                ;
                await (async function() {
                    let __for_body__147=async function(__item) {
                        __result=await __action(__item);
                        if (check_true (__result)){
                            return (__collector).push(__result)
                        }
                    };
                    let __array__148=[],__elements__146=items;
                    let __BREAK__FLAG__=false;
                    for(let __iter__145 in __elements__146) {
                        __array__148.push(await __for_body__147(__elements__146[__iter__145]));
                        if(__BREAK__FLAG__) {
                             __array__148.pop();
                            break;
                            
                        }
                    }return __array__148;
                     
                })();
                return __collector
            }
        } else {
            throw new TypeError(("each: strings, arrays, and functions can be provided for the property name or names to extract - received: "+ await (await Environment.get_global("sub_type"))(property)));
            
        }
    } ()
},{ "name":"each","fn_args":"(items property)","description":["=:+","Provided a list of items, provide a property name or ","a list of property names to be extracted and returned from the source array as a new list.","If property is an array, and contains values that are arrays, those arrays will be treated as a path."],"usage":["items:list","property:string|list|function|AsyncFunction"],"tags":["pluck","element","only","list","object","property"],"requires":["is_string?","is_number?","except_nil","sub_type","is_array?","push","resolve_path","is_function?"]
});
await Environment.set_global("replace",async function(...args) {
    if (check_true (((args && args.length)<3))){
        throw new SyntaxError("Invalid syntax for replace: requires at least three arguments, target value or regex, the replacement value, and at least one value (object list or string)");
        
    } else {
        try {
            {
                let target;
                let replacement;
                let work_values;
                let value_type;
                let sr_val;
                let arg_value_type;
                let rval;
                target=(args && args["0"]);
                replacement=(args && args["1"]);
                work_values=await (await Environment.get_global("slice"))(args,2);
                value_type=null;
                sr_val=null;
                arg_value_type=await subtype((args && args["2"]));
                rval=[];
                await (async function() {
                    let __for_body__152=async function(value) {
                        value_type=await subtype(value);
                        if (check_true ((value_type==="Number"))){
                            {
                                value_type="String";
                                value=(""+ value)
                            }
                        };
                        return await async function(){
                            if (check_true ((value_type==="String"))) {
                                return (rval).push(await value["replace"].call(value,target,replacement))
                            } else if (check_true ((value_type==="array"))) {
                                return await (async function() {
                                    let __for_body__156=async function(elem) {
                                        return (rval).push(await (async function(){
                                             return await (await Environment.get_global("replace"))(target,replacement,elem) 
                                        })())
                                    };
                                    let __array__157=[],__elements__155=value;
                                    let __BREAK__FLAG__=false;
                                    for(let __iter__154 in __elements__155) {
                                        __array__157.push(await __for_body__156(__elements__155[__iter__154]));
                                        if(__BREAK__FLAG__) {
                                             __array__157.pop();
                                            break;
                                            
                                        }
                                    }return __array__157;
                                     
                                })()
                            } else if (check_true ((value_type==="object"))) {
                                {
                                    sr_val=new Object();
                                    await (async function() {
                                        let __for_body__160=async function(k) {
                                            if (check_true (await value["hasOwnProperty"].call(value,k))){
                                                {
                                                    return await async function(){
                                                        sr_val[k]=await (async function(){
                                                             return await (await Environment.get_global("replace"))(target,replacement,value[k]) 
                                                        })();
                                                        return sr_val;
                                                        
                                                    }()
                                                }
                                            }
                                        };
                                        let __array__161=[],__elements__159=await (await Environment.get_global("keys"))(value);
                                        let __BREAK__FLAG__=false;
                                        for(let __iter__158 in __elements__159) {
                                            __array__161.push(await __for_body__160(__elements__159[__iter__158]));
                                            if(__BREAK__FLAG__) {
                                                 __array__161.pop();
                                                break;
                                                
                                            }
                                        }return __array__161;
                                         
                                    })();
                                    return rval=await rval["concat"].call(rval,sr_val)
                                }
                            }
                        } ()
                    };
                    let __array__153=[],__elements__151=work_values;
                    let __BREAK__FLAG__=false;
                    for(let __iter__150 in __elements__151) {
                        __array__153.push(await __for_body__152(__elements__151[__iter__150]));
                        if(__BREAK__FLAG__) {
                             __array__153.pop();
                            break;
                            
                        }
                    }return __array__153;
                     
                })();
                if (check_true ((await (await Environment.get_global("not"))((arg_value_type==="array"))&& await (await Environment.get_global("not"))((arg_value_type==="object"))))){
                    return await (await Environment.get_global("first"))(rval)
                } else {
                    return rval
                }
            }
        } catch (__exception__149) {
            if (__exception__149 instanceof Error) {
                let e=__exception__149;
                {
                    return await console.error(("replace: "+ e))
                }
            }
        }
    }
},{ "name":"replace","fn_args":"(\"&\" args)","description":["=:+","Given at least 3 arguments, finds the first  argument, and replaces with the second argument, operating on the third plus argument.  ","This function will act to replace and find values in strings, arrays and objects.  When replacing values in strings, be aware that ","only the first matching value will be replaced.  To replace ALL values in strings, use a RegExp with the `g flag set, such as ","(new RegExp \"Target String\" `g).  For example, the following replaces all target values in the target string:<br>","(replace (new RegExp \"Indiana\" `g) \"Illinois\" \"The address of the location in Indiana has now been changed to 123 Main Street, Townville, Indiana.\")"],"usage":["target:string|regexp","replacement:string|number","container:string|array|object"],"tags":["replace","find","change","edit","string","array","object"],"requires":["slice","push","replace","keys","not","first"]
});
await Environment.set_global("cl_encode_string",async function(text) {
    if (check_true ((text instanceof String || typeof text==='string'))){
        {
            let escaped;
            let nq;
            let step1;
            let snq;
            escaped=await (async function(){
                 return await (await Environment.get_global("replace"))(new RegExp("\n","g"),await (await Environment.get_global("add"))(await String.fromCharCode(92),"n"),text) 
            })();
            escaped=await (async function(){
                 return await (await Environment.get_global("replace"))(new RegExp("\r","g"),await (await Environment.get_global("add"))(await String.fromCharCode(92),"r"),escaped) 
            })();
            nq=(escaped).split(await String.fromCharCode(34));
            step1=(nq).join(await (await Environment.get_global("add"))(await String.fromCharCode(92),await String.fromCharCode(34)));
            snq=(step1).split(await String.fromCharCode(39));
            return step1
        }
    } else {
        return text
    }
},{ "name":"cl_encode_string","fn_args":"(text)","requires":["is_string?","replace","add","split_by","join"]
});
await Environment.set_global("path_to_js_syntax",async function(comps) {
    if (check_true ((comps instanceof Array))){
        if (check_true (((comps && comps.length)>1))){
            return (await (async function(){
                 return await (await Environment.get_global("map"))(async function(comp,idx) {
                    if (check_true ((idx===0))){
                        return comp
                    } else {
                        return await async function(){
                            if (check_true ((await isNaN(parseInt(comp))&& await (await Environment.get_global("starts_with?"))("\"",comp)))) {
                                return ("["+ comp+ "]")
                            } else if (check_true (await isNaN(parseInt(comp)))) {
                                return ("."+ comp)
                            } else {
                                return ("["+ "'"+ comp+ "'"+ "]")
                            }
                        } ()
                    }
                },comps) 
            })()).join("")
        } else {
            return (comps && comps["0"])
        }
    } else {
        throw new TypeError(("path_to_js_syntax: need array - given "+ await (await Environment.get_global("sub_type"))(comps)));
        
    }
},{ "name":"path_to_js_syntax","fn_args":"(comps)","description":"Used by the compiler, converts an array containing the components of a path to Javascript syntax, which is then returned as a string.","usage":["comps:array"],"tags":["compiler","path","js","javascript"],"requires":["is_array?","join","map","int","starts_with?","sub_type"]
});
await Environment.set_global("first_is_upper_case?",async function(str_val) {
    let rval=await str_val["match"].call(str_val,new RegExp("^[A-Z]"));
    ;
    if (check_true ((rval&& (rval && rval["0"])))){
        return true
    } else {
        return false
    }
},{ "name":"first_is_upper_case?","fn_args":"(str_val)","description":"Returns true if the first character of the provided string is an uppercase value in the range [A-Z]. ","tags":["string","case","uppercase","capitalized"]
});
await Environment.set_global("safe_access_2",async function(token,ctx,sanitizer_fn) {
    let comps;
    let acc;
    let acc_full;
    let pos;
    let rval;
    comps=null;
    acc=[];
    acc_full=[];
    pos=null;
    rval=null;
    comps=((token && token.name)).split(".");
    if (check_true (((comps && comps.length)===1))){
        return (token && token.name)
    } else {
        {
            await async function(){
                comps[0]=await (async function(){
                    let __array_op_rval__164=sanitizer_fn;
                     if (__array_op_rval__164 instanceof Function){
                        return await __array_op_rval__164((comps && comps["0"])) 
                    } else {
                        return [__array_op_rval__164,(comps && comps["0"])]
                    }
                })();
                return comps;
                
            }();
            await (async function(){
                 let __test_condition__165=async function() {
                    return ((comps && comps.length)>0)
                };
                let __body_ref__166=async function() {
                    (acc).push((comps).shift());
                    if (check_true (((comps && comps.length)>0))){
                        return (acc_full).push((["check_true(",await (async function(){
                             return await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx) 
                        })(),")"]).join(""))
                    } else {
                        return (acc_full).push(await (async function(){
                             return await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx) 
                        })())
                    }
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__165()) {
                    await __body_ref__166();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })();
            rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
            return rval
        }
    }
},{ "name":"safe_access_2","fn_args":"(token ctx sanitizer_fn)","requires":["split_by","push","take","join","expand_dot_accessor","flatten"]
});
await Environment.set_global("safe_access",async function(token,ctx,sanitizer_fn) {
    let comps;
    let acc;
    let acc_full;
    let pos;
    let rval;
    comps=null;
    acc=[];
    acc_full=[];
    pos=null;
    rval=null;
    comps=((token && token.name)).split(".");
    if (check_true (((comps && comps.length)===1))){
        return (token && token.name)
    } else {
        {
            await async function(){
                comps[0]=await (async function(){
                    let __array_op_rval__168=sanitizer_fn;
                     if (__array_op_rval__168 instanceof Function){
                        return await __array_op_rval__168((comps && comps["0"])) 
                    } else {
                        return [__array_op_rval__168,(comps && comps["0"])]
                    }
                })();
                return comps;
                
            }();
            await (async function(){
                 let __test_condition__169=async function() {
                    return ((comps && comps.length)>0)
                };
                let __body_ref__170=async function() {
                    (acc).push((comps).shift());
                    return (acc_full).push(await (async function(){
                         return await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx) 
                    })())
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__169()) {
                    await __body_ref__170();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })();
            rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
            return rval
        }
    }
},{ "name":"safe_access","fn_args":"(token ctx sanitizer_fn)","requires":["split_by","push","take","expand_dot_accessor","join","flatten"]
});
await Environment.set_global("compile_to_js",async function(quoted_form) {
    return ["=:->","=:Environment","compile",quoted_form]
},{ "eval_when":{ "compile_time":true
},"name":"compile_to_js","macro":true,"fn_args":"(quoted_form)","description":["=:+","Given a quoted form, returns an array with two elements, element 0 is the compilation metadata, ","and element 1 is the output Javascript as a string."],"usage":["quoted_form:*"],"tags":["compilation","source","javascript","environment"]
});
await Environment.set_global("evaluate_compiled_source",async function(compiled_source) {
    return ["=:->","=:Environment","evaluate",compiled_source,"=:nil",{ "compiled_source":true
}]
},{ "eval_when":{ "compile_time":true
},"name":"evaluate_compiled_source","macro":true,"fn_args":"(compiled_source)","description":["=:+","The macro evaluate_compiled_source takes the direct output of the compiler, ","which can be captured using the macro compile_to_js, and performs the ","evaluation of the compiled source, thereby handling the second half of the ","compile then evaluate cycle.  This call will return the results of ","the evaluation of the compiled code assembly."],"usage":["compiled_source:array"],"tags":["compilation","compile","eval","pre-compilation"]
});
await Environment.set_global("form_structure",async function(quoted_form,max_depth) {
    let idx;
    let acc;
    let structure;
    let follow_tree;
    idx=0;
    acc=[];
    max_depth=(max_depth|| (await Environment.get_global("MAX_SAFE_INTEGER")));
    structure=quoted_form;
    follow_tree=async function(elems,acc,_depth) {
        return await async function(){
            if (check_true ((((elems instanceof Array)|| (elems instanceof Object))&& (_depth>=max_depth)))) {
                if (check_true ((elems instanceof Array))){
                    return "array"
                } else {
                    return "object"
                }
            } else if (check_true ((elems instanceof Array))) {
                return await (await Environment.get_global("map"))(async function(elem,idx) {
                    return await follow_tree(elem,[],await (await Environment.get_global("add"))(_depth,1))
                },elems)
            } else if (check_true ((elems instanceof Object))) {
                {
                    return await (async function() {
                        let __for_body__173=async function(pset) {
                            return await follow_tree((pset && pset["1"]),[],await (await Environment.get_global("add"))(_depth,1))
                        };
                        let __array__174=[],__elements__172=await (await Environment.get_global("pairs"))(elems);
                        let __BREAK__FLAG__=false;
                        for(let __iter__171 in __elements__172) {
                            __array__174.push(await __for_body__173(__elements__172[__iter__171]));
                            if(__BREAK__FLAG__) {
                                 __array__174.pop();
                                break;
                                
                            }
                        }return __array__174;
                         
                    })()
                }
            } else {
                return await async function(){
                    if (check_true (((elems instanceof String || typeof elems==='string')&& await (await Environment.get_global("starts_with?"))("=:",elems)))) {
                        return "symbol"
                    } else if (check_true (await (await Environment.get_global("is_number?"))(elems))) {
                        return "number"
                    } else if (check_true ((elems instanceof String || typeof elems==='string'))) {
                        return "string"
                    } else if (check_true (((elems===true)|| (elems===false)))) {
                        return "boolean"
                    } else {
                        return elems
                    }
                } ()
            }
        } ()
    };
    return await follow_tree(structure,[],0)
},{ "name":"form_structure","fn_args":"(quoted_form max_depth)","description":["=:+","Given a form and an optional max_depth positive number, ","traverses the passed JSON form and produces a nested array structure that contains","the contents of the form classified as either a \"symbol\", \"number\", \"string\", \"boolean\", \"array\", \"object\", or the elem itself. ","The returned structure will mirror the passed structure in form, except with the leaf contents ","being replaced with generalized categorizations."],"tags":["validation","compilation","structure"],"usage":["quoted_form:*","max_depth:?number"],"requires":["MAX_SAFE_INTEGER","is_array?","is_object?","map","add","pairs","is_string?","starts_with?","is_number?"]
});
await Environment.set_global("validate_form_structure",async function(validation_rules,quoted_form) {
    let results;
    let all_valid;
    let target;
    results={
        valid:[],invalid:[],rule_count:await (await Environment.get_global("length"))(validation_rules),all_passed:false
    };
    all_valid=null;
    target=null;
    await (async function() {
        let __for_body__177=async function(rule) {
            if (check_true (((rule instanceof Array)&& ((rule && rule.length)>1)&& ((rule && rule["0"]) instanceof Array)&& ((rule && rule["1"]) instanceof Array)))){
                {
                    all_valid=true;
                    target=await (await Environment.get_global("resolve_path"))((rule && rule["0"]),quoted_form);
                    await (async function() {
                        let __for_body__181=async function(validation) {
                            if (check_true (await (await Environment.get_global("not"))(await (async function(){
                                let __array_op_rval__183=validation;
                                 if (__array_op_rval__183 instanceof Function){
                                    return await __array_op_rval__183(target) 
                                } else {
                                    return [__array_op_rval__183,target]
                                }
                            })()))){
                                {
                                    all_valid=false;
                                    return __BREAK__FLAG__=true;
                                    return
                                }
                            }
                        };
                        let __array__182=[],__elements__180=(rule && rule["1"]);
                        let __BREAK__FLAG__=false;
                        for(let __iter__179 in __elements__180) {
                            __array__182.push(await __for_body__181(__elements__180[__iter__179]));
                            if(__BREAK__FLAG__) {
                                 __array__182.pop();
                                break;
                                
                            }
                        }return __array__182;
                         
                    })();
                    if (check_true (all_valid)){
                        return ((results && results["valid"])).push(((rule && rule["2"])|| (rule && rule["0"])))
                    } else {
                        return ((results && results["invalid"])).push(((rule && rule["2"])|| (rule && rule["0"])))
                    }
                }
            }
        };
        let __array__178=[],__elements__176=(validation_rules|| []);
        let __BREAK__FLAG__=false;
        for(let __iter__175 in __elements__176) {
            __array__178.push(await __for_body__177(__elements__176[__iter__175]));
            if(__BREAK__FLAG__) {
                 __array__178.pop();
                break;
                
            }
        }return __array__178;
         
    })();
    await async function(){
        results["all_passed"]=(await (await Environment.get_global("length"))((results && results["valid"]))===(results && results["rule_count"]));
        return results;
        
    }();
    return results
},{ "name":"validate_form_structure","fn_args":"(validation_rules quoted_form)","description":["=:+","Given a validation rule structure and a quoted form to analyze returns an object with ","two keys, valid and invalid, which are arrays containing the outcome of the rule ","evaluation, a rule_count key containing the total rules passed, and an all_passed key","which will be set to true if all rules passed, otherwise it will fail.","If the rule evaluates successfully, valid is populated with the rule path, ","otherwise the rule path is placed in the invalid array.<br><br>","Rule structure is as follows:<br><code>","[ [path [validation validation ...] \"rule_name\"] [path [validation ...] \"rule_name\"] ]<br>","</code>","where path is an array with the index path and ","validation is a single argument lambda (fn (v) v) that must either ","return true or false. If true, the validation is considered correct, ","false for incorrect.  The result of the rule application will be put in the valid array, ","otherwise the result will be put in invalid."],"tags":["validation","rules","form","structure"],"usage":["validation_rules:array","quoted_form:*"],"requires":["length","is_array?","resolve_path","not","push"]
});
await (async function(){
    let __array_op_rval__185=await Environment.set_global("*compiler_syntax_rules*",{
        compile_let:await (async function(){
             return [[[0,1,"val"],[(await Environment.get_global("is_array?"))],"let allocation section"],await (async function(){
                 return [[0,2],[async function(v) {
                    return await (await Environment.get_global("not"))((v===undefined))
                }],"let missing block"] 
            })()] 
        })(),compile_cond:await (async function(){
             return [[[0],[async function(v) {
                return ((await (await Environment.get_global("length"))(await (await Environment.get_global("rest"))(v))% 2)===0)
            }],"cond: odd number of arguments"]] 
        })(),compile_assignment:await (async function(){
             return [[[0,1],[async function(v) {
                return await (await Environment.get_global("not"))((v===undefined))
            }],"assignment is missing target and values"],await (async function(){
                 return [[0,2],[async function(v) {
                    return await (await Environment.get_global("not"))((v===undefined))
                }],"assignment is missing value"] 
            })()] 
        })()
    },{
        initializer:await (async function(){
             return {"compile_let":[[[0,1,"val"],["=:list","=:is_array?"],"let allocation section"],[[0,2],["=:list",["=:fn",["=:v"],["=:not",["=:==","=:v","=:undefined"]]]],"let missing block"]],"compile_cond":[[[0],["=:list",["=:fn",["=:v"],["=:==",["=:%",["=:length",["=:rest","=:v"]],2],0]]],"cond: odd number of arguments"]],"compile_assignment":[[[0,1],["=:list",["=:fn",["=:v"],["=:not",["=:==","=:v","=:undefined"]]]],"assignment is missing target and values"],[[0,2],["=:list",["=:fn",["=:v"],["=:not",["=:==","=:v","=:undefined"]]]],"assignment is missing value"]]} 
        })(),requires:["is_array?","not","length","rest"]
    });
     if (__array_op_rval__185 instanceof Function){
        return await __array_op_rval__185() 
    } else {
        return [__array_op_rval__185]
    }
})();
await Environment.set_global("compiler_source_chain",async function(cpath,tree,sources) {
    if (check_true (((cpath instanceof Array)&& tree))){
        {
            let source;
            sources=(sources|| []);
            source=null;
            cpath=await (await Environment.get_global("chop"))(cpath);
            source=await (await Environment.get_global("as_lisp"))(await (await Environment.get_global("resolve_path"))(cpath,tree));
            if (check_true (((source && source.length)>80))){
                source=await (await Environment.get_global("add"))(await source["substr"].call(source,0,80),"...")
            };
            if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))(source)))){
                {
                    (sources).push(source)
                }
            };
            if (check_true ((((cpath && cpath.length)>0)&& ((sources && sources.length)<2)))){
                await (await Environment.get_global("compiler_source_chain"))(cpath,tree,sources)
            };
            return sources
        }
    }
},{ "name":"compiler_source_chain","fn_args":"(cpath tree sources)","requires":["is_array?","chop","as_lisp","resolve_path","add","not","blank?","push","compiler_source_chain"]
});
await Environment.set_global("compiler_syntax_validation",async function(validator_key,tokens,errors,ctx,tree) {
    let validation_results;
    let syntax_error;
    let cpath;
    let rules;
    validation_results=null;
    syntax_error=null;
    cpath=null;
    rules=await (async function(){
        let __targ__186=(await Environment.get_global("*compiler_syntax_rules*"));
        if (__targ__186){
             return(__targ__186)[validator_key]
        } 
    })();
    if (check_true (rules)){
        {
            validation_results=await (async function(){
                 return await (await Environment.get_global("validate_form_structure"))(rules,await (async function(){
                    let __array_op_rval__187=tokens;
                     if (__array_op_rval__187 instanceof Function){
                        return await __array_op_rval__187() 
                    } else {
                        return [__array_op_rval__187]
                    }
                })()) 
            })();
            cpath=await (async function(){
                 return await async function(){
                    if (check_true ((tokens instanceof Array))) {
                        return await (await Environment.get_global("chop"))((tokens && tokens["0"] && tokens["0"]["path"]))
                    } else if (check_true ((tokens instanceof Object))) {
                        return (tokens && tokens["path"])
                    }
                } () 
            })();
            if (check_true (await (await Environment.get_global("not"))((validation_results && validation_results["all_passed"])))){
                {
                    await (async function() {
                        let __for_body__190=async function(problem) {
                            return (errors).push({
                                error:"SyntaxError",message:problem,source_name:await (async function(){
                                     return await (await Environment.get_global("getf_ctx"))(ctx,"__SOURCE_NAME__") 
                                })(),form:await (await Environment.get_global("first"))(await (async function(){
                                     return await (await Environment.get_global("compiler_source_chain"))(cpath,tree) 
                                })()),parent_forms:await (await Environment.get_global("rest"))(await (async function(){
                                     return await (await Environment.get_global("compiler_source_chain"))(cpath,tree) 
                                })()),invalid:true
                            })
                        };
                        let __array__191=[],__elements__189=((validation_results && validation_results["invalid"])|| []);
                        let __BREAK__FLAG__=false;
                        for(let __iter__188 in __elements__189) {
                            __array__191.push(await __for_body__190(__elements__189[__iter__188]));
                            if(__BREAK__FLAG__) {
                                 __array__191.pop();
                                break;
                                
                            }
                        }return __array__191;
                         
                    })();
                    syntax_error=new SyntaxError("invalid syntax");
                    await async function(){
                        syntax_error["handled"]=true;
                        return syntax_error;
                        
                    }();
                    throw syntax_error;
                    
                }
            }
        }
    } else {
        await console.log("compiler_syntax_validation: no rules for: ",validator_key," -> tokens: ",tokens,"tree: ",tree)
    };
    return validation_results
},{ "name":"compiler_syntax_validation","fn_args":"(validator_key tokens errors ctx tree)","requires":["*compiler_syntax_rules*","validate_form_structure","is_array?","chop","is_object?","not","push","getf_ctx","first","compiler_source_chain","rest"]
});
await Environment.set_global("describe_all",async function() {
    return await (async function(){
        let __apply_args__193=await (async function(){
             return await (async function() {
                let __for_body__197=async function(s) {
                    return await (await Environment.get_global("to_object"))(await (async function(){
                         return [await (async function(){
                            let __array_op_rval__199=s;
                             if (__array_op_rval__199 instanceof Function){
                                return await __array_op_rval__199(await (async function(){
                                     return await (await Environment.get_global("describe"))(s) 
                                })()) 
                            } else {
                                return [__array_op_rval__199,await (async function(){
                                     return await (await Environment.get_global("describe"))(s) 
                                })()]
                            }
                        })()] 
                    })())
                };
                let __array__198=[],__elements__196=await (async function(){
                     return await (await Environment.get_global("symbols"))() 
                })();
                let __BREAK__FLAG__=false;
                for(let __iter__195 in __elements__196) {
                    __array__198.push(await __for_body__197(__elements__196[__iter__195]));
                    if(__BREAK__FLAG__) {
                         __array__198.pop();
                        break;
                        
                    }
                }return __array__198;
                 
            })() 
        })();
        return ( (await Environment.get_global("add"))).apply(this,__apply_args__193)
    })()
},{ "name":"describe_all","fn_args":"()","description":"Returns an object with all defined symbols as the keys and their corresponding descriptions.","usage":[],"tags":["env","environment","symbol","symbols","global","globals"],"requires":["add","to_object","describe","symbols"]
});
await Environment.set_global("is_value?",async function(val) {
    if (check_true ((val===""))){
        return true
    } else {
        if (check_true ((val===undefined))){
            return false
        } else {
            if (check_true (await isNaN(val))){
                return true
            } else {
                if (check_true (val)){
                    return true
                } else {
                    return false
                }
            }
        }
    }
},{ "name":"is_value?","fn_args":"(val)","description":"Returns true for anything that is not nil or undefined or false.","usage":["val:*"],"tags":["if","value","truthy",false,true]
});
await Environment.set_global("sort",async function(elems,options) {
    let opts;
    let sort_fn;
    let sort_fn_inner;
    let keyed;
    let reverser;
    let comparitor;
    let key_path_a;
    let key_path_b;
    opts=(((options instanceof Object)&& options)|| new Object());
    sort_fn=null;
    sort_fn_inner=null;
    keyed=false;
    reverser=await (async function(){
        if (check_true ((opts && opts["reversed"]))){
            return -1
        } else {
            return 1
        }
    })();
    comparitor=await (async function(){
         return await async function(){
            if (check_true ((opts && opts["comparitor"]) instanceof Function)) {
                return (opts && opts["comparitor"])
            } else {
                return function(a,b) {
                    return   (function(){
                        if (check_true ((a instanceof String || typeof a==='string'))) {
                            if (check_true ((b instanceof String || typeof b==='string'))){
                                return (reverser*  a["localeCompare"].call(a,b))
                            } else {
                                return (reverser*  a["localeCompare"].call(a,(""+ b)))
                            }
                        } else if (check_true ((b instanceof String || typeof b==='string'))) {
                            return (reverser*  ( function() {
                                {
                                     let __call_target__=(""+ a), __call_method__="localeCompare";
                                    return  __call_target__[__call_method__].call(__call_target__,b)
                                } 
                            })())
                        } else if (check_true ((opts && opts["reversed"]))) {
                            return (b- a)
                        } else {
                            return (a- b)
                        }
                    } )()
                }
            }
        } () 
    })();
    key_path_a="aval";
    key_path_b="bval";
    await (await Environment.get_global("assert"))((elems instanceof Array),"sort: elements must be an array");
    await (await Environment.get_global("assert"))((await subtype(comparitor)==="Function"),("sort: invalid comparitor provided : "+ await subtype(comparitor)+ " - must be a synchronous function, or evaluate to a synchronous function."));
    await (await Environment.get_global("assert"))((((opts && opts["comparitor"])&& await (await Environment.get_global("not"))((opts && opts["reversed"])))|| (await (await Environment.get_global("not"))((opts && opts["comparitor"]))&& (opts && opts["reversed"]))|| (await (await Environment.get_global("not"))((opts && opts["comparitor"]))&& await (await Environment.get_global("not"))((opts && opts["reversed"])))),"sort: comparitor option cannot be combined with reversed option");
    await async function(){
        if (check_true (((opts && opts["key"]) instanceof String || typeof (opts && opts["key"])==='string'))) {
            {
                keyed=true;
                key_path_a=await (async function(){
                     return await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("get_object_path"))(("aval."+ (opts && opts["key"])))) 
                })();
                return key_path_b=await (async function(){
                     return await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("get_object_path"))(("bval."+ (opts && opts["key"])))) 
                })()
            }
        } else if (check_true (((opts && opts["key"]) instanceof Array))) {
            {
                keyed=true;
                key_path_a=await (async function(){
                     return await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("conj"))(["aval"],(opts && opts["key"]))) 
                })();
                key_path_b=await (async function(){
                     return await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("conj"))(["bval"],(opts && opts["key"]))) 
                })()
            }
        }
    } ();
    sort_fn_inner=new Function("aval","bval","comparitor",("return comparitor( "+ key_path_a+ ","+ key_path_b+ ")"));
    sort_fn=function(aval,bval) {
        return  sort_fn_inner(aval,bval,comparitor)
    };
    return await elems["sort"].call(elems,sort_fn)
},{ "name":"sort","fn_args":"(elems options)","description":["=:+","Given an array of elements, and an optional options object, returns a new sorted array.","With no options provided, the elements are sorted in ascending order.  If the key ","reversed is set to true in options, then the elements are reverse sorted. ","<br>","An optional synchronous function can be provided (defined by the comparitor key) which is expected to take ","two values and return the difference between them as can be used by the sort method of ","JS Array.  Additionally a key value can be provided as either a string (separated by dots) or as an array ","which will be used to bind (destructure) the a and b values to be compared to nested values in the elements ","of the array.","<br>","<br>","Options:<br>","reversed:boolean:if true, the elements are reverse sorted.  Note that if a comparitor function is provided, then ","this key cannot be present, as the comparitor should deal with the sorting order.<br>","key:string|array:A path to the comparison values in the provided elements. If a string, it is provided as period ","separated values.  If it is an array, each component of the array is a successive path value in the element to be ","sorted. <br>","comparitor:function:A synchronous function that is to be provided for comparison of two elements.  It should take ","two arguments, and return the difference between the arguments, either a positive or negative."],"usage":["elements:array","options:object?"],"tags":["array","sorting","order","reverse","comparison","objects"],"requires":["is_object?","is_function?","is_string?","assert","is_array?","not","path_to_js_syntax","get_object_path","conj"]
});
await Environment.set_global("and*",async function(...vals) {
    if (check_true (((vals && vals.length)>0))){
        {
            let rval=true;
            ;
            await (async function() {
                let __for_body__202=async function(v) {
                    if (check_true (await (await Environment.get_global("not"))(await (async function(){
                         return await (await Environment.get_global("is_value?"))(v) 
                    })()))){
                        {
                            rval=false;
                            return __BREAK__FLAG__=true;
                            return
                        }
                    }
                };
                let __array__203=[],__elements__201=vals;
                let __BREAK__FLAG__=false;
                for(let __iter__200 in __elements__201) {
                    __array__203.push(await __for_body__202(__elements__201[__iter__200]));
                    if(__BREAK__FLAG__) {
                         __array__203.pop();
                        break;
                        
                    }
                }return __array__203;
                 
            })();
            return rval
        }
    }
},{ "name":"and*","fn_args":"(\"&\" vals)","description":["=:+","Similar to and, but unlike and, values that ","are \"\" (blank) or NaN are considered to be true.","Uses is_value? to determine if the value should be considered to be true.","Returns true if the given arguments all are considered a value, ","otherwise false.  If no arguments are provided, returns undefined."],"usage":["val0:*","val1:*","val2:*"],"tags":["truth","and","logic","truthy"],"requires":["not","is_value?"]
});
await Environment.set_global("or*",async function(...vals) {
    if (check_true (((vals && vals.length)>0))){
        {
            let rval=false;
            ;
            await (async function() {
                let __for_body__206=async function(v) {
                    if (check_true (await (await Environment.get_global("is_value?"))(v))){
                        {
                            rval=true;
                            return __BREAK__FLAG__=true;
                            return
                        }
                    }
                };
                let __array__207=[],__elements__205=vals;
                let __BREAK__FLAG__=false;
                for(let __iter__204 in __elements__205) {
                    __array__207.push(await __for_body__206(__elements__205[__iter__204]));
                    if(__BREAK__FLAG__) {
                         __array__207.pop();
                        break;
                        
                    }
                }return __array__207;
                 
            })();
            return rval
        }
    }
},{ "name":"or*","fn_args":"(\"&\" vals)","description":["=:+","Similar to or, but unlike or, values that ","are \"\" (blank) or NaN are considered to be true.","Uses is_value? to determine if the value should be considered to be true.","Returns true if the given arguments all are considered a value, ","otherwise false.  If no arguments are provided, returns undefined."],"usage":["val0:*","val1:*","val2:*"],"tags":["truth","or","logic","truthy"],"requires":["is_value?"]
});
await Environment.set_global("either",async function(...args) {
    let rval;
    rval=null;
    await (async function() {
        let __for_body__210=async function(arg) {
            rval=arg;
            if (check_true ((await (await Environment.get_global("not"))((undefined===arg))&& await (await Environment.get_global("not"))((null===arg))))){
                {
                    return __BREAK__FLAG__=true;
                    return
                }
            }
        };
        let __array__211=[],__elements__209=args;
        let __BREAK__FLAG__=false;
        for(let __iter__208 in __elements__209) {
            __array__211.push(await __for_body__210(__elements__209[__iter__208]));
            if(__BREAK__FLAG__) {
                 __array__211.pop();
                break;
                
            }
        }return __array__211;
         
    })();
    return rval
},{ "name":"either","fn_args":"(\"&\" args)","description":["=:+","Similar to or, but unlike or, returns the first non nil ","or undefined value in the argument list whereas or returns ","the first truthy value."],"usage":["values:*"],"tags":["nil","truthy","logic","or","undefined"],"requires":["not"]
});
{
     Environment.set_global("sanitize_js_ref_name",function(symname) {
        return   (function(){
            if (check_true ( ( Environment.get_global("not"))((symname instanceof String || typeof symname==='string')))) {
                return symname
            } else {
                {
                    let text_chars;
                    let acc;
                    text_chars=(symname).split("");
                    acc=[];
                     ( function() {
                        let __for_body__214=function(t) {
                            return   (function(){
                                if (check_true ((t==="+"))) {
                                    return (acc).push("_plus_")
                                } else if (check_true ((t==="?"))) {
                                    return (acc).push("_ques_")
                                } else if (check_true ((t==="-"))) {
                                    return (acc).push("_")
                                } else if (check_true ((t==="&"))) {
                                    return (acc).push("_amper_")
                                } else if (check_true ((t==="^"))) {
                                    return (acc).push("_carot_")
                                } else if (check_true ((t==="#"))) {
                                    return (acc).push("_hash_")
                                } else if (check_true ((t==="!"))) {
                                    return (acc).push("_exclaim_")
                                } else if (check_true ((t==="*"))) {
                                    return (acc).push("_star_")
                                } else if (check_true ((t==="~"))) {
                                    return (acc).push("_tilde_")
                                } else if (check_true ((t==="~"))) {
                                    return (acc).push("_percent_")
                                } else if (check_true ((t==="|"))) {
                                    return (acc).push("_pipe_")
                                } else if (check_true ( ( Environment.get_global("contains?"))(t,"(){}"))) {
                                    throw new SyntaxError(("Invalid character in symbol: "+ symname));
                                    
                                } else {
                                    return (acc).push(t)
                                }
                            } )()
                        };
                        let __array__215=[],__elements__213=text_chars;
                        let __BREAK__FLAG__=false;
                        for(let __iter__212 in __elements__213) {
                            __array__215.push( __for_body__214(__elements__213[__iter__212]));
                            if(__BREAK__FLAG__) {
                                 __array__215.pop();
                                break;
                                
                            }
                        }return __array__215;
                         
                    })();
                    return (acc).join("")
                }
            }
        } )()
    },{ "name":"sanitize_js_ref_name","fn_args":"(symname)","requires":["not","is_string?","split_by","push","contains?","join"]
})
};
await Environment.set_global("is_symbol?",async function(symbol_to_find) {
    return ["=:not",["=:or",["=:==",["=:typeof",symbol_to_find],"undefined"],["=:==",["=:->","=:Environment","get_global",symbol_to_find,"=:ReferenceError"],"=:ReferenceError"]]]
},{ "eval_when":{ "compile_time":true
},"name":"is_symbol?","macro":true,"fn_args":"(symbol_to_find)","usage":["symbol:string|*"],"description":["=:+","If provided a quoted symbol, will return true if the symbol can be found ","in the local or global contexts."],"tags":["context","env","def"]
});
await Environment.set_global("defvalue",async function(sym,value,meta) {
    return ["=:let",[["=:unquoted_sym",["=:desym",sym]],["=:details",["=:describe","=:unquoted_sym"]]],["=:if","=:details",["=:->","=:Environment","get_global",["=:+","=:details.namespace","/","=:unquoted_sym"]],["=:defglobal",sym,value,meta]]]
},{ "eval_when":{ "compile_time":true
},"name":"defvalue","macro":true,"fn_args":"(sym value meta)","description":["=:+","If the provided symbol is already defined as an accessible ","global value from the current namespace it will return the ","defined value, otherwise it will define the global in the ","current (implicit) namespace or the explicitly referenced ","namespace.  Returns the newly defined value or previously ","defined value."],"usage":["sym:symbol|string","value:*","meta:?object"],"tags":["allocation","reference","symbol","value","set","reference","global"]
});
await Environment.set_global("defparameter",async function(sym,value,meta) {
    return ["=:use_quoted_initializer",["=:defglobal",sym,value,meta]]
},{ "eval_when":{ "compile_time":true
},"name":"defparameter","macro":true,"fn_args":"(sym value meta)","description":["=:+","Defines a global that is always reset to the provided value, ","when called or when the image is reloaded, ensuring that the ","initial value is always set to a specific value.  If the value ","is already defined, it will be overwritten.  To set a symbol in ","an explicit namespace, provide a fully qualified symbol name ","in the form of namspace/symname as the symbol to be defined. ","Returns the defined value."],"usage":["sym:symbol|string","value:*","meta:?object"],"tags":["allocation","reference","symbol","value","set","reference","global"]
});
await Environment.set_global("get_function_args",async function(f) {
    let r;
    let s;
    r=new RegExp("^[a-zA-Z_]+ [a-zA-Z ]*\\\\(([a-zA-Z 0-9_,\\\\.\\\\n]*)\\\\)","gm");
    s=await f["toString"]();
    r=await (async function(){
         return await (await Environment.get_global("scan_str"))(r,s) 
    })();
    if (check_true ((((r && r.length)>0)&& ((r && r["0"]) instanceof Object)))){
        {
            return await (await Environment.get_global("map"))(async function(v) {
                if (check_true (await (await Environment.get_global("ends_with?"))("\n",v))){
                    return await (await Environment.get_global("chop"))(v)
                } else {
                    return v
                }
            },((await (await Environment.get_global("second"))((r && r["0"]))|| "")).split(","))
        }
    }
},{ "name":"get_function_args","fn_args":"(f)","description":"Given a javascript function, return a list of arg names for that function","usage":["function:function"],"tags":["function","introspect","introspection","arguments"],"requires":["scan_str","is_object?","map","ends_with?","chop","split_by","second"]
});
await Environment.set_global("findpaths",async function(value,structure) {
    let acc;
    let search;
    acc=[];
    search=async function(struct,_cpath) {
        return await async function(){
            if (check_true ((struct instanceof Array))) {
                return await (await Environment.get_global("map"))(async function(elem,idx) {
                    return await async function(){
                        if (check_true ((elem instanceof Object))) {
                            return await search(elem,await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__216=idx;
                                 if (__array_op_rval__216 instanceof Function){
                                    return await __array_op_rval__216() 
                                } else {
                                    return [__array_op_rval__216]
                                }
                            })()))
                        } else if (check_true ((elem===value))) {
                            return (acc).push(await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__217=idx;
                                 if (__array_op_rval__217 instanceof Function){
                                    return await __array_op_rval__217() 
                                } else {
                                    return [__array_op_rval__217]
                                }
                            })()))
                        }
                    } ()
                },struct)
            } else if (check_true ((struct instanceof Object))) {
                return await (await Environment.get_global("map"))(async function(pset) {
                    return await async function(){
                        if (check_true (((pset && pset["1"]) instanceof Object))) {
                            return await search((pset && pset["1"]),await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__218=(pset && pset["0"]);
                                 if (__array_op_rval__218 instanceof Function){
                                    return await __array_op_rval__218() 
                                } else {
                                    return [__array_op_rval__218]
                                }
                            })()))
                        } else if (check_true (((pset && pset["1"])===value))) {
                            return (acc).push(await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__219=(pset && pset["1"]);
                                 if (__array_op_rval__219 instanceof Function){
                                    return await __array_op_rval__219() 
                                } else {
                                    return [__array_op_rval__219]
                                }
                            })()))
                        }
                    } ()
                },await (await Environment.get_global("pairs"))(struct))
            } else if (check_true ((struct===value))) {
                return (acc).push(_cpath)
            }
        } ()
    };
    await search(structure,[]);
    return acc
},{ "name":"findpaths","fn_args":"(value structure)","requires":["is_array?","map","is_object?","conj","push","pairs"]
});
await Environment.set_global("warn",await (async function(){
     return await (await Environment.get_global("defclog"))({
        prefix:"⚠️  "
    }) 
})(),{
    description:"Prefixes a warning symbol prior to the arguments to the console.  Otherwise the same as console.log.",usage:["args0:*","argsN:*"],tags:["log","warning","error","signal","output","notify","defclog"],initializer:await (async function(){
         return ["=:defclog",{ "prefix":"⚠️  "
    }] 
})(),requires:["defclog"]
});
await Environment.set_global("success",await (async function(){
     return await (await Environment.get_global("defclog"))({
        color:"green",prefix:"✓  "
    }) 
})(),{
    description:"Prefixes a green checkmark symbol prior to the arguments to the console.  Otherwise the same as console.log.",usage:["args0:*","argsN:*"],tags:["log","warning","notify","signal","output","ok","success","defclog"],initializer:await (async function(){
         return ["=:defclog",{ "color":"green","prefix":"✓  "
    }] 
})(),requires:["defclog"]
});
await Environment.set_global("in_background",async function(...forms) {
    return ["=:new","=:Promise",["=:fn",["=:resolve","=:reject"],["=:progn",["=:resolve",true],].concat(forms)]]
},{ "eval_when":{ "compile_time":true
},"name":"in_background","macro":true,"fn_args":"(\"&\" forms)","description":["=:+","Given a form or forms, evaluates the forms in the background, with ","the function returning true immediately prior to starting the forms."],"usage":["forms:*"],"tags":["eval","background","promise","evaluation"]
});
await Environment.set_global("set_compiler",async function(compiler_function) {
    await Environment["set_compiler"].call(Environment,compiler_function);
    return compiler_function
},{ "name":"set_compiler","fn_args":"(compiler_function)","description":["=:+","Given a compiled compiler function, installs the provided function as the ","environment's compiler, and returns the compiler function."],"usage":["compiler_function:function"],"tags":["compilation","environment","compiler"]
});
await Environment.set_global("show",async function(thing) {
    return await async function(){
        if (check_true (thing instanceof Function)) {
            return await thing["toString"]()
        } else {
            return thing
        }
    } ()
},{ "name":"show","fn_args":"(thing)","usage":["thing:function"],"description":"Given a name to a compiled function, returns the source of the compiled function.  Otherwise just returns the passed argument.","tags":["compile","source","javascript","js","display"],"requires":["is_function?"]
});
await Environment.set_global("export_symbols",async function(...args) {
    let acc;
    let numargs;
    let idx;
    acc=await (async function(){
         return ["=:javascript","export","{"] 
    })();
    numargs=await (await Environment.get_global("length"))(args);
    idx=0;
    await (async function() {
        let __for_body__222=async function(symname) {
            await async function(){
                if (check_true (((symname instanceof Array)&& ((symname && symname.length)===2)))) {
                    {
                        (acc).push(await (async function(){
                            let mval;
                            mval=(symname && symname["0"]);
                            if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                                return await mval["substr"].call(mval,2)
                            } else {
                                return mval
                            }
                        })());
                        (acc).push(" as ");
                        return (acc).push(await (async function(){
                            let mval;
                            mval=(symname && symname["1"]);
                            if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                                return await mval["substr"].call(mval,2)
                            } else {
                                return mval
                            }
                        })())
                    }
                } else if (check_true ((symname instanceof String || typeof symname==='string'))) {
                    (acc).push(await (async function(){
                        let mval;
                        mval=symname;
                        if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                            return await mval["substr"].call(mval,2)
                        } else {
                            return mval
                        }
                    })())
                } else {
                    throw new SyntaxError("Invalid argument for export");
                    
                }
            } ();
            idx+=1;
            if (check_true ((idx<numargs))){
                return (acc).push(", ")
            }
        };
        let __array__223=[],__elements__221=args;
        let __BREAK__FLAG__=false;
        for(let __iter__220 in __elements__221) {
            __array__223.push(await __for_body__222(__elements__221[__iter__220]));
            if(__BREAK__FLAG__) {
                 __array__223.pop();
                break;
                
            }
        }return __array__223;
         
    })();
    return (acc).push("}")
},{ "eval_when":{ "compile_time":true
},"name":"export_symbols","macro":true,"fn_args":"(\"&\" args)","requires":["length","is_array?","push","is_string?","starts_with?"]
});
await Environment.set_global("register_feature",async function(feature) {
    if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("contains?"))(feature,(await Environment.get_global("*env_config*.features")))))){
        {
            ((await Environment.get_global("*env_config*.features"))).push(feature);
            return true
        }
    } else {
        return false
    }
},{ "name":"register_feature","fn_args":"(feature)","description":"Adds the provided string to the *env_config* features.  Features are used to mark what functionality is present in the environment.","tags":["environment","modules","libraries","namespaces"],"usage":["feature:string"],"requires":["not","contains?","*env_config*","push"]
});
await Environment.set_global("object_methods",async function(obj) {
    let properties;
    let current_obj;
    properties=new Set();
    current_obj=obj;
    await (async function(){
         let __test_condition__224=async function() {
            return current_obj
        };
        let __body_ref__225=async function() {
            await (await Environment.get_global("map"))(async function(item) {
                return await properties["add"].call(properties,item)
            },await Object.getOwnPropertyNames(current_obj));
            return current_obj=await Object.getPrototypeOf(current_obj)
        };
        let __BREAK__FLAG__=false;
        while(await __test_condition__224()) {
            await __body_ref__225();
             if(__BREAK__FLAG__) {
                 break;
                
            }
        } ;
        
    })();
    return await (async function() {
        {
             let __call_target__=await Array.from(await properties["keys"]()), __call_method__="filter";
            return await __call_target__[__call_method__].call(__call_target__,async function(item) {
                return item instanceof Function
            })
        } 
    })()
},{ "name":"object_methods","fn_args":"(obj)","description":"Given a instantiated object, get all methods (functions) that the object and it's prototype chain contains.","usage":["obj:object"],"tags":["object","methods","functions","introspection","keys"],"requires":["map","is_function?"]
});
await Environment.set_global("uniq",async function(values,handle_complex_types) {
    let s;
    s=new Set();
    if (check_true (handle_complex_types)){
        {
            await (await Environment.get_global("map"))(async function(x) {
                return await s["add"].call(s,await JSON.stringify(x))
            },(values|| []));
            return await (await Environment.get_global("map"))(async function(x) {
                return await JSON.parse(x)
            },await (async function(){
                 return await (await Environment.get_global("to_array"))(s) 
            })())
        }
    } else {
        {
            await (await Environment.get_global("map"))(async function(x) {
                return await s["add"].call(s,x)
            },(values|| []));
            return await (await Environment.get_global("to_array"))(s)
        }
    }
},{ "name":"uniq","fn_args":"(values handle_complex_types)","description":["=:+","Given a list of values, returns a new list with unique, deduplicated values. ","If the values list contains complex types such as objects or arrays, set the ","handle_complex_types argument to true so they are handled appropriately. "],"usage":["values:list","handle_complex_types:boolean"],"tags":["list","dedup","duplicates","unique","values"],"requires":["map","to_array"]
});
await Environment.set_global("time_in_millis",async function() {
    return ["=:Date.now"]
},{ "eval_when":{ "compile_time":true
},"name":"time_in_millis","macro":true,"fn_args":"()","usage":[],"tags":["time","milliseconds","number","integer","date"],"description":"Returns the current time in milliseconds as an integer"
});
await Environment.set_global("defns",async function(name,options) {
    if (check_true ((options&& (options && options["ignore_if_exists"])&& (name instanceof String || typeof name==='string')&& await (await Environment.get_global("contains?"))(name,await (await Environment.get_global("namespaces"))())))){
        return name
    } else {
        return await (await Environment.get_global("create_namespace"))(name,options)
    }
},{ "name":"defns","fn_args":"(name options)","usage":["name:string","options:object"],"description":["=:+","Given a name and an optional options object, creates a new namespace ","identified by the name argument.  If the options object is provided, the following keys are available:","<br>","ignore_if_exists:boolean:If set to true, if the namespace is already defined, do not return an error ","and instead just return with the name of the requested namespace. Any other options are ignored and ","the existing namespace isn't altered.","contained:boolean:If set to true, the newly defined namespace will not have visibility to other namespaces ","beyond 'core' and itself.  Any fully qualified symbols that reference other non-core namespaces will ","fail.","serialize_with_image:boolean:If set to false, if the environment is saved, the namespace will not be ","included in the saved image file.  Default is true."],"tags":["namespace","environment","define","scope","context"],"requires":["is_string?","contains?","namespaces","create_namespace"]
});
await Environment.set_global("use_ns",async function(name) {
    return ["=:set_namespace",["=:desym",name]]
},{ "eval_when":{ "compile_time":true
},"name":"use_ns","macro":true,"fn_args":"(name)","usage":["name:symbol"],"description":"Sets the current namespace to the provided name.  Returns the name of the new namespace if succesful, otherwise an Eval error is thrown","tags":["namespace","environment","scope","change","set"]
});
await Environment.set_global("bind_and_call",async function(target_object,this_object,method,...args) {
    let boundf=await (await Environment.get_global("bind"))(target_object[method],this_object);
    ;
    if (check_true (boundf)){
        return await (async function(){
            return ( boundf).apply(this,args)
        })()
    } else {
        throw new Error("unable to bind target_object");
        
    }
},{ "name":"bind_and_call","fn_args":"(target_object this_object method \"&\" args)","usage":["target_object:object","this_object:object","method:string","args0:*","argsn:*"],"description":"Binds the provided method of the target object with the this_object context, and then calls the object method with the optional provided arguments.","tags":["bind","object","this","context","call"],"requires":["bind"]
});
await Environment.set_global("document",new Object());
await Environment.set_global("save_locally",async function(fname,data,content_type) {
    if (check_true (window["document"])){
        {
            let blob;
            let elem;
            let dbody;
            blob=new Blob(await (async function(){
                let __array_op_rval__228=data;
                 if (__array_op_rval__228 instanceof Function){
                    return await __array_op_rval__228() 
                } else {
                    return [__array_op_rval__228]
                }
            })(),{
                type:content_type
            });
            elem=await (async function() {
                {
                     let __call_target__=window["document"], __call_method__="createElement";
                    return await __call_target__[__call_method__].call(__call_target__,"a")
                } 
            })();
            dbody=await (async function(){
                let __targ__229=(await Environment.get_global("document"));
                if (__targ__229){
                     return(__targ__229)["body"]
                } 
            })();
            ;
            await async function(){
                elem["href"]=await window.URL["createObjectURL"].call(window.URL,blob);
                elem["download"]=fname;
                return elem;
                
            }();
            await dbody["appendChild"].call(dbody,elem);
            await elem["click"]();
            await dbody["removeChild"].call(dbody,elem);
            return true
        }
    } else {
        return false
    }
},{ "name":"save_locally","fn_args":"(fname data content_type)","description":["=:+","Provided a filename, a data buffer, and a MIME type, such as \"text/javascript\", ","triggers a browser download of the provided data with the filename.  Depending ","on the browser configuration, the data will be saved to the configured ","user download directory, or prompt the user for a save location. "],"usage":["filename:string","data:*","content_type:string"],"tags":["save","download","browser"],"requires":["document"]
});
await (await Environment.get_global("undefine"))("document");
await Environment.set_global("fetch_text",async function(url) {
    let resp;
    resp=await fetch(url);
    if (check_true ((resp && resp["ok"]))){
        return await resp["text"]()
    } else {
        throw new EvalError(("unable to fetch "+ url+ ": "+ (resp && resp["status"])+ ": "+ (resp && resp["statusText"])));
        
    }
},{ "name":"fetch_text","fn_args":"(url)","description":["=:+","Given a url, returns the text content of that url. ","This function is a helper function for the import macro."],"usage":["url:string"],"tags":["fetch","text","string"]
});
await Environment.set_global("import",async function(...args) {
    let filespec;
    let is_url_ques_;
    let js_mode;
    let url_comps;
    let js_mod;
    let load_fn;
    let target_symbols;
    let target_path;
    let acc;
    filespec=await (await Environment.get_global("last"))(args);
    is_url_ques_=await (await Environment.get_global("contains?"))("://",filespec);
    js_mode=null;
    url_comps=null;
    js_mod=null;
    load_fn=null;
    target_symbols=await (async function(){
        if (check_true (((args && args.length)>1))){
            return (args && args["0"])
        }
    })();
    target_path=null;
    acc=[];
    await async function(){
        if (check_true ((is_url_ques_|| await (await Environment.get_global("not"))((null==location))))) {
            {
                load_fn="fetch_text";
                url_comps=await (async function(){
                     return await async function(){
                        if (check_true (is_url_ques_)) {
                            return new URL(filespec)
                        } else if (check_true (await (await Environment.get_global("starts_with?"))("/",filespec))) {
                            return new URL((""+ location["origin"]+ filespec))
                        } else {
                            return new URL((""+ location["href"]+ "/"+ filespec))
                        }
                    } () 
                })();
                return target_path=(url_comps && url_comps["pathname"])
            }
        } else if (check_true (await (await Environment.get_global("not"))(((typeof "read_text_file"==="undefined")|| (await Environment["get_global"].call(Environment,"read_text_file",ReferenceError)===ReferenceError))))) {
            {
                load_fn="read_text_file";
                target_path=filespec
            }
        } else {
            throw new EvalError(("unable to handle import of "+ filespec));
            
        }
    } ();
    return await async function(){
        if (check_true ((await (await Environment.get_global("ends_with?"))(".lisp",target_path)|| await (await Environment.get_global("ends_with?"))(".juno",target_path)))) {
            return ["=:evaluate",[await (async function(){
                 return ("=:"+ load_fn) 
            })(),filespec],"=:nil",["=:to_object",[["source_name",filespec],["throw_on_error",true]]]]
        } else if (check_true (await (await Environment.get_global("ends_with?"))(".json",target_path))) {
            return ["=:evaluate",["=:JSON.parse",[await (async function(){
                 return ("=:"+ load_fn) 
            })(),filespec]],"=:nil",["=:to_object",[["json_in",true],["source_name",filespec],["throw_on_error",true]]]]
        } else if (check_true ((await (await Environment.get_global("ends_with?"))(".js",target_path)|| (await (await Environment.get_global("not"))(((typeof "Deno"==="undefined")|| (await Environment["get_global"].call(Environment,"Deno",ReferenceError)===ReferenceError)))&& await (await Environment.get_global("ends_with?"))(".ts",target_path))))) {
            {
                return await async function(){
                    if (check_true ((await (await Environment.get_global("length"))(target_symbols)===0))) {
                        throw new SyntaxError("imports of javascript sources require binding symbols as the first argument");
                        
                    } else if (check_true ((target_symbols instanceof Array))) {
                        {
                            (acc).push(await (async function(){
                                 return ["=:defglobal",(target_symbols && target_symbols["0"]),["=:dynamic_import",filespec]] 
                            })());
                            (acc).push(await (async function(){
                                 return ["=:set_path",["imports",["=:+",await (await Environment.get_global("current_namespace"))(),"/",["=:desym",(target_symbols && target_symbols["0"])]]],"=:*env_config*",["=:to_object",[["symbol",["=:desym",(target_symbols && target_symbols["0"])]],["namespace",await (await Environment.get_global("current_namespace"))()],["location",filespec]]]] 
                            })());
                            (acc).push(await (async function(){
                                 return ["=:when",["=:prop",(target_symbols && target_symbols["0"]),"initializer"],["=:->",(target_symbols && target_symbols["0"]),"initializer","=:Environment"]] 
                            })());
                            (acc).push((target_symbols && target_symbols["0"]));
                            return ["=:iprogn",].concat(acc)
                        }
                    }
                } ()
            }
        } else {
            throw new EvalError("invalid extension: needs to be .lisp, .js, .json or .juno");
            
        }
    } ()
},{ "eval_when":{ "compile_time":true
},"name":"import","macro":true,"fn_args":"(\"&\" args)","description":["=:+","Load the contents of the specified source file (including path) into the Lisp environment ","in the current namespace.<br>","If the file is a Lisp source, it will be evaluated as part of the load and the final result returned.","If the file is a JS source, it will be loaded into the environment and a handle returned.","When importing non-Lisp sources (javascript or typescript), import requires a binding symbol in an array ","as the first argument.<br","The allowed extensions are .lisp, .js, .json, .juno, and if the JS platform is Deno, ",".ts is allowed.  Otherwise an EvalError will be thrown due to a non-handled file type.","Examples:<br>","Lisp/JSON: (import \"tests/compiler_tests.lisp\")<br>","JS/TS: (import (logger) \"https://deno.land/std@0.148.0/log/mod.ts\""],"tags":["compile","read","io","file","get","fetch","load"],"usage":["binding_symbols:array","filename:string"],"requires":["last","contains?","not","starts_with?","ends_with?","length","is_array?","push","current_namespace"]
});
await Environment.set_global("system_date_format",{
    weekday:"long",year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",second:"numeric",fractionalSecondDigits:3,hourCycle:"h24",hour12:false,timeZoneName:"short"
},{
    description:("The system date format structure that is used by the system_date_formatter."+ "If modified, the system_date_formatter, which is a Intl.DateTimeFormat object "+ "should be reinitialized by calling (new Intl.DateTimeFormat [] system_date_format)."),tags:["time","date","system"]
});
await Environment.set_global("system_date_formatter",new Intl.DateTimeFormat([],(await Environment.get_global("system_date_format"))),{
    initializer:await (async function(){
         return ["=:new","=:Intl.DateTimeFormat",[],(await Environment.get_global("system_date_format"))] 
    })(),tags:["time","date","system"],description:"The instantiation of the system_date_format.  See system_date_format for additional information.",requires:["system_date_format"]
});
await Environment.set_global("tzoffset",async function() {
    return (60* await (async function() {
        {
             let __call_target__=new Date(), __call_method__="getTimezoneOffset";
            return await __call_target__[__call_method__]()
        } 
    })())
},{ "name":"tzoffset","fn_args":"()","description":"Returns the number of seconds the local timezone is offset from GMT","usage":[],"tags":["time","date","timezone"]
});
await Environment.set_global("date_components",async function(date_value,date_formatter) {
    if (check_true (await (await Environment.get_global("is_date?"))(date_value))){
        return await (await Environment.get_global("to_object"))(await (async function(){
             return await (await Environment.get_global("map"))(async function(x) {
                return await (async function(){
                    let __array_op_rval__231=(x && x["type"]);
                     if (__array_op_rval__231 instanceof Function){
                        return await __array_op_rval__231((x && x["value"])) 
                    } else {
                        return [__array_op_rval__231,(x && x["value"])]
                    }
                })()
            },await (async function(){
                if (check_true (date_formatter)){
                    return await (await Environment.get_global("bind_and_call"))(date_formatter,date_formatter,"formatToParts",date_value)
                } else {
                    return await (await Environment.get_global("bind_and_call"))((await Environment.get_global("system_date_formatter")),(await Environment.get_global("system_date_formatter")),"formatToParts",date_value)
                }
            })()) 
        })())
    } else {
        return null
    }
},{ "name":"date_components","fn_args":"(date_value date_formatter)","usage":["date_value:Date","date_formatter:DateTimeFormat?"],"description":"Given a date value, returns an object containing a the current time information broken down by time component. Optionally pass a Intl.DateTimeFormat object as a second argument.","tags":["date","time","object","component"],"requires":["is_date?","to_object","map","bind_and_call","system_date_formatter"]
});
await Environment.set_global("formatted_date",async function(dval,date_formatter) {
    let comps;
    comps=await (async function(){
         return await (await Environment.get_global("date_components"))(dval,date_formatter) 
    })();
    if (check_true (comps)){
        if (check_true (date_formatter)){
            return (await (await Environment.get_global("values"))(comps)).join("")
        } else {
            return (""+ (comps && comps["year"])+ "-"+ (comps && comps["month"])+ "-"+ (comps && comps["day"])+ " "+ (comps && comps["hour"])+ ":"+ (comps && comps["minute"])+ ":"+ (comps && comps["second"]))
        }
    } else {
        return null
    }
},{ "name":"formatted_date","fn_args":"(dval date_formatter)","usage":["dval:Date","date_formatter:DateTimeFormat?"],"description":"Given a date object, return a formatted string in the form of: \"yyyy-MM-d HH:mm:ss\".  Optionally pass a Intl.DateTimeFormat object as a second argument.","tags":["date","format","time","string"],"requires":["date_components","join","values"]
});
await Environment.set_global("*LANGUAGE*",new Object());
{
     Environment.set_global("dtext",function(default_text) {
        return ( ( function(){
            let __targ__232=( Environment.get_global("*LANGUAGE*"));
            if (__targ__232){
                 return(__targ__232)[default_text]
            } 
        })()|| default_text)
    },{ "name":"dtext","fn_args":"(default_text)","usage":["text:string","key:string?"],"description":["=:+","Given a default text string and an optional key, if a key ","exists in the global object *LANGUAGE*, return the text associated with the key. ","If no key is provided, attempts to find the default text as a key in the *LANGUAGE* object. ","If that is a nil entry, returns the default text."],"tags":["text","multi-lingual","language","translation","translate"],"requires":["*LANGUAGE*"]
})
};
await Environment.set_global("nth",async function(idx,collection) {
    return await async function(){
        if (check_true ((idx instanceof Array))) {
            return await (await Environment.get_global("map"))(async function(v) {
                return await (await Environment.get_global("nth"))(v,collection)
            },idx)
        } else if (check_true ((await (await Environment.get_global("is_number?"))(idx)&& (idx<0)&& (await (await Environment.get_global("length"))(collection)>=(-1* idx))))) {
            return collection[await (await Environment.get_global("add"))(await (await Environment.get_global("length"))(collection),idx)]
        } else if (check_true ((await (await Environment.get_global("is_number?"))(idx)&& (idx<0)&& (await (await Environment.get_global("length"))(collection)<(-1* idx))))) {
            return undefined
        } else {
            return collection[idx]
        }
    } ()
},{ "name":"nth","fn_args":"(idx collection)","description":["=:+","Based on the index or index list passed as the first argument, ","and a collection as a second argument, return the specified values ","from the collection. If an index value is negative, the value ","retrieved will be at the offset starting from the end of the array, ","i.e. -1 will return the last value in the array."],"tags":["filter","select","pluck","object","list","key","array"],"usage":["idx:string|number|array","collection:list|object"],"requires":["is_array?","map","nth","is_number?","length","add"]
});
await Environment.set_global("use_symbols",async function(namespace,symbol_list,target_namespace) {
    let acc;
    let nspace;
    let nspace_handle;
    let decs;
    acc=await (async function(){
         return ["=:progn"] 
    })();
    nspace=await (async function(){
        if (check_true (namespace)){
            {
                let mval;
                mval=namespace;
                if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                    return await mval["substr"].call(mval,2)
                } else {
                    return mval
                }
            }
        }
    })();
    nspace_handle=null;
    decs=null;
    await (await Environment.get_global("assert"))((nspace instanceof String || typeof nspace==='string'));
    await (await Environment.get_global("assert"))((symbol_list instanceof Array),"invalid symbol list provided to use_symbols");
    nspace_handle=await Environment["get_namespace_handle"].call(Environment,nspace);
    await (async function() {
        let __for_body__235=async function(sym) {
            decs=await (async function(){
                let __targ__237=(nspace_handle && nspace_handle["definitions"]);
                if (__targ__237){
                     return(__targ__237)[await (async function(){
                        let mval;
                        mval=sym;
                        if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                            return await mval["substr"].call(mval,2)
                        } else {
                            return mval
                        }
                    })()]
                } 
            })();
            return (acc).push(await (async function(){
                 return ["=:defglobal",await (async function(){
                    let mval;
                    mval=sym;
                    if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                        return await mval["substr"].call(mval,2)
                    } else {
                        return mval
                    }
                })(),await (async function(){
                     return ("=:"+ nspace+ "/"+ await (async function(){
                        let mval;
                        mval=sym;
                        if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                            return await mval["substr"].call(mval,2)
                        } else {
                            return mval
                        }
                    })()) 
                })(),["=:to_object",[["initializer",["=:quotem",["=:pend_load",nspace,await (async function(){
                     return (target_namespace|| await (await Environment.get_global("current_namespace"))()) 
                })(),await (async function(){
                    let mval;
                    mval=sym;
                    if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                        return await mval["substr"].call(mval,2)
                    } else {
                        return mval
                    }
                })(),await (async function(){
                     return ("=:"+ nspace+ "/"+ await (async function(){
                        let mval;
                        mval=sym;
                        if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                            return await mval["substr"].call(mval,2)
                        } else {
                            return mval
                        }
                    })()) 
                })()]]],["=:quotem",["require_ns",nspace]],["=:quotem",["requires",[await (async function(){
                     return (""+ nspace+ "/"+ await (async function(){
                        let mval;
                        mval=sym;
                        if (check_true (((mval instanceof String || typeof mval==='string')&& await (await Environment.get_global("starts_with?"))("=:",mval)))){
                            return await mval["substr"].call(mval,2)
                        } else {
                            return mval
                        }
                    })()) 
                })()]]],["eval_when",await (async function(){
                     return ((decs&& decs["eval_when"])|| new Object()) 
                })()]]]] 
            })())
        };
        let __array__236=[],__elements__234=symbol_list;
        let __BREAK__FLAG__=false;
        for(let __iter__233 in __elements__234) {
            __array__236.push(await __for_body__235(__elements__234[__iter__233]));
            if(__BREAK__FLAG__) {
                 __array__236.pop();
                break;
                
            }
        }return __array__236;
         
    })();
    return acc
},{ "eval_when":{ "compile_time":true
},"name":"use_symbols","macro":true,"fn_args":"(namespace symbol_list target_namespace)","description":["=:+","Given a namespace and an array of symbols (quoted or unquoted), ","the macro will faciltate the binding of the symbols into the ","current namespace."],"usage":["namespace:string|symbol","symbol_list:array","target_namespace?:string"],"tags":["namespace","binding","import","use","symbols"],"requires":["is_string?","starts_with?","assert","is_array?","push","current_namespace"]
});
await Environment.set_global("use_unique_symbols",async function(namespace) {
    if (check_true ((namespace instanceof String || typeof namespace==='string'))){
        {
            let symlist;
            symlist=await Environment["evaluate"].call(Environment,("("+ namespace+ "/symbols { `unique: true })"));
            (await Environment.eval(await async function(){
                return ["=:use_symbols",namespace,symlist]
            }()));
            return await (await Environment.get_global("length"))(symlist)
        }
    } else {
        throw new EvalError("provided namespace must be a string");
        
    }
},{ "name":"use_unique_symbols","fn_args":"(namespace)","description":["=:+","This function binds all symbols unique to the provided ","namespace identifier into the current namespace. Returns ","the amount of symbol bound."],"usage":["namespace:string"],"tags":["namespace","binding","import","use","symbols"],"requires":["is_string?","length"]
});
await Environment.set_global("decomp_symbol",async function(quoted_sym) {
    let comps;
    comps=(quoted_sym).split("/");
    if (check_true (((comps && comps.length)===1))){
        return await (async function(){
            let __array_op_rval__238=(comps && comps["0"]);
             if (__array_op_rval__238 instanceof Function){
                return await __array_op_rval__238(await (await Environment.get_global("first"))(await (async function(){
                     return await (await Environment.get_global("each"))(await (async function(){
                         return await (await Environment.get_global("describe"))(quoted_sym,true) 
                    })(),"namespace") 
                })()),false) 
            } else {
                return [__array_op_rval__238,await (await Environment.get_global("first"))(await (async function(){
                     return await (await Environment.get_global("each"))(await (async function(){
                         return await (await Environment.get_global("describe"))(quoted_sym,true) 
                    })(),"namespace") 
                })()),false]
            }
        })()
    } else {
        return await (async function(){
            let __array_op_rval__239=(comps && comps["1"]);
             if (__array_op_rval__239 instanceof Function){
                return await __array_op_rval__239((comps && comps["0"]),true) 
            } else {
                return [__array_op_rval__239,(comps && comps["0"]),true]
            }
        })()
    }
},{ "name":"decomp_symbol","fn_args":"(quoted_sym)","requires":["split_by","first","each","describe"]
});
await Environment.set_global("sort_dependencies",async function() {
    let ordered;
    let ns;
    let symname;
    let ns_marker;
    let symbol_marker;
    let splice_before;
    let current_pos;
    ordered=[];
    ns=null;
    symname=null;
    ns_marker=function(ns) {
        return ("*NS:"+ ns)
    };
    symbol_marker=function(ns,symbol_name) {
        return (""+ ns+ "/"+ symbol_name)
    };
    splice_before=async function(target_name,value_to_insert) {
        let idx;
        let value_idx;
        idx=await (await Environment.get_global("index_of"))(target_name,ordered);
        value_idx=await (await Environment.get_global("index_of"))(value_to_insert,ordered);
        return await async function(){
            if (check_true (((value_idx>-1)&& (value_idx===idx)))) {
                return true
            } else if (check_true (((value_idx>-1)&& (value_idx<idx)))) {
                return true
            } else if (check_true (((idx>-1)&& (value_idx===-1)))) {
                return await ordered["splice"].call(ordered,idx,0,value_to_insert)
            } else if (check_true (((idx===-1)&& (value_idx>-1)))) {
                return (ordered).push(target_name)
            } else if (check_true ((idx===-1))) {
                {
                    (ordered).push(value_to_insert);
                    return (ordered).push(target_name)
                }
            } else if (check_true (((idx>-1)&& (value_idx>-1)&& (idx<value_idx)))) {
                {
                    await ordered["splice"].call(ordered,value_idx,1);
                    return await ordered["splice"].call(ordered,idx,0,value_to_insert)
                }
            } else {
                return await console.log("fall through: target: ",target_name,"@",idx,"  ",value_to_insert,"@",value_idx)
            }
        } ()
    };
    current_pos=null;
    await (async function() {
        let __for_body__242=async function(name) {
            ns=await Environment["get_namespace_handle"].call(Environment,name);
            return await (async function() {
                let __for_body__246=async function(pset) {
                    {
                        let __symname__248= async function(){
                            return (pset && pset["0"])
                        };
                        let symdef;
                        {
                            let symname=await __symname__248();
                            ;
                            symdef=(pset && pset["1"]);
                            return await async function(){
                                if (check_true ((symdef && symdef["requires"]))) {
                                    return await (async function() {
                                        let __for_body__251=async function(req) {
                                            {
                                                let _expr_56718;
                                                let req_sym;
                                                let req_ns;
                                                let explicit;
                                                _expr_56718=await (async function(){
                                                     return await (await Environment.get_global("decomp_symbol"))(req) 
                                                })();
                                                req_sym=(_expr_56718 && _expr_56718["0"]);
                                                req_ns=(_expr_56718 && _expr_56718["1"]);
                                                explicit=(_expr_56718 && _expr_56718["2"]);
                                                if (check_true (req_ns)){
                                                    {
                                                        return await splice_before(await symbol_marker(name,symname),await symbol_marker(req_ns,req_sym))
                                                    }
                                                }
                                            }
                                        };
                                        let __array__252=[],__elements__250=(symdef && symdef["requires"]);
                                        let __BREAK__FLAG__=false;
                                        for(let __iter__249 in __elements__250) {
                                            __array__252.push(await __for_body__251(__elements__250[__iter__249]));
                                            if(__BREAK__FLAG__) {
                                                 __array__252.pop();
                                                break;
                                                
                                            }
                                        }return __array__252;
                                         
                                    })()
                                } else {
                                    {
                                        if (check_true ((await (await Environment.get_global("index_of"))(await symbol_marker(name,symname),ordered)===-1))){
                                            {
                                                return (ordered).push(await symbol_marker(name,symname))
                                            }
                                        }
                                    }
                                }
                            } ()
                        }
                    }
                };
                let __array__247=[],__elements__245=await (await Environment.get_global("pairs"))((ns && ns["definitions"]));
                let __BREAK__FLAG__=false;
                for(let __iter__244 in __elements__245) {
                    __array__247.push(await __for_body__246(__elements__245[__iter__244]));
                    if(__BREAK__FLAG__) {
                         __array__247.pop();
                        break;
                        
                    }
                }return __array__247;
                 
            })()
        };
        let __array__243=[],__elements__241=await (await Environment.get_global("conj"))(["core"],await (async function(){
            let __collector;
            let __result;
            let __action;
            __collector=[];
            __result=null;
            __action=async function(name) {
                if (check_true (await (await Environment.get_global("not"))((name==="core")))){
                    {
                        return name
                    }
                }
            };
            ;
            await (async function() {
                let __for_body__255=async function(__item) {
                    __result=await __action(__item);
                    if (check_true (__result)){
                        return (__collector).push(__result)
                    }
                };
                let __array__256=[],__elements__254=await (await Environment.get_global("namespaces"))();
                let __BREAK__FLAG__=false;
                for(let __iter__253 in __elements__254) {
                    __array__256.push(await __for_body__255(__elements__254[__iter__253]));
                    if(__BREAK__FLAG__) {
                         __array__256.pop();
                        break;
                        
                    }
                }return __array__256;
                 
            })();
            return __collector
        })());
        let __BREAK__FLAG__=false;
        for(let __iter__240 in __elements__241) {
            __array__243.push(await __for_body__242(__elements__241[__iter__240]));
            if(__BREAK__FLAG__) {
                 __array__243.pop();
                break;
                
            }
        }return __array__243;
         
    })();
    return {
        namespaces:await (async function(){
            let acc;
            acc=[];
            {
                let __collector;
                let __result;
                let __action;
                __collector=[];
                __result=null;
                __action=async function(sym) {
                    let _expr_96275;
                    let nspace;
                    _expr_96275=await (async function(){
                         return await (await Environment.get_global("decomp_symbol"))(sym) 
                    })();
                    sym=(_expr_96275 && _expr_96275["0"]);
                    nspace=(_expr_96275 && _expr_96275["1"]);
                    if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("contains?"))(nspace,acc)))){
                        {
                            (acc).push(nspace);
                            return nspace
                        }
                    }
                };
                ;
                await (async function() {
                    let __for_body__259=async function(__item) {
                        __result=await __action(__item);
                        if (check_true (__result)){
                            return (__collector).push(__result)
                        }
                    };
                    let __array__260=[],__elements__258=ordered;
                    let __BREAK__FLAG__=false;
                    for(let __iter__257 in __elements__258) {
                        __array__260.push(await __for_body__259(__elements__258[__iter__257]));
                        if(__BREAK__FLAG__) {
                             __array__260.pop();
                            break;
                            
                        }
                    }return __array__260;
                     
                })();
                return __collector
            }
        })(),symbols:ordered
    }
},{ "name":"sort_dependencies","fn_args":"()","requires":["index_of","push","decomp_symbol","pairs","conj","not","namespaces","contains?"]
});
return true
}
}