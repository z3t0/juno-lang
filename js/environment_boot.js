// Source: undefined  
// Build Time: 2022-07-10 12:32:52
// Version: 2022.07.10.12.32
export const DLISP_ENV_VERSION='2022.07.10.12.32';




var { get_next_environment_id, check_true, get_outside_global, subtype, lisp_writer, clone, LispSyntaxError } = await import("./lisp_writer.js");
export async function environment_boot(Environment)  {
{
    const __GG__=Environment.get_global;
    await Environment.set_global("get_outside_global",(await Environment.get_global("get_outside_global")));
    await Environment.set_global("true?",check_true);
    await Environment.set_global("subtype",(await Environment.get_global("sub_type")));
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
            },name:await (async function() {
                if (check_true (await (await Environment.get_global("starts_with?"))("=:",name))){
                      return await name["substr"].call(name,2)
                } else {
                      return name
                }
            } )(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args)
        };
        {
             return  ["=:defglobal",macro_name,["=:fn",macro_args,].concat(macro_body),["=:quote",source_details]]
        }
    },{
        eval_when:{
            compile_time:true
        }
    });
    await Environment.set_global("read_lisp",(await Environment.get_global("reader")));
    await Environment.set_global("desym",async function(val) {
        let strip;
        strip=async function(v) {
             return  (""+await (await Environment.get_global("as_lisp"))(v))
        };
         return  await async function(){
            if (check_true( (val instanceof String || typeof val==='string'))) {
                 return await strip(val)
            } else if (check_true( (val instanceof Array))) {
                 return await (async function() {
                    let __for_body__3=async function(v) {
                         return  await strip(v)
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
            } else  {
                 return val
            }
        } ()
    },{ "eval_when":{ "compile_time":true
},"name":"desym","macro":true,"fn_args":"(val)"
});
await Environment.set_global("desym_ref",async function(val) {
     return  ["=:+","",["=:as_lisp",val]]
},{ "eval_when":{ "compile_time":true
},"name":"desym_ref","macro":true,"fn_args":"(val)"
});
await Environment.set_global("deref",async function(val) {
     return  ["=:let",[["=:mval",val]],["=:if",["=:and",["=:is_string?","=:mval"],["=:starts_with?","=:","=:mval"]],["=:->","=:mval","substr",2],"=:mval"]]
},{ "eval_when":{ "compile_time":true
},"name":"deref","macro":true,"fn_args":"(val)","description":["=:+","If the value that the symbol references is a binding value, aka starting with '=:', then return the symbol value ","instead of the value that is referenced by the symbol. This is useful in macros where a value in a form is ","to be used for it's symbolic name vs. it's referenced value, which may be undefined if the symbol being ","de-referenced is not bound to any value."],"tags":["symbol","reference","syntax","dereference","desym"],"usage":["symbol:string"]
});
await Environment.set_global("when",async function(condition,...mbody) {
     return  ["=:if",condition,["=:do",].concat(mbody)]
},{ "eval_when":{ "compile_time":true
},"name":"when","macro":true,"fn_args":"(condition \"&\" mbody)","description":["=:+","Similar to if, but the body forms are evaluated in an implicit progn, if the condition form or expression is true. ","The function when will return the last form value.  There is no evaluation of the body if the conditional expression ","is false."],"usage":["condition:*","body:*"],"tags":["if","condition","logic","true","progn","conditional"]
});
await Environment.set_global("if_compile_time_defined",async function(quoted_symbol,exists_form,not_exists_form) {
    if (check_true (await (await Environment.get_global("describe"))(quoted_symbol))){
          return exists_form
    } else {
          return (not_exists_form||[])
    }
},{ "eval_when":{ "compile_time":true
},"name":"if_compile_time_defined","macro":true,"fn_args":"(quoted_symbol exists_form not_exists_form)","description":"If the provided quoted symbol is a defined symbol at compilation time, the exists_form will be compiled, otherwise the not_exists_form will be compiled.","tags":["compile","defined","global","symbol","reference"],"usage":["quoted_symbol:string","exists_form:*","not_exists_form:*"]
});
await Environment.set_global("defexternal",async function(name,value,meta) {
     return  ["=:let",[["=:symname",["=:desym",].concat(name)]],["=:do",["=:set_prop","=:globalThis","=:symname",value],["=:prop","=:globalThis","=:symname"]]]
},{ "eval_when":{ "compile_time":true
},"name":"defexternal","macro":true,"fn_args":"(name value meta)"
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
        name:await (await Environment.get_global("unquotify"))(name),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function() {
         if (check_true (meta)){
              return meta
        } else {
              return new Object()
        } 
    } )());
     return  ["=:do",["=:defglobal",fn_name,["=:fn",fn_args,fn_body],["=:quote",source_details]]]
},{ "eval_when":{ "compile_time":true
},"name":"defun","macro":true,"fn_args":"(name args body meta)"
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
        name:await (await Environment.get_global("unquotify"))(name),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function() {
         if (check_true (meta)){
              return meta
        } else {
              return new Object()
        } 
    } )());
     return  ["=:do",["=:defglobal",fn_name,["=:function",fn_args,fn_body],["=:quote",source_details]]]
},{ "eval_when":{ "compile_time":true
},"name":"defun_sync","macro":true,"fn_args":"(name args body meta)"
});
await Environment.set_global("macroexpand",async function(quoted_form) {
    let macro_name;
    let macro_func;
    let expansion;
    macro_name=await (quoted_form && quoted_form["0"])["substr"].call((quoted_form && quoted_form["0"]),2);
    macro_func=await Environment["get_global"].call(Environment,macro_name);
    expansion=await (async function () {
         if (check_true (macro_func instanceof Function)){
              return await (async function(){
                let __apply_args__5=await quoted_form["slice"].call(quoted_form,1);
                return ( macro_func).apply(this,__apply_args__5)
            })()
        } else {
              return quoted_form
        } 
    })();
     return  expansion
},{ "name":"macroexpand","fn_args":"(quoted_form)","description":"Given a quoted form, will perform the macro expansion and return the expanded form.","usage":["quoted_form:*"],"tags":["macro","expansion","debug","compile","compilation"]
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
    expansion=await (async function () {
         if (check_true (macro_func instanceof Function)){
              return await (async function(){
                let __apply_args__7=await form["slice"].call(form,1);
                return ( macro_func).apply(this,__apply_args__7)
            })()
        } else {
              return form
        } 
    })();
     return  ["=:quote",expansion]
},{ "eval_when":{ "compile_time":true
},"name":"macroexpand_nq","macro":true,"fn_args":"(form)"
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
await (async function ()  {
     return   Environment.set_global("get_object_path",function(refname) {
        if (check_true ((( refname["indexOf"].call(refname,".")>-1)||( refname["indexOf"].call(refname,"[")>-1)))){
            let chars;
            let comps;
            let mode;
            let name_acc;
            chars=(refname).split("");
            comps=[];
            mode=0;
            name_acc=[];
             ( function() {
                let __for_body__11=function(c) {
                     return    (function(){
                        if (check_true( ((c===".")&&(mode===0)))) {
                            (comps).push((name_acc).join(""));
                             return  name_acc=[]
                        } else if (check_true( ((mode===0)&&(c==="[")))) {
                            mode=1;
                            (comps).push((name_acc).join(""));
                             return  name_acc=[]
                        } else if (check_true( ((mode===1)&&(c==="]")))) {
                            mode=0;
                            (comps).push((name_acc).join(""));
                             return  name_acc=[]
                        } else  {
                             return (name_acc).push(c)
                        }
                    } )()
                };
                let __array__12=[],__elements__10=chars;
                let __BREAK__FLAG__=false;
                for(let __iter__9 in __elements__10) {
                    __array__12.push( __for_body__11(__elements__10[__iter__9]));
                    if(__BREAK__FLAG__) {
                         __array__12.pop();
                        break;
                        
                    }
                }return __array__12;
                 
            })();
            if (check_true (((name_acc && name_acc.length)>0))){
                 (comps).push((name_acc).join(""))
            };
             return  comps
        } else {
              return  ( function(){
                let __array_op_rval__13=refname;
                 if (__array_op_rval__13 instanceof Function){
                    return  __array_op_rval__13() 
                } else {
                    return[__array_op_rval__13]
                }
            })()
        }
    },{ "name":"get_object_path","fn_args":"(refname)"
})
} )();
await Environment.set_global("do_deferred_splice",async function(tree) {
    let rval;
    let idx;
    let tval;
    let deferred_operator;
    rval=null;
    idx=0;
    tval=null;
    deferred_operator=(["=","$","&","!"]).join("");
     return  await async function(){
        if (check_true( (tree instanceof Array))) {
            rval=[];
            await (async function(){
                 let __test_condition__14=async function() {
                     return  (idx<(tree && tree.length))
                };
                let __body_ref__15=async function() {
                    tval=tree[idx];
                    if (check_true ((tval===deferred_operator))){
                        idx+=1;
                        tval=tree[idx];
                         rval=await rval["concat"].call(rval,await do_deferred_splice(tval))
                    } else {
                         (rval).push(await do_deferred_splice(tval))
                    };
                     return  idx+=1
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__14()) {
                    await __body_ref__15();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })();
             return  rval
        } else if (check_true( (tree instanceof Object))) {
            rval=new Object();
            await (async function() {
                let __for_body__18=async function(pset) {
                     return  await async function(){
                        rval[(pset && pset["0"])]=await do_deferred_splice((pset && pset["1"]));
                        return rval;
                        
                    }()
                };
                let __array__19=[],__elements__17=await (await Environment.get_global("pairs"))(tree);
                let __BREAK__FLAG__=false;
                for(let __iter__16 in __elements__17) {
                    __array__19.push(await __for_body__18(__elements__17[__iter__16]));
                    if(__BREAK__FLAG__) {
                         __array__19.pop();
                        break;
                        
                    }
                }return __array__19;
                 
            })();
             return  rval
        } else  {
             return tree
        }
    } ()
},{ "name":"do_deferred_splice","fn_args":"(tree)"
});
await Environment.set_global("define",async function(...defs) {
    let acc;
    let symname;
    acc=["=:progl"];
    symname=null;
    await (async function() {
        let __for_body__23=async function(defset) {
            (acc).push(["=:defvar",(defset && defset["0"]),(defset && defset["1"])]);
            symname=(defset && defset["0"]);
            (acc).push(["=:set_prop","=:Environment.global_ctx.scope",(""+await (await Environment.get_global("as_lisp"))(symname)),symname]);
            if (check_true (((defset && defset["2"]) instanceof Object))){
                 return  (acc).push([["=:set_prop","=:Environment.definitions",(""+await (await Environment.get_global("as_lisp"))(symname)+""),(defset && defset["2"])]])
            }
        };
        let __array__24=[],__elements__22=defs;
        let __BREAK__FLAG__=false;
        for(let __iter__21 in __elements__22) {
            __array__24.push(await __for_body__23(__elements__22[__iter__21]));
            if(__BREAK__FLAG__) {
                 __array__24.pop();
                break;
                
            }
        }return __array__24;
         
    })();
     return  acc
},{ "eval_when":{ "compile_time":true
},"name":"define","macro":true,"fn_args":"(\"&\" defs)","usage":["declaration:array","declaration:array*"],"description":["=:+","Given 1 or more declarations in the form of (symbol value ?metadata), ","creates a symbol in global scope referencing the provided value.  If a ","metadata object is provided, this is stored as a the symbol's metadata."],"tags":["symbol","reference","definition","metadata","environment"]
});
await Environment.set_global("defbinding",async function(...args) {
    let binding;
    let acc;
    binding=null;
    acc=["=:list"];
    debugger;
    ;
    await (async function() {
        let __for_body__27=async function(bind_set) {
             return  await async function(){
                if (check_true( ((bind_set instanceof Array)&&(((bind_set && bind_set.length)===2)||((bind_set && bind_set.length)===3))&&((bind_set && bind_set["1"]) instanceof Array)&&((bind_set && bind_set["1"] && bind_set["1"]["length"])===2)))) {
                    binding=["=:quote",["=:bind",(bind_set && bind_set["1"] && bind_set["1"]["0"]),(bind_set && bind_set["1"] && bind_set["1"]["1"])]];
                     return  (acc).push(await (async function ()  {
                        let __array_arg__29=(async function() {
                            let mval;
                            mval=(bind_set && bind_set["0"]);
                            if (check_true (((mval instanceof String || typeof mval==='string')&&await (await Environment.get_global("starts_with?"))("=:",mval)))){
                                  return await mval["substr"].call(mval,2)
                            } else {
                                  return mval
                            }
                        } );
                        let __array_arg__30=(async function() {
                            if (check_true (((bind_set && bind_set["2"]) instanceof Object))){
                                  return await (await Environment.get_global("add"))(new Object(),(bind_set && bind_set["2"]),{
                                    initializer:binding
                                })
                            } else {
                                  return {
                                    initializer:binding
                                }
                            }
                        } );
                        return ["=:defglobal",await __array_arg__29(),["=:bind",(bind_set && bind_set["1"] && bind_set["1"]["0"]),(bind_set && bind_set["1"] && bind_set["1"]["1"])],await __array_arg__30()]
                    } )())
                } else  {
                     throw new SyntaxError("defbinding received malform arguments");
                    
                }
            } ()
        };
        let __array__28=[],__elements__26=args;
        let __BREAK__FLAG__=false;
        for(let __iter__25 in __elements__26) {
            __array__28.push(await __for_body__27(__elements__26[__iter__25]));
            if(__BREAK__FLAG__) {
                 __array__28.pop();
                break;
                
            }
        }return __array__28;
         
    })();
     return  acc
},{ "eval_when":{ "compile_time":true
},"name":"defbinding","macro":true,"fn_args":"(\"&\" args)","description":["=:+","Defines a global binding to a potentially native function.  This macro ","facilitates the housekeeping with keeping track of the source form ","used (and stored in the environment) so that the save environment ","facility can capture the source bindings and recreate it in the initializer ","function on rehydration.<br>","The macro can take an arbitrary amount of binding arguments, with the form: ","(symbol_name (fn_to_bind_to this))"],"usage":["binding_set0:array","binding_setN:array"],"tags":["toplevel","global","bind","environment","initialize"]
});
await Environment.set_global("define_env",async function(...defs) {
    let acc;
    let symname;
    acc=["=:progl"];
    symname=null;
    await (async function() {
        let __for_body__33=async function(defset) {
            (acc).push(["=:defvar",(defset && defset["0"]),(defset && defset["1"])]);
            symname=(defset && defset["0"]);
            (acc).push(["=:set_prop","=:Environment.global_ctx.scope",(""+await (await Environment.get_global("as_lisp"))(symname)),symname]);
            if (check_true (((defset && defset["2"]) instanceof Object))){
                 return  (acc).push([["=:set_prop","=:Environment.definitions",(""+await (await Environment.get_global("as_lisp"))(symname)+""),(defset && defset["2"])]])
            }
        };
        let __array__34=[],__elements__32=defs;
        let __BREAK__FLAG__=false;
        for(let __iter__31 in __elements__32) {
            __array__34.push(await __for_body__33(__elements__32[__iter__31]));
            if(__BREAK__FLAG__) {
                 __array__34.pop();
                break;
                
            }
        }return __array__34;
         
    })();
     return  acc
},{ "eval_when":{ "compile_time":true
},"name":"define_env","macro":true,"fn_args":"(\"&\" defs)"
});
await Environment.set_global("define_env%",async function(source_env_ctx,...defs) {
    let acc;
    let symname;
    acc=["=:progl"];
    symname=null;
    console.log("define_env%: source_env? ",(source_env_ctx&&true),((source_env_ctx && source_env_ctx["scope"]) instanceof Object));
    await async function(){
        if (check_true( (false&&source_env_ctx&&((source_env_ctx && source_env_ctx["scope"]) instanceof Object)))) {
             return  await (async function() {
                let __for_body__37=async function(defset) {
                    (acc).push(["=:defvar",(defset && defset["0"]),(defset && defset["1"])]);
                     return  console.log("symbol included: ",(defset && defset["0"]))
                };
                let __array__38=[],__elements__36=await (await Environment.get_global("pairs"))((source_env_ctx && source_env_ctx["scope"]));
                let __BREAK__FLAG__=false;
                for(let __iter__35 in __elements__36) {
                    __array__38.push(await __for_body__37(__elements__36[__iter__35]));
                    if(__BREAK__FLAG__) {
                         __array__38.pop();
                        break;
                        
                    }
                }return __array__38;
                 
            })()
        } else  {
             return  await (async function() {
                let __for_body__41=async function(defset) {
                    (acc).push(["=:defvar",(defset && defset["0"]),(defset && defset["1"])]);
                    symname=(defset && defset["0"]);
                    (acc).push(["=:set_prop","=:Environment.global_ctx.scope",(""+await (await Environment.get_global("as_lisp"))(symname)),symname]);
                    if (check_true (((defset && defset["2"]) instanceof Object))){
                         return  (acc).push([["=:set_prop","=:Environment.definitions",(""+await (await Environment.get_global("as_lisp"))(symname)+""),(defset && defset["2"])]])
                    }
                };
                let __array__42=[],__elements__40=defs;
                let __BREAK__FLAG__=false;
                for(let __iter__39 in __elements__40) {
                    __array__42.push(await __for_body__41(__elements__40[__iter__39]));
                    if(__BREAK__FLAG__) {
                         __array__42.pop();
                        break;
                        
                    }
                }return __array__42;
                 
            })()
        }
    } ();
     return  acc
},{ "eval_when":{ "compile_time":true
},"name":"define_env%","macro":true,"fn_args":"(source_env_ctx \"&\" defs)"
});
await Environment.set_global("type",async function(x) {
     return  await async function(){
        if (check_true( (null===x))) {
             return "null"
        } else if (check_true( (undefined===x))) {
             return "undefined"
        } else if (check_true( (x instanceof Array))) {
             return "array"
        } else  {
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
         return  await async function(){
            if (check_true( (elems instanceof Array))) {
                 return await (await Environment.get_global("map"))(async function(elem,idx) {
                     return  await follow_tree(elem,await (await Environment.get_global("add"))(_path_prefix,idx))
                },elems)
            } else if (check_true( (elems instanceof Object))) {
                 return await (async function() {
                    let __for_body__45=async function(pset) {
                         return  await follow_tree((pset && pset["1"]),await (await Environment.get_global("add"))(_path_prefix,(pset && pset["0"])))
                    };
                    let __array__46=[],__elements__44=await (await Environment.get_global("pairs"))(elems);
                    let __BREAK__FLAG__=false;
                    for(let __iter__43 in __elements__44) {
                        __array__46.push(await __for_body__45(__elements__44[__iter__43]));
                        if(__BREAK__FLAG__) {
                             __array__46.pop();
                            break;
                            
                        }
                    }return __array__46;
                     
                })()
            } else  {
                 return (acc).push(_path_prefix)
            }
        } ()
    };
    await follow_tree(structure,[]);
     return  acc
},{ "name":"destructure_list","fn_args":"(elems)"
});
await Environment.set_global("destructuring_bind",async function(bind_vars,expression,...forms) {
    let binding_vars;
    let paths;
    let bound_expression;
    let allocations;
    let acc;
    binding_vars=bind_vars;
    paths=await (await Environment.get_global("destructure_list"))(binding_vars);
    bound_expression=expression;
    allocations=[];
    acc=["=:let"];
    await (await Environment.get_global("assert"))(((bind_vars instanceof Array)&&await (await Environment.get_global("is_value?"))(expression)&&await (await Environment.get_global("is_value?"))(forms)),"destructuring_bind: requires 3 arguments");
    await (async function() {
        let __for_body__49=async function(idx) {
             return  (allocations).push([await (await Environment.get_global("resolve_path"))(paths[idx],binding_vars),await async function(){
                if (check_true( (expression instanceof Object))) {
                     return await (await Environment.get_global("resolve_path"))(paths[idx],expression)
                } else  {
                     return (await (await Environment.get_global("conj"))(await (async function(){
                        let __array_op_rval__51=expression;
                         if (__array_op_rval__51 instanceof Function){
                            return await __array_op_rval__51() 
                        } else {
                            return[__array_op_rval__51]
                        }
                    })(),paths[idx])).join(".")
                }
            } ()])
        };
        let __array__50=[],__elements__48=await (await Environment.get_global("range"))(await (await Environment.get_global("length"))(paths));
        let __BREAK__FLAG__=false;
        for(let __iter__47 in __elements__48) {
            __array__50.push(await __for_body__49(__elements__48[__iter__47]));
            if(__BREAK__FLAG__) {
                 __array__50.pop();
                break;
                
            }
        }return __array__50;
         
    })();
    (acc).push(allocations);
    acc=await (await Environment.get_global("conj"))(acc,forms);
     return  acc
},{ "eval_when":{ "compile_time":true
},"name":"destructuring_bind","macro":true,"fn_args":"(bind_vars expression \"&\" forms)"
});
await (async function ()  {
     return   Environment.set_global("split_by_recurse",function(token,container) {
         return    (function(){
            if (check_true( (container instanceof String || typeof container==='string'))) {
                 return (container).split(token)
            } else if (check_true( (container instanceof Array))) {
                 return  ( Environment.get_global("map"))(async function(elem) {
                     return   ( Environment.get_global("split_by_recurse"))(token,elem)
                },container)
            }
        } )()
    },{ "name":"split_by_recurse","fn_args":"(token container)","usage":["token:string","container:string|array"],"description":["=:+","Like split_by, splits the provided container at ","each token, returning an array of the split ","items.  If the container is an array, the function ","will recursively split the strings in the array ","and return an array containing the split values ","of that array.  The final returned array may contain ","strings and arrays."],"tags":["split","nested","recursion","array","string"]
})
} )();
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
    macro_meta=await (async function () {
         if (check_true (((final_form instanceof Object)&&await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))((final_form && final_form["description"])))&&await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))((final_form && final_form["usage"])))))){
              return (forms).pop()
        } 
    })();
    complex_lambda_list=await (await Environment.get_global("or_args"))(await (async function() {
        let __for_body__54=async function(elem) {
             return  (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (await Environment.get_global("destructure_list"))(elem)))>0)
        };
        let __array__55=[],__elements__53=lambda_list;
        let __BREAK__FLAG__=false;
        for(let __iter__52 in __elements__53) {
            __array__55.push(await __for_body__54(__elements__53[__iter__52]));
            if(__BREAK__FLAG__) {
                 __array__55.pop();
                break;
                
            }
        }return __array__55;
         
    })());
    source_details=await (await Environment.get_global("add"))({
        eval_when:{
            compile_time:true
        },name:await (async function() {
            if (check_true (await (await Environment.get_global("starts_with?"))("=:",name))){
                  return await name["substr"].call(name,2)
            } else {
                  return name
            }
        } )(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args)
    },await (async function() {
         if (check_true (macro_meta)){
              return macro_meta
        } else {
              return new Object()
        } 
    } )());
    if (check_true (complex_lambda_list)){
          return ["=:defglobal",macro_name,["=:fn",["&","=:args"],["=:destructuring_bind",macro_args,"=:args",].concat(macro_body)],["=:quote",source_details]]
    } else {
          return ["=:defglobal",macro_name,["=:fn",macro_args,].concat(macro_body),["=:quote",source_details]]
    }
},{
    eval_when:{
        compile_time:true
    }
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
    complex_lambda_list=await (await Environment.get_global("or_args"))(await (async function() {
        let __for_body__58=async function(elem) {
             return  (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (await Environment.get_global("destructure_list"))(elem)))>0)
        };
        let __array__59=[],__elements__57=lambda_list;
        let __BREAK__FLAG__=false;
        for(let __iter__56 in __elements__57) {
            __array__59.push(await __for_body__58(__elements__57[__iter__56]));
            if(__BREAK__FLAG__) {
                 __array__59.pop();
                break;
                
            }
        }return __array__59;
         
    })());
    source_details=await (await Environment.get_global("add"))({
        name:await (await Environment.get_global("unquotify"))(name),fn_args:await (await Environment.get_global("as_lisp"))(fn_args)
    },await (async function() {
         if (check_true (fn_meta)){
            if (check_true ((fn_meta && fn_meta["description"]))){
                  return await async function(){
                    fn_meta["description"]=(fn_meta && fn_meta["description"]);
                    return fn_meta;
                    
                }()
            };
             fn_meta
        } else {
              return new Object()
        } 
    } )());
    if (check_true (complex_lambda_list)){
          return ["=:defglobal",fn_name,["=:fn",["&","=:args"],["=:destructuring_bind",fn_args,"=:args",fn_body]],["=:quote",source_details]]
    } else {
          return ["=:defglobal",fn_name,["=:fn",fn_args,fn_body],["=:quote",source_details]]
    }
},{ "eval_when":{ "compile_time":true
},"name":"defun","macro":true,"fn_args":"(name lambda_list body meta)","description":["=:+","Defines a top level function in the current environment.  Given a name, lambda_list,","body, and a meta data description, builds, compiles and installs the function in the","environment under the provided name.  The body isn't an explicit progn, and must be","within a block structure, such as progn, let or do."],"usage":["name:string:required","lambda_list:array:required","body:array:required","meta:object"],"tags":["function","lambda","define","environment"]
});
await Environment.set_global("reduce",async function(...args) {
    let elem;
    let item_list;
    let form;
    elem=(args && args["0"] && args["0"]["0"]);
    item_list=(args && args["0"] && args["0"]["1"]);
    form=(args && args["1"]);
     return  ["=:let",[["=:__collector",[]],["=:__result","=:nil"],["=:__action",["=:fn",[].concat(elem),form]]],["=:declare",["=:function","=:__action"]],["=:for_each",["=:__item",item_list],["=:do",["=:=","=:__result",["=:__action","=:__item"]],["=:if","=:__result",["=:push","=:__collector","=:__result"]]]],"=:__collector"]
},{ "eval_when":{ "compile_time":true
},"name":"reduce","macro":true,"fn_args":"((elem item_list) form)","description":"Provided a first argument as a list which contains a binding variable name and a list, returns a list of all non-null return values that result from the evaluation of the second list.","usage":[["binding-elem:symbol","values:list"],["form:list"]],"tags":["filter","remove","select","list","array"]
});
await Environment.set_global("is_nil?",async function(value) {
     return  (null===value)
},{ "name":"is_nil?","fn_args":"(\"value\")","description":"for the given value x, returns true if x is exactly equal to nil.","usage":["arg:value"],"tags":["type","condition","subtype","value","what"]
});
await Environment.set_global("is_regex?",async function(x) {
     return  (await (await Environment.get_global("sub_type"))(x)==="RegExp")
},{ "name":"is_regex?","fn_args":"(x)","description":"for the given value x, returns true if x is a Javascript regex object","usage":["arg:value"],"tags":["type","condition","subtype","value","what"]
});
await Environment.set_global("bind_function",(await Environment.get_global("bind")));
await Environment.set_global("is_reference?",async function(val) {
     return  ["=:and",["=:is_string?",val],["=:>",["=:length",val],2],["=:starts_with?",["=:quote","=:"],val]]
},{ "eval_when":{ "compile_time":true
},"name":"is_reference?","macro":true,"fn_args":"(val)"
});
await Environment.set_global("scan_str",async function(regex,search_string) {
    let result;
    let last_result;
    let totals;
    let strs;
    result=null;
    last_result=null;
    totals=[];
    strs=(""+search_string);
    if (check_true (await (await Environment.get_global("is_regex?"))(regex))){
        regex.lastIndex=0;
         await (async function(){
             let __test_condition__61=async function() {
                 return  (await (async function ()  {
                    result=await regex["exec"].call(regex,strs);
                     return  true
                } )()&&result&&await (async function () {
                     if (check_true (last_result)){
                          return await (await Environment.get_global("not"))(((result && result["0"])===(last_result && last_result["0"])))
                    } else {
                          return true
                    } 
                })())
            };
            let __body_ref__62=async function() {
                last_result=result;
                 return  (totals).push(await (await Environment.get_global("to_object"))(await (await Environment.get_global("map"))(async function(v) {
                     return  await (async function(){
                        let __array_op_rval__63=v;
                         if (__array_op_rval__63 instanceof Function){
                            return await __array_op_rval__63(result[v]) 
                        } else {
                            return[__array_op_rval__63,result[v]]
                        }
                    })()
                },await (await Environment.get_global("keys"))(result))))
            };
            let __BREAK__FLAG__=false;
            while(await __test_condition__61()) {
                await __body_ref__62();
                 if(__BREAK__FLAG__) {
                     break;
                    
                }
            } ;
            
        })()
    } else throw new Error(new ReferenceError(("scan_str: invalid RegExp provided: "+regex)));
    ;
     return  totals
},{ "name":"scan_str","fn_args":"(regex search_string)","description":["=:+","Using a provided regex and a search string, performs a regex ","exec using the provided regex argument on the string argument. ","Returns an array of results or an empty array, with matched ","text, index, and any capture groups."],"usage":["regex:RegExp","text:string"],"tags":["regex","string","match","exec","array"]
});
await Environment.set_global("remove_prop",async function(obj,key) {
    if (check_true (await (await Environment.get_global("not"))((undefined===obj[key])))){
        {
            let val;
            val=obj[key];
            await (await Environment.get_global("delete_prop"))(obj,key);
             return  val
        }
    }
},{ "name":"remove_prop","fn_args":"(obj key)","usage":["obj:object","key:*"],"description":"Similar to delete, but returns the removed value if the key exists, otherwise returned undefined.","tags":["object","key","value","mutate"]
});
await Environment.set_global("object_methods",async function(obj) {
    let properties;
    let current_obj;
    properties=new Set();
    current_obj=obj;
    await (async function(){
         let __test_condition__64=async function() {
             return  current_obj
        };
        let __body_ref__65=async function() {
            await (await Environment.get_global("map"))(async function(item) {
                 return  await properties["add"].call(properties,item)
            },await Object.getOwnPropertyNames(current_obj));
             return  current_obj=await Object.getPrototypeOf(current_obj)
        };
        let __BREAK__FLAG__=false;
        while(await __test_condition__64()) {
            await __body_ref__65();
             if(__BREAK__FLAG__) {
                 break;
                
            }
        } ;
        
    })();
     return  await (async function() {
        {
             let __call_target__=await Array.from(await properties["keys"]()), __call_method__="filter";
            return await __call_target__[__call_method__].call(__call_target__,async function(item) {
                 return  item instanceof Function
            })
        } 
    })()
},{ "name":"object_methods","fn_args":"(obj)","description":"Given a instantiated object, get all methods (functions) that the object and it's prototype chain contains.","usage":["obj:object"],"tags":["object","methods","functions","introspection","keys"]
});
await Environment.set_global("expand_dot_accessor",async function(val,ctx) {
    let comps;
    let find_in_ctx;
    let reference;
    let val_type;
    comps=(val).split(".");
    find_in_ctx=async function(the_ctx) {
         return  await async function(){
            if (check_true( await (async function(){
                let __targ__66=(the_ctx && the_ctx["scope"]);
                if (__targ__66){
                     return(__targ__66)[reference]
                } 
            })())) {
                 return await (async function(){
                    let __targ__67=(the_ctx && the_ctx["scope"]);
                    if (__targ__67){
                         return(__targ__67)[reference]
                    } 
                })()
            } else if (check_true((the_ctx && the_ctx["parent"]))) {
                 return await find_in_ctx((the_ctx && the_ctx["parent"]))
            }
        } ()
    };
    reference=(comps).shift();
    val_type=await find_in_ctx(ctx);
     return  await async function(){
        if (check_true( (0===(comps && comps.length)))) {
             return reference
        } else if (check_true( ((val_type instanceof Object)&&await (await Environment.get_global("contains?"))((comps && comps["0"]),await (await Environment.get_global("object_methods"))(val_type))&&await (await Environment.get_global("not"))(await val_type["propertyIsEnumerable"].call(val_type,(comps && comps["0"])))))) {
             return val
        } else  {
             return (await (await Environment.get_global("conj"))(await (async function(){
                let __array_op_rval__68=reference;
                 if (__array_op_rval__68 instanceof Function){
                    return await __array_op_rval__68() 
                } else {
                    return[__array_op_rval__68]
                }
            })(),await (await Environment.get_global("flatten"))(await (async function() {
                let __for_body__71=async function(comp) {
                    if (check_true (await (await Environment.get_global("is_number?"))(comp))){
                          return ["[",comp,"]"]
                    } else {
                          return ["[\"",comp,"\"]"]
                    }
                };
                let __array__72=[],__elements__70=comps;
                let __BREAK__FLAG__=false;
                for(let __iter__69 in __elements__70) {
                    __array__72.push(await __for_body__71(__elements__70[__iter__69]));
                    if(__BREAK__FLAG__) {
                         __array__72.pop();
                        break;
                        
                    }
                }return __array__72;
                 
            })()))).join("")
        }
    } ()
},{ "name":"expand_dot_accessor","fn_args":"(val ctx)"
});
await Environment.set_global("getf_ctx",async function(ctx,name,_value) {
    if (check_true ((ctx&&(name instanceof String || typeof name==='string')))){
          return await async function(){
            if (check_true( await (await Environment.get_global("not"))((undefined===await (async function(){
                let __targ__73=(ctx && ctx["scope"]);
                if (__targ__73){
                     return(__targ__73)[name]
                } 
            })())))) {
                 if (check_true (await (await Environment.get_global("not"))((_value===undefined)))){
                    await async function(){
                        let __target_obj__74=(ctx && ctx["scope"]);
                        __target_obj__74[name]=_value;
                        return __target_obj__74;
                        
                    }();
                     return  _value
                } else {
                      return await (async function(){
                        let __targ__75=(ctx && ctx["scope"]);
                        if (__targ__75){
                             return(__targ__75)[name]
                        } 
                    })()
                }
            } else if (check_true((ctx && ctx["parent"]))) {
                 return await (await Environment.get_global("getf_ctx"))((ctx && ctx["parent"]),name,_value)
            } else  {
                 return undefined
            }
        } ()
    } else throw new Error("invalid call to getf_ctx: missing argument/s");
    
},{ "name":"getf_ctx","fn_args":"(ctx name _value)"
});
await Environment.set_global("setf_ctx",async function(ctx,name,value) {
    let found_val;
    found_val=await (await Environment.get_global("getf_ctx"))(ctx,name,value);
    if (check_true ((found_val===undefined))){
         await async function(){
            let __target_obj__76=(ctx && ctx["scope"]);
            __target_obj__76[name]=value;
            return __target_obj__76;
            
        }()
    };
     return  value
},{ "name":"setf_ctx","fn_args":"(ctx name value)"
});
await Environment.set_global("set_path",async function(path,obj,value) {
    let fpath;
    let idx;
    let rpath;
    let target_obj;
    fpath=await clone(path);
    idx=(fpath).pop();
    rpath=fpath;
    target_obj=null;
    target_obj=await (await Environment.get_global("resolve_path"))(rpath,obj);
    if (check_true (target_obj)){
         return  await async function(){
            target_obj[idx]=value;
            return target_obj;
            
        }()
    } else throw new RangeError(("set_path: invalid path: "+path));
    
},{ "name":"set_path","fn_args":"(path obj value)"
});
await Environment.set_global("minmax",async function(container) {
    let value_found;
    let smallest;
    let biggest;
    value_found=false;
    smallest=(await Environment.get_global("MAX_SAFE_INTEGER"));
    biggest=(-1*(await Environment.get_global("MAX_SAFE_INTEGER")));
    if (check_true ((container&&(container instanceof Array)&&(await (await Environment.get_global("length"))(container)>0)))){
        await (async function() {
            let __for_body__80=async function(value) {
                 return  (await (await Environment.get_global("is_number?"))(value)&&await (async function ()  {
                    value_found=true;
                    smallest=await Math.min(value,smallest);
                     return  biggest=await Math.max(value,biggest)
                } )())
            };
            let __array__81=[],__elements__79=container;
            let __BREAK__FLAG__=false;
            for(let __iter__78 in __elements__79) {
                __array__81.push(await __for_body__80(__elements__79[__iter__78]));
                if(__BREAK__FLAG__) {
                     __array__81.pop();
                    break;
                    
                }
            }return __array__81;
             
        })();
        if (check_true (value_found)){
              return await (async function(){
                let __array_op_rval__82=smallest;
                 if (__array_op_rval__82 instanceof Function){
                    return await __array_op_rval__82(biggest) 
                } else {
                    return[__array_op_rval__82,biggest]
                }
            })()
        } else {
              return null
        }
    } else {
          return null
    }
},{ "name":"minmax","fn_args":"(container)"
});
await Environment.set_global("gen_multiples",async function(len,multiple_ques_) {
    let val;
    let acc;
    let mult;
    val=100;
    acc=await (async function(){
        let __array_op_rval__83=val;
         if (__array_op_rval__83 instanceof Function){
            return await __array_op_rval__83() 
        } else {
            return[__array_op_rval__83]
        }
    })();
    mult=(multiple_ques_||10);
    await (async function() {
        let __for_body__86=async function(r) {
             return  (acc).push(val=(val*mult))
        };
        let __array__87=[],__elements__85=await (await Environment.get_global("range"))(len);
        let __BREAK__FLAG__=false;
        for(let __iter__84 in __elements__85) {
            __array__87.push(await __for_body__86(__elements__85[__iter__84]));
            if(__BREAK__FLAG__) {
                 __array__87.pop();
                break;
                
            }
        }return __array__87;
         
    })();
     return  (acc).slice(0).reverse()
},{ "name":"gen_multiples","fn_args":"(len multiple?)"
});
await Environment.set_global("path_multiply",async function(path,multiple_ques_) {
    let acc;
    let multiples;
    acc=0;
    multiples=await (await Environment.get_global("gen_multiples"))(await (await Environment.get_global("length"))(path),multiple_ques_);
    await (async function() {
        let __for_body__90=async function(pset) {
             return  acc=(acc+((pset && pset["0"])*(pset && pset["1"])))
        };
        let __array__91=[],__elements__89=await (await Environment.get_global("pairs"))(await (await Environment.get_global("interlace"))(path,multiples));
        let __BREAK__FLAG__=false;
        for(let __iter__88 in __elements__89) {
            __array__91.push(await __for_body__90(__elements__89[__iter__88]));
            if(__BREAK__FLAG__) {
                 __array__91.pop();
                break;
                
            }
        }return __array__91;
         
    })();
     return  acc
},{ "name":"path_multiply","fn_args":"(path multiple?)"
});
await Environment.set_global("splice_in_return_a",async function(js_tree,_ctx,_depth,_path) {
     return  await async function(){
        if (check_true( (js_tree instanceof Array))) {
            let idx;
            let ntree;
            let root;
            let if_links;
            let function_block_ques_;
            let last_path;
            let new_ctx;
            let splice_log;
            let next_val;
            idx=-1;
            ntree=[];
            _depth=(_depth||0);
            _path=(_path||[]);
            root=_path;
            if_links=new Object();
            function_block_ques_=await (async function () {
                 if (check_true ((_depth===0))){
                      return true
                } else {
                      return false
                } 
            })();
            last_path=null;
            new_ctx=async function(ctx) {
                 return  {
                    parent:ctx,scope:{
                        level:await (async function() {
                            if (check_true ((ctx && ctx["scope"] && ctx["scope"]["level"]))){
                                  return await (await Environment.get_global("add"))((ctx && ctx["scope"] && ctx["scope"]["level"]),1)
                            } else {
                                  return 0
                            }
                        } )(),viable_return_points:[],base_path:await clone(_path),potential_return_points:[],return_found:false,if_links:new Object()
                    }
                }
            };
            _ctx=(_ctx||await new_ctx(null));
            splice_log=await (await Environment.get_global("defclog"))({
                prefix:("splice_return ["+(_ctx && _ctx["scope"] && _ctx["scope"]["level"])+"]"),color:"black",background:"#20F0F0"
            });
            next_val=null;
            await (async function() {
                let __for_body__94=async function(comp) {
                    idx+=1;
                    last_path=await (await Environment.get_global("conj"))(_path,await (async function(){
                        let __array_op_rval__96=idx;
                         if (__array_op_rval__96 instanceof Function){
                            return await __array_op_rval__96() 
                        } else {
                            return[__array_op_rval__96]
                        }
                    })());
                     return  await async function(){
                        if (check_true( (comp instanceof Array))) {
                             return (ntree).push(await (await Environment.get_global("splice_in_return_a"))(comp,_ctx,await (await Environment.get_global("add"))(_depth,1),await (await Environment.get_global("conj"))(_path,await (async function(){
                                let __array_op_rval__97=idx;
                                 if (__array_op_rval__97 instanceof Function){
                                    return await __array_op_rval__97() 
                                } else {
                                    return[__array_op_rval__97]
                                }
                            })())))
                        } else if (check_true( ((comp instanceof String || typeof comp==='string')||await (await Environment.get_global("is_number?"))(comp)||comp instanceof Function))) {
                             return (ntree).push(comp)
                        } else if (check_true( (comp instanceof Object))) {
                             return await async function(){
                                if (check_true( (comp && comp["ctype"]) instanceof Function)) {
                                     return  (ntree).push(comp)
                                } else if (check_true( (((comp && comp["ctype"])==="AsyncFunction")||((comp && comp["ctype"])==="Function")))) {
                                    _path=[];
                                    _ctx=await new_ctx(_ctx);
                                    function_block_ques_=true;
                                     return  (ntree).push(comp)
                                } else if (check_true( ((comp && comp["mark"])==="rval"))) {
                                    (await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")).push({
                                        path:await (await Environment.get_global("conj"))(_path,await (async function(){
                                            let __array_op_rval__98=idx;
                                             if (__array_op_rval__98 instanceof Function){
                                                return await __array_op_rval__98() 
                                            } else {
                                                return[__array_op_rval__98]
                                            }
                                        })()),type:(comp && comp["mark"]),block_step:(comp && comp["block_step"]),if_id:(comp && comp["if_id"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),lambda_step:(comp && comp["lambda_step"])
                                    });
                                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                                        let __targ__99=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                        if (__targ__99){
                                             return(__targ__99)[(comp && comp["if_id"])]
                                        } 
                                    })())))){
                                         await async function(){
                                            let __target_obj__100=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            __target_obj__100[(comp && comp["if_id"])]=[];
                                            return __target_obj__100;
                                            
                                        }()
                                    };
                                    if (check_true ((comp && comp["if_id"]))){
                                         (await (async function(){
                                            let __targ__101=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            if (__targ__101){
                                                 return(__targ__101)[(comp && comp["if_id"])]
                                            } 
                                        })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")))
                                    };
                                     return  (ntree).push(comp)
                                } else if (check_true( ((comp && comp["mark"])==="forced_return"))) {
                                    (await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")).push({
                                        path:await (await Environment.get_global("conj"))(_path,await (async function(){
                                            let __array_op_rval__102=idx;
                                             if (__array_op_rval__102 instanceof Function){
                                                return await __array_op_rval__102() 
                                            } else {
                                                return[__array_op_rval__102]
                                            }
                                        })()),if_id:(comp && comp["if_id"]),block_step:(comp && comp["block_step"]),lambda_step:(comp && comp["lambda_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),type:(comp && comp["mark"])
                                    });
                                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                                        let __targ__103=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                        if (__targ__103){
                                             return(__targ__103)[(comp && comp["if_id"])]
                                        } 
                                    })())))){
                                         await async function(){
                                            let __target_obj__104=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            __target_obj__104[(comp && comp["if_id"])]=[];
                                            return __target_obj__104;
                                            
                                        }()
                                    };
                                    if (check_true ((comp && comp["if_id"]))){
                                         (await (async function(){
                                            let __targ__105=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            if (__targ__105){
                                                 return(__targ__105)[(comp && comp["if_id"])]
                                            } 
                                        })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")))
                                    };
                                     return  (ntree).push(comp)
                                } else if (check_true( ((comp && comp["mark"])==="final-return"))) {
                                    (await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")).push({
                                        path:await (await Environment.get_global("conj"))(_path,await (async function(){
                                            let __array_op_rval__106=idx;
                                             if (__array_op_rval__106 instanceof Function){
                                                return await __array_op_rval__106() 
                                            } else {
                                                return[__array_op_rval__106]
                                            }
                                        })()),type:(comp && comp["mark"]),lambda_step:(comp && comp["lambda_step"]),block_step:(comp && comp["block_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),if_id:(comp && comp["if_id"])
                                    });
                                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                                        let __targ__107=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                        if (__targ__107){
                                             return(__targ__107)[(comp && comp["if_id"])]
                                        } 
                                    })())))){
                                         await async function(){
                                            let __target_obj__108=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            __target_obj__108[(comp && comp["if_id"])]=[];
                                            return __target_obj__108;
                                            
                                        }()
                                    };
                                    if (check_true ((comp && comp["if_id"]))){
                                        (await (async function(){
                                            let __targ__109=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            if (__targ__109){
                                                 return(__targ__109)[(comp && comp["if_id"])]
                                            } 
                                        })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")));
                                         (await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")).push({
                                            path:await (await Environment.get_global("conj"))(_path,await (async function(){
                                                let __array_op_rval__110=idx;
                                                 if (__array_op_rval__110 instanceof Function){
                                                    return await __array_op_rval__110() 
                                                } else {
                                                    return[__array_op_rval__110]
                                                }
                                            })()),type:(comp && comp["mark"]),lambda_step:(comp && comp["lambda_step"]),block_step:(comp && comp["block_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),if_id:(comp && comp["if_id"])
                                        })
                                    };
                                    await (await Environment.get_global("setf_ctx"))(_ctx,"return_found",true);
                                     return  (ntree).push(comp)
                                } else  {
                                     return (ntree).push(comp)
                                }
                            } ()
                        } else  {
                             return (ntree).push(comp)
                        }
                    } ()
                };
                let __array__95=[],__elements__93=js_tree;
                let __BREAK__FLAG__=false;
                for(let __iter__92 in __elements__93) {
                    __array__95.push(await __for_body__94(__elements__93[__iter__92]));
                    if(__BREAK__FLAG__) {
                         __array__95.pop();
                        break;
                        
                    }
                }return __array__95;
                 
            })();
            if (check_true (function_block_ques_)){
                {
                    let viables;
                    let potentials;
                    let base_path;
                    let base_addr;
                    let final_viable_path;
                    let max_viable;
                    let plength;
                    let if_paths;
                    let max_path_segment_length;
                    let final_return_found;
                    viables=((await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")||[])).slice(0).reverse();
                    potentials=((await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")||[])).slice(0).reverse();
                    base_path=await (await Environment.get_global("getf_ctx"))(_ctx,"base_path");
                    base_addr=null;
                    final_viable_path=(viables&&await (await Environment.get_global("first"))(viables)&&await (async function(){
                        let __targ__111=await (await Environment.get_global("first"))(viables);
                        if (__targ__111){
                             return(__targ__111)["path"]
                        } 
                    })());
                    max_viable=0;
                    plength=0;
                    if_paths=[];
                    max_path_segment_length=null;
                    final_return_found=await (await Environment.get_global("getf_ctx"))(_ctx,"return_found");
                    await (async function() {
                        let __for_body__114=async function(v) {
                             return  await (await Environment.get_global("set_path"))((v && v["path"]),ntree,{
                                mark:"return_point"
                            })
                        };
                        let __array__115=[],__elements__113=viables;
                        let __BREAK__FLAG__=false;
                        for(let __iter__112 in __elements__113) {
                            __array__115.push(await __for_body__114(__elements__113[__iter__112]));
                            if(__BREAK__FLAG__) {
                                 __array__115.pop();
                                break;
                                
                            }
                        }return __array__115;
                         
                    })();
                     await (async function() {
                        let __for_body__118=async function(p) {
                            plength=await Math.min(await (await Environment.get_global("length"))((p && p["path"])),await (await Environment.get_global("length"))(final_viable_path));
                            let ppath=await (await Environment.get_global("slice"))((p && p["path"]),0,plength);
                            ;
                            let vpath=await (async function () {
                                 if (check_true (final_viable_path)){
                                      return await (await Environment.get_global("slice"))(final_viable_path,0,plength)
                                } else {
                                      return []
                                } 
                            })();
                            ;
                            max_path_segment_length=await Math.max(8,(1+await (async function(){
                                let __targ__120=await (await Environment.get_global("minmax"))(ppath);
                                if (__targ__120){
                                     return(__targ__120)[1]
                                } 
                            })()),(1+await (async function(){
                                let __targ__121=await (await Environment.get_global("minmax"))(vpath);
                                if (__targ__121){
                                     return(__targ__121)[1]
                                } 
                            })()));
                            if (check_true (((await (await Environment.get_global("path_multiply"))(ppath,max_path_segment_length)>await (await Environment.get_global("path_multiply"))(vpath,max_path_segment_length))||(((p && p["block_step"])===0)&&((p && p["lambda_step"])===0))||(0===await (await Environment.get_global("length"))(viables))))){
                                await (await Environment.get_global("set_path"))((p && p["path"]),ntree,{
                                    mark:"return_point"
                                });
                                if (check_true (((p && p["if_id"])&&await (async function(){
                                    let __targ__122=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                    if (__targ__122){
                                         return(__targ__122)[(p && p["if_id"])]
                                    } 
                                })()))){
                                     return  await (async function() {
                                        let __for_body__125=async function(pinfo) {
                                            if (check_true ((undefined===if_paths[await (await Environment.get_global("as_lisp"))((pinfo && pinfo["path"]))]))){
                                                await async function(){
                                                    if_paths[await (await Environment.get_global("as_lisp"))((pinfo && pinfo["path"]))]=true;
                                                    return if_paths;
                                                    
                                                }();
                                                 return  await (await Environment.get_global("set_path"))((pinfo && pinfo["path"]),ntree,{
                                                    mark:"return_point"
                                                })
                                            }
                                        };
                                        let __array__126=[],__elements__124=await (async function(){
                                            let __targ__128=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                                            if (__targ__128){
                                                 return(__targ__128)[(p && p["if_id"])]
                                            } 
                                        })();
                                        let __BREAK__FLAG__=false;
                                        for(let __iter__123 in __elements__124) {
                                            __array__126.push(await __for_body__125(__elements__124[__iter__123]));
                                            if(__BREAK__FLAG__) {
                                                 __array__126.pop();
                                                break;
                                                
                                            }
                                        }return __array__126;
                                         
                                    })()
                                }
                            } else {
                                if (check_true (((undefined===if_paths[await (await Environment.get_global("as_lisp"))((p && p["path"]))])&&await (await Environment.get_global("not"))(((p && p["type"])==="final-return"))))){
                                     return  await (await Environment.get_global("set_path"))((p && p["path"]),ntree,{
                                        mark:"ignore"
                                    })
                                }
                            }
                        };
                        let __array__119=[],__elements__117=potentials;
                        let __BREAK__FLAG__=false;
                        for(let __iter__116 in __elements__117) {
                            __array__119.push(await __for_body__118(__elements__117[__iter__116]));
                            if(__BREAK__FLAG__) {
                                 __array__119.pop();
                                break;
                                
                            }
                        }return __array__119;
                         
                    })()
                }
            };
             return  ntree
        } else  {
             return js_tree
        }
    } ()
});
await Environment.set_global("splice_in_return_b",async function(js_tree,_ctx,_depth) {
     return  await async function(){
        if (check_true( (js_tree instanceof Array))) {
            let idx;
            let ntree;
            let next_val;
            let flattened;
            idx=0;
            ntree=[];
            _ctx=(_ctx||new Object());
            next_val=null;
            flattened=await (await Environment.get_global("flatten"))(js_tree);
            await (async function() {
                let __for_body__131=async function(comp) {
                    next_val=flattened[(idx+1)];
                    await async function(){
                        if (check_true( (comp instanceof Array))) {
                             return (ntree).push(await (await Environment.get_global("splice_in_return_b"))(comp,_ctx,await (await Environment.get_global("add"))((_depth||0),1)))
                        } else if (check_true( ((comp instanceof Object)&&((comp && comp["mark"])==="return_point")&&(await (await Environment.get_global("not"))(("return"===next_val))&&await (await Environment.get_global("not"))(("throw"===next_val))&&await (await Environment.get_global("not"))(("yield"===next_val))&&await (await Environment.get_global("not"))(((next_val instanceof Object)&&((next_val && next_val["ctype"]) instanceof String || typeof (next_val && next_val["ctype"])==='string')&&await (await Environment.get_global("contains?"))("block",((next_val && next_val["ctype"])||"")))))))) {
                            (ntree).push(" ");
                            (ntree).push("return");
                             return  (ntree).push(" ")
                        } else  {
                             return (ntree).push(comp)
                        }
                    } ();
                     return  idx+=1
                };
                let __array__132=[],__elements__130=flattened;
                let __BREAK__FLAG__=false;
                for(let __iter__129 in __elements__130) {
                    __array__132.push(await __for_body__131(__elements__130[__iter__129]));
                    if(__BREAK__FLAG__) {
                         __array__132.pop();
                        break;
                        
                    }
                }return __array__132;
                 
            })();
             return  ntree
        } else  {
             return js_tree
        }
    } ()
},{ "name":"splice_in_return_b","fn_args":"(js_tree _ctx _depth)"
});
await Environment.set_global("aif",async function(test_expr,eval_when_true,eval_when_false) {
     return  ["=:let",[["=:it",test_expr]],["=:if","=:it",eval_when_true,eval_when_false]]
},{ "eval_when":{ "compile_time":true
},"name":"aif","macro":true,"fn_args":"(test_expr eval_when_true eval_when_false)","description":["=:+","Anaphoric If - This macro defines a scope in which the symbol `it is used ","to store the evaluation of the test form or expression.  It is then available ","in the eval_when_true form and, if provided, the eval_when_false expression."],"usage":["test_expression:*","eval_when_true:*","eval_when_false:*?"],"tags":["conditional","logic","anaphoric","if","it"]
});
await Environment.set_global("ifa",async function(test,thenclause,elseclause) {
     return  ["=:let",[["=:it",test]],["=:if","=:it",thenclause,elseclause]]
},{ "eval_when":{ "compile_time":true
},"name":"ifa","macro":true,"fn_args":"(test thenclause elseclause)","description":"Similar to if, the ifa macro is anaphoric in binding, where the it value is defined as the return value of the test form. Use like if, but the it reference is bound within the bodies of the thenclause or elseclause.","usage":["test:*","thenclause:*","elseclause:*"],"tags":["cond","it","if","anaphoric"]
});
await Environment.set_global("map_range",async function(n,from_range,to_range) {
     return  await (await Environment.get_global("add"))((to_range && to_range["0"]),(((n-(from_range && from_range["0"]))/((from_range && from_range["1"])-(from_range && from_range["0"])))*((to_range && to_range["1"])-(to_range && to_range["0"]))))
},{ "name":"map_range","fn_args":"(n from_range to_range)","usage":["n:number","from_range:array","to_range:array"],"tags":["range","scale","conversion"],"description":["=:+","Given an initial number n, and two numeric ranges, maps n from the first range ","to the second range, returning the value of n as scaled into the second range. "]
});
 Environment.set_global("HSV_to_RGB",new Function("h, s, v","{\n        var r, g, b, i, f, p, q, t;\n        if (arguments.length === 1) {\n            s = h.s, v = h.v, h = h.h;\n        }\n        i = Math.floor(h * 6);\n        f = h * 6 - i;\n        p = v * (1 - s);\n        q = v * (1 - f * s);\n        t = v * (1 - (1 - f) * s);\n        switch (i % 6) {\n            case 0: r = v, g = t, b = p; break;\n            case 1: r = q, g = v, b = p; break;\n            case 2: r = p, g = v, b = t; break;\n            case 3: r = p, g = q, b = v; break;\n            case 4: r = t, g = p, b = v; break;\n            case 5: r = v, g = p, b = q; break;\n        }\n        return {\n            r: Math.round(r * 255),\n            g: Math.round(g * 255),\n            b: Math.round(b * 255)\n        }\n    }"));
await Environment.set_global("color_for_number",async function(num,saturation,brightness) {
    let h;
    let pos;
    let color_key;
    let rgb;
    let v;
    h=await Math.abs(await parseInt(num));
    pos=(8%h);
    color_key=[0,4,1,5,2,6,3,7];
    rgb=null;
    v=color_key[pos];
    ;
    h=await (await Environment.get_global("map_range"))((360%(28*h)),[0,360],[0,1]);
    v=await (await Environment.get_global("map_range"))([v,[0,7],[0.92,1]]);
    rgb=await (await Environment.get_global("HSV_to_RGB"))(h,saturation,brightness);
     return  ("#"+await (async function() {
        {
             let __call_target__=await (rgb && rgb["r"])["toString"].call((rgb && rgb["r"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })()+await (async function() {
        {
             let __call_target__=await (rgb && rgb["g"])["toString"].call((rgb && rgb["g"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })()+await (async function() {
        {
             let __call_target__=await (rgb && rgb["b"])["toString"].call((rgb && rgb["b"]),16), __call_method__="padStart";
            return await __call_target__[__call_method__].call(__call_target__,2,"0")
        } 
    })())
},{ "name":"color_for_number","fn_args":"(num saturation brightness)","usage":["number:number","saturation:float","brightness:float"],"description":"Given an arbitrary integer, a saturation between 0 and 1 and a brightness between 0 and 1, return an RGB color string","tags":["ui","color","view"]
});
await Environment.set_global("flatten_ctx",async function(ctx,_var_table) {
    let var_table;
    let ctx_keys;
    var_table=(_var_table||new Object());
    ctx_keys=await (await Environment.get_global("keys"))(var_table);
    if (check_true ((ctx && ctx["scope"]))){
        await (async function() {
            let __for_body__135=async function(k) {
                if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("contains?"))(k,ctx_keys)))){
                     return  await async function(){
                        var_table[k]=await (async function(){
                            let __targ__138=(ctx && ctx["scope"]);
                            if (__targ__138){
                                 return(__targ__138)[k]
                            } 
                        })();
                        return var_table;
                        
                    }()
                }
            };
            let __array__136=[],__elements__134=await (await Environment.get_global("keys"))((ctx && ctx["scope"]));
            let __BREAK__FLAG__=false;
            for(let __iter__133 in __elements__134) {
                __array__136.push(await __for_body__135(__elements__134[__iter__133]));
                if(__BREAK__FLAG__) {
                     __array__136.pop();
                    break;
                    
                }
            }return __array__136;
             
        })();
        if (check_true ((ctx && ctx["parent"]))){
             await (await Environment.get_global("flatten_ctx"))((ctx && ctx["parent"]),var_table)
        };
         return  var_table
    }
},{ "name":"flatten_ctx","fn_args":"(ctx _var_table)"
});
await Environment.set_global("identify_symbols",async function(quoted_form,_state) {
    let acc;
    acc=[];
    _state=await (async function () {
         if (check_true (_state)){
              return _state
        } else {
              return new Object()
        } 
    })();
    debugger;
    ;
    await async function(){
        if (check_true( (quoted_form instanceof Array))) {
             return  await (async function() {
                let __for_body__141=async function(elem) {
                     return  (acc).push(await (await Environment.get_global("identify_symbols"))(elem,_state))
                };
                let __array__142=[],__elements__140=quoted_form;
                let __BREAK__FLAG__=false;
                for(let __iter__139 in __elements__140) {
                    __array__142.push(await __for_body__141(__elements__140[__iter__139]));
                    if(__BREAK__FLAG__) {
                         __array__142.pop();
                        break;
                        
                    }
                }return __array__142;
                 
            })()
        } else if (check_true( ((quoted_form instanceof String || typeof quoted_form==='string')&&await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
             return (acc).push({
                name:await (await Environment.get_global("as_lisp"))(quoted_form),where:await (await Environment.get_global("describe"))(await (await Environment.get_global("as_lisp"))(quoted_form))
            })
        } else if (check_true( (quoted_form instanceof Object))) {
             return await (async function() {
                let __for_body__145=async function(elem) {
                     return  (acc).push(await (await Environment.get_global("identify_symbols"))(elem,_state))
                };
                let __array__146=[],__elements__144=await (await Environment.get_global("values"))(quoted_form);
                let __BREAK__FLAG__=false;
                for(let __iter__143 in __elements__144) {
                    __array__146.push(await __for_body__145(__elements__144[__iter__143]));
                    if(__BREAK__FLAG__) {
                         __array__146.pop();
                        break;
                        
                    }
                }return __array__146;
                 
            })()
        }
    } ();
     return  ["=:quote",acc]
},{ "name":"identify_symbols","fn_args":"(quoted_form _state)"
});
await Environment.set_global("unless",async function(condition,...forms) {
     return  ["=:if",["=:not",condition],["=:do",].concat(forms)]
},{ "eval_when":{ "compile_time":true
},"name":"unless","macro":true,"fn_args":"(condition \"&\" forms)","description":"opposite of if, if the condition is false then the forms are evaluated","usage":["condition:array","forms:array"]
});
await Environment.set_global("random_int",async function(...args) {
    let top;
    let bottom;
    top=0;
    bottom=0;
    if (check_true ((await (await Environment.get_global("length"))(args)>1))){
        top=await parseInt((args && args["1"]));
         bottom=await parseInt((args && args["0"]))
    } else {
         top=await parseInt((args && args["0"]))
    };
     return  await parseInt(await (await Environment.get_global("add"))((await Math.random()*(top-bottom)),bottom))
},{ "name":"random_int","fn_args":"(\"&\" \"args\")","description":"Returns a random integer between 0 and the argument.  If two arguments are provided then returns an integer between the first argument and the second argument.","usage":["arg1:number","arg2?:number"],"tags":["rand","number","integer"]
});
await Environment.set_global("resolve_multi_path",async function(path,obj,not_found) {
     return  await async function(){
        if (check_true( (obj instanceof Object))) {
             return await async function(){
                if (check_true( ((await (await Environment.get_global("length"))(path)===1)&&("*"===await (await Environment.get_global("first"))(path))))) {
                     return (obj||not_found)
                } else if (check_true( ((await (await Environment.get_global("length"))(path)===1)&&(obj[await (await Environment.get_global("first"))(path)] instanceof Object)))) {
                     return (obj[await (await Environment.get_global("first"))(path)]||not_found)
                } else if (check_true( ((await (await Environment.get_global("length"))(path)===1)&&await (await Environment.get_global("not"))((obj[await (await Environment.get_global("first"))(path)] instanceof Object))&&await (await Environment.get_global("not"))((null==obj[await (await Environment.get_global("first"))(path)]))))) {
                     return obj[await (await Environment.get_global("first"))(path)]
                } else if (check_true( ((obj instanceof Array)&&("*"===await (await Environment.get_global("first"))(path))))) {
                     return await (async function() {
                        let __for_body__149=async function(val) {
                             return  await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
                        };
                        let __array__150=[],__elements__148=obj;
                        let __BREAK__FLAG__=false;
                        for(let __iter__147 in __elements__148) {
                            __array__150.push(await __for_body__149(__elements__148[__iter__147]));
                            if(__BREAK__FLAG__) {
                                 __array__150.pop();
                                break;
                                
                            }
                        }return __array__150;
                         
                    })()
                } else if (check_true( ((obj instanceof Object)&&("*"===await (await Environment.get_global("first"))(path))))) {
                     return await (async function() {
                        let __for_body__153=async function(val) {
                             return  await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
                        };
                        let __array__154=[],__elements__152=await (await Environment.get_global("values"))(obj);
                        let __BREAK__FLAG__=false;
                        for(let __iter__151 in __elements__152) {
                            __array__154.push(await __for_body__153(__elements__152[__iter__151]));
                            if(__BREAK__FLAG__) {
                                 __array__154.pop();
                                break;
                                
                            }
                        }return __array__154;
                         
                    })()
                } else if (check_true( (await (await Environment.get_global("length"))(path)>1))) {
                     return await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),obj[await (await Environment.get_global("first"))(path)],not_found)
                }
            } ()
        } else  {
             return not_found
        }
    } ()
},{ "name":"resolve_multi_path","fn_args":"(path obj not_found)","tags":["path","wildcard","tree","structure"],"usage":["path:array","obj:object","not_found:?*"],"description":"Given a list containing a path to a value in a nested array, return the value at the given path. If the value * is in the path, the path value is a wild card if the passed object structure at the path position is a vector or list."
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
        let:[[1,"*",0]],defun:[[1],[2,"*"]]
    };
    uop=null;
    get_allocations=async function() {
        sym_paths=allocators[await (await Environment.get_global("unquotify"))((quoted_form && quoted_form["0"]))];
        if (check_true (sym_paths)){
             return  await (async function() {
                let __for_body__157=async function(sym_path) {
                    fval=await (await Environment.get_global("resolve_multi_path"))(sym_path,quoted_form);
                    await console.log("Fval is: ",fval,"sym_path: ",sym_path,"current_path: ",_current_path," ",quoted_form);
                    uop=await (await Environment.get_global("unquotify"))((quoted_form && quoted_form["0"]));
                    if (check_true ((fval instanceof Array))){
                          return await (async function() {
                            let __for_body__161=async function(s) {
                                s=await (await Environment.get_global("unquotify"))(s);
                                if (check_true ((null==await (async function(){
                                    let __targ__163=(_state && _state["definitions"]);
                                    if (__targ__163){
                                         return(__targ__163)[fval]
                                    } 
                                })()))){
                                     await async function(){
                                        let __target_obj__164=(_state && _state["definitions"]);
                                        __target_obj__164[s]=[];
                                        return __target_obj__164;
                                        
                                    }()
                                };
                                 return  (await (async function(){
                                    let __targ__165=(_state && _state["definitions"]);
                                    if (__targ__165){
                                         return(__targ__165)[s]
                                    } 
                                })()).push({
                                    path:_current_path,op:uop
                                })
                            };
                            let __array__162=[],__elements__160=fval;
                            let __BREAK__FLAG__=false;
                            for(let __iter__159 in __elements__160) {
                                __array__162.push(await __for_body__161(__elements__160[__iter__159]));
                                if(__BREAK__FLAG__) {
                                     __array__162.pop();
                                    break;
                                    
                                }
                            }return __array__162;
                             
                        })()
                    } else {
                        if (check_true ((null==await (async function(){
                            let __targ__166=(_state && _state["definitions"]);
                            if (__targ__166){
                                 return(__targ__166)[fval]
                            } 
                        })()))){
                             await async function(){
                                let __target_obj__167=(_state && _state["definitions"]);
                                __target_obj__167[fval]=[];
                                return __target_obj__167;
                                
                            }()
                        };
                         return  (await (async function(){
                            let __targ__168=(_state && _state["definitions"]);
                            if (__targ__168){
                                 return(__targ__168)[fval]
                            } 
                        })()).push({
                            path:_current_path,op:uop
                        })
                    }
                };
                let __array__158=[],__elements__156=sym_paths;
                let __BREAK__FLAG__=false;
                for(let __iter__155 in __elements__156) {
                    __array__158.push(await __for_body__157(__elements__156[__iter__155]));
                    if(__BREAK__FLAG__) {
                         __array__158.pop();
                        break;
                        
                    }
                }return __array__158;
                 
            })()
        }
    };
    idx=-1;
    fval=null;
    sym_paths=null;
    is_root=await (async function () {
         if (check_true ((_state==undefined))){
              return true
        } else {
              return false
        } 
    })();
    _state=await (async function () {
         if (check_true (_state)){
              return _state
        } else {
              return {
                definitions:new Object()
            }
        } 
    })();
    _current_path=(_current_path||[]);
    ;
    await console.log("symbol_tree: quoted_form: ",quoted_form,_current_path);
    await get_allocations();
     return  await async function(){
        if (check_true( (quoted_form instanceof Array))) {
            await (await Environment.get_global("map"))(async function(elem,idx) {
                {
                    let it;
                    it=await (await Environment.get_global("symbol_tree"))(elem,_state,await (await Environment.get_global("conj"))(_current_path,idx));
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
        } else if (check_true( ((quoted_form instanceof String || typeof quoted_form==='string')&&await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
             return  await (await Environment.get_global("unquotify"))(quoted_form)
        } else if (check_true( (quoted_form instanceof Object))) {
            await (async function() {
                let __for_body__171=async function(pset) {
                    {
                        let it;
                        it=await (await Environment.get_global("symbol_tree"))((pset && pset["1"]),_state,await (await Environment.get_global("conj"))(_current_path,await (async function(){
                            let __array_op_rval__173=(pset && pset["1"]);
                             if (__array_op_rval__173 instanceof Function){
                                return await __array_op_rval__173() 
                            } else {
                                return[__array_op_rval__173]
                            }
                        })()));
                        if (check_true (it)){
                              return (acc).push(it)
                        } else {
                              return 
                        }
                    }
                };
                let __array__172=[],__elements__170=await (await Environment.get_global("pairs"))(quoted_form);
                let __BREAK__FLAG__=false;
                for(let __iter__169 in __elements__170) {
                    __array__172.push(await __for_body__171(__elements__170[__iter__169]));
                    if(__BREAK__FLAG__) {
                         __array__172.pop();
                        break;
                        
                    }
                }return __array__172;
                 
            })();
            if (check_true (is_root)){
                  return await (await Environment.get_global("add"))({
                    tree:acc
                },_state)
            } else {
                  return acc
            }
        }
    } ()
},{ "name":"symbol_tree","fn_args":"(quoted_form _state _current_path)","description":"Given a quoted form as input, isolates the symbols of the form in a tree structure so dependencies can be seen.","usage":["quoted_form:quote"],"tags":["structure","development","analysis"]
});
await Environment.set_global("except_nil",async function(items) {
    let acc=[];
    ;
    if (check_true (await (await Environment.get_global("not"))((await (await Environment.get_global("sub_type"))(items)=="array")))){
         items=[items]
    };
    await (async function() {
        let __for_body__176=async function(value) {
            if (check_true (await (await Environment.get_global("not"))((null==value)))){
                  return (acc).push(value)
            }
        };
        let __array__177=[],__elements__175=items;
        let __BREAK__FLAG__=false;
        for(let __iter__174 in __elements__175) {
            __array__177.push(await __for_body__176(__elements__175[__iter__174]));
            if(__BREAK__FLAG__) {
                 __array__177.pop();
                break;
                
            }
        }return __array__177;
         
    })();
     return  acc
},{ "name":"except_nil","fn_args":"(\"items\")","description":"Takes the passed list or set and returns a new list that doesn't contain any undefined or nil values.  Unlike no_empties, false values and blank strings will pass through.","usage":["items:list|set"],"tags":["filter","nil","undefined","remove","no_empties"]
});
await Environment.set_global("each",async function(items,property) {
     return  await async function(){
        if (check_true( ((property instanceof String || typeof property==='string')||await (await Environment.get_global("is_number?"))(property)))) {
             return await (await Environment.get_global("except_nil"))(await (async function() {
                let __for_body__180=async function(item) {
                    if (check_true (item)){
                         return  item[property]
                    }
                };
                let __array__181=[],__elements__179=(items||[]);
                let __BREAK__FLAG__=false;
                for(let __iter__178 in __elements__179) {
                    __array__181.push(await __for_body__180(__elements__179[__iter__178]));
                    if(__BREAK__FLAG__) {
                         __array__181.pop();
                        break;
                        
                    }
                }return __array__181;
                 
            })())
        } else if (check_true( (await (await Environment.get_global("sub_type"))(property)=="array"))) {
            let __collector;
            let __result;
            let __action;
            __collector=[];
            __result=null;
            __action=async function(item) {
                let nl=[];
                ;
                await (async function() {
                    let __for_body__184=async function(p) {
                         return  await async function(){
                            if (check_true( (p instanceof Array))) {
                                 return (nl).push(await (await Environment.get_global("resolve_path"))(p,item))
                            } else if (check_true( p instanceof Function)) {
                                 return (nl).push(await (async function(){
                                    let __array_op_rval__186=p;
                                     if (__array_op_rval__186 instanceof Function){
                                        return await __array_op_rval__186(item) 
                                    } else {
                                        return[__array_op_rval__186,item]
                                    }
                                })())
                            } else  {
                                 return (nl).push(item[p])
                            }
                        } ()
                    };
                    let __array__185=[],__elements__183=property;
                    let __BREAK__FLAG__=false;
                    for(let __iter__182 in __elements__183) {
                        __array__185.push(await __for_body__184(__elements__183[__iter__182]));
                        if(__BREAK__FLAG__) {
                             __array__185.pop();
                            break;
                            
                        }
                    }return __array__185;
                     
                })();
                 return  nl
            };
            ;
            await (async function() {
                let __for_body__189=async function(__item) {
                    __result=await __action(__item);
                    if (check_true (__result)){
                          return (__collector).push(__result)
                    }
                };
                let __array__190=[],__elements__188=items;
                let __BREAK__FLAG__=false;
                for(let __iter__187 in __elements__188) {
                    __array__190.push(await __for_body__189(__elements__188[__iter__187]));
                    if(__BREAK__FLAG__) {
                         __array__190.pop();
                        break;
                        
                    }
                }return __array__190;
                 
            })();
             return  __collector
        } else if (check_true( (await (await Environment.get_global("sub_type"))(property)=="AsyncFunction"))) {
            let __collector;
            let __result;
            let __action;
            __collector=[];
            __result=null;
            __action=async function(item) {
                 return  await (async function(){
                    let __array_op_rval__191=property;
                     if (__array_op_rval__191 instanceof Function){
                        return await __array_op_rval__191(item) 
                    } else {
                        return[__array_op_rval__191,item]
                    }
                })()
            };
            ;
            await (async function() {
                let __for_body__194=async function(__item) {
                    __result=await __action(__item);
                    if (check_true (__result)){
                          return (__collector).push(__result)
                    }
                };
                let __array__195=[],__elements__193=items;
                let __BREAK__FLAG__=false;
                for(let __iter__192 in __elements__193) {
                    __array__195.push(await __for_body__194(__elements__193[__iter__192]));
                    if(__BREAK__FLAG__) {
                         __array__195.pop();
                        break;
                        
                    }
                }return __array__195;
                 
            })();
             return  __collector
        } else if (check_true( (await (await Environment.get_global("sub_type"))(property)=="Function"))) {
            let __collector;
            let __result;
            let __action;
            __collector=[];
            __result=null;
            __action=async function(item) {
                 return  await (async function(){
                    let __array_op_rval__196=property;
                     if (__array_op_rval__196 instanceof Function){
                        return await __array_op_rval__196(item) 
                    } else {
                        return[__array_op_rval__196,item]
                    }
                })()
            };
            ;
            await (async function() {
                let __for_body__199=async function(__item) {
                    __result=await __action(__item);
                    if (check_true (__result)){
                          return (__collector).push(__result)
                    }
                };
                let __array__200=[],__elements__198=items;
                let __BREAK__FLAG__=false;
                for(let __iter__197 in __elements__198) {
                    __array__200.push(await __for_body__199(__elements__198[__iter__197]));
                    if(__BREAK__FLAG__) {
                         __array__200.pop();
                        break;
                        
                    }
                }return __array__200;
                 
            })();
             return  __collector
        } else  {
             throw new TypeError(("each: strings, arrays, and functions can be provided for the property name or names to extract - received: "+await (await Environment.get_global("sub_type"))(property)));
            
        }
    } ()
},{ "name":"each","fn_args":"(items property)","description":["=:+","Provided a list of items, provide a property name or ","a list of property names to be extracted and returned from the source array as a new list.","If property is an array, and contains values that are arrays, those arrays will be treated as a path."],"usage":["items:list","property:string|list|function|AsyncFunction"],"tags":["pluck","element","only","list","object","property"]
});
await Environment.set_global("replace",async function(...args) {
    if (check_true (((args && args.length)<3)))throw new SyntaxError("Invalid syntax for replace: requires at least three arguments, target value or regex, the replacement value, and at least one value (object list or string)");
     else {
          return await (async function(){
            try /* TRY SIMPLE */ {
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
                        let __for_body__204=async function(value) {
                            value_type=await subtype(value);
                            if (check_true ((value_type==="Number"))){
                                value_type="String";
                                 value=(""+value)
                            };
                             return  await async function(){
                                if (check_true( (value_type==="String"))) {
                                     return (rval).push(await value["replace"].call(value,target,replacement))
                                } else if (check_true( (value_type==="array"))) {
                                     return await (async function() {
                                        let __for_body__208=async function(elem) {
                                             return  (rval).push(await (await Environment.get_global("replace"))(target,replacement,elem))
                                        };
                                        let __array__209=[],__elements__207=value;
                                        let __BREAK__FLAG__=false;
                                        for(let __iter__206 in __elements__207) {
                                            __array__209.push(await __for_body__208(__elements__207[__iter__206]));
                                            if(__BREAK__FLAG__) {
                                                 __array__209.pop();
                                                break;
                                                
                                            }
                                        }return __array__209;
                                         
                                    })()
                                } else if (check_true( (value_type==="object"))) {
                                    sr_val=new Object();
                                    await (async function() {
                                        let __for_body__212=async function(k) {
                                            if (check_true (await value["hasOwnProperty"].call(value,k))){
                                                 return  await async function(){
                                                    sr_val[k]=await (await Environment.get_global("replace"))(target,replacement,value[k]);
                                                    return sr_val;
                                                    
                                                }()
                                            }
                                        };
                                        let __array__213=[],__elements__211=await (await Environment.get_global("keys"))(value);
                                        let __BREAK__FLAG__=false;
                                        for(let __iter__210 in __elements__211) {
                                            __array__213.push(await __for_body__212(__elements__211[__iter__210]));
                                            if(__BREAK__FLAG__) {
                                                 __array__213.pop();
                                                break;
                                                
                                            }
                                        }return __array__213;
                                         
                                    })();
                                     return  rval=await rval["concat"].call(rval,sr_val)
                                }
                            } ()
                        };
                        let __array__205=[],__elements__203=work_values;
                        let __BREAK__FLAG__=false;
                        for(let __iter__202 in __elements__203) {
                            __array__205.push(await __for_body__204(__elements__203[__iter__202]));
                            if(__BREAK__FLAG__) {
                                 __array__205.pop();
                                break;
                                
                            }
                        }return __array__205;
                         
                    })();
                    if (check_true ((await (await Environment.get_global("not"))((arg_value_type==="array"))&&await (await Environment.get_global("not"))((arg_value_type==="object"))))){
                          return await (await Environment.get_global("first"))(rval)
                    } else {
                          return rval
                    }
                } 
            } catch(__exception__201) {
                  if (__exception__201 instanceof Error) {
                     let e=__exception__201;
                      return await console.error(("replace: "+e))
                } 
            }
        })()
    }
},{ "name":"replace","fn_args":"(\"&\" args)"
});
await Environment.set_global("cl_encode_string",async function(text) {
    if (check_true ((text instanceof String || typeof text==='string'))){
        let escaped;
        let nq;
        let step1;
        let snq;
        escaped=await (await Environment.get_global("replace"))(new RegExp("\n","g"),await (await Environment.get_global("add"))(await String.fromCharCode(92),"n"),text);
        escaped=await (await Environment.get_global("replace"))(new RegExp("\r","g"),await (await Environment.get_global("add"))(await String.fromCharCode(92),"r"),escaped);
        nq=(escaped).split(await String.fromCharCode(34));
        step1=(nq).join(await (await Environment.get_global("add"))(await String.fromCharCode(92),await String.fromCharCode(34)));
        snq=(step1).split(await String.fromCharCode(39));
         return  step1
    } else {
          return text
    }
},{ "name":"cl_encode_string","fn_args":"(text)"
});
await Environment.set_global("path_to_js_syntax",async function(comps) {
    if (check_true ((comps instanceof Array))){
         if (check_true (((comps && comps.length)>1))){
              return (await (await Environment.get_global("map"))(async function(comp,idx) {
                if (check_true ((idx===0))){
                      return comp
                } else {
                      return await async function(){
                        if (check_true( (await isNaN(parseInt(comp))&&await (await Environment.get_global("starts_with?"))("\"",comp)))) {
                             return ("["+comp+"]")
                        } else if (check_true( await isNaN(parseInt(comp)))) {
                             return ("."+comp)
                        } else  {
                             return ("["+"'"+comp+"'"+"]")
                        }
                    } ()
                }
            },comps)).join("")
        } else {
              return (comps && comps["0"])
        }
    } else throw new TypeError(("path_to_js_syntax: need array - given "+await (await Environment.get_global("sub_type"))(comps)));
    
},{ "name":"path_to_js_syntax","fn_args":"(comps)"
});
await Environment.set_global("first_is_upper_case?",async function(str_val) {
    {
        let rval=await str_val["match"].call(str_val,new RegExp("^[A-Z]"));
        ;
        if (check_true ((rval&&(rval && rval["0"])))){
              return true
        } else {
              return false
        }
    }
},{ "name":"first_is_upper_case?","fn_args":"(str_val)"
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
        await async function(){
            comps[0]=await (async function(){
                let __array_op_rval__216=sanitizer_fn;
                 if (__array_op_rval__216 instanceof Function){
                    return await __array_op_rval__216((comps && comps["0"])) 
                } else {
                    return[__array_op_rval__216,(comps && comps["0"])]
                }
            })();
            return comps;
            
        }();
        await (async function(){
             let __test_condition__217=async function() {
                 return  ((comps && comps.length)>0)
            };
            let __body_ref__218=async function() {
                (acc).push((comps).shift());
                if (check_true (((comps && comps.length)>0))){
                      return (acc_full).push((["check_true(",await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx),")"]).join(""))
                } else {
                      return (acc_full).push(await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx))
                }
            };
            let __BREAK__FLAG__=false;
            while(await __test_condition__217()) {
                await __body_ref__218();
                 if(__BREAK__FLAG__) {
                     break;
                    
                }
            } ;
            
        })();
        rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
         return  rval
    }
},{ "name":"safe_access_2","fn_args":"(token ctx sanitizer_fn)"
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
        await async function(){
            comps[0]=await (async function(){
                let __array_op_rval__220=sanitizer_fn;
                 if (__array_op_rval__220 instanceof Function){
                    return await __array_op_rval__220((comps && comps["0"])) 
                } else {
                    return[__array_op_rval__220,(comps && comps["0"])]
                }
            })();
            return comps;
            
        }();
        await (async function(){
             let __test_condition__221=async function() {
                 return  ((comps && comps.length)>0)
            };
            let __body_ref__222=async function() {
                (acc).push((comps).shift());
                 return  (acc_full).push(await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx))
            };
            let __BREAK__FLAG__=false;
            while(await __test_condition__221()) {
                await __body_ref__222();
                 if(__BREAK__FLAG__) {
                     break;
                    
                }
            } ;
            
        })();
        rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
         return  rval
    }
},{ "name":"safe_access","fn_args":"(token ctx sanitizer_fn)"
});
await Environment.set_global("compile_to_js",async function(quoted_form) {
     return  ["=:->","=:Environment","compile",quoted_form]
},{ "eval_when":{ "compile_time":true
},"name":"compile_to_js","macro":true,"fn_args":"(quoted_form)","description":["=:+","Given a quoted form, returns an array with two elements, element 0 is the compilation metadata, ","and element 1 is the output Javascript as a string."],"usage":["quoted_form:*"],"tags":["compilation","source","javascript","environment"]
});
await Environment.set_global("evaluate_compiled_source",async function(compiled_source) {
     return  ["=:->","=:Environment","evaluate",compiled_source,"=:nil",{ "compiled_source":true
}]
},{ "eval_when":{ "compile_time":true
},"name":"evaluate_compiled_source","macro":true,"fn_args":"(compiled_source)","description":["=:+","The macro evaluate_compiled_source takes the direct output of the compiler, ","which can be captured using the macro compile_to_js, and performs the ","evaluation of the compiled source, thereby handling the second half of the ","compile then evaluate cycle.  This call will return the results of ","the evaluation of the compiled code assembly."],"usage":["compiled_souce:array"],"tags":["compilation","compile","eval","pre-compilation"]
});
await Environment.set_global("form_structure",async function(quoted_form,max_depth) {
    let idx;
    let acc;
    let structure;
    let follow_tree;
    idx=0;
    acc=[];
    max_depth=(max_depth||(await Environment.get_global("MAX_SAFE_INTEGER")));
    structure=quoted_form;
    follow_tree=async function(elems,acc,_depth) {
         return  await async function(){
            if (check_true( (((elems instanceof Array)||(elems instanceof Object))&&(_depth>=max_depth)))) {
                 if (check_true ((elems instanceof Array))){
                      return "array"
                } else {
                      return "object"
                }
            } else if (check_true( (elems instanceof Array))) {
                 return await (await Environment.get_global("map"))(async function(elem,idx) {
                     return  await follow_tree(elem,[],await (await Environment.get_global("add"))(_depth,1))
                },elems)
            } else if (check_true( (elems instanceof Object))) {
                 return  await (async function() {
                    let __for_body__225=async function(pset) {
                         return  await follow_tree((pset && pset["1"]),[],await (await Environment.get_global("add"))(_depth,1))
                    };
                    let __array__226=[],__elements__224=await (await Environment.get_global("pairs"))(elems);
                    let __BREAK__FLAG__=false;
                    for(let __iter__223 in __elements__224) {
                        __array__226.push(await __for_body__225(__elements__224[__iter__223]));
                        if(__BREAK__FLAG__) {
                             __array__226.pop();
                            break;
                            
                        }
                    }return __array__226;
                     
                })()
            } else  {
                 return await async function(){
                    if (check_true( ((elems instanceof String || typeof elems==='string')&&await (await Environment.get_global("starts_with?"))("=:",elems)))) {
                         return "symbol"
                    } else if (check_true( await (await Environment.get_global("is_number?"))(elems))) {
                         return "number"
                    } else if (check_true( (elems instanceof String || typeof elems==='string'))) {
                         return "string"
                    } else if (check_true( ((elems===true)||(elems===false)))) {
                         return "boolean"
                    } else  {
                         return elems
                    }
                } ()
            }
        } ()
    };
     return  await follow_tree(structure,[],0)
},{ "name":"form_structure","fn_args":"(quoted_form max_depth)","description":["=:+","Given a form and an optional max_depth positive number, ","traverses the passed JSON form and produces a nested array structure that contains","the contents of the form classified as either a \"symbol\", \"number\", \"string\", \"boolean\", \"array\", \"object\", or the elem itself. ","The returned structure will mirror the passed structure in form, except with the leaf contents ","being replaced with generalized categorizations."],"tags":["validation","compilation","structure"],"usage":["quoted_form:*","max_depth:?number"]
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
        let __for_body__229=async function(rule) {
            if (check_true (((rule instanceof Array)&&((rule && rule.length)>1)&&((rule && rule["0"]) instanceof Array)&&((rule && rule["1"]) instanceof Array)))){
                all_valid=true;
                target=await (await Environment.get_global("resolve_path"))((rule && rule["0"]),quoted_form);
                await (async function() {
                    let __for_body__233=async function(validation) {
                        if (check_true (await (await Environment.get_global("not"))(await (async function(){
                            let __array_op_rval__235=validation;
                             if (__array_op_rval__235 instanceof Function){
                                return await __array_op_rval__235(target) 
                            } else {
                                return[__array_op_rval__235,target]
                            }
                        })()))){
                            all_valid=false;
                            __BREAK__FLAG__=true;
                            return
                        }
                    };
                    let __array__234=[],__elements__232=(rule && rule["1"]);
                    let __BREAK__FLAG__=false;
                    for(let __iter__231 in __elements__232) {
                        __array__234.push(await __for_body__233(__elements__232[__iter__231]));
                        if(__BREAK__FLAG__) {
                             __array__234.pop();
                            break;
                            
                        }
                    }return __array__234;
                     
                })();
                if (check_true (all_valid)){
                      return ((results && results["valid"])).push(((rule && rule["2"])||(rule && rule["0"])))
                } else {
                      return ((results && results["invalid"])).push(((rule && rule["2"])||(rule && rule["0"])))
                }
            }
        };
        let __array__230=[],__elements__228=(validation_rules||[]);
        let __BREAK__FLAG__=false;
        for(let __iter__227 in __elements__228) {
            __array__230.push(await __for_body__229(__elements__228[__iter__227]));
            if(__BREAK__FLAG__) {
                 __array__230.pop();
                break;
                
            }
        }return __array__230;
         
    })();
    await async function(){
        results["all_passed"]=(await (await Environment.get_global("length"))((results && results["valid"]))===(results && results["rule_count"]));
        return results;
        
    }();
     return  results
},{ "name":"validate_form_structure","fn_args":"(validation_rules quoted_form)","description":["=:+","Given a validation rule structure and a quoted form to analyze returns an object with ","two keys, valid and invalid, which are arrays containing the outcome of the rule ","evaluation, a rule_count key containing the total rules passed, and an all_passed key","which will be set to true if all rules passed, otherwise it will fail.","If the rule evaluates successfully, valid is populated with the rule path, ","otherwise the rule path is placed in the invalid array.<br><br>","Rule structure is as follows:<br><code>","[ [path [validation validation ...] \"rule_name\"] [path [validation ...] \"rule_name\"] ]<br>","</code>","where path is an array with the index path and ","validation is a single argument lambda (fn (v) v) that must either ","return true or false. If true, the validation is considered correct, ","false for incorrect.  The result of the rule application will be put in the valid array, ","otherwise the result will be put in invalid."],"tags":["validation","rules","form","structure"],"usage":["validation_rules:array","quoted_form:*"]
});
await Environment.set_global("*compiler_syntax_rules*",{
    compile_let:[[[0,1,"val"],[(await Environment.get_global("is_array?"))],"let allocation section"],[[0,2],[async function(v) {
         return  await (await Environment.get_global("not"))((v===undefined))
    }],"let missing block"]],compile_cond:[[[0],[async function(v) {
         return  ((await (await Environment.get_global("length"))(await (await Environment.get_global("rest"))(v))%2)===0)
    }],"cond: odd number of arguments"]],compile_assignment:[[[0,1],[async function(v) {
         return  await (await Environment.get_global("not"))((v===undefined))
    }],"assignment is missing target and values"],[[0,2],[async function(v) {
         return  await (await Environment.get_global("not"))((v===undefined))
    }],"assignment is missing value"]]
});
await Environment.set_global("compiler_source_chain",async function(cpath,tree,sources) {
    if (check_true (((cpath instanceof Array)&&tree))){
        let source;
        sources=(sources||[]);
        source=null;
        cpath=await (await Environment.get_global("chop"))(cpath);
        source=await (await Environment.get_global("as_lisp"))(await (await Environment.get_global("resolve_path"))(cpath,tree));
        if (check_true (((source && source.length)>80))){
             source=await (await Environment.get_global("add"))(await source["substr"].call(source,0,80),"...")
        };
        if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("blank?"))(source)))){
             (sources).push(source)
        };
        if (check_true ((((cpath && cpath.length)>0)&&((sources && sources.length)<2)))){
             await (await Environment.get_global("compiler_source_chain"))(cpath,tree,sources)
        };
         return  sources
    }
},{ "name":"compiler_source_chain","fn_args":"(cpath tree sources)"
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
        let __targ__237=(await Environment.get_global("*compiler_syntax_rules*"));
        if (__targ__237){
             return(__targ__237)[validator_key]
        } 
    })();
    if (check_true (rules)){
        validation_results=await (await Environment.get_global("validate_form_structure"))(rules,await (async function(){
            let __array_op_rval__238=tokens;
             if (__array_op_rval__238 instanceof Function){
                return await __array_op_rval__238() 
            } else {
                return[__array_op_rval__238]
            }
        })());
        cpath=await async function(){
            if (check_true( (tokens instanceof Array))) {
                 return await (await Environment.get_global("chop"))((tokens && tokens["0"] && tokens["0"]["path"]))
            } else if (check_true( (tokens instanceof Object))) {
                 return (tokens && tokens["path"])
            }
        } ();
        if (check_true (await (await Environment.get_global("not"))((validation_results && validation_results["all_passed"])))){
            await (async function() {
                let __for_body__241=async function(problem) {
                     return  (errors).push({
                        error:"SyntaxError",message:problem,source_name:await (await Environment.get_global("getf_ctx"))(ctx,"__SOURCE_NAME__"),form:await (await Environment.get_global("first"))(await (await Environment.get_global("compiler_source_chain"))(cpath,tree)),parent_forms:await (await Environment.get_global("rest"))(await (await Environment.get_global("compiler_source_chain"))(cpath,tree)),invalid:true
                    })
                };
                let __array__242=[],__elements__240=((validation_results && validation_results["invalid"])||[]);
                let __BREAK__FLAG__=false;
                for(let __iter__239 in __elements__240) {
                    __array__242.push(await __for_body__241(__elements__240[__iter__239]));
                    if(__BREAK__FLAG__) {
                         __array__242.pop();
                        break;
                        
                    }
                }return __array__242;
                 
            })();
            syntax_error=new SyntaxError("invalid syntax");
            await async function(){
                syntax_error["handled"]=true;
                return syntax_error;
                
            }();
            throw syntax_error;
            
        }
    } else {
         await console.log("compiler_syntax_validation: no rules for: ",validator_key," -> tokens: ",tokens,"tree: ",tree)
    };
     return  validation_results
},{ "name":"compiler_syntax_validation","fn_args":"(validator_key tokens errors ctx tree)"
});
await Environment.set_global("symbols",async function() {
     return  ["=:keys","=:Environment.context.scope"]
},{ "eval_when":{ "compile_time":true
},"name":"symbols","macro":true,"fn_args":"()","description":"Returns an array of all defined symbols in the current evironment.","usage":[],"tags":["symbol","env","environment","global","globals"]
});
await Environment.set_global("describe_all",async function() {
     return  await (async function(){
        let __apply_args__244=await (async function() {
            let __for_body__248=async function(s) {
                 return  await (await Environment.get_global("to_object"))([await (async function(){
                    let __array_op_rval__250=s;
                     if (__array_op_rval__250 instanceof Function){
                        return await __array_op_rval__250(await (await Environment.get_global("describe"))(s)) 
                    } else {
                        return[__array_op_rval__250,await (await Environment.get_global("describe"))(s)]
                    }
                })()])
            };
            let __array__249=[],__elements__247=await (await Environment.get_global("keys"))(Environment.context.scope);
            let __BREAK__FLAG__=false;
            for(let __iter__246 in __elements__247) {
                __array__249.push(await __for_body__248(__elements__247[__iter__246]));
                if(__BREAK__FLAG__) {
                     __array__249.pop();
                    break;
                    
                }
            }return __array__249;
             
        })();
        return ( (await Environment.get_global("add"))).apply(this,__apply_args__244)
    })()
},{ "name":"describe_all","fn_args":"()","description":"Returns an object with all defined symbols as the keys and their corresponding descriptions.","usage":[],"tags":["env","environment","symbol","symbols","global","globals"]
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
    opts=(((options instanceof Object)&&options)||new Object());
    sort_fn=null;
    sort_fn_inner=null;
    keyed=false;
    reverser=await (async function () {
         if (check_true ((opts && opts["reversed"]))){
              return -1
        } else {
              return 1
        } 
    })();
    comparitor=await async function(){
        if (check_true( (opts && opts["comparitor"]) instanceof Function)) {
             return (opts && opts["comparitor"])
        } else  {
             return function(a,b) {
                 return    (function(){
                    if (check_true( (a instanceof String || typeof a==='string'))) {
                         if (check_true ((b instanceof String || typeof b==='string'))){
                              return (reverser* a["localeCompare"].call(a,b))
                        } else {
                              return (reverser* a["localeCompare"].call(a,(""+b)))
                        }
                    } else if (check_true( (b instanceof String || typeof b==='string'))) {
                         return (reverser* ( function() {
                            {
                                 let __call_target__=(""+a), __call_method__="localeCompare";
                                return  __call_target__[__call_method__].call(__call_target__,b)
                            } 
                        })())
                    } else if (check_true((opts && opts["reversed"]))) {
                         return (b-a)
                    } else  {
                         return (a-b)
                    }
                } )()
            }
        }
    } ();
    key_path_a="aval";
    key_path_b="bval";
    await (await Environment.get_global("assert"))((elems instanceof Array),"sort: elements must be an array");
    await (await Environment.get_global("assert"))((await subtype(comparitor)==="Function"),("sort: invalid comparitor provided : "+await subtype(comparitor)+" - must be a synchronous function, or evaluate to a synchronous function."));
    await (await Environment.get_global("assert"))((((opts && opts["comparitor"])&&await (await Environment.get_global("not"))((opts && opts["reversed"])))||(await (await Environment.get_global("not"))((opts && opts["comparitor"]))&&(opts && opts["reversed"]))||(await (await Environment.get_global("not"))((opts && opts["comparitor"]))&&await (await Environment.get_global("not"))((opts && opts["reversed"])))),"sort: comparitor option cannot be combined with reversed option");
    await async function(){
        if (check_true( ((opts && opts["key"]) instanceof String || typeof (opts && opts["key"])==='string'))) {
            keyed=true;
            key_path_a=await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("get_object_path"))(("aval."+(opts && opts["key"]))));
             return  key_path_b=await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("get_object_path"))(("bval."+(opts && opts["key"]))))
        } else if (check_true( ((opts && opts["key"]) instanceof Array))) {
            keyed=true;
            key_path_a=await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("conj"))(["aval"],(opts && opts["key"])));
             return  key_path_b=await (await Environment.get_global("path_to_js_syntax"))(await (await Environment.get_global("conj"))(["bval"],(opts && opts["key"])))
        }
    } ();
    sort_fn_inner=new Function("aval","bval","comparitor",("return comparitor( "+key_path_a+","+key_path_b+")"));
    sort_fn=function(aval,bval) {
         return   sort_fn_inner(aval,bval,comparitor)
    };
     return  await elems["sort"].call(elems,sort_fn)
},{ "name":"sort","fn_args":"(elems options)","description":["=:+","Given an array of elements, and an optional options object, returns a new sorted array.","With no options provided, the elements are sorted in ascending order.  If the key ","reversed is set to true in options, then the elements are reverse sorted. ","<br>","An optional synchronous function can be provided (defined by the comparitor key) which is expected to take ","two values and return the difference between them as can be used by the sort method of ","JS Array.  Additionally a key value can be provided as either a string (separated by dots) or as an array ","which will be used to bind (destructure) the a and b values to be compared to nested values in the elements ","of the array.","<br>","<br>","Options:<br>","reversed:boolean:if true, the elements are reverse sorted.  Note that if a comparitor function is provided, then ","this key cannot be present, as the comparitor should deal with the sorting order.<br>","key:string|array:A path to the comparison values in the provided elements. If a string, it is provided as period ","separated values.  If it is an array, each component of the array is a successive path value in the element to be ","sorted. <br>","comparitor:function:A synchronous function that is to be provided for comparison of two elements.  It should take ","two arguments, and return the difference between the arguments, either a positive or negative."],"usage":["elements:array","options:object?"],"tags":["array","sorting","order","reverse","comparison","objects"]
});
await Environment.set_global("and*",async function(...vals) {
    if (check_true (((vals && vals.length)>0))){
        let rval=true;
        ;
        await (async function() {
            let __for_body__253=async function(v) {
                if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("is_value?"))(v)))){
                    rval=false;
                    __BREAK__FLAG__=true;
                    return
                }
            };
            let __array__254=[],__elements__252=vals;
            let __BREAK__FLAG__=false;
            for(let __iter__251 in __elements__252) {
                __array__254.push(await __for_body__253(__elements__252[__iter__251]));
                if(__BREAK__FLAG__) {
                     __array__254.pop();
                    break;
                    
                }
            }return __array__254;
             
        })();
         return  rval
    }
},{ "name":"and*","fn_args":"(\"&\" vals)","description":["=:+","Similar to and, but unlike and, values that ","are \"\" (blank) or NaN are considered to be true.","Uses is_value? to determine if the value should be considered to be true.","Returns true if the given arguments all are considered a value, ","otherwise false.  If no arguments are provided, returns undefined."],"usage":["val0:*","val1:*","val2:*"],"tags":["truth","and","logic","truthy"]
});
await Environment.set_global("or*",async function(...vals) {
    if (check_true (((vals && vals.length)>0))){
        let rval=false;
        ;
        await (async function() {
            let __for_body__257=async function(v) {
                if (check_true (await (await Environment.get_global("is_value?"))(v))){
                    rval=true;
                    __BREAK__FLAG__=true;
                    return
                }
            };
            let __array__258=[],__elements__256=vals;
            let __BREAK__FLAG__=false;
            for(let __iter__255 in __elements__256) {
                __array__258.push(await __for_body__257(__elements__256[__iter__255]));
                if(__BREAK__FLAG__) {
                     __array__258.pop();
                    break;
                    
                }
            }return __array__258;
             
        })();
         return  rval
    }
},{ "name":"or*","fn_args":"(\"&\" vals)","description":["=:+","Similar to or, but unlike or, values that ","are \"\" (blank) or NaN are considered to be true.","Uses is_value? to determine if the value should be considered to be true.","Returns true if the given arguments all are considered a value, ","otherwise false.  If no arguments are provided, returns undefined."],"usage":["val0:*","val1:*","val2:*"],"tags":["truth","or","logic","truthy"]
});
await Environment.set_global("either",async function(...args) {
    let rval;
    rval=null;
    await (async function() {
        let __for_body__261=async function(arg) {
            rval=arg;
            if (check_true ((await (await Environment.get_global("not"))((undefined===arg))&&await (await Environment.get_global("not"))((null===arg))))){
                __BREAK__FLAG__=true;
                return
            }
        };
        let __array__262=[],__elements__260=args;
        let __BREAK__FLAG__=false;
        for(let __iter__259 in __elements__260) {
            __array__262.push(await __for_body__261(__elements__260[__iter__259]));
            if(__BREAK__FLAG__) {
                 __array__262.pop();
                break;
                
            }
        }return __array__262;
         
    })();
     return  rval
},{ "name":"either","fn_args":"(\"&\" args)","description":["=:+","Similar to or, but unlike or, returns the first non nil ","or undefined value in the argument list whereas or returns ","the first truthy value."],"usage":["values:*"],"tags":["nil","truthy","logic","or","undefined"]
});
await Environment.set_global("is_symbol?",async function(symbol_to_find) {
     return  ["=:not",["=:or",["=:==",["=:typeof",symbol_to_find],"undefined"],["=:instanceof",["=:->","=:Environment","get_global",symbol_to_find],"=:ReferenceError"]]]
},{ "eval_when":{ "compile_time":true
},"name":"is_symbol?","macro":true,"fn_args":"(symbol_to_find)","usage":["symbol:string|*"],"description":["=:+","If provided a quoted symbol, will return true if the symbol can be found ","in the local or global contexts."],"tags":["context","env","def"]
});
await Environment.set_global("get_function_args",async function(f) {
    let r;
    let s;
    r=new RegExp("^[a-zA-Z_]+ [a-zA-Z ]*\\\\(([a-zA-Z 0-9_,\\\\.\\\\n]*)\\\\)","gm");
    s=await f["toString"]();
    r=await (await Environment.get_global("scan_str"))(r,s);
    if (check_true ((((r && r.length)>0)&&((r && r["0"]) instanceof Object)))){
         return  await (await Environment.get_global("map"))(async function(v) {
            if (check_true (await (await Environment.get_global("ends_with?"))("\n",v))){
                  return await (await Environment.get_global("chop"))(v)
            } else {
                  return v
            }
        },((await (await Environment.get_global("second"))((r && r["0"]))||"")).split(","))
    }
},{ "name":"get_function_args","fn_args":"(f)","description":"Given a javascript function, return a list of arg names for that function","usage":["function:function"],"tags":["function","introspect","introspection","arguments"]
});
await Environment.set_global("findpaths",async function(value,structure) {
    let acc;
    let search;
    acc=[];
    search=async function(struct,_cpath) {
         return  await async function(){
            if (check_true( (struct instanceof Array))) {
                 return await (await Environment.get_global("map"))(async function(elem,idx) {
                     return  await async function(){
                        if (check_true( (elem instanceof Object))) {
                             return await search(elem,await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__263=idx;
                                 if (__array_op_rval__263 instanceof Function){
                                    return await __array_op_rval__263() 
                                } else {
                                    return[__array_op_rval__263]
                                }
                            })()))
                        } else if (check_true( (elem===value))) {
                             return (acc).push(await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__264=idx;
                                 if (__array_op_rval__264 instanceof Function){
                                    return await __array_op_rval__264() 
                                } else {
                                    return[__array_op_rval__264]
                                }
                            })()))
                        }
                    } ()
                },struct)
            } else if (check_true( (struct instanceof Object))) {
                 return await (await Environment.get_global("map"))(async function(pset) {
                     return  await async function(){
                        if (check_true( ((pset && pset["1"]) instanceof Object))) {
                             return await search((pset && pset["1"]),await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__265=(pset && pset["0"]);
                                 if (__array_op_rval__265 instanceof Function){
                                    return await __array_op_rval__265() 
                                } else {
                                    return[__array_op_rval__265]
                                }
                            })()))
                        } else if (check_true( ((pset && pset["1"])===value))) {
                             return (acc).push(await (await Environment.get_global("conj"))(_cpath,await (async function(){
                                let __array_op_rval__266=(pset && pset["1"]);
                                 if (__array_op_rval__266 instanceof Function){
                                    return await __array_op_rval__266() 
                                } else {
                                    return[__array_op_rval__266]
                                }
                            })()))
                        }
                    } ()
                },await (await Environment.get_global("pairs"))(struct))
            } else if (check_true( (struct===value))) {
                 return (acc).push(_cpath)
            }
        } ()
    };
    await search(structure,[]);
     return  acc
},{ "name":"findpaths","fn_args":"(value structure)"
});
await Environment.set_global("warn",await (await Environment.get_global("defclog"))({
    prefix:"⚠️  "
}),{
    description:"Prefixes a warning symbol prior to the arguments to the console.  Otherwise the same as console.log.",usage:["args0:*","argsN:*"],tags:["log","warning","error","signal","output","notify","defclog"]
});
await Environment.set_global("success",await (await Environment.get_global("defclog"))({
    color:"green",prefix:"✓  "
}),{
    description:"Prefixes a green checkmark symbol prior to the arguments to the console.  Otherwise the same as console.log.",usage:["args0:*","argsN:*"],tags:["log","warning","notify","signal","output","ok","success","defclog"]
});
await Environment.set_global("in_background",async function(...forms) {
     return  ["=:new","=:Promise",["=:fn",["=:resolve","=:reject"],["=:progn",["=:resolve",true],].concat(forms)]]
},{ "eval_when":{ "compile_time":true
},"name":"in_background","macro":true,"fn_args":"(\"&\" forms)","description":["=:+","Given a form or forms, evaluates the forms in the background, with ","the function returning true immediately prior to starting the forms."],"usage":["forms:*"],"tags":["eval","background","promise","evaluation"]
});
await Environment.set_global("set_compiler",async function(compiler_function) {
    {
        await Environment["set_compiler"].call(Environment,compiler_function);
         return  compiler_function
    }
},{ "name":"set_compiler","fn_args":"(compiler_function)","description":["=:+","Given a compiled compiler function, installs the provided function as the ","environment's compiler, and returns the compiler function."],"usage":["compiler_function:function"],"tags":["compilation","environment","compiler"]
});
await Environment.set_global("show",async function(thing) {
     return  await async function(){
        if (check_true( thing instanceof Function)) {
             return await thing["toString"]()
        } else  {
             return thing
        }
    } ()
},{ "name":"show","fn_args":"(thing)","usage":["thing:function"],"description":"Given a name to a compiled function, returns the source of the compiled function.  Otherwise just returns the passed argument.","tags":["compile","source","javascript","js","display"]
});
await Environment.set_global("export_symbols",async function(...args) {
    let acc;
    let numargs;
    let idx;
    acc=["=:javascript","export","{"];
    numargs=await (await Environment.get_global("length"))(args);
    idx=0;
    await (async function() {
        let __for_body__269=async function(symname) {
            await async function(){
                if (check_true( ((symname instanceof Array)&&((symname && symname.length)===2)))) {
                    (acc).push(await (async function ()  {
                        let mval;
                        mval=(symname && symname["0"]);
                        if (check_true (((mval instanceof String || typeof mval==='string')&&await (await Environment.get_global("starts_with?"))("=:",mval)))){
                              return await mval["substr"].call(mval,2)
                        } else {
                              return mval
                        }
                    } )());
                    (acc).push(" as ");
                     return  (acc).push(await (async function ()  {
                        let mval;
                        mval=(symname && symname["1"]);
                        if (check_true (((mval instanceof String || typeof mval==='string')&&await (await Environment.get_global("starts_with?"))("=:",mval)))){
                              return await mval["substr"].call(mval,2)
                        } else {
                              return mval
                        }
                    } )())
                } else if (check_true( (symname instanceof String || typeof symname==='string'))) {
                     return (acc).push(await (async function ()  {
                        let mval;
                        mval=symname;
                        if (check_true (((mval instanceof String || typeof mval==='string')&&await (await Environment.get_global("starts_with?"))("=:",mval)))){
                              return await mval["substr"].call(mval,2)
                        } else {
                              return mval
                        }
                    } )())
                } else  {
                     throw new SyntaxError("Invalid argument for export");
                    
                }
            } ();
            idx+=1;
            if (check_true ((idx<numargs))){
                  return (acc).push(", ")
            }
        };
        let __array__270=[],__elements__268=args;
        let __BREAK__FLAG__=false;
        for(let __iter__267 in __elements__268) {
            __array__270.push(await __for_body__269(__elements__268[__iter__267]));
            if(__BREAK__FLAG__) {
                 __array__270.pop();
                break;
                
            }
        }return __array__270;
         
    })();
     return  (acc).push("}")
},{ "eval_when":{ "compile_time":true
},"name":"export_symbols","macro":true,"fn_args":"(\"&\" args)"
});
await Environment.set_global("defns",async function(name,options) {
    if (check_true ((options&&(options && options["ignore_if_exists"])&&(name instanceof String || typeof name==='string')&&await (await Environment.get_global("contains?"))(name,await (await Environment.get_global("namespaces"))())))){
          return name
    } else {
          return await (await Environment.get_global("create_namespace"))(name,options)
    }
},{ "name":"defns","fn_args":"(name options)","usage":["name:string","options:object"],"description":["=:+","Given a name and an optional options object, creates a new namespace ","identified by the name argument.  If the options object is provided, the following keys are available:","<br>","ignore_if_exists:boolean:If set to true, if the namespace is already defined, do not return an error ","and instead just return with the name of the requested namespace. Any other options are ignored and ","the existing namespace isn't altered.","contained:boolean:If set to true, the newly defined namespace will not have visibility to other namespaces ","beyond 'core' and itself.  Any fully qualified symbols that reference other non-core namespaces will ","fail.","serialize_with_image:boolean:If set to false, if the environment is saved, the namespace will not be ","included in the saved image file.  Default is true."],"tags":["namespace","environment","define","scope","context"]
});
 return  true
}
}