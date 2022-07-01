// Source: environment.lisp  
// Build Time: 2022-07-01 09:20:27
// Version: 2022.07.01.09.20
export const DLISP_ENV_VERSION='2022.07.01.09.20';




var { get_next_environment_id, check_true, get_outside_global, subtype, lisp_writer, clone, LispSyntaxError } = await import("./lisp_writer.js");
if (typeof AsyncFunction === "undefined") {
  globalThis.AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
}
export async function init_dlisp(Environment)  {
{
    let symname;
    symname="dlisp_env";
    {
        await async function(){
            let __target_obj__1=globalThis;
            __target_obj__1[symname]=async function(opts) {
                {
                    let subtype=function subtype(value) {  if (value === null) return "null";  else if (value === undefined) return "undefined";  else if (value instanceof Array) return "array";  else if (value.constructor && value.constructor!=null && value.constructor.name!=='Object') {    return value.constructor.name;  }  return typeof value;};
                    ;
                    let namespace="core";
                    ;
                    let Environment={
                        global_ctx:{
                            core:{
                                scope:new Object()
                            },user:{
                                scope:new Object()
                            }
                        },version:DLISP_ENV_VERSION,ns_definitions:{
                            core:new Object(),user:new Object()
                        },declarations:{
                            safety:{
                                level:2
                            }
                        }
                    };
                    ;
                    let id=await get_next_environment_id();
                    ;
                    if (check_true ((undefined==opts))){
                         opts=new Object()
                    };
                    await async function(){
                        let __target_obj__2=Environment;
                        __target_obj__2["context"]=await (async function(){
                            let __targ__3=Environment.global_ctx;
                            if (__targ__3){
                                 return(__targ__3)[namespace]
                            } 
                        })();
                        __target_obj__2["definitions"]=await (async function(){
                            let __targ__4=Environment.ns_definitions;
                            if (__targ__4){
                                 return(__targ__4)["core"]
                            } 
                        })();
                        return __target_obj__2;
                        
                    }();
                    let set_namespace=function(name) {
                        if (check_true ( ( function(){
                            let __targ__5=Environment.global_ctx;
                            if (__targ__5){
                                 return(__targ__5)[name]
                            } 
                        })())){
                              (function(){
                                let __target_obj__6=Environment;
                                __target_obj__6["context"]= ( function(){
                                    let __targ__7=Environment.global_ctx;
                                    if (__targ__7){
                                         return(__targ__7)[name]
                                    } 
                                })();
                                return __target_obj__6;
                                
                            })();
                            namespace=name;
                              (function(){
                                let __target_obj__8=Environment.context.scope;
                                __target_obj__8["*namespace*"]=name;
                                return __target_obj__8;
                                
                            })();
                              (function(){
                                let __target_obj__9=Environment;
                                __target_obj__9["definitions"]= ( function(){
                                    let __targ__10=Environment.ns_definitions;
                                    if (__targ__10){
                                         return(__targ__10)[name]
                                    } 
                                })();
                                return __target_obj__9;
                                
                            })();
                             return  name
                        } else throw new EvalError(("invalid namespace: "+name));
                        
                    };
                    ;
                    let create_namespace=function(name) {
                        if (check_true ( ( function(){
                            let __targ__11=Environment.global_ctx;
                            if (__targ__11){
                                 return(__targ__11)[name]
                            } 
                        })()))throw new EvalError(("namespace already exists: "+name));
                         else {
                              (function(){
                                let __target_obj__12=Environment.ns_definitions;
                                __target_obj__12[name]=new Object();
                                return __target_obj__12;
                                
                            })();
                              (function(){
                                let __target_obj__13=Environment.global_ctx;
                                __target_obj__13[name]={
                                    scope:new Object()
                                };
                                return __target_obj__13;
                                
                            })();
                             return  name
                        }
                    };
                    ;
                    let delete_namespace=function(name) {
                         return    (function(){
                            if (check_true( (namespace===name))) {
                                 throw new EvalError("namespace to be removed cannot be the current namespace");
                                
                            } else if (check_true( (name==="core"))) {
                                 throw new EvalError("cannot remove the core namespace");
                                
                            } else if (check_true(  ( function(){
                                let __targ__14=Environment.global_ctx;
                                if (__targ__14){
                                     return(__targ__14)[name]
                                } 
                            })())) {
                                 ( get_global("delete_prop"))(Environment.ns_definitions,name);
                                 ( get_global("delete_prop"))(Environment.global_ctx,name);
                                 return  true
                            } else  {
                                 throw new EvalError(("namespace doesn't exist: "+name));
                                
                            }
                        } )()
                    };
                    ;
                    let compiler=async function() {
                         return  true
                    };
                    ;
                    let compiler_operators=new Set();
                    ;
                    let special_identity=async function(v) {
                         return  v
                    };
                    ;
                    let MAX_SAFE_INTEGER=9007199254740991;
                    ;
                    await async function(){
                        let __target_obj__15=Environment.global_ctx.core.scope;
                        __target_obj__15["MAX_SAFE_INTEGER"]=MAX_SAFE_INTEGER;
                        return __target_obj__15;
                        
                    }();
                    let LispSyntaxError=globalThis.LispSyntaxError;
                    ;
                    await async function(){
                        let __target_obj__16=Environment.global_ctx.core.scope;
                        __target_obj__16["LispSyntaxError"]=LispSyntaxError;
                        return __target_obj__16;
                        
                    }();
                    let sub_type=subtype;
                    ;
                    await async function(){
                        let __target_obj__17=Environment.global_ctx.core.scope;
                        __target_obj__17["sub_type"]=sub_type;
                        return __target_obj__17;
                        
                    }();
                    let _star_namespace_star_=namespace;
                    ;
                    await async function(){
                        let __target_obj__18=Environment.global_ctx.core.scope;
                        __target_obj__18["*namespace*"]=_star_namespace_star_;
                        return __target_obj__18;
                        
                    }();
                    let __VERBOSITY__=0;
                    ;
                    await async function(){
                        let __target_obj__19=Environment.global_ctx.core.scope;
                        __target_obj__19["__VERBOSITY__"]=__VERBOSITY__;
                        return __target_obj__19;
                        
                    }();
                    [await async function(){
                        let __target_obj__20=Environment.definitions;
                        __target_obj__20["__VERBOSITY__"]={
                            description:"Set __VERBOSITY__ to a positive integer for verbose console output of system activity.",tags:["debug","compiler","environment","global"]
                        };
                        return __target_obj__20;
                        
                    }()];
                    let int=parseInt;
                    ;
                    await async function(){
                        let __target_obj__21=Environment.global_ctx.core.scope;
                        __target_obj__21["int"]=int;
                        return __target_obj__21;
                        
                    }();
                    [await async function(){
                        let __target_obj__22=Environment.definitions;
                        __target_obj__22["int"]={
                            usage:"value:string|number",description:"Convenience method for parseInt, should be used in map vs. directly calling parseInt, which will not work directly",tags:["conversion","number"]
                        };
                        return __target_obj__22;
                        
                    }()];
                    let float=parseFloat;
                    ;
                    await async function(){
                        let __target_obj__23=Environment.global_ctx.core.scope;
                        __target_obj__23["float"]=float;
                        return __target_obj__23;
                        
                    }();
                    [await async function(){
                        let __target_obj__24=Environment.definitions;
                        __target_obj__24["float"]={
                            usage:"value:string|number",description:"Convenience method for parseFloat, should be used in map vs. directly calling parseFloat, which will not work directly",tags:["conversion","number"]
                        };
                        return __target_obj__24;
                        
                    }()];
                    let values=new Function("...args","{\n                                let acc = [];\n                                for (let _i in args) {\n                                    let value = args[_i];\n                                    let type = subtype(value);\n                                    if (value instanceof Set)  {\n                                        acc = acc.concat(Array.from(value));\n                                    } else if (type==='array') {\n                                        acc = acc.concat(value);\n                                    } else if (type==='object') {\n                                        acc = acc.concat(Object.values(value))\n                                    } else {\n                                        acc = acc.concat(value);\n                                    }\n                                }\n                                return acc;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__25=Environment.global_ctx.core.scope;
                        __target_obj__25["values"]=values;
                        return __target_obj__25;
                        
                    }();
                    let pairs=new Function("obj","{\n                                    if (subtype(obj)==='array') {\n                                        let rval = [];\n                                        for (let i = 0; i < obj.length; i+=2) {\n                                            rval.push([obj[i],obj[i+1]]);\n                                        }\n                                        return rval;\n                                    } else {\n                                        let keys = Object.keys(obj);\n                                        let rval = keys.reduce(function(acc,x,i) {\n                                            acc.push([x,obj[x]])\n                                            return acc;\n                                        },[]);\n                                        return rval;\n                                    }\n                                }");
                    ;
                    await async function(){
                        let __target_obj__26=Environment.global_ctx.core.scope;
                        __target_obj__26["pairs"]=pairs;
                        return __target_obj__26;
                        
                    }();
                    let keys=new Function("obj","{  return Object.keys(obj);  }");
                    ;
                    await async function(){
                        let __target_obj__27=Environment.global_ctx.core.scope;
                        __target_obj__27["keys"]=keys;
                        return __target_obj__27;
                        
                    }();
                    let take=new Function("place","{ return place.shift() }");
                    ;
                    await async function(){
                        let __target_obj__28=Environment.global_ctx.core.scope;
                        __target_obj__28["take"]=take;
                        return __target_obj__28;
                        
                    }();
                    let prepend=new Function("place","thing","{ return place.unshift(thing) }");
                    ;
                    await async function(){
                        let __target_obj__29=Environment.global_ctx.core.scope;
                        __target_obj__29["prepend"]=prepend;
                        return __target_obj__29;
                        
                    }();
                    let first=new Function("x","{ return x[0] }");
                    ;
                    await async function(){
                        let __target_obj__30=Environment.global_ctx.core.scope;
                        __target_obj__30["first"]=first;
                        return __target_obj__30;
                        
                    }();
                    let last=new Function("x","{ return x[x.length - 1] }");
                    ;
                    await async function(){
                        let __target_obj__31=Environment.global_ctx.core.scope;
                        __target_obj__31["last"]=last;
                        return __target_obj__31;
                        
                    }();
                    let length=new Function("obj","{\n                                if(obj instanceof Array) {\n                                    return obj.length;\n                                } else if (obj instanceof Set) {\n                                    return obj.size;\n                                } else if ((obj === undefined)||(obj===null)) {\n                                    return 0;\n                                } else if (typeof obj==='object') {\n                                    return Object.keys(obj).length;\n                                } else if (typeof obj==='string') {\n                                    return obj.length;\n                                } \n                                return 0;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__32=Environment.global_ctx.core.scope;
                        __target_obj__32["length"]=length;
                        return __target_obj__32;
                        
                    }();
                    let conj=new Function("...args","{   let list = [];\n                                if (args[0] instanceof Array) {\n                                    list = args[0];\n                                } else {\n                                    list = [args[0]];\n                                }\n                                args.slice(1).map(function(x) {\n                                    list = list.concat(x);\n                                });\n                                return list;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__33=Environment.global_ctx.core.scope;
                        __target_obj__33["conj"]=conj;
                        return __target_obj__33;
                        
                    }();
                    let reverse=new Function("container","{ return container.slice(0).reverse }");
                    ;
                    await async function(){
                        let __target_obj__34=Environment.global_ctx.core.scope;
                        __target_obj__34["reverse"]=reverse;
                        return __target_obj__34;
                        
                    }();
                    [await async function(){
                        let __target_obj__35=Environment.definitions;
                        __target_obj__35["reverse"]={
                            usage:["container:list"],description:"Returns a copy of the passed list as reversed.  The original is not changed.",tags:["list","sort","order"]
                        };
                        return __target_obj__35;
                        
                    }()];
                    let map=new AsyncFunction("lambda","array_values","{ try {\n                                        let rval = [],\n                                                tl = array_values.length;\n                                        for (let i = 0; i < array_values.length; i++) {\n                                            rval.push(await lambda.apply(this,[array_values[i], i, tl]));\n                                         }\n                                        return rval;\n                                    } catch (ex) {           \n                                              if (lambda === undefined || lambda === null) {\n                                                    throw new ReferenceError(\"map: lambda argument (position 0) is undefined or nil\")\n                                              } else if (array_values === undefined || array_values === null) {\n                                                    throw new ReferenceError(\"map: container argument (position 1) is undefined or nil\")\n                                              } else if (!(lambda instanceof Function)) {\n                                                    throw new ReferenceError(\"map: lambda argument must be a function: received: \"+ typeof lambda)\n                                              } else if (!(array_values instanceof Array)) {\n                                                    throw new ReferenceError(\"map: invalid array argument, received: \" + typeof array_values)\n                                              } else {\n                                                    // something else just pass on the error\n                                                throw ex;\n                                              }\n                                    }\n                              }");
                    ;
                    await async function(){
                        let __target_obj__36=Environment.global_ctx.core.scope;
                        __target_obj__36["map"]=map;
                        return __target_obj__36;
                        
                    }();
                    let bind=new Function("func,this_arg","{ return func.bind(this_arg) }");
                    ;
                    await async function(){
                        let __target_obj__37=Environment.global_ctx.core.scope;
                        __target_obj__37["bind"]=bind;
                        return __target_obj__37;
                        
                    }();
                    let to_object=new Function("array_values","{\n                                      let obj={}\n                                      array_values.forEach((pair)=>{\n                                             obj[pair[0]]=pair[1]\n                                      });\n                                      return obj;\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__38=Environment.global_ctx.core.scope;
                        __target_obj__38["to_object"]=to_object;
                        return __target_obj__38;
                        
                    }();
                    [await async function(){
                        let __target_obj__39=Environment.definitions;
                        __target_obj__39["to_object"]={
                            description:("Given an array of pairs in the form of [[key value] [key value] ...], constructs an "+"object with the first array element of the pair as the key and the second "+"element as the value. A single object is returned."),usage:["paired_array:array"],tags:["conversion","object","array","list","pairs"]
                        };
                        return __target_obj__39;
                        
                    }()];
                    let to_array=async function(container) {
                         return  await async function(){
                            if (check_true( (container instanceof Array))) {
                                 return container
                            } else if (check_true( await (await get_global("is_set?"))(container))) {
                                let acc=[];
                                ;
                                await container["forEach"].call(container,async function(v) {
                                     return  (acc).push(v)
                                });
                                 return  acc
                            } else if (check_true( (container instanceof String || typeof container==='string'))) {
                                 return (container).split("")
                            } else if (check_true( (container instanceof Object))) {
                                 return await pairs(container)
                            } else  {
                                 return await (async function(){
                                    let __array_op_rval__40=container;
                                     if (__array_op_rval__40 instanceof Function){
                                        return await __array_op_rval__40() 
                                    } else {
                                        return[__array_op_rval__40]
                                    }
                                })()
                            }
                        } ()
                    };
                    ;
                    await async function(){
                        let __target_obj__41=Environment.global_ctx.core.scope;
                        __target_obj__41["to_array"]=to_array;
                        return __target_obj__41;
                        
                    }();
                    [await async function(){
                        let __target_obj__42=Environment.definitions;
                        __target_obj__42["to_array"]={
                            description:("Given a container of type Array, Set, Object, or a string, "+"it will convert the members of the container to an array form, "+"and return a new array with the values of the provided container. "+"In the case of an object, the keys and values will be contained in "+"paired arrays in the returned array.  A string will be split into "+"individual characters. If provided a different "+"type other than the listed values above, the value will be placed "+"in an array as a single element."),usage:["container:*"],tags:["list","array","conversion","set","object","string","pairs"]
                        };
                        return __target_obj__42;
                        
                    }()];
                    let slice=function(target,from,to) {
                         return    (function(){
                            if (check_true(to)) {
                                 return  target["slice"].call(target,from,to)
                            } else if (check_true(from)) {
                                 return  target["slice"].call(target,from)
                            } else  {
                                 throw new SyntaxError("slice requires 2 or 3 arguments");
                                
                            }
                        } )()
                    };
                    ;
                    await async function(){
                        let __target_obj__43=Environment.global_ctx.core.scope;
                        __target_obj__43["slice"]=slice;
                        return __target_obj__43;
                        
                    }();
                    let rest=function(x) {
                         return    (function(){
                            if (check_true( (x instanceof Array))) {
                                 return  x["slice"].call(x,1)
                            } else if (check_true( (x instanceof String || typeof x==='string'))) {
                                 return  x["substr"].call(x,1)
                            } else  {
                                 return null
                            }
                        } )()
                    };
                    ;
                    await async function(){
                        let __target_obj__44=Environment.global_ctx.core.scope;
                        __target_obj__44["rest"]=rest;
                        return __target_obj__44;
                        
                    }();
                    let second=new Function("x","{ return x[1] }");
                    ;
                    await async function(){
                        let __target_obj__45=Environment.global_ctx.core.scope;
                        __target_obj__45["second"]=second;
                        return __target_obj__45;
                        
                    }();
                    let third=new Function("x","{ return x[2] }");
                    ;
                    await async function(){
                        let __target_obj__46=Environment.global_ctx.core.scope;
                        __target_obj__46["third"]=third;
                        return __target_obj__46;
                        
                    }();
                    let chop=new Function("x","{ if (x instanceof Array) { return x.slice(0, x.length-1) } else { return x.substr(0,x.length-1) } }");
                    ;
                    await async function(){
                        let __target_obj__47=Environment.global_ctx.core.scope;
                        __target_obj__47["chop"]=chop;
                        return __target_obj__47;
                        
                    }();
                    let chomp=new Function("x","{ return x.substr(x.length-1) }");
                    ;
                    await async function(){
                        let __target_obj__48=Environment.global_ctx.core.scope;
                        __target_obj__48["chomp"]=chomp;
                        return __target_obj__48;
                        
                    }();
                    let not=new Function("x","{ if (check_true(x)) { return false } else { return true } }");
                    ;
                    await async function(){
                        let __target_obj__49=Environment.global_ctx.core.scope;
                        __target_obj__49["not"]=not;
                        return __target_obj__49;
                        
                    }();
                    let push=new Function("place","thing","{ return place.push(thing) }");
                    ;
                    await async function(){
                        let __target_obj__50=Environment.global_ctx.core.scope;
                        __target_obj__50["push"]=push;
                        return __target_obj__50;
                        
                    }();
                    let pop=new Function("place","{ return place.pop() }");
                    ;
                    await async function(){
                        let __target_obj__51=Environment.global_ctx.core.scope;
                        __target_obj__51["pop"]=pop;
                        return __target_obj__51;
                        
                    }();
                    let list=async function(...args) {
                         return  args
                    };
                    ;
                    await async function(){
                        let __target_obj__52=Environment.global_ctx.core.scope;
                        __target_obj__52["list"]=list;
                        return __target_obj__52;
                        
                    }();
                    let flatten=new Function("x","{ return x.flat(999999999999) } ");
                    ;
                    await async function(){
                        let __target_obj__53=Environment.global_ctx.core.scope;
                        __target_obj__53["flatten"]=flatten;
                        return __target_obj__53;
                        
                    }();
                    let jslambda=function(...args) {
                         return   ( function(){
                            let __apply_args__54= flatten(args);
                            return ( Function).apply(this,__apply_args__54)
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__56=Environment.global_ctx.core.scope;
                        __target_obj__56["jslambda"]=jslambda;
                        return __target_obj__56;
                        
                    }();
                    let join=function(...args) {
                         return    (function(){
                            if (check_true( (args.length===1))) {
                                 return  args['0']["join"].call(args['0'],"")
                            } else  {
                                 return  args['1']["join"].call(args['1'],args['0'])
                            }
                        } )()
                    };
                    ;
                    await async function(){
                        let __target_obj__57=Environment.global_ctx.core.scope;
                        __target_obj__57["join"]=join;
                        return __target_obj__57;
                        
                    }();
                    let lowercase=function(x) {
                         return   x["toLowerCase"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__58=Environment.global_ctx.core.scope;
                        __target_obj__58["lowercase"]=lowercase;
                        return __target_obj__58;
                        
                    }();
                    let uppercase=function(x) {
                         return   x["toUpperCase"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__59=Environment.global_ctx.core.scope;
                        __target_obj__59["uppercase"]=uppercase;
                        return __target_obj__59;
                        
                    }();
                    let log=function(...args) {
                         return   ( function(){
                            return ( console.log).apply(this,args)
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__62=Environment.global_ctx.core.scope;
                        __target_obj__62["log"]=log;
                        return __target_obj__62;
                        
                    }();
                    let split=new Function("container","token","{ return container.split(token) }");
                    ;
                    await async function(){
                        let __target_obj__63=Environment.global_ctx.core.scope;
                        __target_obj__63["split"]=split;
                        return __target_obj__63;
                        
                    }();
                    let split_by=new Function("token","container","{ return container.split(token) }");
                    ;
                    await async function(){
                        let __target_obj__64=Environment.global_ctx.core.scope;
                        __target_obj__64["split_by"]=split_by;
                        return __target_obj__64;
                        
                    }();
                    let is_object_ques_=new Function("x","{ return x instanceof Object }");
                    ;
                    await async function(){
                        let __target_obj__65=Environment.global_ctx.core.scope;
                        __target_obj__65["is_object?"]=is_object_ques_;
                        return __target_obj__65;
                        
                    }();
                    [await async function(){
                        let __target_obj__66=Environment.definitions;
                        __target_obj__66["is_object?"]={
                            description:"for the given value x, returns true if x is an Javascript object type.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__66;
                        
                    }()];
                    let is_array_ques_=new Function("x","{ return x instanceof Array }");
                    ;
                    await async function(){
                        let __target_obj__67=Environment.global_ctx.core.scope;
                        __target_obj__67["is_array?"]=is_array_ques_;
                        return __target_obj__67;
                        
                    }();
                    [await async function(){
                        let __target_obj__68=Environment.definitions;
                        __target_obj__68["is_array?"]={
                            description:"for the given value x, returns true if x is an array.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__68;
                        
                    }()];
                    let is_number_ques_=function(x) {
                         return  ( subtype(x)==="Number")
                    };
                    ;
                    await async function(){
                        let __target_obj__69=Environment.global_ctx.core.scope;
                        __target_obj__69["is_number?"]=is_number_ques_;
                        return __target_obj__69;
                        
                    }();
                    [await async function(){
                        let __target_obj__70=Environment.definitions;
                        __target_obj__70["is_number?"]={
                            description:"for the given value x, returns true if x is a number.",usage:["arg:value"],tags:["type","condition","subtype","value","what","function"]
                        };
                        return __target_obj__70;
                        
                    }()];
                    let is_function_ques_=function(x) {
                         return  (x instanceof Function)
                    };
                    ;
                    await async function(){
                        let __target_obj__71=Environment.global_ctx.core.scope;
                        __target_obj__71["is_function?"]=is_function_ques_;
                        return __target_obj__71;
                        
                    }();
                    [await async function(){
                        let __target_obj__72=Environment.definitions;
                        __target_obj__72["is_function?"]={
                            description:"for the given value x, returns true if x is a function.",usage:["arg:value"],tags:["type","condition","subtype","value","what","function"]
                        };
                        return __target_obj__72;
                        
                    }()];
                    let is_set_ques_=new Function("x","{ return x instanceof Set }");
                    ;
                    await async function(){
                        let __target_obj__73=Environment.global_ctx.core.scope;
                        __target_obj__73["is_set?"]=is_set_ques_;
                        return __target_obj__73;
                        
                    }();
                    [await async function(){
                        let __target_obj__74=Environment.definitions;
                        __target_obj__74["is_set?"]={
                            description:"for the given value x, returns true if x is a set.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__74;
                        
                    }()];
                    let is_element_ques_=new Function("x","{ return x instanceof Element }");
                    ;
                    await async function(){
                        let __target_obj__75=Environment.global_ctx.core.scope;
                        __target_obj__75["is_element?"]=is_element_ques_;
                        return __target_obj__75;
                        
                    }();
                    [await async function(){
                        let __target_obj__76=Environment.definitions;
                        __target_obj__76["is_element?"]={
                            description:"for the given value x, returns true if x is an Element object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__76;
                        
                    }()];
                    let is_string_ques_=function(x) {
                         return  ((x instanceof String)||(typeof x==="string"))
                    };
                    ;
                    await async function(){
                        let __target_obj__77=Environment.global_ctx.core.scope;
                        __target_obj__77["is_string?"]=is_string_ques_;
                        return __target_obj__77;
                        
                    }();
                    [await async function(){
                        let __target_obj__78=Environment.definitions;
                        __target_obj__78["is_string?"]={
                            description:"for the given value x, returns true if x is a String object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__78;
                        
                    }()];
                    let is_nil_ques_=function(x) {
                         return  (x===null)
                    };
                    ;
                    await async function(){
                        let __target_obj__79=Environment.global_ctx.core.scope;
                        __target_obj__79["is_nil?"]=is_nil_ques_;
                        return __target_obj__79;
                        
                    }();
                    [await async function(){
                        let __target_obj__80=Environment.definitions;
                        __target_obj__80["is_nil?"]={
                            description:"for the given value x, returns true if x is exactly equal to nil.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__80;
                        
                    }()];
                    let is_regex_ques_=function(x) {
                         return  ( sub_type(x)==="RegExp")
                    };
                    ;
                    await async function(){
                        let __target_obj__81=Environment.global_ctx.core.scope;
                        __target_obj__81["is_regex?"]=is_regex_ques_;
                        return __target_obj__81;
                        
                    }();
                    [await async function(){
                        let __target_obj__82=Environment.definitions;
                        __target_obj__82["is_regex?"]={
                            description:"for the given value x, returns true if x is a Javascript regex object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__82;
                        
                    }()];
                    let is_date_ques_=function(x) {
                         return  ( sub_type(x)==="Date")
                    };
                    ;
                    await async function(){
                        let __target_obj__83=Environment.global_ctx.core.scope;
                        __target_obj__83["is_date?"]=is_date_ques_;
                        return __target_obj__83;
                        
                    }();
                    [await async function(){
                        let __target_obj__84=Environment.definitions;
                        __target_obj__84["is_date?"]={
                            description:"for the given value x, returns true if x is a Date object.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__84;
                        
                    }()];
                    let ends_with_ques_=new Function("val","text","{ if (text instanceof Array) { return text[text.length-1]===val } else if (subtype(text)=='String') { return text.endsWith(val) } else { return false }}");
                    ;
                    await async function(){
                        let __target_obj__85=Environment.global_ctx.core.scope;
                        __target_obj__85["ends_with?"]=ends_with_ques_;
                        return __target_obj__85;
                        
                    }();
                    [await async function(){
                        let __target_obj__86=Environment.definitions;
                        __target_obj__86["ends_with?"]={
                            description:"for a given string or array, checks to see if it ends with the given start_value.  Non string args return false.",usage:["end_value:value","collection:array|string"],tags:["string","text","list","array","filter","reduce"]
                        };
                        return __target_obj__86;
                        
                    }()];
                    let starts_with_ques_=new Function("val","text","{ if (text instanceof Array) { return text[0]===val } else if (subtype(text)=='String') { return text.startsWith(val) } else { return false }}");
                    ;
                    await async function(){
                        let __target_obj__87=Environment.global_ctx.core.scope;
                        __target_obj__87["starts_with?"]=starts_with_ques_;
                        return __target_obj__87;
                        
                    }();
                    [await async function(){
                        let __target_obj__88=Environment.definitions;
                        __target_obj__88["starts_with?"]={
                            description:"for a given string or array, checks to see if it starts with the given start_value.  Non string args return false.",usage:["start_value:value","collection:array|string"],tags:["string","text","list","array","filter","reduce","begin"]
                        };
                        return __target_obj__88;
                        
                    }()];
                    let blank_ques_=function(val) {
                         return  ((val==null)||((val instanceof String || typeof val==='string')&&(val==="")))
                    };
                    ;
                    await async function(){
                        let __target_obj__89=Environment.global_ctx.core.scope;
                        __target_obj__89["blank?"]=blank_ques_;
                        return __target_obj__89;
                        
                    }();
                    let contains_ques_=function(value,container) {
                         return    (function(){
                            if (check_true( ( not(value)&& not(container)))) {
                                 return false
                            } else if (check_true( (container==null))) {
                                 throw new TypeError("contains?: passed nil/undefined container value");
                                
                            } else if (check_true( (container instanceof String || typeof container==='string'))) {
                                 if (check_true ( ( get_global("is_number?"))(value))){
                                      return ( container["indexOf"].call(container,(""+value))>-1)
                                } else {
                                      return ( container["indexOf"].call(container,value)>-1)
                                }
                            } else if (check_true( (container instanceof Array))) {
                                 return  container["includes"].call(container,value)
                            } else if (check_true(  ( get_global("is_set?"))(container))) {
                                 return  container["has"].call(container,value)
                            } else  {
                                 throw new TypeError(("contains?: passed invalid container type: "+ sub_type(container)));
                                
                            }
                        } )()
                    };
                    ;
                    await async function(){
                        let __target_obj__90=Environment.global_ctx.core.scope;
                        __target_obj__90["contains?"]=contains_ques_;
                        return __target_obj__90;
                        
                    }();
                    let make_set=function(vals) {
                        if (check_true ((vals instanceof Array))){
                              return new Set(vals)
                        } else {
                            let vtype;
                            vtype= sub_type(vals);
                             return    (function(){
                                if (check_true( (vtype==="Set"))) {
                                     return new Set(vals)
                                } else if (check_true( (vtype==="object"))) {
                                     return new Set( values(vals))
                                }
                            } )()
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__91=Environment.global_ctx.core.scope;
                        __target_obj__91["make_set"]=make_set;
                        return __target_obj__91;
                        
                    }();
                    let describe=async function(quoted_symbol) {
                        let not_found;
                        let location;
                        let result;
                        not_found={
                            not_found:true
                        };
                        location=await async function(){
                            if (check_true( await (async function(){
                                let __targ__92=Environment.context.scope;
                                if (__targ__92){
                                     return(__targ__92)[quoted_symbol]
                                } 
                            })())) {
                                 return "global"
                            } else if (check_true( await not((undefined===await get_outside_global(quoted_symbol))))) {
                                 return "external"
                            } else  {
                                 return null
                            }
                        } ();
                        result=null;
                        result=await (await get_global("add"))({
                            type:await async function(){
                                if (check_true( (location==="global"))) {
                                     return await sub_type(await (async function(){
                                        let __targ__93=Environment.context.scope;
                                        if (__targ__93){
                                             return(__targ__93)[quoted_symbol]
                                        } 
                                    })())
                                } else if (check_true( (location==="external"))) {
                                     return await sub_type(await get_outside_global(quoted_symbol))
                                } else  {
                                     return "undefined"
                                }
                            } (),location:location,name:quoted_symbol
                        },await (async function() {
                             if (check_true (await (async function(){
                                let __targ__94=Environment.definitions;
                                if (__targ__94){
                                     return(__targ__94)[quoted_symbol]
                                } 
                            })())){
                                  return await (async function(){
                                    let __targ__95=Environment.definitions;
                                    if (__targ__95){
                                         return(__targ__95)[quoted_symbol]
                                    } 
                                })()
                            } else {
                                  return new Object()
                            } 
                        } )());
                        if (check_true (result.description)){
                             await async function(){
                                let __target_obj__96=result;
                                __target_obj__96["description"]=await Environment["eval"].call(Environment,result.description);
                                return __target_obj__96;
                                
                            }()
                        };
                         return  result
                    };
                    ;
                    await async function(){
                        let __target_obj__97=Environment.global_ctx.core.scope;
                        __target_obj__97["describe"]=describe;
                        return __target_obj__97;
                        
                    }();
                    let undefine=function(quoted_symbol) {
                        if (check_true ( ( function(){
                            let __targ__98=Environment.context.scope;
                            if (__targ__98){
                                 return(__targ__98)[quoted_symbol]
                            } 
                        })())){
                             ( get_global("delete_prop"))(Environment.definitions,quoted_symbol);
                             return   ( get_global("delete_prop"))(Environment.context.scope,quoted_symbol)
                        } else {
                              return false
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__99=Environment.global_ctx.core.scope;
                        __target_obj__99["undefine"]=undefine;
                        return __target_obj__99;
                        
                    }();
                    let eval_exp=async function(expression) {
                        await console.log("EVAL:",expression);
                         return  await (async function(){
                            let __array_op_rval__100=expression;
                             if (__array_op_rval__100 instanceof Function){
                                return await __array_op_rval__100() 
                            } else {
                                return[__array_op_rval__100]
                            }
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__101=Environment.global_ctx.core.scope;
                        __target_obj__101["eval_exp"]=eval_exp;
                        return __target_obj__101;
                        
                    }();
                    let indirect_new=new Function("...args","{\n                                    let targetClass = args[0];\n                                    if (subtype(targetClass)===\"String\") {\n                                        let tmpf=new Function(\"{ return \"+targetClass+\" }\");\n                                        targetClass = tmpf();\n                                    }\n                                    if (args.length==1) {\n                                        let f = function(Class) {\n                                            return new (Function.prototype.bind.apply(Class, args));\n                                        }\n                                        let rval = f.apply(this,[targetClass]);\n                                        return rval;\n                                    } else {\n                                        let f = function(Class) {\n                                            return new (Function.prototype.bind.apply(Class, args));\n                                        }\n                                        let rval = f.apply(this,[targetClass].concat(args.slice(1)));\n                                        return rval;\n                                    }}");
                    ;
                    await async function(){
                        let __target_obj__102=Environment.global_ctx.core.scope;
                        __target_obj__102["indirect_new"]=indirect_new;
                        return __target_obj__102;
                        
                    }();
                    let range=function(...args) {
                        let from_to;
                        let step;
                        let idx;
                        let acc;
                        from_to= ( function () {
                             if (check_true (args['1'])){
                                  return [parseInt(args['0']),parseInt(args['1'])]
                            } else {
                                  return [0,parseInt(args['0'])]
                            } 
                        })();
                        step= ( function () {
                             if (check_true (args['2'])){
                                  return parseFloat(args['2'])
                            } else {
                                  return 1
                            } 
                        })();
                        idx=from_to['0'];
                        acc=[];
                         ( function(){
                             let __test_condition__103=function() {
                                 return  (idx<from_to['1'])
                            };
                            let __body_ref__104=function() {
                                (acc).push(idx);
                                 return  idx+=step
                            };
                            let __BREAK__FLAG__=false;
                            while( __test_condition__103()) {
                                 __body_ref__104();
                                 if(__BREAK__FLAG__) {
                                     break;
                                    
                                }
                            } ;
                            
                        })();
                         return  acc
                    };
                    ;
                    await async function(){
                        let __target_obj__105=Environment.global_ctx.core.scope;
                        __target_obj__105["range"]=range;
                        return __target_obj__105;
                        
                    }();
                    let add=new Function("...args","{\n                                let acc;\n                                if (typeof args[0]===\"number\") {\n                                    acc = 0;\n                                } else if (args[0] instanceof Array) {\n                                    return args[0].concat(args.slice(1));\n                                } else if (typeof args[0]==='object') {\n                                   let rval = {};\n                                   for (let i in args) {\n                                        if (typeof args[i] === 'object') {\n                                            for (let k in args[i]) {\n                                                rval[k] = args[i][k];\n                                            }\n                                        }\n                                   }\n                                   return rval;\n                                } else {\n                                    acc = \"\";\n                                }\n                                for (let i in args) {\n                                    acc += args[i];\n                                }\n                                return acc;\n                             }");
                    ;
                    await async function(){
                        let __target_obj__106=Environment.global_ctx.core.scope;
                        __target_obj__106["add"]=add;
                        return __target_obj__106;
                        
                    }();
                    let merge_objects=new Function("x","{\n                                    let rval = {};\n                                    for (let i in x) {\n                                        if (typeof i === 'object') {\n                                            for (let k in x[i]) {\n                                                rval[k] = x[i][k];\n                                            }\n                                        }\n                                    }\n                                    return rval;\n                                 }");
                    ;
                    await async function(){
                        let __target_obj__107=Environment.global_ctx.core.scope;
                        __target_obj__107["merge_objects"]=merge_objects;
                        return __target_obj__107;
                        
                    }();
                    let index_of=new Function("value","container",("{ return container.indexOf(value) }"));
                    ;
                    await async function(){
                        let __target_obj__108=Environment.global_ctx.core.scope;
                        __target_obj__108["index_of"]=index_of;
                        return __target_obj__108;
                        
                    }();
                    let resolve_path=new Function("path,obj","{\n                                        if (typeof path==='string') {\n                                            path = path.split(\".\");\n                                        }\n                                        let s=obj;\n                                        return path.reduce(function(prev, curr) {\n                                            return prev ? prev[curr] : undefined\n                                        }, obj || {})\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__109=Environment.global_ctx.core.scope;
                        __target_obj__109["resolve_path"]=resolve_path;
                        return __target_obj__109;
                        
                    }();
                    let delete_prop=new Function("obj","...args","{\n                                        if (args.length == 1) {\n                                            return delete obj[args[0]];\n                                        } else {\n                                            while (args.length > 0) {\n                                                let prop = args.shift();\n                                                delete obj[prop];\n                                            }\n                                        }\n                                        return obj;\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__110=Environment.global_ctx.core.scope;
                        __target_obj__110["delete_prop"]=delete_prop;
                        return __target_obj__110;
                        
                    }();
                    let min_value=new Function("elements","{ return Math.min(...elements); }");
                    ;
                    await async function(){
                        let __target_obj__111=Environment.global_ctx.core.scope;
                        __target_obj__111["min_value"]=min_value;
                        return __target_obj__111;
                        
                    }();
                    let max_value=new Function("elements","{ return Math.max(...elements); }");
                    ;
                    await async function(){
                        let __target_obj__112=Environment.global_ctx.core.scope;
                        __target_obj__112["max_value"]=max_value;
                        return __target_obj__112;
                        
                    }();
                    let interlace=async function(...args) {
                        let min_length;
                        let rlength_args;
                        let rval;
                        min_length=await min_value(await map(length,args));
                        rlength_args=await range(await length(args));
                        rval=[];
                        await (async function() {
                            let __for_body__115=async function(i) {
                                 return  await (async function() {
                                    let __for_body__119=async function(j) {
                                         return  (rval).push(await (async function(){
                                            let __targ__122=await (async function(){
                                                let __targ__121=args;
                                                if (__targ__121){
                                                     return(__targ__121)[j]
                                                } 
                                            })();
                                            if (__targ__122){
                                                 return(__targ__122)[i]
                                            } 
                                        })())
                                    };
                                    let __array__120=[],__elements__118=rlength_args;
                                    let __BREAK__FLAG__=false;
                                    for(let __iter__117 in __elements__118) {
                                        __array__120.push(await __for_body__119(__elements__118[__iter__117]));
                                        if(__BREAK__FLAG__) {
                                             __array__120.pop();
                                            break;
                                            
                                        }
                                    }return __array__120;
                                     
                                })()
                            };
                            let __array__116=[],__elements__114=await range(min_length);
                            let __BREAK__FLAG__=false;
                            for(let __iter__113 in __elements__114) {
                                __array__116.push(await __for_body__115(__elements__114[__iter__113]));
                                if(__BREAK__FLAG__) {
                                     __array__116.pop();
                                    break;
                                    
                                }
                            }return __array__116;
                             
                        })();
                         return  rval
                    };
                    ;
                    await async function(){
                        let __target_obj__123=Environment.global_ctx.core.scope;
                        __target_obj__123["interlace"]=interlace;
                        return __target_obj__123;
                        
                    }();
                    [await async function(){
                        let __target_obj__124=Environment.definitions;
                        __target_obj__124["interlace"]={
                            usage:["list0:array","list1:array","listn?:array"],description:"Returns a list containing a consecutive values from each list, in argument order.  I.e. list0.0 list1.0 listn.0 list0.1 list1.1 listn.1 ...",tags:["list","array","join","merge"]
                        };
                        return __target_obj__124;
                        
                    }()];
                    let trim=function(x) {
                         return   x["trim"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__125=Environment.global_ctx.core.scope;
                        __target_obj__125["trim"]=trim;
                        return __target_obj__125;
                        
                    }();
                    let assert=function(assertion_form,failure_message) {
                        if (check_true (assertion_form)){
                              return assertion_form
                        } else throw new EvalError((failure_message||"assertion failure"));
                        
                    };
                    ;
                    await async function(){
                        let __target_obj__126=Environment.global_ctx.core.scope;
                        __target_obj__126["assert"]=assert;
                        return __target_obj__126;
                        
                    }();
                    [await async function(){
                        let __target_obj__127=Environment.definitions;
                        __target_obj__127["assert"]={
                            description:"If the evaluated assertion form is true, the result is returned, otherwise an EvalError is thrown with the optionally provided failure message.",usage:["form:*","failure_message:string?"],tags:["true","error","check","debug","valid","assertion"]
                        };
                        return __target_obj__127;
                        
                    }()];
                    let unquotify=async function(val) {
                        let dval;
                        dval=val;
                        if (check_true (await (await get_global("starts_with?"))("\"",dval))){
                             dval=await dval["substr"].call(dval,1,(dval.length-2))
                        };
                        if (check_true (await (await get_global("starts_with?"))("=:",dval))){
                             dval=await dval["substr"].call(dval,2)
                        };
                         return  dval
                    };
                    ;
                    await async function(){
                        let __target_obj__128=Environment.global_ctx.core.scope;
                        __target_obj__128["unquotify"]=unquotify;
                        return __target_obj__128;
                        
                    }();
                    [await async function(){
                        let __target_obj__129=Environment.definitions;
                        __target_obj__129["unquotify"]={
                            description:"Removes binding symbols and quotes from a supplied value.  For use in compile time function such as macros.",usage:["val:string"],tags:["macro","quote","quotes","desym"]
                        };
                        return __target_obj__129;
                        
                    }()];
                    let or_args=async function(argset) {
                        let is_true;
                        is_true=false;
                        await (async function() {
                            let __for_body__132=async function(elem) {
                                if (check_true (elem)){
                                    is_true=true;
                                    __BREAK__FLAG__=true;
                                    return
                                }
                            };
                            let __array__133=[],__elements__131=argset;
                            let __BREAK__FLAG__=false;
                            for(let __iter__130 in __elements__131) {
                                __array__133.push(await __for_body__132(__elements__131[__iter__130]));
                                if(__BREAK__FLAG__) {
                                     __array__133.pop();
                                    break;
                                    
                                }
                            }return __array__133;
                             
                        })();
                         return  is_true
                    };
                    ;
                    await async function(){
                        let __target_obj__134=Environment.global_ctx.core.scope;
                        __target_obj__134["or_args"]=or_args;
                        return __target_obj__134;
                        
                    }();
                    let special_operators=async function() {
                         return  await make_set(await compiler([],{
                            special_operators:true,env:Environment
                        }))
                    };
                    ;
                    await async function(){
                        let __target_obj__135=Environment.global_ctx.core.scope;
                        __target_obj__135["special_operators"]=special_operators;
                        return __target_obj__135;
                        
                    }();
                    let defclog=async function(opts) {
                        let style;
                        style=("padding: 5px;"+await (async function () {
                             if (check_true (opts.background)){
                                  return ("background: "+opts.background+";")
                            } else {
                                  return ""
                            } 
                        })()+await (async function () {
                             if (check_true (opts.color)){
                                  return ("color: "+opts.color+";")
                            } 
                        })()+"");
                         return  async function(...args) {
                             return  await (async function(){
                                let __target_arg__138=[].concat(await conj(await (async function(){
                                    let __array_op_rval__139=style;
                                     if (__array_op_rval__139 instanceof Function){
                                        return await __array_op_rval__139() 
                                    } else {
                                        return[__array_op_rval__139]
                                    }
                                })(),args));
                                if(!__target_arg__138 instanceof Array){
                                    throw new TypeError("Invalid final argument to apply - an array is required")
                                }let __pre_arg__140=("%c"+await (async function () {
                                     if (check_true (opts.prefix)){
                                          return opts.prefix
                                    } else {
                                          return (args).shift()
                                    } 
                                })());
                                __target_arg__138.unshift(__pre_arg__140);
                                return (console.log).apply(this,__target_arg__138)
                            })()
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__141=Environment.global_ctx.core.scope;
                        __target_obj__141["defclog"]=defclog;
                        return __target_obj__141;
                        
                    }();
                    let NOT_FOUND=new ReferenceError("not found");
                    ;
                    await async function(){
                        let __target_obj__142=Environment.global_ctx.core.scope;
                        __target_obj__142["NOT_FOUND"]=NOT_FOUND;
                        return __target_obj__142;
                        
                    }();
                    let check_external_env_default=true;
                    ;
                    await async function(){
                        let __target_obj__143=Environment.global_ctx.core.scope;
                        __target_obj__143["check_external_env_default"]=check_external_env_default;
                        return __target_obj__143;
                        
                    }();
                    let set_global=function(refname,value,meta,is_constant) {
                        {
                              (function(){
                                if (check_true(  not((typeof refname==="string")))) {
                                     throw new TypeError("reference name must be a string type");
                                    
                                } else if (check_true( ((Environment===value)||(Environment.context===value)||(Environment.context.scope===value)))) {
                                     throw new EvalError("cannot set the environment scope as a global value");
                                    
                                }
                            } )();
                            {
                                let comps;
                                let namespace_identifier;
                                let target_ctx;
                                let target_defs;
                                let target_path;
                                let target_namespace;
                                let __symname__144=  function(){
                                    return null
                                };
                                {
                                    comps= get_object_path(refname);
                                    namespace_identifier=(comps['0']).split("/");
                                    target_ctx=null;
                                    target_defs=null;
                                    target_path=null;
                                    target_namespace=null;
                                    let symname= __symname__144();
                                    ;
                                    if (check_true ((namespace_identifier.length>1))){
                                        if (check_true ( not( ( function(){
                                            let __targ__145=Environment.global_ctx;
                                            if (__targ__145){
                                                 return(__targ__145)[namespace_identifier['0']]
                                            } 
                                        })()))){
                                            throw new EvalError(("invalid namespace: "+namespace_identifier['0']));
                                            
                                        };
                                        debugger;
                                        ;
                                        target_namespace=namespace_identifier['0'];
                                        target_ctx= resolve_path( ( function(){
                                            let __array_op_rval__146=target_namespace;
                                             if (__array_op_rval__146 instanceof Function){
                                                return  __array_op_rval__146("scope") 
                                            } else {
                                                return[__array_op_rval__146,"scope"]
                                            }
                                        })(),Environment.global_ctx);
                                        target_defs= ( function(){
                                            let __targ__147=Environment.ns_definitions;
                                            if (__targ__147){
                                                 return(__targ__147)[target_namespace]
                                            } 
                                        })();
                                        target_path= rest(comps);
                                         symname=namespace_identifier['1']
                                    } else {
                                        target_namespace=namespace;
                                        target_ctx=Environment.context.scope;
                                        target_defs=Environment.definitions;
                                        target_path= rest(comps);
                                         symname=namespace_identifier['0']
                                    };
                                    if (check_true ( resolve_path( ( function(){
                                        let __array_op_rval__148=target_namespace;
                                         if (__array_op_rval__148 instanceof Function){
                                            return  __array_op_rval__148(symname,"constant") 
                                        } else {
                                            return[__array_op_rval__148,symname,"constant"]
                                        }
                                    })(),Environment.ns_definitions))){
                                        throw new TypeError(("Assignment to constant variable "+symname));
                                        
                                    };
                                    if (check_true (((target_path.length>0)))){
                                          ( get_global("set_path_value"))( ( function(){
                                            let __targ__149=target_ctx;
                                            if (__targ__149){
                                                 return(__targ__149)[symname]
                                            } 
                                        })(),target_path,value)
                                    } else {
                                           (function(){
                                            let __target_obj__150=target_ctx;
                                            __target_obj__150[symname]=value;
                                            return __target_obj__150;
                                            
                                        })()
                                    };
                                    if (check_true (((meta instanceof Object)&& not((meta instanceof Array))))){
                                        if (check_true (is_constant)){
                                               (function(){
                                                let __target_obj__151=meta;
                                                __target_obj__151["constant"]=true;
                                                return __target_obj__151;
                                                
                                            })()
                                        };
                                           (function(){
                                            let __target_obj__152=target_defs;
                                            __target_obj__152[refname]=meta;
                                            return __target_obj__152;
                                            
                                        })()
                                    } else {
                                         if (check_true (is_constant)){
                                               (function(){
                                                let __target_obj__153=target_defs;
                                                __target_obj__153[refname]={
                                                    constant:true
                                                };
                                                return __target_obj__153;
                                                
                                            })()
                                        }
                                    };
                                     return   ( function(){
                                        let __targ__154=target_ctx;
                                        if (__targ__154){
                                             return(__targ__154)[refname]
                                        } 
                                    })()
                                }
                            }
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__155=Environment.global_ctx.core.scope;
                        __target_obj__155["set_global"]=set_global;
                        return __target_obj__155;
                        
                    }();
                    let get_global=function(refname,value_if_not_found,suppress_check_external_env) {
                         return    (function(){
                            if (check_true(  not((typeof refname==="string")))) {
                                 throw new TypeError("reference name must be a string type");
                                
                            } else if (check_true( (refname==="Environment"))) {
                                 return Environment
                            } else if (check_true(  compiler_operators["has"].call(compiler_operators,refname))) {
                                 return special_identity
                            } else  {
                                let comps;
                                let refval;
                                let namespace_identifier;
                                let check_external_env;
                                comps= get_object_path(refname);
                                refval=null;
                                namespace_identifier=(comps['0']).split("/");
                                check_external_env= ( function () {
                                     if (check_true (suppress_check_external_env)){
                                          return false
                                    } else {
                                          return check_external_env_default
                                    } 
                                })();
                                if (check_true ((namespace_identifier.length>1))){
                                     refval= ( function(){
                                        let __targ__158= ( function(){
                                            let __targ__157= ( function(){
                                                let __targ__156=Environment.global_ctx;
                                                if (__targ__156){
                                                     return(__targ__156)[namespace_identifier['0']]
                                                } 
                                            })();
                                            if (__targ__157){
                                                 return(__targ__157)["scope"]
                                            } 
                                        })();
                                        if (__targ__158){
                                             return(__targ__158)[namespace_identifier['1']]
                                        } 
                                    })()
                                } else {
                                    refval= ( function(){
                                        let __targ__159=Environment.context.scope;
                                        if (__targ__159){
                                             return(__targ__159)[comps['0']]
                                        } 
                                    })();
                                    if (check_true ((undefined===refval))){
                                         refval= ( function(){
                                            let __targ__160=Environment.global_ctx.core.scope;
                                            if (__targ__160){
                                                 return(__targ__160)[comps['0']]
                                            } 
                                        })()
                                    }
                                };
                                if (check_true (((undefined===refval)&&check_external_env))){
                                     refval= ( function () {
                                         if (check_true (check_external_env)){
                                              return ( get_outside_global(comps['0'])||NOT_FOUND)
                                        } else {
                                              return NOT_FOUND
                                        } 
                                    })()
                                };
                                 return    (function(){
                                    if (check_true( (NOT_FOUND===refval))) {
                                         return (value_if_not_found||NOT_FOUND)
                                    } else if (check_true( (comps.length===1))) {
                                         return refval
                                    } else if (check_true( (comps.length>1))) {
                                         return   resolve_path( rest(comps),refval)
                                    } else  {
                                         console.warn("get_global: condition fall through: ",comps);
                                         return  NOT_FOUND
                                    }
                                } )()
                            }
                        } )()
                    };
                    ;
                    await async function(){
                        let __target_obj__161=Environment.global_ctx.core.scope;
                        __target_obj__161["get_global"]=get_global;
                        return __target_obj__161;
                        
                    }();
                    let compile=async function(json_expression,opts) {
                        let out;
                        opts=await add({
                            env:Environment
                        },opts,{
                            meta:false
                        });
                        out=null;
                        if (check_true (json_expression instanceof Function))throw new SyntaxError("compile: non-JSON value (function) received as input");
                        ;
                        out=await compiler(json_expression,opts);
                         return  await async function(){
                            if (check_true( ((out instanceof Array)&&out['0'].ctype&&(out['0'].ctype==="FAIL")))) {
                                 return out
                            } else if (check_true(opts.meta)) {
                                 return out
                            } else  {
                                 return out['1']
                            }
                        } ()
                    };
                    ;
                    await async function(){
                        let __target_obj__162=Environment.global_ctx.core.scope;
                        __target_obj__162["compile"]=compile;
                        return __target_obj__162;
                        
                    }();
                    [await async function(){
                        let __target_obj__163=Environment.definitions;
                        __target_obj__163["compile"]={
                            description:("Compiles the given JSON or quoted lisp and returns a string containing "+"the lisp form or expression as javascript.<br>"+"If passed the option { meta: true } , an array is returned containing compilation metadata "+"in element 0 and the compiled code in element 1."),usage:["json_expression:*","opts:object"],tags:["macro","quote","quotes","desym"]
                        };
                        return __target_obj__163;
                        
                    }()];
                    let env_log=await defclog({
                        prefix:("env"+id),background:"#B0F0C0"
                    });
                    ;
                    await async function(){
                        let __target_obj__164=Environment.global_ctx.core.scope;
                        __target_obj__164["env_log"]=env_log;
                        return __target_obj__164;
                        
                    }();
                    let evaluate=async function(expression,ctx,opts) {
                        let compiled;
                        let error_data;
                        let result;
                        opts=(opts||new Object());
                        compiled=null;
                        error_data=null;
                        result=null;
                        if (check_true (opts.compiled_source)){
                             compiled=expression
                        } else {
                             await (async function(){
                                try /* TRY SIMPLE */ {
                                      return compiled=await compiler(await (async function() {
                                         if (check_true (opts.json_in)){
                                              return expression
                                        } else {
                                              return await Environment["read_lisp"].call(Environment,expression,{
                                                source_name:opts.source_name
                                            })
                                        } 
                                    } )(),{
                                        env:Environment,ctx:ctx,formatted_output:true,source_name:opts.source_name,throw_on_error:opts.throw_on_error,error_report:(opts.error_report||null),quiet_mode:(opts.quiet_mode||false)
                                    }) 
                                } catch(__exception__165) {
                                      if (__exception__165 instanceof Error) {
                                         let e=__exception__165;
                                         {
                                            if (check_true (opts.throw_on_error)){
                                                throw e;
                                                
                                            };
                                            if (check_true ((e instanceof LispSyntaxError))){
                                                 await async function(){
                                                    let __target_obj__166=e;
                                                    __target_obj__166["message"]=await JSON.parse(e.message);
                                                    return __target_obj__166;
                                                    
                                                }()
                                            };
                                            await async function(){
                                                if (check_true( (e instanceof LispSyntaxError))) {
                                                     return error_data=await add({
                                                        error:"LispSyntaxError"
                                                    },e.message)
                                                } else  {
                                                     return error_data={
                                                        error:await sub_type(e),message:e.message,stack:e.stack,form:await async function(){
                                                            if (check_true( ((expression instanceof String || typeof expression==='string')&&(expression.length>100)))) {
                                                                 return await add(await expression["substr"].call(expression,0,100),"...")
                                                            } else  {
                                                                 return await (await get_global("as_lisp"))(expression)
                                                            }
                                                        } (),parent_forms:[],source_name:opts.source_name,invalid:true
                                                    }
                                                }
                                            } ();
                                            if (check_true (opts.error_report)){
                                                  return await (async function(){
                                                    let __array_op_rval__167=opts.error_report;
                                                     if (__array_op_rval__167 instanceof Function){
                                                        return await __array_op_rval__167(error_data) 
                                                    } else {
                                                        return[__array_op_rval__167,error_data]
                                                    }
                                                })()
                                            } else {
                                                  return await console.error("Compilation Error: ",error_data)
                                            };
                                             compiled=[{
                                                error:true
                                            },null]
                                        }
                                    } 
                                }
                            })()
                        };
                        if (check_true (opts.on_compilation_complete)){
                             await (async function(){
                                let __array_op_rval__168=opts.on_compilation_complete;
                                 if (__array_op_rval__168 instanceof Function){
                                    return await __array_op_rval__168(compiled) 
                                } else {
                                    return[__array_op_rval__168,compiled]
                                }
                            })()
                        };
                        await (async function(){
                            try /* TRY COMPLEX */ {
                                 return  result=await async function(){
                                    if (check_true(compiled.error)) {
                                         throw new Error((await get_global("indirect_new"))(compiled.error,compiled.message));
                                        
                                    } else if (check_true( (compiled['0'].ctype&&(await (await get_global("contains?"))("block",compiled['0'].ctype)||(compiled['0'].ctype==="assignment")||(compiled['0'].ctype==="__!NOT_FOUND!__"))))) {
                                         if (check_true (await (async function(){
                                            let __array_op_rval__170=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__170 instanceof Function){
                                                return await __array_op_rval__170() 
                                            } else {
                                                return[__array_op_rval__170]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__171=compiled;
                                                __target_obj__171[1]=new AsyncFunction("Environment",("{ "+compiled['1']+"}"));
                                                return __target_obj__171;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__172=compiled['1'];
                                                 if (__array_op_rval__172 instanceof Function){
                                                    return await __array_op_rval__172(Environment) 
                                                } else {
                                                    return[__array_op_rval__172,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__173=compiled;
                                                __target_obj__173[1]=new AsyncFunction(("{"+compiled['1']+"}"));
                                                return __target_obj__173;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__174=compiled['1'];
                                                 if (__array_op_rval__174 instanceof Function){
                                                    return await __array_op_rval__174() 
                                                } else {
                                                    return[__array_op_rval__174]
                                                }
                                            })()
                                        }
                                    } else if (check_true( (compiled['0'].ctype&&(("AsyncFunction"===compiled['0'].ctype)||("statement"===compiled['0'].ctype)||("objliteral"===compiled['0'].ctype))))) {
                                        if (check_true (await (async function(){
                                            let __array_op_rval__175=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__175 instanceof Function){
                                                return await __array_op_rval__175() 
                                            } else {
                                                return[__array_op_rval__175]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__176=compiled;
                                                __target_obj__176[1]=new AsyncFunction("Environment",("{ return "+compiled['1']+"} "));
                                                return __target_obj__176;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__177=compiled['1'];
                                                 if (__array_op_rval__177 instanceof Function){
                                                    return await __array_op_rval__177(Environment) 
                                                } else {
                                                    return[__array_op_rval__177,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__178=compiled;
                                                __target_obj__178[1]=new AsyncFunction(("{ return "+compiled['1']+"}"));
                                                return __target_obj__178;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__179=compiled['1'];
                                                 if (__array_op_rval__179 instanceof Function){
                                                    return await __array_op_rval__179() 
                                                } else {
                                                    return[__array_op_rval__179]
                                                }
                                            })()
                                        }
                                    } else if (check_true( (compiled['0'].ctype&&("Function"===compiled['0'].ctype)))) {
                                        if (check_true (await (async function(){
                                            let __array_op_rval__180=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__180 instanceof Function){
                                                return await __array_op_rval__180() 
                                            } else {
                                                return[__array_op_rval__180]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__181=compiled;
                                                __target_obj__181[1]=new Function("Environment",("{ return "+compiled['1']+"} "));
                                                return __target_obj__181;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__182=compiled['1'];
                                                 if (__array_op_rval__182 instanceof Function){
                                                    return await __array_op_rval__182(Environment) 
                                                } else {
                                                    return[__array_op_rval__182,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__183=compiled;
                                                __target_obj__183[1]=new Function(("{ return "+compiled['1']+"}"));
                                                return __target_obj__183;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__184=compiled['1'];
                                                 if (__array_op_rval__184 instanceof Function){
                                                    return await __array_op_rval__184() 
                                                } else {
                                                    return[__array_op_rval__184]
                                                }
                                            })()
                                        }
                                    } else  {
                                         return compiled['1']
                                    }
                                } ()
                            }  catch(__exception__169) {
                                  if (__exception__169 instanceof Error) {
                                     let e=__exception__169;
                                     {
                                        await env_log("caught error: ",e.name,e.message);
                                        if (check_true (opts.error_report)){
                                             await (async function(){
                                                let __array_op_rval__185=opts.error_report;
                                                 if (__array_op_rval__185 instanceof Function){
                                                    return await __array_op_rval__185({
                                                        error:e.name,message:e.message,form:null,parent_forms:null,invalid:true,text:e.stack
                                                    }) 
                                                } else {
                                                    return[__array_op_rval__185,{
                                                        error:e.name,message:e.message,form:null,parent_forms:null,invalid:true,text:e.stack
                                                    }]
                                                }
                                            })()
                                        };
                                        result=e;
                                        if (check_true ((ctx&&ctx.in_try)))throw result;
                                        
                                    }
                                } 
                            }
                        })();
                         return  result
                    };
                    ;
                    await async function(){
                        let __target_obj__186=Environment.global_ctx.core.scope;
                        __target_obj__186["evaluate"]=evaluate;
                        return __target_obj__186;
                        
                    }();
                    let eval_struct=async function(lisp_struct,ctx,opts) {
                        let rval;
                        rval=null;
                        if (check_true (lisp_struct instanceof Function)){
                             rval=await (async function(){
                                let __array_op_rval__187=lisp_struct;
                                 if (__array_op_rval__187 instanceof Function){
                                    return await __array_op_rval__187() 
                                } else {
                                    return[__array_op_rval__187]
                                }
                            })()
                        } else {
                             rval=await evaluate(lisp_struct,ctx,await add({
                                json_in:true
                            },(opts||new Object())))
                        };
                         return  rval
                    };
                    ;
                     await async function(){
                        let __target_obj__188=Environment.global_ctx.core.scope;
                        __target_obj__188["eval_struct"]=eval_struct;
                        return __target_obj__188;
                        
                    }();
                    let meta_for_symbol=async function(quoted_symbol) {
                        if (check_true (await (await get_global("starts_with?"))("=:",quoted_symbol))){
                              return await (async function(){
                                let __targ__189=Environment.definitions;
                                if (__targ__189){
                                     return(__targ__189)[await quoted_symbol["substr"].call(quoted_symbol,2)]
                                } 
                            })()
                        } else {
                              return await (async function(){
                                let __targ__190=Environment.definitions;
                                if (__targ__190){
                                     return(__targ__190)[quoted_symbol]
                                } 
                            })()
                        }
                    };
                    ;
                    let set_compiler=async function(compiler_function) {
                        compiler=compiler_function;
                        compiler_operators=await (async function(){
                            let __array_op_rval__191=compiler;
                             if (__array_op_rval__191 instanceof Function){
                                return await __array_op_rval__191([],{
                                    special_operators:true,env:Environment
                                }) 
                            } else {
                                return[__array_op_rval__191,[],{
                                    special_operators:true,env:Environment
                                }]
                            }
                        })();
                        await async function(){
                            let __target_obj__192=Environment.global_ctx.core.scope;
                            __target_obj__192["compiler"]=compiler;
                            return __target_obj__192;
                            
                        }();
                         return  compiler
                    };
                    ;
                    let get_definition=async function(name) {
                         return  (await (async function(){
                            let __targ__193=Environment.definitions;
                            if (__targ__193){
                                 return(__targ__193)[name]
                            } 
                        })()||await (async function(){
                            let __targ__194=Environment.ns_definitions.core;
                            if (__targ__194){
                                 return(__targ__194)[name]
                            } 
                        })())
                    };
                    ;
                    let is_global_ques_=function(name) {
                         return  ( not((undefined=== ( function(){
                            let __targ__195=Environment.context.scope;
                            if (__targ__195){
                                 return(__targ__195)[name]
                            } 
                        })()))|| not((undefined=== ( function(){
                            let __targ__196=Environment.global_ctx.core.scope;
                            if (__targ__196){
                                 return(__targ__196)[name]
                            } 
                        })())))
                    };
                    ;
                    let namespaces=function() {
                         return   keys(Environment.global_ctx)
                    };
                    ;
                    await async function(){
                        let __target_obj__197=Environment.global_ctx.core.scope;
                        __target_obj__197["set_compiler"]=set_compiler;
                        __target_obj__197["set_namespace"]=set_namespace;
                        __target_obj__197["create_namespace"]=create_namespace;
                        __target_obj__197["delete_namespace"]=delete_namespace;
                        __target_obj__197["namespaces"]=namespaces;
                        return __target_obj__197;
                        
                    }();
                    await async function(){
                        let __target_obj__198=Environment.global_ctx.core.scope;
                        __target_obj__198["clone"]=async function(val) {
                            if (check_true ((val===Environment))){
                                  return Environment
                            } else {
                                  return await clone(val,0,Environment)
                            }
                        };
                        return __target_obj__198;
                        
                    }();
                    await async function(){
                        let __target_obj__199=Environment;
                        __target_obj__199["get_global"]=get_global;
                        __target_obj__199["set_global"]=set_global;
                        return __target_obj__199;
                        
                    }();
                    let reader=async function(text,opts) {    const __GG__=Environment.get_global;
     return  await async function(){
        if (check_true( (undefined==text))) {
             throw new EvalError(("reader: received undefined, text must be a string."));
            
        } else if (check_true( await (await __GG__("not"))((text instanceof String || typeof text==='string')))) {
             throw new EvalError(("reader: received "+await (await __GG__("sub_type"))(text)+": text must be a string."));
            
        } else  {
            let output_structure;
            let idx;
            let line_number;
            let column_number;
            let source_name;
            let len;
            let debugmode;
            let in_buffer;
            let in_code;
            let in_quotes;
            let in_long_text;
            let in_comment;
            let in_single_quote;
            let reading_object;
            let mode;
            let local_text;
            let position;
            let read_table;
            let get_char;
            let error;
            let handle_escape_char;
            let process_word;
            let registered_stop_char;
            let handler_stack;
            let handler;
            let c;
            let next_c;
            let depth;
            let stop;
            let read_block;
            output_structure=[];
            idx=-1;
            line_number=1;
            column_number=0;
            source_name=await (async function () {
                 if (check_true ((opts && opts["source_name"]))){
                      return (opts && opts["source_name"])
                } else {
                      return "anonymous"
                } 
            })();
            opts=(opts||new Object());
            len=(await (await __GG__("length"))(text)-1);
            debugmode=await async function(){
                if (check_true((opts && opts["verbose"]))) {
                     return true
                } else if (check_true( ((opts && opts["verbose"])===false))) {
                     return false
                } else if (check_true( ((await __GG__("__VERBOSITY__"))>6))) {
                     return true
                } else  {
                     return false
                }
            } ();
            in_buffer=(text).split("");
            in_code=0;
            in_quotes=1;
            in_long_text=2;
            in_comment=3;
            in_single_quote=4;
            reading_object=false;
            mode=in_code;
            local_text=async function() {
                let start;
                let end;
                start=await Math.max(0,(idx-10));
                end=await Math.min(await (await __GG__("length"))(in_buffer),(idx+10));
                 return  (await (await __GG__("slice"))(in_buffer,start,end)).join("")
            };
            position=async function(offset) {
                 return  ("line: "+line_number+" column: "+await (async function () {
                     if (check_true (offset)){
                          return (column_number+offset)
                    } else {
                          return column_number
                    } 
                })())
            };
            read_table=await (await __GG__("add"))(new Object(),await (async function() {
                 if (check_true ((opts && opts["read_table_entries"]))){
                      return (opts && opts["read_table_entries"])
                } else {
                      return new Object()
                } 
            } )(),await ( async function(){
                let __obj__1=new Object();
                __obj__1["("]=[")",async function(block) {
                     return  block
                }];
                __obj__1["["]=["]",async function(block) {
                     return  block
                }];
                __obj__1["{"]=["}",async function(block) {
                    let obj;
                    let __idx__2= async function(){
                        return -1
                    };
                    let key_mode;
                    let need_colon;
                    let value_mode;
                    let key;
                    let value;
                    let cpos;
                    let state;
                    let block_length;
                    {
                        obj=new Object();
                        let idx=await __idx__2();
                        ;
                        key_mode=0;
                        need_colon=1;
                        value_mode=2;
                        key=null;
                        value=null;
                        cpos=null;
                        state=key_mode;
                        block_length=(await (await __GG__("length"))(block)-1);
                        reading_object=false;
                        await (async function(){
                             let __test_condition__3=async function() {
                                 return  (idx<block_length)
                            };
                            let __body_ref__4=async function() {
                                (idx=idx+1);
                                key=await (async function(){
                                    let __targ__5=block;
                                    if (__targ__5){
                                         return(__targ__5)[idx]
                                    } 
                                })();
                                if (check_true (((key instanceof Array)&&((key && key.length)===2)&&((key && key["0"])==="=:quotem")&&((key && key["1"]) instanceof String || typeof (key && key["1"])==='string')))){
                                     key=(key && key["1"])
                                };
                                if (check_true (((key instanceof String || typeof key==='string')&&await (await __GG__("starts_with?"))("=:",key)&&(await (await __GG__("length"))(key)>2)))){
                                     key=await key["substr"].call(key,2)
                                };
                                 return  await async function(){
                                    if (check_true( await (await __GG__("blank?"))(key))) {
                                         return await error("missing object key",("blank or nil key: "+await (async function(){
                                            let __targ__6=block;
                                            if (__targ__6){
                                                 return(__targ__6)[idx]
                                            } 
                                        })()))
                                    } else if (check_true( await (await __GG__("is_number?"))(key))) {
                                        (idx=idx+1);
                                         return  await async function(){
                                            let __target_obj__7=obj;
                                            __target_obj__7[key]=await (async function(){
                                                let __targ__8=block;
                                                if (__targ__8){
                                                     return(__targ__8)[idx]
                                                } 
                                            })();
                                            return __target_obj__7;
                                            
                                        }()
                                    } else if (check_true( ((key instanceof String || typeof key==='string')&&await (await __GG__("contains?"))(":",key)&&await (await __GG__("not"))(await (await __GG__("ends_with?"))(":",key))))) {
                                        cpos=await key["indexOf"].call(key,":");
                                        value=await key["substr"].call(key,(cpos+1));
                                        key=await key["substr"].call(key,0,cpos);
                                        value=await process_word((value).split(""),0);
                                         return  await async function(){
                                            let __target_obj__9=obj;
                                            __target_obj__9[key]=value;
                                            return __target_obj__9;
                                            
                                        }()
                                    } else  {
                                        (idx=idx+1);
                                        if (check_true (await (await __GG__("ends_with?"))(":",key))){
                                             key=await (await __GG__("chop"))(key)
                                        } else {
                                            if (check_true ((await (async function(){
                                                let __targ__10=block;
                                                if (__targ__10){
                                                     return(__targ__10)[idx]
                                                } 
                                            })()===":"))){
                                                 (idx=idx+1)
                                            } else {
                                                 await error("missing colon",("expected colon for: "+key))
                                            }
                                        };
                                         return  await async function(){
                                            let __target_obj__11=obj;
                                            __target_obj__11[key]=await (async function(){
                                                let __targ__12=block;
                                                if (__targ__12){
                                                     return(__targ__12)[idx]
                                                } 
                                            })();
                                            return __target_obj__11;
                                            
                                        }()
                                    }
                                } ()
                            };
                            let __BREAK__FLAG__=false;
                            while(await __test_condition__3()) {
                                await __body_ref__4();
                                 if(__BREAK__FLAG__) {
                                     break;
                                    
                                }
                            } ;
                            
                        })();
                         return  obj
                    }
                },async function() {
                     return  reading_object=true
                }];
                __obj__1["\""]=["\"",async function(block) {
                     return  ["quotes",block]
                }];
                return __obj__1;
                
            })());
            get_char=async function(pos) {
                 return  await (async function(){
                    let __targ__13=in_buffer;
                    if (__targ__13){
                         return(__targ__13)[pos]
                    } 
                })()
            };
            error=async function(type,message,offset) {
                throw new (await __GG__("LispSyntaxError"))({
                    message:message,position:await position(offset),pos:{
                        line:line_number,column:(column_number+(offset||0))
                    },depth:depth,local_text:await local_text(),source_name:source_name,type:type
                });
                
            };
            handle_escape_char=async function(c) {
                let ccode;
                ccode=await c["charCodeAt"].call(c,0);
                 return  await async function(){
                    if (check_true( (ccode===34))) {
                         return c
                    } else if (check_true( (ccode===92))) {
                         return c
                    } else if (check_true( (c==="t"))) {
                         return await String.fromCharCode(9)
                    } else if (check_true( (c==="n"))) {
                         return await String.fromCharCode(10)
                    } else if (check_true( (c==="r"))) {
                         return await String.fromCharCode(13)
                    } else if (check_true( (c==="f"))) {
                         return c
                    } else if (check_true( (c==="b"))) {
                         return c
                    } else  {
                         return c
                    }
                } ()
            };
            process_word=async function(word_acc,backtick_mode) {
                let word;
                let word_as_number;
                word=(word_acc).join("");
                word_as_number=await Number(word);
                if (check_true (debugmode)){
                     console.log("process_word: ",word,word_as_number,backtick_mode)
                };
                 return  await async function(){
                    if (check_true( ("true"===word))) {
                         return true
                    } else if (check_true( ("false"===word))) {
                         return false
                    } else if (check_true( (":"===word))) {
                         return word
                    } else if (check_true( (",@"===word))) {
                         return "=$,@"
                    } else if (check_true( ((",#"===word)||("##"===word)))) {
                         return "=:##"
                    } else if (check_true( ("=$,@"===word))) {
                         return "=$,@"
                    } else if (check_true( ("=:##"===word))) {
                         return "=:##"
                    } else if (check_true( await isNaN(word_as_number))) {
                         return  await async function(){
                            if (check_true( (word==="=:"))) {
                                 return  "=:"
                            } else if (check_true( ((backtick_mode===0)&&await (await __GG__("ends_with?"))(")",word)))) {
                                 return await error("trailing character","unexpected trailing parenthesis")
                            } else if (check_true( ((backtick_mode===0)&&await (await __GG__("ends_with?"))("]",word)))) {
                                 return await error("trailing character","unexpected trailing bracket")
                            } else if (check_true( await (await __GG__("contains?"))(word,["=:(","=:)","=:'"]))) {
                                 return  word
                            } else if (check_true( (backtick_mode===1))) {
                                 return word
                            } else  {
                                 return await (await __GG__("add"))("=:",word)
                            }
                        } ()
                    } else if (check_true( await (await __GG__("is_number?"))(word_as_number))) {
                         return word_as_number
                    } else  {
                        console.log("reader: ",await position()," what is this?",word,word_acc,await local_text());
                         return  word
                    }
                } ()
            };
            registered_stop_char=null;
            handler_stack=[];
            handler=null;
            c=null;
            next_c=null;
            depth=0;
            stop=false;
            read_block=async function(_depth,_prefix_op) {
                let acc;
                let word_acc;
                let backtick_mode;
                let escape_mode;
                let last_c;
                let block_return;
                acc=[];
                word_acc=[];
                backtick_mode=0;
                escape_mode=0;
                last_c=null;
                block_return=null;
                if (check_true (_prefix_op)){
                     (acc).push(_prefix_op)
                };
                depth=_depth;
                await (async function(){
                     let __test_condition__14=async function() {
                         return  (await (await __GG__("not"))(stop)&&(idx<len))
                    };
                    let __body_ref__15=async function() {
                        idx+=1;
                        escape_mode=await Math.max(0,(escape_mode-1));
                        c=await get_char(idx);
                        next_c=await get_char((idx+1));
                        if (check_true ((c==="\n"))){
                            line_number+=1;
                             column_number=0
                        };
                        if (check_true (debugmode)){
                             await console.log(_depth,"C->",c,next_c,mode,escape_mode,await (await __GG__("clone"))(acc),await (await __GG__("clone"))(word_acc),(handler_stack && handler_stack.length))
                        };
                        await async function(){
                            if (check_true( ((next_c===undefined)&&await (await __GG__("not"))((await (async function(){
                                let __targ__16=await (await __GG__("last"))(handler_stack);
                                if (__targ__16){
                                     return(__targ__16)[0]
                                } 
                            })()===undefined))&&(await (await __GG__("not"))((c===await (async function(){
                                let __targ__17=await (await __GG__("last"))(handler_stack);
                                if (__targ__17){
                                     return(__targ__17)[0]
                                } 
                            })()))||((handler_stack && handler_stack.length)>1))))) {
                                 return await error("premature end",("premature end: expected: "+await (async function(){
                                    let __targ__18=await (await __GG__("last"))(handler_stack);
                                    if (__targ__18){
                                         return(__targ__18)[0]
                                    } 
                                })()))
                            } else if (check_true( ((next_c===undefined)&&(mode===in_quotes)&&await (await __GG__("not"))((await c["charCodeAt"]()===34))))) {
                                 return await error("premature end","premature end: expected: \"")
                            } else if (check_true( ((next_c===undefined)&&(mode===in_long_text)&&await (await __GG__("not"))((c==="|"))))) {
                                 return await error("premature end","premature end: expected: |")
                            } else if (check_true( ((mode===in_code)&&(_depth===1)&&(next_c===")")&&(c===")")))) {
                                 return  await error("trailing character","unexpected trailing parenthesis")
                            }
                        } ();
                        await async function(){
                            if (check_true( ((c==="\n")&&(mode===in_comment)))) {
                                mode=in_code;
                                __BREAK__FLAG__=true;
                                return
                            } else if (check_true( ((92===await c["charCodeAt"].call(c,0))&&(mode===in_long_text)))) {
                                (word_acc).push(c);
                                 return  (word_acc).push(c)
                            } else if (check_true( ((mode>0)&&(escape_mode===1)&&(92===await c["charCodeAt"].call(c,0))))) {
                                 return  (word_acc).push(c)
                            } else if (check_true( ((mode>0)&&(92===await c["charCodeAt"].call(c,0))))) {
                                 return  escape_mode=2
                            } else if (check_true( ((mode>0)&&(escape_mode===1)))) {
                                 return  (word_acc).push(await handle_escape_char(c))
                            } else if (check_true( ((mode===in_long_text)&&(escape_mode===0)&&(c==="|")))) {
                                acc=await (await __GG__("add"))((word_acc).join(""));
                                word_acc=[];
                                mode=in_code;
                                __BREAK__FLAG__=true;
                                return
                            } else if (check_true( ((mode===in_quotes)&&(escape_mode===0)&&(c==="\"")))) {
                                acc=await (await __GG__("add"))((word_acc).join(""));
                                word_acc=[];
                                mode=in_code;
                                __BREAK__FLAG__=true;
                                return
                            } else if (check_true( ((mode===in_single_quote)&&(escape_mode===0)&&(c==="'")))) {
                                acc=await (await __GG__("add"))((word_acc).join(""));
                                word_acc=[];
                                mode=in_code;
                                __BREAK__FLAG__=true;
                                return
                            } else if (check_true( ((c==="|")&&(mode===in_code)))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc));
                                     word_acc=[]
                                };
                                mode=in_long_text;
                                block_return=await read_block(await (await __GG__("add"))(_depth,1));
                                if (check_true ((backtick_mode===1))){
                                    block_return=["=:quotem",block_return];
                                     backtick_mode=0
                                };
                                 return  (acc).push(block_return)
                            } else if (check_true( ((c==="\"")&&(escape_mode===0)&&(mode===in_code)))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc));
                                     word_acc=[]
                                };
                                mode=in_quotes;
                                block_return=await read_block(await (await __GG__("add"))(_depth,1));
                                if (check_true ((backtick_mode===1))){
                                     backtick_mode=0
                                };
                                 return  (acc).push(block_return)
                            } else if (check_true( ((c==="'")&&(escape_mode===0)&&(mode===in_code)))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc));
                                     word_acc=[]
                                };
                                mode=in_single_quote;
                                block_return=await read_block(await (await __GG__("add"))(_depth,1));
                                if (check_true ((backtick_mode===1))){
                                     backtick_mode=0
                                };
                                 return  (acc).push(block_return)
                            } else if (check_true( (mode===in_comment))) {
                                 return false
                            } else if (check_true( ((c===";")&&(mode===in_code)))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc));
                                     word_acc=[]
                                };
                                mode=in_comment;
                                 return  await read_block(await (await __GG__("add"))(_depth,1))
                            } else if (check_true( ((mode===in_code)&&(await (await __GG__("length"))(handler_stack)>0)&&(c===await (async function(){
                                let __targ__19=await (await __GG__("last"))(handler_stack);
                                if (__targ__19){
                                     return(__targ__19)[0]
                                } 
                            })())))) {
                                __BREAK__FLAG__=true;
                                return
                            } else if (check_true( ((mode===in_code)&&await (async function(){
                                let __targ__20=read_table;
                                if (__targ__20){
                                     return(__targ__20)[c]
                                } 
                            })()&&await (await __GG__("first"))(await (async function(){
                                let __targ__21=read_table;
                                if (__targ__21){
                                     return(__targ__21)[c]
                                } 
                            })())))) {
                                if (check_true (await (async function(){
                                    let __targ__23=await (async function(){
                                        let __targ__22=read_table;
                                        if (__targ__22){
                                             return(__targ__22)[c]
                                        } 
                                    })();
                                    if (__targ__23){
                                         return(__targ__23)[2]
                                    } 
                                })())){
                                    handler=await (async function(){
                                        let __targ__25=await (async function(){
                                            let __targ__24=read_table;
                                            if (__targ__24){
                                                 return(__targ__24)[c]
                                            } 
                                        })();
                                        if (__targ__25){
                                             return(__targ__25)[2]
                                        } 
                                    })();
                                    await (async function(){
                                        let __array_op_rval__26=handler;
                                         if (__array_op_rval__26 instanceof Function){
                                            return await __array_op_rval__26() 
                                        } else {
                                            return[__array_op_rval__26]
                                        }
                                    })();
                                     handler=null
                                };
                                (handler_stack).push(await (async function(){
                                    let __targ__27=read_table;
                                    if (__targ__27){
                                         return(__targ__27)[c]
                                    } 
                                })());
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc,backtick_mode));
                                    backtick_mode=0;
                                     word_acc=[]
                                };
                                block_return=await read_block(await (await __GG__("add"))(_depth,1));
                                handler=await (async function(){
                                    let __targ__28=(handler_stack).pop();
                                    if (__targ__28){
                                         return(__targ__28)[1]
                                    } 
                                })();
                                block_return=await (async function(){
                                    let __array_op_rval__29=handler;
                                     if (__array_op_rval__29 instanceof Function){
                                        return await __array_op_rval__29(block_return) 
                                    } else {
                                        return[__array_op_rval__29,block_return]
                                    }
                                })();
                                if (check_true (await (await __GG__("not"))((undefined===block_return)))){
                                    if (check_true ((backtick_mode===1))){
                                        block_return=["=:quotem",block_return];
                                         backtick_mode=0
                                    };
                                     return  (acc).push(block_return)
                                }
                            } else if (check_true( ((mode===in_code)&&(c==="`")))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    (acc).push(await process_word(word_acc));
                                     word_acc=[]
                                };
                                 return  backtick_mode=1
                            } else if (check_true( ((mode===in_code)&&(c===":")&&((word_acc && word_acc.length)===0)&&((acc && acc.length)>0)&&(await (await __GG__("last"))(acc) instanceof String || typeof await (await __GG__("last"))(acc)==='string')))) {
                                 return (acc).push(await (await __GG__("add"))((acc).pop(),":"))
                            } else if (check_true( ((mode===in_code)&&(last_c===",")&&((c==="#")||(c==="@"))))) {
                                (word_acc).push(c);
                                (acc).push(await process_word(word_acc));
                                 return  word_acc=[]
                            } else if (check_true( ((mode===in_code)&&((c===" ")||(await c["charCodeAt"].call(c,0)===10)||(await c["charCodeAt"].call(c,0)===9)||((c===",")&&await (await __GG__("not"))((next_c==="@"))&&await (await __GG__("not"))((next_c==="#"))))))) {
                                if (check_true (((word_acc && word_acc.length)>0))){
                                    if (check_true ((backtick_mode===1))){
                                        (acc).push(await process_word(word_acc,backtick_mode));
                                         backtick_mode=0
                                    } else {
                                         (acc).push(await process_word(word_acc))
                                    };
                                     return  word_acc=[]
                                }
                            } else if (check_true( ((mode===in_code)&&(await c["charCodeAt"].call(c,0)===13)))) {
                                 return false
                            } else  {
                                 return  (word_acc).push(c)
                            }
                        } ();
                        column_number+=1;
                         return  last_c=c
                    };
                    let __BREAK__FLAG__=false;
                    while(await __test_condition__14()) {
                        await __body_ref__15();
                         if(__BREAK__FLAG__) {
                             break;
                            
                        }
                    } ;
                    
                })();
                if (check_true (((word_acc && word_acc.length)>0))){
                    (acc).push(await process_word(word_acc,backtick_mode));
                     word_acc=[]
                };
                 return  acc
            };
            if (check_true (debugmode)){
                 await console.log("read->",in_buffer)
            };
            output_structure=await read_block(0);
            if (check_true (debugmode)){
                 await console.log("read<-",await (await __GG__("clone"))(output_structure))
            };
            if (check_true (((output_structure instanceof Array)&&(await (await __GG__("length"))(output_structure)>1)))){
                (output_structure).unshift("=:iprogn");
                 return  await (await __GG__("first"))(await (async function(){
                    let __array_op_rval__30=output_structure;
                     if (__array_op_rval__30 instanceof Function){
                        return await __array_op_rval__30() 
                    } else {
                        return[__array_op_rval__30]
                    }
                })())
            } else {
                  return await (await __GG__("first"))(output_structure)
            }
        }
    } ()
};
                    let add_escape_encoding=async function(text) {        if (check_true ((text instanceof String || typeof text==='string'))){            let chars;            let acc;            chars=(text).split("");            acc=[];            await (async function() {                let __for_body__3=async function(c) {                     return  await async function(){
                        if (check_true( ((await c["charCodeAt"].call(c,0)===34)))) {
                            (acc).push(await String.fromCharCode(92));
                             return  (acc).push(c)
                        } else  {
                             return (acc).push(c)
                        }
                    } ()
                };
                let __array__4=[],__elements__2=chars;
                let __BREAK__FLAG__=false;
                for(let __iter__1 in __elements__2) {
                    __array__4.push(await __for_body__3(__elements__2[__iter__1]));
                    if(__BREAK__FLAG__) {
                         __array__4.pop();
                        break;
                        
                    }
                }return __array__4;
                 
            })();
             return  (acc).join("")
        } else {
              return text
        }
    };
                    let get_outside_global=function get_outside_global(refname) {  try {    let tfn = new Function("{ if (typeof " + refname + " === 'undefined') { return undefined } else { return "+refname+" } }");    return tfn();  } catch (ex) {    return undefined;  }};
                    let get_object_path=function(refname) {        if (check_true ((( refname["indexOf"].call(refname,".")>-1)||( refname["indexOf"].call(refname,"[")>-1)))){
            let chars;
            let comps;
            let mode;
            let name_acc;
            chars=(refname).split("");
            comps=[];
            mode=0;
            name_acc=[];
             ( function() {
                let __for_body__13=function(c) {
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
                let __array__14=[],__elements__12=chars;
                let __BREAK__FLAG__=false;
                for(let __iter__11 in __elements__12) {
                    __array__14.push( __for_body__13(__elements__12[__iter__11]));
                    if(__BREAK__FLAG__) {
                         __array__14.pop();
                        break;
                        
                    }
                }return __array__14;
                 
            })();
            if (check_true (((name_acc && name_acc.length)>0))){
                 (comps).push((name_acc).join(""))
            };
             return  comps
        } else {
              return  ( function(){
                let __array_op_rval__15=refname;
                 if (__array_op_rval__15 instanceof Function){
                    return  __array_op_rval__15() 
                } else {
                    return[__array_op_rval__15]
                }
            })()
        }
    };
                    let do_deferred_splice=async function(tree) {    let rval;
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
                 let __test_condition__16=async function() {
                     return  (idx<(tree && tree.length))
                };
                let __body_ref__17=async function() {
                    tval=await (async function(){
                        let __targ__18=tree;
                        if (__targ__18){
                             return(__targ__18)[idx]
                        } 
                    })();
                    if (check_true ((tval===deferred_operator))){
                        idx+=1;
                        tval=await (async function(){
                            let __targ__19=tree;
                            if (__targ__19){
                                 return(__targ__19)[idx]
                            } 
                        })();
                         rval=await rval["concat"].call(rval,await do_deferred_splice(tval))
                    } else {
                         (rval).push(await do_deferred_splice(tval))
                    };
                     return  idx+=1
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__16()) {
                    await __body_ref__17();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })();
             return  rval
        } else if (check_true( (tree instanceof Object))) {
            rval=new Object();
            await (async function() {
                let __for_body__22=async function(pset) {
                     return  await async function(){
                        let __target_obj__24=rval;
                        __target_obj__24[(pset && pset["0"])]=await do_deferred_splice((pset && pset["1"]));
                        return __target_obj__24;
                        
                    }()
                };
                let __array__23=[],__elements__21=await (await __GG__("pairs"))(tree);
                let __BREAK__FLAG__=false;
                for(let __iter__20 in __elements__21) {
                    __array__23.push(await __for_body__22(__elements__21[__iter__20]));
                    if(__BREAK__FLAG__) {
                         __array__23.pop();
                        break;
                        
                    }
                }return __array__23;
                 
            })();
             return  rval
        } else  {
             return tree
        }
    } ()
};
                    let safe_access=async function(token,ctx,sanitizer_fn) {    let comps;
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
            let __target_obj__229=comps;
            __target_obj__229[0]=await (async function(){
                let __array_op_rval__230=sanitizer_fn;
                 if (__array_op_rval__230 instanceof Function){
                    return await __array_op_rval__230((comps && comps["0"])) 
                } else {
                    return[__array_op_rval__230,(comps && comps["0"])]
                }
            })();
            return __target_obj__229;
            
        }();
        await (async function(){
             let __test_condition__231=async function() {
                 return  ((comps && comps.length)>0)
            };
            let __body_ref__232=async function() {
                (acc).push((comps).shift());
                 return  (acc_full).push(await (await __GG__("expand_dot_accessor"))((acc).join("."),ctx))
            };
            let __BREAK__FLAG__=false;
            while(await __test_condition__231()) {
                await __body_ref__232();
                 if(__BREAK__FLAG__) {
                     break;
                    
                }
            } ;
            
        })();
        rval=await (await __GG__("flatten"))(["(",(acc_full).join(" && "),")"]);
         return  rval
    }
};
                    ;
                    let as_lisp=lisp_writer;
                    ;
                    let read_lisp=reader;
                    ;
                    await async function(){
                        let __target_obj__200=Environment.global_ctx.core.scope;
                        __target_obj__200["eval"]=eval_exp;
                        __target_obj__200["reader"]=reader;
                        __target_obj__200["add_escape_encoding"]=add_escape_encoding;
                        __target_obj__200["get_outside_global"]=get_outside_global;
                        __target_obj__200["as_lisp"]=lisp_writer;
                        __target_obj__200["lisp_writer"]=lisp_writer;
                        return __target_obj__200;
                        
                    }();
                    let inlines=await add(new Object(),await (async function() {
                         if (check_true (opts.inlines)){
                              return opts.inlines
                        } else {
                              return new Object()
                        } 
                    } )(),await ( async function(){
                        let __obj__201=new Object();
                        __obj__201["pop"]=async function(args) {
                             return  ["(",args['0'],")",".","pop()"]
                        };
                        __obj__201["push"]=async function(args) {
                             return  ["(",args['0'],")",".push","(",args['1'],")"]
                        };
                        __obj__201["chomp"]=async function(args) {
                             return  ["(",args['0'],")",".substr","(",0,",","(",args['0'],".length","-",1,")",")"]
                        };
                        __obj__201["join"]=async function(args) {
                            if (check_true ((args.length===1))){
                                  return ["(",args['0'],")",".join","('')"]
                            } else {
                                  return ["(",args['1'],")",".join","(",args['0'],")"]
                            }
                        };
                        __obj__201["take"]=async function(args) {
                             return  ["(",args['0'],")",".shift","()"]
                        };
                        __obj__201["prepend"]=async function(args) {
                             return  ["(",args['0'],")",".unshift","(",args['1'],")"]
                        };
                        __obj__201["trim"]=async function(args) {
                             return  ["(",args['0'],")",".trim()"]
                        };
                        __obj__201["lowercase"]=async function(args) {
                             return  ["(",args['0'],")",".toLowerCase()"]
                        };
                        __obj__201["uppercase"]=async function(args) {
                             return  ["(",args['0'],")",".toUpperCase()"]
                        };
                        __obj__201["islice"]=async function(args) {
                             return  await async function(){
                                if (check_true( (args.length===3))) {
                                     return ["(",args['0'],")",".slice(",args['1'],",",args['2'],")"]
                                } else if (check_true( (args.length===2))) {
                                     return ["(",args['0'],")",".slice(",args['1'],")"]
                                } else  {
                                     throw new SyntaxError("slice requires 2 or 3 arguments");
                                    
                                }
                            } ()
                        };
                        __obj__201["split_by"]=async function(args) {
                             return  ["(",args['1'],")",".split","(",args['0'],")"]
                        };
                        __obj__201["bindf"]=async function(args) {
                             return  await (async function(){
                                let __array_op_rval__202=args['0'];
                                 if (__array_op_rval__202 instanceof Function){
                                    return await __array_op_rval__202(".bind(",args['1'],")") 
                                } else {
                                    return[__array_op_rval__202,".bind(",args['1'],")"]
                                }
                            })()
                        };
                        __obj__201["is_array?"]=async function(args) {
                             return  ["(",args['0']," instanceof Array",")"]
                        };
                        __obj__201["is_object?"]=async function(args) {
                             return  ["(",args['0']," instanceof Object",")"]
                        };
                        __obj__201["is_string?"]=async function(args) {
                             return  ["(",args['0']," instanceof String || typeof ",args['0'],"===","'string'",")"]
                        };
                        __obj__201["is_function?"]=async function(args) {
                             return  await (async function(){
                                let __array_op_rval__203=args['0'];
                                 if (__array_op_rval__203 instanceof Function){
                                    return await __array_op_rval__203(" instanceof Function") 
                                } else {
                                    return[__array_op_rval__203," instanceof Function"]
                                }
                            })()
                        };
                        __obj__201["is_element?"]=async function(args) {
                             return  await (async function(){
                                let __array_op_rval__204=args['0'];
                                 if (__array_op_rval__204 instanceof Function){
                                    return await __array_op_rval__204(" instanceof Element") 
                                } else {
                                    return[__array_op_rval__204," instanceof Element"]
                                }
                            })()
                        };
                        __obj__201["log"]=async function(args) {
                             return  ["console.log","(",await map(async function(val,idx,tl) {
                                if (check_true ((idx<(tl-1)))){
                                      return await (async function(){
                                        let __array_op_rval__205=val;
                                         if (__array_op_rval__205 instanceof Function){
                                            return await __array_op_rval__205(",") 
                                        } else {
                                            return[__array_op_rval__205,","]
                                        }
                                    })()
                                } else {
                                      return await (async function(){
                                        let __array_op_rval__206=val;
                                         if (__array_op_rval__206 instanceof Function){
                                            return await __array_op_rval__206() 
                                        } else {
                                            return[__array_op_rval__206]
                                        }
                                    })()
                                }
                            },args),")"]
                        };
                        __obj__201["reverse"]=async function(args) {
                             return  ["(",args['0'],")",".slice(0).reverse()"]
                        };
                        __obj__201["int"]=async function(args) {
                             return  await async function(){
                                if (check_true( (args.length===1))) {
                                     return ["parseInt(",args['0'],")"]
                                } else if (check_true( (args.length===2))) {
                                     return ["parseInt(",args['0'],",",args['1'],")"]
                                } else  {
                                     throw new "SyntaxError"(("invalid number of arguments to int: received "+args.length));
                                    
                                }
                            } ()
                        };
                        __obj__201["float"]=async function(args) {
                             return  ["parseFloat(",args['0'],")"]
                        };
                        return __obj__201;
                        
                    })());
                    ;
                    await async function(){
                        let __target_obj__207=Environment;
                        __target_obj__207["eval"]=eval_struct;
                        __target_obj__207["identify"]=subtype;
                        __target_obj__207["meta_for_symbol"]=meta_for_symbol;
                        __target_obj__207["set_compiler"]=set_compiler;
                        __target_obj__207["create_namespace"]=create_namespace;
                        __target_obj__207["set_namespace"]=set_namespace;
                        __target_obj__207["namespaces"]=namespaces;
                        __target_obj__207["get_definition"]=get_definition;
                        __target_obj__207["read_lisp"]=reader;
                        __target_obj__207["as_lisp"]=as_lisp;
                        __target_obj__207["is_global?"]=is_global_ques_;
                        __target_obj__207["inlines"]=inlines;
                        __target_obj__207["special_operators"]=special_operators;
                        __target_obj__207["definitions"]=Environment.definitions;
                        __target_obj__207["declarations"]=Environment.declarations;
                        __target_obj__207["compile"]=compile;
                        __target_obj__207["evaluate"]=evaluate;
                        __target_obj__207["do_deferred_splice"]=do_deferred_splice;
                        __target_obj__207["id"]=async function() {
                             return  id
                        };
                        __target_obj__207["set_check_external_env"]=async function(state) {
                            check_external_env_default=state;
                             return  check_external_env_default
                        };
                        __target_obj__207["check_external_env"]=async function() {
                             return  check_external_env_default
                        };
                        return __target_obj__207;
                        
                    }();
                     return  Environment
                }
            };
            return __target_obj__1;
            
        }();
         return  await (async function(){
            let __targ__208=globalThis;
            if (__targ__208){
                 return(__targ__208)[symname]
            } 
        })()
    }
}
}