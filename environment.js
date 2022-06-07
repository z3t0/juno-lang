var { get_next_environment_id, check_true, get_outside_global, subtype,lisp_writer, clone } = await import("./lisp_writer.js");

if (typeof AsyncFunction === "undefined") {
  globalThis.AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
}

async function init_dlisp()
{
    let symname;
    symname="dlisp_env";
    {
        await async function(){
            let __target_obj__1=globalThis;
            __target_obj__1[symname]=async function(opts) {
                {
                    let subtype=function subtype(value) {  if (value === null) return "null";
  else if (value === undefined) return "undefined";
  else if (value instanceof Array) return "array";
  else if (value.constructor && value.constructor!=null && value.constructor.name!=='Object') {
    return value.constructor.name;
  }
  return typeof value;
};
                    ;
                    let Environment={
                        global_ctx:{
                            scope:new Object()
                        },definitions:new Object(),declarations:{
                            safety:{
                                level:2
                            }
                        },externs:new Object()
                    };
                    ;
                    let id=await get_next_environment_id();
                    ;
                    if (check_true ((undefined==opts))){
                         opts=new Object()
                    };
                    await async function(){
                        let __target_obj__2=Environment;
                        __target_obj__2["context"]=Environment.global_ctx;
                        return __target_obj__2;
                        
                    }();
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
                        let __target_obj__3=Environment.global_ctx.scope;
                        __target_obj__3["MAX_SAFE_INTEGER"]=MAX_SAFE_INTEGER;
                        return __target_obj__3;
                        
                    }();
                    let sub_type=subtype;
                    ;
                    await async function(){
                        let __target_obj__4=Environment.global_ctx.scope;
                        __target_obj__4["sub_type"]=sub_type;
                        return __target_obj__4;
                        
                    }();
                    let DEBUG_LEVEL=0;
                    ;
                    await async function(){
                        let __target_obj__5=Environment.global_ctx.scope;
                        __target_obj__5["DEBUG_LEVEL"]=DEBUG_LEVEL;
                        return __target_obj__5;
                        
                    }();
                    [await async function(){
                        let __target_obj__6=Environment.definitions;
                        __target_obj__6["DEBUG_LEVEL"]={
                            description:"Set DEBUG_LEVEL to a positive integer for verbose console output.",tags:["debug","compiler","environment","global"]
                        };
                        return __target_obj__6;
                        
                    }()];
                    let int=parseInt;
                    ;
                    await async function(){
                        let __target_obj__7=Environment.global_ctx.scope;
                        __target_obj__7["int"]=int;
                        return __target_obj__7;
                        
                    }();
                    [await async function(){
                        let __target_obj__8=Environment.definitions;
                        __target_obj__8["int"]={
                            usage:"value:string|number",description:"Convenience method for parseInt, should be used in map vs. directly calling parseInt, which will not work directly",tags:["conversion","number"]
                        };
                        return __target_obj__8;
                        
                    }()];
                    let float=parseFloat;
                    ;
                    await async function(){
                        let __target_obj__9=Environment.global_ctx.scope;
                        __target_obj__9["float"]=float;
                        return __target_obj__9;
                        
                    }();
                    [await async function(){
                        let __target_obj__10=Environment.definitions;
                        __target_obj__10["float"]={
                            usage:"value:string|number",description:"Convenience method for parseFloat, should be used in map vs. directly calling parseFloat, which will not work directly",tags:["conversion","number"]
                        };
                        return __target_obj__10;
                        
                    }()];
                    let values=new Function("...args","{\n                                let acc = [];\n                                for (let _i in args) {\n                                    let value = args[_i];\n                                    let type = subtype(value);\n                                    if (value instanceof Set)  {\n                                        acc = acc.concat(Array.from(value));\n                                    } else if (type==='array') {\n                                        acc = acc.concat(value);\n                                    } else if (type==='object') {\n                                        acc = acc.concat(Object.values(value))\n                                    } else {\n                                        acc = acc.concat(value);\n                                    }\n                                }\n                                return acc;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__11=Environment.global_ctx.scope;
                        __target_obj__11["values"]=values;
                        return __target_obj__11;
                        
                    }();
                    let pairs=new Function("obj","{\n                                    if (subtype(obj)==='array') {\n                                        let rval = [];\n                                        for (let i = 0; i < obj.length; i+=2) {\n                                            rval.push([obj[i],obj[i+1]]);\n                                        }\n                                        return rval;\n                                    } else {\n                                        let keys = Object.keys(obj);\n                                        let rval = keys.reduce(function(acc,x,i) {\n                                            acc.push([x,obj[x]])\n                                            return acc;\n                                        },[]);\n                                        return rval;\n                                    }\n                                }");
                    ;
                    await async function(){
                        let __target_obj__12=Environment.global_ctx.scope;
                        __target_obj__12["pairs"]=pairs;
                        return __target_obj__12;
                        
                    }();
                    let keys=new Function("obj","{  return Object.keys(obj);  }");
                    ;
                    await async function(){
                        let __target_obj__13=Environment.global_ctx.scope;
                        __target_obj__13["keys"]=keys;
                        return __target_obj__13;
                        
                    }();
                    let take=new Function("place","{ return place.shift() }");
                    ;
                    await async function(){
                        let __target_obj__14=Environment.global_ctx.scope;
                        __target_obj__14["take"]=take;
                        return __target_obj__14;
                        
                    }();
                    let prepend=new Function("place","thing","{ return place.unshift(thing) }");
                    ;
                    await async function(){
                        let __target_obj__15=Environment.global_ctx.scope;
                        __target_obj__15["prepend"]=prepend;
                        return __target_obj__15;
                        
                    }();
                    let first=new Function("x","{ return x[0] }");
                    ;
                    await async function(){
                        let __target_obj__16=Environment.global_ctx.scope;
                        __target_obj__16["first"]=first;
                        return __target_obj__16;
                        
                    }();
                    let last=new Function("x","{ return x[x.length - 1] }");
                    ;
                    await async function(){
                        let __target_obj__17=Environment.global_ctx.scope;
                        __target_obj__17["last"]=last;
                        return __target_obj__17;
                        
                    }();
                    let length=new Function("obj","{\n                                if(obj instanceof Array) {\n                                    return obj.length;\n                                } else if (obj instanceof Set) {\n                                    return obj.size;\n                                } else if ((obj === undefined)||(obj===null)) {\n                                    return 0;\n                                } else if (typeof obj==='object') {\n                                    return Object.keys(obj).length;\n                                } else if (typeof obj==='string') {\n                                    return obj.length;\n                                } \n                                return 0;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__18=Environment.global_ctx.scope;
                        __target_obj__18["length"]=length;
                        return __target_obj__18;
                        
                    }();
                    let conj=new Function("...args","{   let list = [];\n                                if (args[0] instanceof Array) {\n                                    list = args[0];\n                                } else {\n                                    list = [args[0]];\n                                }\n                                args.slice(1).map(function(x) {\n                                    list = list.concat(x);\n                                });\n                                return list;\n                            }");
                    ;
                    await async function(){
                        let __target_obj__19=Environment.global_ctx.scope;
                        __target_obj__19["conj"]=conj;
                        return __target_obj__19;
                        
                    }();
                    let reverse=new Function("container","{ return container.slice(0).reverse }");
                    ;
                    await async function(){
                        let __target_obj__20=Environment.global_ctx.scope;
                        __target_obj__20["reverse"]=reverse;
                        return __target_obj__20;
                        
                    }();
                    [await async function(){
                        let __target_obj__21=Environment.definitions;
                        __target_obj__21["reverse"]={
                            usage:["container:list"],description:"Returns a copy of the passed list as reversed.  The original is not changed.",tags:["list","sort","order"]
                        };
                        return __target_obj__21;
                        
                    }()];
                    let map=new AsyncFunction("lambda","array_values","{ try {\n                                        let rval = [],\n                                                tl = array_values.length;\n                                        for (let i = 0; i < array_values.length; i++) {\n                                            rval.push(await lambda.apply(this,[array_values[i], i, tl]));\n                                         }\n                                        return rval;\n                                    } catch (ex) {           \n                                              if (lambda === undefined || lambda === null) {\n                                                    throw new ReferenceError(\"map: lambda argument (position 0) is undefined or nil\")\n                                              } else if (array_values === undefined || array_values === null) {\n                                                    throw new ReferenceError(\"map: container argument (position 1) is undefined or nil\")\n                                              } else if (!(lambda instanceof Function)) {\n                                                    throw new ReferenceError(\"map: lambda argument must be a function: received: \"+ typeof lambda)\n                                              } else if (!(array_values instanceof Array)) {\n                                                    throw new ReferenceError(\"map: invalid array argument, received: \" + typeof array_values)\n                                              } else {\n                                                    // something else just pass on the error\n                                                throw ex;\n                                              }\n                                    }\n                              }");
                    ;
                    await async function(){
                        let __target_obj__22=Environment.global_ctx.scope;
                        __target_obj__22["map"]=map;
                        return __target_obj__22;
                        
                    }();
                    let bind=new Function("func,this_arg","{ return func.bind(this_arg) }");
                    ;
                    await async function(){
                        let __target_obj__23=Environment.global_ctx.scope;
                        __target_obj__23["bind"]=bind;
                        return __target_obj__23;
                        
                    }();
                    let to_object=new Function("array_values","{\n                                      let obj={}\n                                      array_values.forEach((pair)=>{\n                                             obj[pair[0]]=pair[1]\n                                      });\n                                      return obj;\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__24=Environment.global_ctx.scope;
                        __target_obj__24["to_object"]=to_object;
                        return __target_obj__24;
                        
                    }();
                    [await async function(){
                        let __target_obj__25=Environment.definitions;
                        __target_obj__25["to_object"]={
                            description:("Given an array of pairs in the form of [[key value] [key value] ...], constructs an "+"object with the first array element of the pair as the key and the second "+"element as the value. A single object is returned."),usage:["paired_array:array"],tags:["conversion","object","array","list","pairs"]
                        };
                        return __target_obj__25;
                        
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
                                    let __array_op_rval__26=container;
                                     if (__array_op_rval__26 instanceof Function){
                                        return await __array_op_rval__26() 
                                    } else {
                                        return[__array_op_rval__26]
                                    }
                                })()
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__27=Environment.global_ctx.scope;
                        __target_obj__27["to_array"]=to_array;
                        return __target_obj__27;
                        
                    }();
                    [await async function(){
                        let __target_obj__28=Environment.definitions;
                        __target_obj__28["to_array"]={
                            description:("Given a container of type Array, Set, Object, or a string, "+"it will convert the members of the container to an array form, "+"and return a new array with the values of the provided container. "+"In the case of an object, the keys and values will be contained in "+"paired arrays in the returned array.  A string will be split into "+"individual characters. If provided a different "+"type other than the listed values above, the value will be placed "+"in an array as a single element."),usage:["container:*"],tags:["list","array","conversion","set","object","string","pairs"]
                        };
                        return __target_obj__28;
                        
                    }()];
                    let slice=async function(target,from,to) {
                         return  await async function(){
                            if (check_true(to)) {
                                 return await target["slice"].call(target,from,to)
                            } else if (check_true(from)) {
                                 return await target["slice"].call(target,from)
                            } else  {
                                 throw new SyntaxError("slice requires 2 or 3 arguments");
                                
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__29=Environment.global_ctx.scope;
                        __target_obj__29["slice"]=slice;
                        return __target_obj__29;
                        
                    }();
                    let rest=async function(x) {
                         return  await async function(){
                            if (check_true( (x instanceof Array))) {
                                 return await x["slice"].call(x,1)
                            } else if (check_true( (x instanceof String || typeof x==='string'))) {
                                 return await x["substr"].call(x,1)
                            } else  {
                                 return null
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__30=Environment.global_ctx.scope;
                        __target_obj__30["rest"]=rest;
                        return __target_obj__30;
                        
                    }();
                    let second=new Function("x","{ return x[1] }");
                    ;
                    await async function(){
                        let __target_obj__31=Environment.global_ctx.scope;
                        __target_obj__31["second"]=second;
                        return __target_obj__31;
                        
                    }();
                    let third=new Function("x","{ return x[2] }");
                    ;
                    await async function(){
                        let __target_obj__32=Environment.global_ctx.scope;
                        __target_obj__32["third"]=third;
                        return __target_obj__32;
                        
                    }();
                    let chop=new Function("x","{ if (x instanceof Array) { return x.slice(0, x.length-1) } else { return x.substr(0,x.length-1) } }");
                    ;
                    await async function(){
                        let __target_obj__33=Environment.global_ctx.scope;
                        __target_obj__33["chop"]=chop;
                        return __target_obj__33;
                        
                    }();
                    let chomp=new Function("x","{ return x.substr(x.length-1) }");
                    ;
                    await async function(){
                        let __target_obj__34=Environment.global_ctx.scope;
                        __target_obj__34["chomp"]=chomp;
                        return __target_obj__34;
                        
                    }();
                    let not=new Function("x","{ if (check_true(x)) { return false } else { return true } }");
                    ;
                    await async function(){
                        let __target_obj__35=Environment.global_ctx.scope;
                        __target_obj__35["not"]=not;
                        return __target_obj__35;
                        
                    }();
                    let push=new Function("place","thing","{ return place.push(thing) }");
                    ;
                    await async function(){
                        let __target_obj__36=Environment.global_ctx.scope;
                        __target_obj__36["push"]=push;
                        return __target_obj__36;
                        
                    }();
                    let pop=new Function("place","{ return place.pop() }");
                    ;
                    await async function(){
                        let __target_obj__37=Environment.global_ctx.scope;
                        __target_obj__37["pop"]=pop;
                        return __target_obj__37;
                        
                    }();
                    let list=async function(...args) {
                         return  args
                    };
                    ;
                    await async function(){
                        let __target_obj__38=Environment.global_ctx.scope;
                        __target_obj__38["list"]=list;
                        return __target_obj__38;
                        
                    }();
                    let flatten=new Function("x","{ return x.flat(999999999999) } ");
                    ;
                    await async function(){
                        let __target_obj__39=Environment.global_ctx.scope;
                        __target_obj__39["flatten"]=flatten;
                        return __target_obj__39;
                        
                    }();
                    let jslambda=async function(...args) {
                         return  await (async function(){
                            let __apply_args__40=await flatten(args);
                            return ( Function).apply(this,__apply_args__40)
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__42=Environment.global_ctx.scope;
                        __target_obj__42["jslambda"]=jslambda;
                        return __target_obj__42;
                        
                    }();
                    let join=async function(...args) {
                         return  await async function(){
                            if (check_true( (args.length===1))) {
                                 return await args['0']["join"].call(args['0'],"")
                            } else  {
                                 return await args['1']["join"].call(args['1'],args['0'])
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__43=Environment.global_ctx.scope;
                        __target_obj__43["join"]=join;
                        return __target_obj__43;
                        
                    }();
                    let lowercase=async function(x) {
                         return  await x["toLowerCase"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__44=Environment.global_ctx.scope;
                        __target_obj__44["lowercase"]=lowercase;
                        return __target_obj__44;
                        
                    }();
                    let uppercase=async function(x) {
                         return  await x["toUpperCase"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__45=Environment.global_ctx.scope;
                        __target_obj__45["uppercase"]=uppercase;
                        return __target_obj__45;
                        
                    }();
                    let log=async function(...args) {
                         return  await (async function(){
                            return ( console.log).apply(this,args)
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__48=Environment.global_ctx.scope;
                        __target_obj__48["log"]=log;
                        return __target_obj__48;
                        
                    }();
                    let split=new Function("container","token","{ return container.split(token) }");
                    ;
                    await async function(){
                        let __target_obj__49=Environment.global_ctx.scope;
                        __target_obj__49["split"]=split;
                        return __target_obj__49;
                        
                    }();
                    let split_by=new Function("token","container","{ return container.split(token) }");
                    ;
                    await async function(){
                        let __target_obj__50=Environment.global_ctx.scope;
                        __target_obj__50["split_by"]=split_by;
                        return __target_obj__50;
                        
                    }();
                    let is_object_ques_=new Function("x","{ return x instanceof Object }");
                    ;
                    await async function(){
                        let __target_obj__51=Environment.global_ctx.scope;
                        __target_obj__51["is_object?"]=is_object_ques_;
                        return __target_obj__51;
                        
                    }();
                    [await async function(){
                        let __target_obj__52=Environment.definitions;
                        __target_obj__52["is_object?"]={
                            description:"for the given value x, returns true if x is an Javascript object type.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__52;
                        
                    }()];
                    let is_array_ques_=new Function("x","{ return x instanceof Array }");
                    ;
                    await async function(){
                        let __target_obj__53=Environment.global_ctx.scope;
                        __target_obj__53["is_array?"]=is_array_ques_;
                        return __target_obj__53;
                        
                    }();
                    [await async function(){
                        let __target_obj__54=Environment.definitions;
                        __target_obj__54["is_array?"]={
                            description:"for the given value x, returns true if x is an array.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__54;
                        
                    }()];
                    let is_number_ques_=async function(x) {
                         return  (await subtype(x)==="Number")
                    };
                    ;
                    await async function(){
                        let __target_obj__55=Environment.global_ctx.scope;
                        __target_obj__55["is_number?"]=is_number_ques_;
                        return __target_obj__55;
                        
                    }();
                    [await async function(){
                        let __target_obj__56=Environment.definitions;
                        __target_obj__56["is_number?"]={
                            description:"for the given value x, returns true if x is a number.",usage:["arg:value"],tags:["type","condition","subtype","value","what","function"]
                        };
                        return __target_obj__56;
                        
                    }()];
                    let is_function_ques_=async function(x) {
                         return  (x instanceof Function)
                    };
                    ;
                    await async function(){
                        let __target_obj__57=Environment.global_ctx.scope;
                        __target_obj__57["is_function?"]=is_function_ques_;
                        return __target_obj__57;
                        
                    }();
                    [await async function(){
                        let __target_obj__58=Environment.definitions;
                        __target_obj__58["is_function?"]={
                            description:"for the given value x, returns true if x is a function.",usage:["arg:value"],tags:["type","condition","subtype","value","what","function"]
                        };
                        return __target_obj__58;
                        
                    }()];
                    let is_set_ques_=new Function("x","{ return x instanceof Set }");
                    ;
                    await async function(){
                        let __target_obj__59=Environment.global_ctx.scope;
                        __target_obj__59["is_set?"]=is_set_ques_;
                        return __target_obj__59;
                        
                    }();
                    [await async function(){
                        let __target_obj__60=Environment.definitions;
                        __target_obj__60["is_set?"]={
                            description:"for the given value x, returns true if x is a set.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__60;
                        
                    }()];
                    let is_element_ques_=new Function("x","{ return x instanceof Element }");
                    ;
                    await async function(){
                        let __target_obj__61=Environment.global_ctx.scope;
                        __target_obj__61["is_element?"]=is_element_ques_;
                        return __target_obj__61;
                        
                    }();
                    [await async function(){
                        let __target_obj__62=Environment.definitions;
                        __target_obj__62["is_element?"]={
                            description:"for the given value x, returns true if x is an Element object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__62;
                        
                    }()];
                    let is_string_ques_=async function(x) {
                         return  ((x instanceof String)||(typeof x==="string"))
                    };
                    ;
                    await async function(){
                        let __target_obj__63=Environment.global_ctx.scope;
                        __target_obj__63["is_string?"]=is_string_ques_;
                        return __target_obj__63;
                        
                    }();
                    [await async function(){
                        let __target_obj__64=Environment.definitions;
                        __target_obj__64["is_string?"]={
                            description:"for the given value x, returns true if x is a String object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__64;
                        
                    }()];
                    let is_nil_ques_=async function(x) {
                         return  (x===null)
                    };
                    ;
                    await async function(){
                        let __target_obj__65=Environment.global_ctx.scope;
                        __target_obj__65["is_nil?"]=is_nil_ques_;
                        return __target_obj__65;
                        
                    }();
                    [await async function(){
                        let __target_obj__66=Environment.definitions;
                        __target_obj__66["is_nil?"]={
                            description:"for the given value x, returns true if x is exactly equal to nil.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__66;
                        
                    }()];
                    let is_regex_ques_=async function(x) {
                         return  (await sub_type(x)==="RegExp")
                    };
                    ;
                    await async function(){
                        let __target_obj__67=Environment.global_ctx.scope;
                        __target_obj__67["is_regex?"]=is_regex_ques_;
                        return __target_obj__67;
                        
                    }();
                    [await async function(){
                        let __target_obj__68=Environment.definitions;
                        __target_obj__68["is_regex?"]={
                            description:"for the given value x, returns true if x is a Javascript regex object",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__68;
                        
                    }()];
                    let is_date_ques_=async function(x) {
                         return  (await sub_type(x)==="Date")
                    };
                    ;
                    await async function(){
                        let __target_obj__69=Environment.global_ctx.scope;
                        __target_obj__69["is_date?"]=is_date_ques_;
                        return __target_obj__69;
                        
                    }();
                    [await async function(){
                        let __target_obj__70=Environment.definitions;
                        __target_obj__70["is_date?"]={
                            description:"for the given value x, returns true if x is a Date object.",usage:["arg:value"],tags:["type","condition","subtype","value","what"]
                        };
                        return __target_obj__70;
                        
                    }()];
                    let ends_with_ques_=new Function("val","text","{ if (text instanceof Array) { return text[text.length-1]===val } else if (subtype(text)=='String') { return text.endsWith(val) } else { return false }}");
                    ;
                    await async function(){
                        let __target_obj__71=Environment.global_ctx.scope;
                        __target_obj__71["ends_with?"]=ends_with_ques_;
                        return __target_obj__71;
                        
                    }();
                    [await async function(){
                        let __target_obj__72=Environment.definitions;
                        __target_obj__72["ends_with?"]={
                            description:"for a given string or array, checks to see if it ends with the given start_value.  Non string args return false.",usage:["end_value:value","collection:array|string"],tags:["string","text","list","array","filter","reduce"]
                        };
                        return __target_obj__72;
                        
                    }()];
                    let starts_with_ques_=new Function("val","text","{ if (text instanceof Array) { return text[0]===val } else if (subtype(text)=='String') { return text.startsWith(val) } else { return false }}");
                    ;
                    await async function(){
                        let __target_obj__73=Environment.global_ctx.scope;
                        __target_obj__73["starts_with?"]=starts_with_ques_;
                        return __target_obj__73;
                        
                    }();
                    [await async function(){
                        let __target_obj__74=Environment.definitions;
                        __target_obj__74["starts_with?"]={
                            description:"for a given string or array, checks to see if it starts with the given start_value.  Non string args return false.",usage:["start_value:value","collection:array|string"],tags:["string","text","list","array","filter","reduce","begin"]
                        };
                        return __target_obj__74;
                        
                    }()];
                    let blank_ques_=async function(val) {
                         return  ((val==null)||((val instanceof String || typeof val==='string')&&(val==="")))
                    };
                    ;
                    await async function(){
                        let __target_obj__75=Environment.global_ctx.scope;
                        __target_obj__75["blank?"]=blank_ques_;
                        return __target_obj__75;
                        
                    }();
                    let contains_ques_=async function(value,container) {
                         return  await async function(){
                            if (check_true( (await not(value)&&await not(container)))) {
                                 return false
                            } else if (check_true( (container==null))) {
                                 throw new TypeError("contains?: passed nil/undefined container value");
                                
                            } else if (check_true( (container instanceof String || typeof container==='string'))) {
                                 if (check_true (await (await get_global("is_number?"))(value))){
                                      return (await container["indexOf"].call(container,(""+value))>-1)
                                } else {
                                      return (await container["indexOf"].call(container,value)>-1)
                                }
                            } else if (check_true( (container instanceof Array))) {
                                 return await container["includes"].call(container,value)
                            } else if (check_true( await (await get_global("is_set?"))(container))) {
                                 return await container["has"].call(container,value)
                            } else  {
                                 throw new TypeError(("contains?: passed invalid container type: "+await sub_type(container)));
                                
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__76=Environment.global_ctx.scope;
                        __target_obj__76["contains?"]=contains_ques_;
                        return __target_obj__76;
                        
                    }();
                    let make_set=async function(vals) {
                        if (check_true ((vals instanceof Array))){
                              return new Set(vals)
                        } else {
                            let vtype;
                            vtype=await sub_type(vals);
                             return  await async function(){
                                if (check_true( (vtype==="Set"))) {
                                     return new Set(vals)
                                } else if (check_true( (vtype==="object"))) {
                                     return new Set(await values(vals))
                                }
                            }()
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__77=Environment.global_ctx.scope;
                        __target_obj__77["make_set"]=make_set;
                        return __target_obj__77;
                        
                    }();
                    let describe=async function(quoted_symbol) {
                        let not_found;
                        let __location__78= async function(){
                            return await async function(){
                                if (check_true( await (async function(){
                                    let __targ__79=Environment.global_ctx.scope;
                                    if (__targ__79){
                                         return(__targ__79)[quoted_symbol]
                                    } 
                                })())) {
                                     return "global"
                                } else if (check_true( await not((undefined===await get_outside_global(quoted_symbol))))) {
                                     return "external"
                                } else  {
                                     return null
                                }
                            }()
                        };
                        let result;
                        {
                            not_found={
                                not_found:true
                            };
                            let location=await __location__78();
                            ;
                            result=null;
                            result=await (await get_global("add"))({
                                type:await async function(){
                                    if (check_true( (location==="global"))) {
                                         return await sub_type(await (async function(){
                                            let __targ__80=Environment.global_ctx.scope;
                                            if (__targ__80){
                                                 return(__targ__80)[quoted_symbol]
                                            } 
                                        })())
                                    } else if (check_true( (location==="external"))) {
                                         return await sub_type(await get_outside_global(quoted_symbol))
                                    } else  {
                                         return "undefined"
                                    }
                                }(),location:location
                            },await (async function() {
                                 if (check_true (await (async function(){
                                    let __targ__81=Environment.definitions;
                                    if (__targ__81){
                                         return(__targ__81)[quoted_symbol]
                                    } 
                                })())){
                                      return await (async function(){
                                        let __targ__82=Environment.definitions;
                                        if (__targ__82){
                                             return(__targ__82)[quoted_symbol]
                                        } 
                                    })()
                                } else {
                                      return new Object()
                                } 
                            } )());
                            if (check_true (result.description)){
                                 await async function(){
                                    let __target_obj__83=result;
                                    __target_obj__83["description"]=await Environment["eval"].call(Environment,result.description);
                                    return __target_obj__83;
                                    
                                }()
                            };
                             return  result
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__84=Environment.global_ctx.scope;
                        __target_obj__84["describe"]=describe;
                        return __target_obj__84;
                        
                    }();
                    let undefine=async function(quoted_symbol) {
                        if (check_true (await (async function(){
                            let __targ__85=Environment.global_ctx.scope;
                            if (__targ__85){
                                 return(__targ__85)[quoted_symbol]
                            } 
                        })())){
                              return await (await get_global("delete_prop"))(Environment.global_ctx.scope,quoted_symbol)
                        } else {
                              return false
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__86=Environment.global_ctx.scope;
                        __target_obj__86["undefine"]=undefine;
                        return __target_obj__86;
                        
                    }();
                    let eval_exp=async function(expression) {
                        await console.log("EVAL:",expression);
                         return  await (async function(){
                            let __array_op_rval__87=expression;
                             if (__array_op_rval__87 instanceof Function){
                                return await __array_op_rval__87() 
                            } else {
                                return[__array_op_rval__87]
                            }
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__88=Environment.global_ctx.scope;
                        __target_obj__88["eval_exp"]=eval_exp;
                        return __target_obj__88;
                        
                    }();
                    let indirect_new=new Function("...args","{\n                                    let targetClass = args[0];\n                                    if (subtype(targetClass)===\"String\") {\n                                        let tmpf=new Function(\"{ return \"+targetClass+\" }\");\n                                        targetClass = tmpf();\n                                    }\n                                    if (args.length==1) {\n                                        let f = function(Class) {\n                                            return new (Function.prototype.bind.apply(Class, args));\n                                        }\n                                        let rval = f.apply(this,[targetClass]);\n                                        return rval;\n                                    } else {\n                                        let f = function(Class) {\n                                            return new (Function.prototype.bind.apply(Class, args));\n                                        }\n                                        let rval = f.apply(this,[targetClass].concat(args.slice(1)));\n                                        return rval;\n                                    }}");
                    ;
                    await async function(){
                        let __target_obj__89=Environment.global_ctx.scope;
                        __target_obj__89["indirect_new"]=indirect_new;
                        return __target_obj__89;
                        
                    }();
                    let range=async function(...args) {
                        let from_to;
                        let step;
                        let idx;
                        let acc;
                        from_to=await (async function () {
                             if (check_true (args['1'])){
                                  return [parseInt(args['0']),parseInt(args['1'])]
                            } else {
                                  return [0,parseInt(args['0'])]
                            } 
                        })();
                        step=await (async function () {
                             if (check_true (args['2'])){
                                  return parseFloat(args['2'])
                            } else {
                                  return 1
                            } 
                        })();
                        idx=from_to['0'];
                        acc=[];
                        await (async function(){
                             let __test_condition__90=async function() {
                                 return  (idx<from_to['1'])
                            };
                            let __body_ref__91=async function() {
                                (acc).push(idx);
                                 return  idx+=step
                            };
                            let __BREAK__FLAG__=false;
                            while(await __test_condition__90()) {
                                await __body_ref__91();
                                 if(__BREAK__FLAG__) {
                                     break;
                                    
                                }
                            } ;
                            
                        })();
                         return  acc
                    };
                    ;
                    await async function(){
                        let __target_obj__92=Environment.global_ctx.scope;
                        __target_obj__92["range"]=range;
                        return __target_obj__92;
                        
                    }();
                    let add=new Function("...args","{\n                                let acc;\n                                if (typeof args[0]===\"number\") {\n                                    acc = 0;\n                                } else if (args[0] instanceof Array) {\n                                    return args[0].concat(args.slice(1));\n                                } else if (typeof args[0]==='object') {\n                                   let rval = {};\n                                   for (let i in args) {\n                                        if (typeof args[i] === 'object') {\n                                            for (let k in args[i]) {\n                                                rval[k] = args[i][k];\n                                            }\n                                        }\n                                   }\n                                   return rval;\n                                } else {\n                                    acc = \"\";\n                                }\n                                for (let i in args) {\n                                    acc += args[i];\n                                }\n                                return acc;\n                             }");
                    ;
                    await async function(){
                        let __target_obj__93=Environment.global_ctx.scope;
                        __target_obj__93["add"]=add;
                        return __target_obj__93;
                        
                    }();
                    let merge_objects=new Function("x","{\n                                    let rval = {};\n                                    for (let i in x) {\n                                        if (typeof i === 'object') {\n                                            for (let k in x[i]) {\n                                                rval[k] = x[i][k];\n                                            }\n                                        }\n                                    }\n                                    return rval;\n                                 }");
                    ;
                    await async function(){
                        let __target_obj__94=Environment.global_ctx.scope;
                        __target_obj__94["merge_objects"]=merge_objects;
                        return __target_obj__94;
                        
                    }();
                    let index_of=new Function("value,container","{ let searcher = (v) => v == value; return container.findIndex(searcher);}");
                    ;
                    await async function(){
                        let __target_obj__95=Environment.global_ctx.scope;
                        __target_obj__95["index_of"]=index_of;
                        return __target_obj__95;
                        
                    }();
                    let resolve_path=new Function("path,obj","{\n                                        if (typeof path==='string') {\n                                            path = path.split(\".\");\n                                        }\n                                        let s=obj;\n                                        return path.reduce(function(prev, curr) {\n                                            return prev ? prev[curr] : undefined\n                                        }, obj || {})\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__96=Environment.global_ctx.scope;
                        __target_obj__96["resolve_path"]=resolve_path;
                        return __target_obj__96;
                        
                    }();
                    let delete_prop=new Function("obj","...args","{\n                                        if (args.length == 1) {\n                                            return delete obj[args[0]];\n                                        } else {\n                                            while (args.length > 0) {\n                                                let prop = args.shift();\n                                                delete obj[prop];\n                                            }\n                                        }\n                                        return obj;\n                                    }");
                    ;
                    await async function(){
                        let __target_obj__97=Environment.global_ctx.scope;
                        __target_obj__97["delete_prop"]=delete_prop;
                        return __target_obj__97;
                        
                    }();
                    let min_value=new Function("elements","{ return Math.min(...elements); }");
                    ;
                    await async function(){
                        let __target_obj__98=Environment.global_ctx.scope;
                        __target_obj__98["min_value"]=min_value;
                        return __target_obj__98;
                        
                    }();
                    let max_value=new Function("elements","{ return Math.max(...elements); }");
                    ;
                    await async function(){
                        let __target_obj__99=Environment.global_ctx.scope;
                        __target_obj__99["max_value"]=max_value;
                        return __target_obj__99;
                        
                    }();
                    let interlace=async function(...args) {
                        let min_length;
                        let rlength_args;
                        let rval;
                        min_length=await min_value(await map(length,args));
                        rlength_args=await range(await length(args));
                        rval=[];
                        await (async function() {
                            let __for_body__102=async function(i) {
                                 return  await (async function() {
                                    let __for_body__106=async function(j) {
                                         return  (rval).push(await (async function(){
                                            let __targ__109=await (async function(){
                                                let __targ__108=args;
                                                if (__targ__108){
                                                     return(__targ__108)[j]
                                                } 
                                            })();
                                            if (__targ__109){
                                                 return(__targ__109)[i]
                                            } 
                                        })())
                                    };
                                    let __array__107=[],__elements__105=rlength_args;
                                    let __BREAK__FLAG__=false;
                                    for(let __iter__104 in __elements__105) {
                                        __array__107.push(await __for_body__106(__elements__105[__iter__104]));
                                        if(__BREAK__FLAG__) {
                                             __array__107.pop();
                                            break;
                                            
                                        }
                                    }return __array__107;
                                     
                                })()
                            };
                            let __array__103=[],__elements__101=await range(min_length);
                            let __BREAK__FLAG__=false;
                            for(let __iter__100 in __elements__101) {
                                __array__103.push(await __for_body__102(__elements__101[__iter__100]));
                                if(__BREAK__FLAG__) {
                                     __array__103.pop();
                                    break;
                                    
                                }
                            }return __array__103;
                             
                        })();
                         return  rval
                    };
                    ;
                    await async function(){
                        let __target_obj__110=Environment.global_ctx.scope;
                        __target_obj__110["interlace"]=interlace;
                        return __target_obj__110;
                        
                    }();
                    [await async function(){
                        let __target_obj__111=Environment.definitions;
                        __target_obj__111["interlace"]={
                            usage:["list0:array","list1:array","listn?:array"],description:"Returns a list containing a consecutive values from each list, in argument order.  I.e. list0.0 list1.0 listn.0 list0.1 list1.1 listn.1 ...",tags:["list","array","join","merge"]
                        };
                        return __target_obj__111;
                        
                    }()];
                    let trim=async function(x) {
                         return  await x["trim"]()
                    };
                    ;
                    await async function(){
                        let __target_obj__112=Environment.global_ctx.scope;
                        __target_obj__112["trim"]=trim;
                        return __target_obj__112;
                        
                    }();
                    let assert=async function(assertion_form,failure_message) {
                        if (check_true (assertion_form)){
                              return assertion_form
                        } else throw new EvalError((failure_message||"assertion failure"));
                        
                    };
                    ;
                    await async function(){
                        let __target_obj__113=Environment.global_ctx.scope;
                        __target_obj__113["assert"]=assert;
                        return __target_obj__113;
                        
                    }();
                    [await async function(){
                        let __target_obj__114=Environment.definitions;
                        __target_obj__114["assert"]={
                            description:"If the evaluated assertion form is true, the result is returned, otherwise an EvalError is thrown with the optionally provided failure message.",usage:["form:*","failure_message:string?"],tags:["true","error","check","debug","valid","assertion"]
                        };
                        return __target_obj__114;
                        
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
                        let __target_obj__115=Environment.global_ctx.scope;
                        __target_obj__115["unquotify"]=unquotify;
                        return __target_obj__115;
                        
                    }();
                    [await async function(){
                        let __target_obj__116=Environment.definitions;
                        __target_obj__116["unquotify"]={
                            description:"Removes binding symbols and quotes from a supplied value.  For use in compile time function such as macros.",usage:["val:string"],tags:["macro","quote","quotes","desym"]
                        };
                        return __target_obj__116;
                        
                    }()];
                    let or_args=async function(argset) {
                        let is_true;
                        is_true=false;
                        await (async function() {
                            let __for_body__119=async function(elem) {
                                if (check_true (elem)){
                                    is_true=true;
                                    __BREAK__FLAG__=true;
                                    return
                                }
                            };
                            let __array__120=[],__elements__118=argset;
                            let __BREAK__FLAG__=false;
                            for(let __iter__117 in __elements__118) {
                                __array__120.push(await __for_body__119(__elements__118[__iter__117]));
                                if(__BREAK__FLAG__) {
                                     __array__120.pop();
                                    break;
                                    
                                }
                            }return __array__120;
                             
                        })();
                         return  is_true
                    };
                    ;
                    await async function(){
                        let __target_obj__121=Environment.global_ctx.scope;
                        __target_obj__121["or_args"]=or_args;
                        return __target_obj__121;
                        
                    }();
                    let special_operators=async function() {
                         return  await make_set(await compiler([],{
                            special_operators:true,env:Environment
                        }))
                    };
                    ;
                    await async function(){
                        let __target_obj__122=Environment.global_ctx.scope;
                        __target_obj__122["special_operators"]=special_operators;
                        return __target_obj__122;
                        
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
                                let __target_arg__125=[].concat(await conj(await (async function(){
                                    let __array_op_rval__126=style;
                                     if (__array_op_rval__126 instanceof Function){
                                        return await __array_op_rval__126() 
                                    } else {
                                        return[__array_op_rval__126]
                                    }
                                })(),args));
                                if(!__target_arg__125 instanceof Array){
                                    throw new TypeError("Invalid final argument to apply - an array is required")
                                }let __pre_arg__127=("%c"+await (async function () {
                                     if (check_true (opts.prefix)){
                                          return opts.prefix
                                    } else {
                                          return (args).shift()
                                    } 
                                })());
                                __target_arg__125.unshift(__pre_arg__127);
                                return (console.log).apply(this,__target_arg__125)
                            })()
                        }
                    };
                    ;
                    await async function(){
                        let __target_obj__128=Environment.global_ctx.scope;
                        __target_obj__128["defclog"]=defclog;
                        return __target_obj__128;
                        
                    }();
                    let NOT_FOUND=new ReferenceError("not found");
                    ;
                    await async function(){
                        let __target_obj__129=Environment.global_ctx.scope;
                        __target_obj__129["NOT_FOUND"]=NOT_FOUND;
                        return __target_obj__129;
                        
                    }();
                    let check_external_env_default=true;
                    ;
                    await async function(){
                        let __target_obj__130=Environment.global_ctx.scope;
                        __target_obj__130["check_external_env_default"]=check_external_env_default;
                        return __target_obj__130;
                        
                    }();
                    let set_global=async function(refname,value,meta) {
                        if (check_true (await not((typeof refname==="string"))))throw new TypeError("reference name must be a string type");
                        ;
                        await async function(){
                            let __target_obj__131=Environment.global_ctx.scope;
                            __target_obj__131[refname]=value;
                            return __target_obj__131;
                            
                        }();
                        if (check_true (((meta instanceof Object)&&await not((meta instanceof Array))))){
                             await async function(){
                                let __target_obj__132=Environment.definitions;
                                __target_obj__132[refname]=meta;
                                return __target_obj__132;
                                
                            }()
                        };
                         return  await (async function(){
                            let __targ__133=Environment.global_ctx.scope;
                            if (__targ__133){
                                 return(__targ__133)[refname]
                            } 
                        })()
                    };
                    ;
                    await async function(){
                        let __target_obj__134=Environment.global_ctx.scope;
                        __target_obj__134["set_global"]=set_global;
                        return __target_obj__134;
                        
                    }();
                    let get_global=async function(refname,value_if_not_found,suppress_check_external_env) {
                         return  await async function(){
                            if (check_true( await not((typeof refname==="string")))) {
                                 throw new TypeError("reference name must be a string type");
                                
                            } else if (check_true( (refname==="Environment"))) {
                                 return Environment
                            } else if (check_true( await compiler_operators["has"].call(compiler_operators,refname))) {
                                 return special_identity
                            } else  {
                                let comps;
                                let refval;
                                let check_external_env;
                                comps=await get_object_path(refname);
                                refval=null;
                                check_external_env=await (async function () {
                                     if (check_true (suppress_check_external_env)){
                                          return false
                                    } else {
                                          return check_external_env_default
                                    } 
                                })();
                                refval=await (async function(){
                                    let __targ__135=Environment.global_ctx.scope;
                                    if (__targ__135){
                                         return(__targ__135)[comps['0']]
                                    } 
                                })();
                                if (check_true (((undefined===refval)&&check_external_env))){
                                     refval=await (async function () {
                                         if (check_true (check_external_env)){
                                              return (await (async function(){
                                                let __targ__136=Environment.externs;
                                                if (__targ__136){
                                                     return(__targ__136)[comps['0']]
                                                } 
                                            })()||await get_outside_global(comps['0'])||NOT_FOUND)
                                        } else {
                                              return NOT_FOUND
                                        } 
                                    })()
                                };
                                if (check_true ((undefined===await (async function(){
                                    let __targ__137=Environment.externs;
                                    if (__targ__137){
                                         return(__targ__137)[comps['0']]
                                    } 
                                })()))){
                                     await async function(){
                                        let __target_obj__138=Environment.externs;
                                        __target_obj__138[comps['0']]=refval;
                                        return __target_obj__138;
                                        
                                    }()
                                };
                                 return  await async function(){
                                    if (check_true( (NOT_FOUND===refval))) {
                                         return (value_if_not_found||NOT_FOUND)
                                    } else if (check_true( (comps.length===1))) {
                                         return refval
                                    } else if (check_true( (comps.length>1))) {
                                         return  await resolve_path(await rest(comps),refval)
                                    } else  {
                                        await console.warn("get_global: condition fall through: ",comps);
                                         return  NOT_FOUND
                                    }
                                }()
                            }
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__139=Environment.global_ctx.scope;
                        __target_obj__139["get_global"]=get_global;
                        return __target_obj__139;
                        
                    }();
                    let compile=async function(json_expression,opts) {
                         return  await compiler(json_expression,{
                            env:Environment
                        })
                    };
                    ;
                    await async function(){
                        let __target_obj__140=Environment.global_ctx.scope;
                        __target_obj__140["compile"]=compile;
                        return __target_obj__140;
                        
                    }();
                    let env_log=await defclog({
                        prefix:("env"+id),background:"#B0F0C0"
                    });
                    ;
                    await async function(){
                        let __target_obj__141=Environment.global_ctx.scope;
                        __target_obj__141["env_log"]=env_log;
                        return __target_obj__141;
                        
                    }();
                    let evaluate=async function(expression,ctx,opts) {
                        let compiled;
                        let result;
                        opts=(opts||new Object());
                        compiled=null;
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
                                              return await Environment["read_lisp"].call(Environment,expression)
                                        } 
                                    } )(),{
                                        env:Environment,ctx:ctx,formatted_output:true,error_report:(opts.error_report||null),quiet_mode:(opts.quiet_mode||false)
                                    }) 
                                } catch(__exception__142) {
                                      if (__exception__142 instanceof Error) {
                                         let e=__exception__142;
                                         {
                                            if (check_true (opts.error_report)){
                                                  return await (async function(){
                                                    let __array_op_rval__143=opts.error_report;
                                                     if (__array_op_rval__143 instanceof Function){
                                                        return await __array_op_rval__143([{
                                                            error:await sub_type(e),message:e.message,form:await async function(){
                                                                if (check_true( ((expression instanceof String || typeof expression==='string')&&(expression.length>100)))) {
                                                                     return await add(await expression["substr"].call(expression,0,100),"...")
                                                                } else  {
                                                                     return await (await get_global("as_lisp"))(expression)
                                                                }
                                                            }(),parent_forms:[],invalid:true
                                                        }]) 
                                                    } else {
                                                        return[__array_op_rval__143,[{
                                                            error:await sub_type(e),message:e.message,form:await async function(){
                                                                if (check_true( ((expression instanceof String || typeof expression==='string')&&(expression.length>100)))) {
                                                                     return await add(await expression["substr"].call(expression,0,100),"...")
                                                                } else  {
                                                                     return await (await get_global("as_lisp"))(expression)
                                                                }
                                                            }(),parent_forms:[],invalid:true
                                                        }]]
                                                    }
                                                })()
                                            } else {
                                                  return await console.error("Compilation Error: ",e)
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
                                let __array_op_rval__144=opts.on_compilation_complete;
                                 if (__array_op_rval__144 instanceof Function){
                                    return await __array_op_rval__144(compiled) 
                                } else {
                                    return[__array_op_rval__144,compiled]
                                }
                            })()
                        };
                        await (async function(){
                            try /* TRY COMPLEX */ {
                                 return  result=await async function(){
                                    if (check_true(compiled.error)) {
                                         throw new Error((await Environment.get_global("indirect_new"))(compiled.error,compiled.message));
                                        
                                    } else if (check_true( (compiled['0'].ctype&&(await (await get_global("contains?"))("block",compiled['0'].ctype)||(compiled['0'].ctype==="assignment")||(compiled['0'].ctype==="__!NOT_FOUND!__"))))) {
                                         if (check_true (await (async function(){
                                            let __array_op_rval__146=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__146 instanceof Function){
                                                return await __array_op_rval__146() 
                                            } else {
                                                return[__array_op_rval__146]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__147=compiled;
                                                __target_obj__147[1]=new AsyncFunction("Environment",("{ "+compiled['1']+"}"));
                                                return __target_obj__147;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__148=compiled['1'];
                                                 if (__array_op_rval__148 instanceof Function){
                                                    return await __array_op_rval__148(Environment) 
                                                } else {
                                                    return[__array_op_rval__148,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__149=compiled;
                                                __target_obj__149[1]=new AsyncFunction(("{"+compiled['1']+"}"));
                                                return __target_obj__149;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__150=compiled['1'];
                                                 if (__array_op_rval__150 instanceof Function){
                                                    return await __array_op_rval__150() 
                                                } else {
                                                    return[__array_op_rval__150]
                                                }
                                            })()
                                        }
                                    } else if (check_true( (compiled['0'].ctype&&(("AsyncFunction"===compiled['0'].ctype)||("statement"===compiled['0'].ctype)||("objliteral"===compiled['0'].ctype))))) {
                                        if (check_true (await (async function(){
                                            let __array_op_rval__151=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__151 instanceof Function){
                                                return await __array_op_rval__151() 
                                            } else {
                                                return[__array_op_rval__151]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__152=compiled;
                                                __target_obj__152[1]=new AsyncFunction("Environment",("{ return "+compiled['1']+"} "));
                                                return __target_obj__152;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__153=compiled['1'];
                                                 if (__array_op_rval__153 instanceof Function){
                                                    return await __array_op_rval__153(Environment) 
                                                } else {
                                                    return[__array_op_rval__153,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__154=compiled;
                                                __target_obj__154[1]=new AsyncFunction(("{ return "+compiled['1']+"}"));
                                                return __target_obj__154;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__155=compiled['1'];
                                                 if (__array_op_rval__155 instanceof Function){
                                                    return await __array_op_rval__155() 
                                                } else {
                                                    return[__array_op_rval__155]
                                                }
                                            })()
                                        }
                                    } else if (check_true( (compiled['0'].ctype&&("Function"===compiled['0'].ctype)))) {
                                        if (check_true (await (async function(){
                                            let __array_op_rval__156=compiled['0'].has_lisp_globals;
                                             if (__array_op_rval__156 instanceof Function){
                                                return await __array_op_rval__156() 
                                            } else {
                                                return[__array_op_rval__156]
                                            }
                                        })())){
                                            await async function(){
                                                let __target_obj__157=compiled;
                                                __target_obj__157[1]=new Function("Environment",("{ return "+compiled['1']+"} "));
                                                return __target_obj__157;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__158=compiled['1'];
                                                 if (__array_op_rval__158 instanceof Function){
                                                    return await __array_op_rval__158(Environment) 
                                                } else {
                                                    return[__array_op_rval__158,Environment]
                                                }
                                            })()
                                        } else {
                                            await async function(){
                                                let __target_obj__159=compiled;
                                                __target_obj__159[1]=new Function(("{ return "+compiled['1']+"}"));
                                                return __target_obj__159;
                                                
                                            }();
                                             return  await (async function(){
                                                let __array_op_rval__160=compiled['1'];
                                                 if (__array_op_rval__160 instanceof Function){
                                                    return await __array_op_rval__160() 
                                                } else {
                                                    return[__array_op_rval__160]
                                                }
                                            })()
                                        }
                                    } else  {
                                         return compiled['1']
                                    }
                                }()
                            }  catch(__exception__145) {
                                  if (__exception__145 instanceof Error) {
                                     let e=__exception__145;
                                     {
                                        await env_log("caught error: ",e.name,e.message);
                                        if (check_true (opts.error_report)){
                                             await (async function(){
                                                let __array_op_rval__161=opts.error_report;
                                                 if (__array_op_rval__161 instanceof Function){
                                                    return await __array_op_rval__161({
                                                        error:e.name,message:e.message,form:null,parent_forms:null,invalid:true,text:e.stack
                                                    }) 
                                                } else {
                                                    return[__array_op_rval__161,{
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
                        let __target_obj__162=Environment.global_ctx.scope;
                        __target_obj__162["evaluate"]=evaluate;
                        return __target_obj__162;
                        
                    }();
                    let eval_struct=async function(lisp_struct,ctx,opts) {
                        let rval;
                        rval=null;
                        if (check_true (lisp_struct instanceof Function)){
                             rval=await (async function(){
                                let __array_op_rval__163=lisp_struct;
                                 if (__array_op_rval__163 instanceof Function){
                                    return await __array_op_rval__163() 
                                } else {
                                    return[__array_op_rval__163]
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
                        let __target_obj__164=Environment.global_ctx.scope;
                        __target_obj__164["eval_struct"]=eval_struct;
                        return __target_obj__164;
                        
                    }();
                    let meta_for_symbol=async function(quoted_symbol) {
                        if (check_true (await (await get_global("starts_with?"))("=:",quoted_symbol))){
                              return await (async function(){
                                let __targ__165=Environment.definitions;
                                if (__targ__165){
                                     return(__targ__165)[await quoted_symbol["substr"].call(quoted_symbol,2)]
                                } 
                            })()
                        } else {
                              return await (async function(){
                                let __targ__166=Environment.definitions;
                                if (__targ__166){
                                     return(__targ__166)[quoted_symbol]
                                } 
                            })()
                        }
                    };
                    ;
                    let set_compiler=async function(compiler_function) {
                        compiler=compiler_function;
                        compiler_operators=await (async function(){
                            let __array_op_rval__167=compiler;
                             if (__array_op_rval__167 instanceof Function){
                                return await __array_op_rval__167([],{
                                    special_operators:true,env:Environment
                                }) 
                            } else {
                                return[__array_op_rval__167,[],{
                                    special_operators:true,env:Environment
                                }]
                            }
                        })();
                         return  await async function(){
                            let __target_obj__168=Environment.global_ctx.scope;
                            __target_obj__168["compiler"]=compiler;
                            return __target_obj__168;
                            
                        }()
                    };
                    ;
                    await async function(){
                        let __target_obj__169=Environment;
                        __target_obj__169["get_global"]=get_global;
                        __target_obj__169["set_global"]=set_global;
                        return __target_obj__169;
                        
                    }();
                    let reader=async function(text,opts) {    let output_structure;    let idx;
    let line_number;
    let column_number;
    let len;
    let debugmode;
    let in_buffer;
    let in_code;
    let in_quotes;
    let in_long_text;
    let in_comment;
    let local_text;
    let position;
    let in_single_quote;
    let mode;
    let read_table;
    let get_char;
    let handle_escape_char;
    let process_word;
    let registered_stop_char;
    let handler_stack;
    let handler;
    let c;
    let next_c;
    let depth;
    let __stop__1= async function(){
        return false
    };
    let read_block;
    {
        output_structure=[];
        idx=-1;
        line_number=0;
        column_number=0;
        opts=(opts||new Object());
        len=(await (await Environment.get_global("length"))(text)-1);
        debugmode=await (async function () {
             if (check_true (((await Environment.get_global("DEBUG_LEVEL"))>6))){
                  return true
            } else {
                  return false
            } 
        })();
        in_buffer=text.split("");
        in_code=0;
        in_quotes=1;
        in_long_text=2;
        in_comment=3;
        local_text=async function() {
            let start;
            let end;
            start=await Math.max(0,(idx-10));
            end=await Math.max(await (await Environment.get_global("length"))(in_buffer),(idx+10));
             return  in_buffer.slice(start,end).join("")
        };
        position=async function() {
             return  ("line: "+line_number+" column: "+column_number)
        };
        in_single_quote=4;
        mode=in_code;
        read_table=await ( async function(){
            let __obj__2=new Object();
            __obj__2["("]=[")",async function(block) {
                 return  block
            }];
            __obj__2["["]=["]",async function(block) {
                 return  block
            }];
            __obj__2["{"]=["}",async function(block) {
                let obj;
                let __idx__3= async function(){
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
                    let idx=await __idx__3();
                    ;
                    key_mode=0;
                    need_colon=1;
                    value_mode=2;
                    key=null;
                    value=null;
                    cpos=null;
                    state=key_mode;
                    block_length=(await (await Environment.get_global("length"))(block)-1);
                    await (async function(){
                         let __test_condition__4=async function() {
                             return  (idx<block_length)
                        };
                        let __body_ref__5=async function() {
                            idx+=1;
                            key=await (async function(){
                                let __targ__6=block;
                                if (__targ__6){
                                     return(__targ__6)[idx]
                                } 
                            })();
                            if (check_true ((key instanceof Array&&(( key && key.length )===2)&&(( key && key["0"] )==="=:quotem")&&(( key && key["1"] ) instanceof String || typeof ( key && key["1"] )==='string')))){
                                 key=( key && key["1"] )
                            };
                            if (check_true (((key instanceof String || typeof key==='string')&&await (await Environment.get_global("starts_with?"))("=:",key)&&(await (await Environment.get_global("length"))(key)>2)))){
                                 key=await key["substr"].call(key,2)
                            };
                             return  await async function(){
                                if (check_true( await (await Environment.get_global("blank?"))(key))) {
                                     throw new SyntaxError((""+await position()+": blank or nil key: "+await (async function(){
                                        let __targ__7=block;
                                        if (__targ__7){
                                             return(__targ__7)[idx]
                                        } 
                                    })()+" -->"+await local_text()+"<--"));
                                    
                                } else if (check_true( await (await Environment.get_global("is_number?"))(key))) {
                                    idx+=1;
                                     return  await async function(){
                                        let __target_obj__8=obj;
                                        __target_obj__8[key]=await (async function(){
                                            let __targ__9=block;
                                            if (__targ__9){
                                                 return(__targ__9)[idx]
                                            } 
                                        })();
                                        return __target_obj__8;
                                        
                                    }()
                                } else if (check_true( ((key instanceof String || typeof key==='string')&&await (await Environment.get_global("contains?"))(":",key)&&await (await Environment.get_global("not"))(await (await Environment.get_global("ends_with?"))(":",key))))) {
                                    cpos=await key["indexOf"].call(key,":");
                                    value=await key["substr"].call(key,(cpos+1));
                                    key=await key["substr"].call(key,0,cpos);
                                     return  await async function(){
                                        let __target_obj__10=obj;
                                        __target_obj__10[key]=value;
                                        return __target_obj__10;
                                        
                                    }()
                                } else  {
                                    idx+=1;
                                    if (check_true (await (await Environment.get_global("ends_with?"))(":",key))){
                                         key=key.substr(0,(key.length-1))
                                    } else {
                                        if (check_true ((await (async function(){
                                            let __targ__11=block;
                                            if (__targ__11){
                                                 return(__targ__11)[idx]
                                            } 
                                        })()===":"))){
                                             idx+=1
                                        } else throw new SyntaxError((""+await position()+"missing colon in object key: "+key+" -->"+await local_text()));
                                        
                                    };
                                     return  await async function(){
                                        let __target_obj__12=obj;
                                        __target_obj__12[key]=await (async function(){
                                            let __targ__13=block;
                                            if (__targ__13){
                                                 return(__targ__13)[idx]
                                            } 
                                        })();
                                        return __target_obj__12;
                                        
                                    }()
                                }
                            }()
                        };
                        let __BREAK__FLAG__=false;
                        while(await __test_condition__4()) {
                            await __body_ref__5();
                             if(__BREAK__FLAG__) {
                                 break;
                                
                            }
                        } ;
                        
                    })();
                     return  obj
                }
            }];
            __obj__2["\""]=["\"",async function(block) {
                 return  ["quotes",block]
            }];
            return __obj__2;
            
        })();
        get_char=async function(pos) {
             return  await (async function(){
                let __targ__14=in_buffer;
                if (__targ__14){
                     return(__targ__14)[pos]
                } 
            })()
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
            }()
        };
        process_word=async function(word_acc,backtick_mode) {
            let word;
            let word_as_number;
            word=word_acc.join("");
            word_as_number=await parseFloat(word);
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
                        } else if (check_true( await (await Environment.get_global("contains?"))(word,["=:(","=:)","=:'"]))) {
                             return  word
                        } else if (check_true( (backtick_mode===1))) {
                             return word
                        } else  {
                             return await (await Environment.get_global("add"))("=:",word)
                        }
                    }()
                } else if (check_true( await (await Environment.get_global("is_number?"))(word_as_number))) {
                     return word_as_number
                } else  {
                    console.log("reader: ",await position()," what is this?",word,word_acc,await local_text());
                     return  word
                }
            }()
        };
        registered_stop_char=null;
        handler_stack=[];
        handler=null;
        c=null;
        next_c=null;
        depth=0;
        let stop=await __stop__1();
        ;
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
                 acc.push(_prefix_op)
            };
            depth=_depth;
            await (async function(){
                 let __test_condition__15=async function() {
                     return  (await (await Environment.get_global("not"))(stop)&&(idx<len))
                };
                let __body_ref__16=async function() {
                    idx+=1;
                    escape_mode=await Math.max(0,(escape_mode-1));
                    c=await get_char(idx);
                    next_c=await get_char((idx+1));
                    if (check_true ((c==="\n"))){
                        line_number+=1;
                         column_number=0
                    };
                    if (check_true (debugmode)){
                         await console.log(_depth,"C->",c,next_c,mode,escape_mode,await clone(acc),await clone(word_acc),( handler_stack && handler_stack.length ))
                    };
                    await async function(){
                        if (check_true( ((next_c===undefined)&&(( handler_stack && handler_stack.length )===0)))) {
                             if (check_true (false))throw new SyntaxError(("no match found: "+await position()+" for "+await (async function(){
                                let __targ__17=await (await Environment.get_global("last"))(handler_stack);
                                if (__targ__17){
                                     return(__targ__17)[0]
                                } 
                            })()));
                            
                        } else if (check_true( ((next_c===undefined)&&(await (await Environment.get_global("not"))((c===await (async function(){
                            let __targ__18=await (await Environment.get_global("last"))(handler_stack);
                            if (__targ__18){
                                 return(__targ__18)[0]
                            } 
                        })()))||(( handler_stack && handler_stack.length )>1))))) {
                             throw new SyntaxError(("premature end: "+await position()+" expected: "+await (async function(){
                                let __targ__19=await (await Environment.get_global("last"))(handler_stack);
                                if (__targ__19){
                                     return(__targ__19)[0]
                                } 
                            })()));
                            
                        } else if (check_true( ((next_c===undefined)&&(mode===in_quotes)&&await (await Environment.get_global("not"))((await c["charCodeAt"]()===34))))) {
                             throw new SyntaxError(("premature end: "+await position()+" expected: \""));
                            
                        } else if (check_true( ((next_c===undefined)&&(mode===in_long_text)&&await (await Environment.get_global("not"))((c==="|"))))) {
                             throw new SyntaxError(("premature end: "+await position()+" expected: |"));
                            
                        }
                    }();
                    await async function(){
                        if (check_true( ((c==="\n")&&(mode===in_comment)))) {
                            mode=in_code;
                            __BREAK__FLAG__=true;
                            return
                        } else if (check_true( ((92===await c["charCodeAt"].call(c,0))&&(mode===in_long_text)))) {
                            word_acc.push(c);
                             return  word_acc.push(c)
                        } else if (check_true( ((mode>0)&&(escape_mode===1)&&(92===await c["charCodeAt"].call(c,0))))) {
                             return  word_acc.push(c)
                        } else if (check_true( ((mode>0)&&(92===await c["charCodeAt"].call(c,0))))) {
                             return  escape_mode=2
                        } else if (check_true( ((mode>0)&&(escape_mode===1)))) {
                             return  word_acc.push(await handle_escape_char(c))
                        } else if (check_true( ((mode===in_long_text)&&(escape_mode===0)&&(c==="|")))) {
                            acc=await (await Environment.get_global("add"))(word_acc.join(""));
                            word_acc=[];
                            mode=in_code;
                            __BREAK__FLAG__=true;
                            return
                        } else if (check_true( ((mode===in_quotes)&&(escape_mode===0)&&(c==="\"")))) {
                            acc=await (await Environment.get_global("add"))(word_acc.join(""));
                            word_acc=[];
                            mode=in_code;
                            __BREAK__FLAG__=true;
                            return
                        } else if (check_true( ((mode===in_single_quote)&&(escape_mode===0)&&(c==="'")))) {
                            acc=await (await Environment.get_global("add"))(word_acc.join(""));
                            word_acc=[];
                            mode=in_code;
                            __BREAK__FLAG__=true;
                            return
                        } else if (check_true( ((c==="|")&&(mode===in_code)))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc));
                                 word_acc=[]
                            };
                            mode=in_long_text;
                            block_return=await read_block(await (await Environment.get_global("add"))(_depth,1));
                            if (check_true ((backtick_mode===1))){
                                block_return=["=:quotem",block_return];
                                 backtick_mode=0
                            };
                             return  acc.push(block_return)
                        } else if (check_true( ((c==="\"")&&(escape_mode===0)&&(mode===in_code)))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc));
                                 word_acc=[]
                            };
                            mode=in_quotes;
                            block_return=await read_block(await (await Environment.get_global("add"))(_depth,1));
                            if (check_true ((backtick_mode===1))){
                                 backtick_mode=0
                            };
                             return  acc.push(block_return)
                        } else if (check_true( ((c==="'")&&(escape_mode===0)&&(mode===in_code)))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc));
                                 word_acc=[]
                            };
                            mode=in_single_quote;
                            block_return=await read_block(await (await Environment.get_global("add"))(_depth,1));
                            if (check_true ((backtick_mode===1))){
                                 backtick_mode=0
                            };
                             return  acc.push(block_return)
                        } else if (check_true( (mode===in_comment))) {
                             return false
                        } else if (check_true( ((c===";")&&(mode===in_code)))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc));
                                 word_acc=[]
                            };
                            mode=in_comment;
                             return  await read_block(await (await Environment.get_global("add"))(_depth,1))
                        } else if (check_true( ((mode===in_code)&&(await (await Environment.get_global("length"))(handler_stack)>0)&&(c===await (async function(){
                            let __targ__20=await (await Environment.get_global("last"))(handler_stack);
                            if (__targ__20){
                                 return(__targ__20)[0]
                            } 
                        })())))) {
                            __BREAK__FLAG__=true;
                            return
                        } else if (check_true( ((mode===in_code)&&await (async function(){
                            let __targ__21=read_table;
                            if (__targ__21){
                                 return(__targ__21)[c]
                            } 
                        })()&&await (await Environment.get_global("first"))(await (async function(){
                            let __targ__22=read_table;
                            if (__targ__22){
                                 return(__targ__22)[c]
                            } 
                        })())))) {
                            handler_stack.push(await (async function(){
                                let __targ__23=read_table;
                                if (__targ__23){
                                     return(__targ__23)[c]
                                } 
                            })());
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc,backtick_mode));
                                backtick_mode=0;
                                 word_acc=[]
                            };
                            block_return=await read_block(await (await Environment.get_global("add"))(_depth,1));
                            handler=await (async function(){
                                let __targ__24=handler_stack.pop();
                                if (__targ__24){
                                     return(__targ__24)[1]
                                } 
                            })();
                            block_return=await (async function(){
                                let __array_op_rval__25=handler;
                                 if (__array_op_rval__25 instanceof Function){
                                    return await __array_op_rval__25(block_return) 
                                } else {
                                    return[__array_op_rval__25,block_return]
                                }
                            })();
                            if (check_true (await (await Environment.get_global("not"))((undefined===block_return)))){
                                if (check_true ((backtick_mode===1))){
                                    block_return=["=:quotem",block_return];
                                     backtick_mode=0
                                };
                                 return  acc.push(block_return)
                            }
                        } else if (check_true( ((mode===in_code)&&(c==="`")))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                acc.push(await process_word(word_acc));
                                 word_acc=[]
                            };
                             return  backtick_mode=1
                        } else if (check_true( ((mode===in_code)&&(c===":")&&(( word_acc && word_acc.length )===0)&&(( acc && acc.length )>0)&&(await (await Environment.get_global("last"))(acc) instanceof String || typeof await (await Environment.get_global("last"))(acc)==='string')))) {
                             return acc.push(await (await Environment.get_global("add"))(acc.pop(),":"))
                        } else if (check_true( ((mode===in_code)&&(last_c===",")&&((c==="#")||(c==="@"))))) {
                            word_acc.push(c);
                            acc.push(await process_word(word_acc));
                             return  word_acc=[]
                        } else if (check_true( ((mode===in_code)&&((c===" ")||(await c["charCodeAt"].call(c,0)===10)||(await c["charCodeAt"].call(c,0)===9)||((c===",")&&await (await Environment.get_global("not"))((next_c==="@"))&&await (await Environment.get_global("not"))((next_c==="#"))))))) {
                            if (check_true ((( word_acc && word_acc.length )>0))){
                                if (check_true ((backtick_mode===1))){
                                    acc.push(await process_word(word_acc,backtick_mode));
                                     backtick_mode=0
                                } else {
                                     acc.push(await process_word(word_acc))
                                };
                                 return  word_acc=[]
                            }
                        } else if (check_true( ((mode===in_code)&&(await c["charCodeAt"].call(c,0)===13)))) {
                             return false
                        } else  {
                             return  word_acc.push(c)
                        }
                    }();
                    column_number+=1;
                     return  last_c=c
                };
                let __BREAK__FLAG__=false;
                while(await __test_condition__15()) {
                    await __body_ref__16();
                     if(__BREAK__FLAG__) {
                         break;
                        
                    }
                } ;
                
            })();
            if (check_true ((( word_acc && word_acc.length )>0))){
                acc.push(await process_word(word_acc,backtick_mode));
                 word_acc=[]
            };
             return  acc
        };
        if (check_true (debugmode)){
             await console.log("read->",in_buffer)
        };
        output_structure=await read_block(0);
        if (check_true (debugmode)){
             await console.log("read<-",await clone(output_structure))
        };
        if (check_true ((output_structure instanceof Array&&(await (await Environment.get_global("length"))(output_structure)>1)))){
            output_structure.unshift("=:progn");
            await console.log("read (multiple forms) <-",output_structure);
             return  await (await Environment.get_global("first"))(await (async function(){
                let __array_op_rval__26=output_structure;
                 if (__array_op_rval__26 instanceof Function){
                    return await __array_op_rval__26() 
                } else {
                    return[__array_op_rval__26]
                }
            })())
        } else {
              return await (await Environment.get_global("first"))(output_structure)
        }
    }
};
                    let add_escape_encoding=async function(text) {    if (check_true ((text instanceof String || typeof text==='string'))){
        let chars;
        let acc;
        chars=(text).split("");
        acc=[];
        await (async function() {
            let __for_body__3=async function(c) {
                 return  await async function(){
                    if (check_true( ((await c["charCodeAt"].call(c,0)===34)))) {
                        (acc).push(await String.fromCharCode(92));
                         return  (acc).push(c)
                    } else  {
                         return (acc).push(c)
                    }
                }()
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
                    let get_outside_global=function get_outside_global(refname) {  try {    let tfn = new Function("{ if (typeof " + refname + " === 'undefined') { return undefined } else { return "+refname+" } }");
    return tfn();
  } catch (ex) {
    return undefined;
  }
};
                    let get_object_path=async function(refname) {        if (check_true (((await refname["indexOf"].call(refname,".")>-1)||(await refname["indexOf"].call(refname,"[")>-1)))){
            let chars;
            let comps;
            let mode;
            let name_acc;
            chars=(refname).split("");
            comps=[];
            mode=0;
            name_acc=[];
            await (async function() {
                let __for_body__24=async function(c) {
                     return  await async function(){
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
                    }()
                };
                let __array__25=[],__elements__23=chars;
                let __BREAK__FLAG__=false;
                for(let __iter__22 in __elements__23) {
                    __array__25.push(await __for_body__24(__elements__23[__iter__22]));
                    if(__BREAK__FLAG__) {
                         __array__25.pop();
                        break;
                        
                    }
                }return __array__25;
                 
            })();
            if (check_true ((( name_acc && name_acc.length )>0))){
                 (comps).push((name_acc).join(""))
            };
             return  comps
        } else {
              return await (async function(){
                let __array_op_rval__26=refname;
                 if (__array_op_rval__26 instanceof Function){
                    return await __array_op_rval__26() 
                } else {
                    return[__array_op_rval__26]
                }
            })()
        }
    };
                    let do_deferred_splice=async function(tree) {        let rval;
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
                     let __test_condition__27=async function() {
                         return  (idx<( tree && tree.length ))
                    };
                    let __body_ref__28=async function() {
                        tval=await (async function(){
                            let __targ__29=tree;
                            if (__targ__29){
                                 return(__targ__29)[idx]
                            } 
                        })();
                        if (check_true ((tval===deferred_operator))){
                            idx+=1;
                            tval=await (async function(){
                                let __targ__30=tree;
                                if (__targ__30){
                                     return(__targ__30)[idx]
                                } 
                            })();
                             rval=await rval["concat"].call(rval,await do_deferred_splice(tval))
                        } else {
                             (rval).push(await do_deferred_splice(tval))
                        };
                         return  idx+=1
                    };
                    let __BREAK__FLAG__=false;
                    while(await __test_condition__27()) {
                        await __body_ref__28();
                         if(__BREAK__FLAG__) {
                             break;
                            
                        }
                    } ;
                    
                })();
                 return  rval
            } else if (check_true( (tree instanceof Object))) {
                rval=new Object();
                await (async function() {
                    let __for_body__33=async function(pset) {
                         return  await async function(){
                            let __target_obj__35=rval;
                            __target_obj__35[( pset && pset["0"] )]=await do_deferred_splice(( pset && pset["1"] ));
                            return __target_obj__35;
                            
                        }()
                    };
                    let __array__34=[],__elements__32=await (await Environment.get_global("pairs"))(tree);
                    let __BREAK__FLAG__=false;
                    for(let __iter__31 in __elements__32) {
                        __array__34.push(await __for_body__33(__elements__32[__iter__31]));
                        if(__BREAK__FLAG__) {
                             __array__34.pop();
                            break;
                            
                        }
                    }return __array__34;
                     
                })();
                 return  rval
            } else  {
                 return tree
            }
        }()
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
    comps=(( token && token.name )).split(".");
    if (check_true ((( comps && comps.length )===1))){
          return ( token && token.name )
    } else {
        await async function(){
            let __target_obj__241=comps;
            __target_obj__241[0]=await (async function(){
                let __array_op_rval__242=sanitizer_fn;
                 if (__array_op_rval__242 instanceof Function){
                    return await __array_op_rval__242(( comps && comps["0"] )) 
                } else {
                    return[__array_op_rval__242,( comps && comps["0"] )]
                }
            })();
            return __target_obj__241;
            
        }();
        await (async function(){
             let __test_condition__243=async function() {
                 return  (( comps && comps.length )>0)
            };
            let __body_ref__244=async function() {
                (acc).push((comps).shift());
                 return  (acc_full).push(await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx))
            };
            let __BREAK__FLAG__=false;
            while(await __test_condition__243()) {
                await __body_ref__244();
                 if(__BREAK__FLAG__) {
                     break;
                    
                }
            } ;
            
        })();
        rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
         return  rval
    }
};
                    let embed_compiled_quote=async function(type,tmp_name,tval) {     return  await async function(){
        if (check_true( (type===0))) {
             return await (async function(){
                let __array_op_rval__6="=:(";
                 if (__array_op_rval__6 instanceof Function){
                    return await __array_op_rval__6(`=:let`,"=:(","=:(",tmp_name,await (await Environment.get_global("add"))("=:",await (await Environment.get_global("as_lisp"))(tval)),"=:)","=:)",await (await Environment.get_global("add"))("=:",tmp_name)) 
                } else {
                    return[__array_op_rval__6,`=:let`,"=:(","=:(",tmp_name,await (await Environment.get_global("add"))("=:",await (await Environment.get_global("as_lisp"))(tval)),"=:)","=:)",await (await Environment.get_global("add"))("=:",tmp_name)]
                }
            })()
        } else if (check_true( (type===1))) {
             return [`=$&!`,"=:'",`=:+`,`=:await`,`=:Environment.as_lisp`,"=:(",tval,"=:)",`=:+`,"=:'"]
        } else if (check_true( (type===2))) {
             return await (async function(){
                let __array_op_rval__7="=:(";
                 if (__array_op_rval__7 instanceof Function){
                    return await __array_op_rval__7(`=:let`,"=:(","=:(",tmp_name,await (await Environment.get_global("add"))("=:",await (await Environment.get_global("as_lisp"))(tval)),"=:)","=:)",await (await Environment.get_global("add"))("=:",tmp_name)) 
                } else {
                    return[__array_op_rval__7,`=:let`,"=:(","=:(",tmp_name,await (await Environment.get_global("add"))("=:",await (await Environment.get_global("as_lisp"))(tval)),"=:)","=:)",await (await Environment.get_global("add"))("=:",tmp_name)]
                }
            })()
        } else if (check_true( (type===3))) {
             return await (async function(){
                let __array_op_rval__8="=:'";
                 if (__array_op_rval__8 instanceof Function){
                    return await __array_op_rval__8(`=:+`,`=:await`,`=:Environment.as_lisp`,"=:(",tval,"=:)",`=:+`,"=:'") 
                } else {
                    return[__array_op_rval__8,`=:+`,`=:await`,`=:Environment.as_lisp`,"=:(",tval,"=:)",`=:+`,"=:'"]
                }
            })()
        } else if (check_true( (type===4))) {
             return "=:)"
        }
    }()
};
                    ;
                    let as_lisp=lisp_writer;
                    ;
                    let read_lisp=reader;
                    ;
                    await async function(){
                        let __target_obj__170=Environment.global_ctx.scope;
                        __target_obj__170["eval"]=eval_exp;
                        __target_obj__170["reader"]=reader;
                        __target_obj__170["add_escape_encoding"]=add_escape_encoding;
                        __target_obj__170["get_outside_global"]=get_outside_global;
                        __target_obj__170["as_lisp"]=lisp_writer;
                        __target_obj__170["lisp_writer"]=lisp_writer;
                        return __target_obj__170;
                        
                    }();
                    let inlines=await add(new Object(),await (async function() {
                         if (check_true (opts.inlines)){
                              return opts.inlines
                        } else {
                              return new Object()
                        } 
                    } )(),await ( async function(){
                        let __obj__171=new Object();
                        __obj__171["pop"]=async function(args) {
                             return  ["(",args['0'],")",".","pop()"]
                        };
                        __obj__171["push"]=async function(args) {
                             return  ["(",args['0'],")",".push","(",args['1'],")"]
                        };
                        __obj__171["chomp"]=async function(args) {
                             return  ["(",args['0'],")",".substr","(",0,",","(",args['0'],".length","-",1,")",")"]
                        };
                        __obj__171["join"]=async function(args) {
                            if (check_true ((args.length===1))){
                                  return ["(",args['0'],")",".join","('')"]
                            } else {
                                  return ["(",args['1'],")",".join","(",args['0'],")"]
                            }
                        };
                        __obj__171["take"]=async function(args) {
                             return  ["(",args['0'],")",".shift","()"]
                        };
                        __obj__171["prepend"]=async function(args) {
                             return  ["(",args['0'],")",".unshift","(",args['1'],")"]
                        };
                        __obj__171["trim"]=async function(args) {
                             return  ["(",args['0'],")",".trim()"]
                        };
                        __obj__171["lowercase"]=async function(args) {
                             return  ["(",args['0'],")",".toLowerCase()"]
                        };
                        __obj__171["uppercase"]=async function(args) {
                             return  ["(",args['0'],")",".toUpperCase()"]
                        };
                        __obj__171["islice"]=async function(args) {
                             return  await async function(){
                                if (check_true( (args.length===3))) {
                                     return ["(",args['0'],")",".slice(",args['1'],",",args['2'],")"]
                                } else if (check_true( (args.length===2))) {
                                     return ["(",args['0'],")",".slice(",args['1'],")"]
                                } else  {
                                     throw new SyntaxError("slice requires 2 or 3 arguments");
                                    
                                }
                            }()
                        };
                        __obj__171["split_by"]=async function(args) {
                             return  ["(",args['1'],")",".split","(",args['0'],")"]
                        };
                        __obj__171["bind"]=async function(args) {
                             return  ["(",args['0'],")",".bind(",args['1'],")"]
                        };
                        __obj__171["is_array?"]=async function(args) {
                             return  ["(",args['0']," instanceof Array",")"]
                        };
                        __obj__171["is_object?"]=async function(args) {
                             return  ["(",args['0']," instanceof Object",")"]
                        };
                        __obj__171["is_string?"]=async function(args) {
                             return  ["(",args['0']," instanceof String || typeof ",args['0'],"===","'string'",")"]
                        };
                        __obj__171["is_function?"]=async function(args) {
                             return  await (async function(){
                                let __array_op_rval__172=args['0'];
                                 if (__array_op_rval__172 instanceof Function){
                                    return await __array_op_rval__172(" instanceof Function") 
                                } else {
                                    return[__array_op_rval__172," instanceof Function"]
                                }
                            })()
                        };
                        __obj__171["is_element?"]=async function(args) {
                             return  await (async function(){
                                let __array_op_rval__173=args['0'];
                                 if (__array_op_rval__173 instanceof Function){
                                    return await __array_op_rval__173(" instanceof Element") 
                                } else {
                                    return[__array_op_rval__173," instanceof Element"]
                                }
                            })()
                        };
                        __obj__171["log"]=async function(args) {
                             return  ["console.log","(",await map(async function(val,idx,tl) {
                                if (check_true ((idx<(tl-1)))){
                                      return await (async function(){
                                        let __array_op_rval__174=val;
                                         if (__array_op_rval__174 instanceof Function){
                                            return await __array_op_rval__174(",") 
                                        } else {
                                            return[__array_op_rval__174,","]
                                        }
                                    })()
                                } else {
                                      return await (async function(){
                                        let __array_op_rval__175=val;
                                         if (__array_op_rval__175 instanceof Function){
                                            return await __array_op_rval__175() 
                                        } else {
                                            return[__array_op_rval__175]
                                        }
                                    })()
                                }
                            },args),")"]
                        };
                        __obj__171["reverse"]=async function(args) {
                             return  ["(",args['0'],")",".slice(0).reverse()"]
                        };
                        __obj__171["int"]=async function(args) {
                             return  await async function(){
                                if (check_true( (args.length===1))) {
                                     return ["parseInt(",args['0'],")"]
                                } else if (check_true( (args.length===2))) {
                                     return ["parseInt(",args['0'],",",args['1'],")"]
                                } else  {
                                     throw new "SyntaxError"(("invalid number of arguments to int: received "+args.length));
                                    
                                }
                            }()
                        };
                        __obj__171["float"]=async function(args) {
                             return  ["parseFloat(",args['0'],")"]
                        };
                        return __obj__171;
                        
                    })());
                    ;
                    await async function(){
                        let __target_obj__176=Environment;
                        __target_obj__176["eval"]=eval_struct;
                        __target_obj__176["identify"]=subtype;
                        __target_obj__176["meta_for_symbol"]=meta_for_symbol;
                        __target_obj__176["set_compiler"]=set_compiler;
                        __target_obj__176["read_lisp"]=reader;
                        __target_obj__176["as_lisp"]=as_lisp;
                        __target_obj__176["inlines"]=inlines;
                        __target_obj__176["special_operators"]=special_operators;
                        __target_obj__176["definitions"]=Environment.definitions;
                        __target_obj__176["declarations"]=Environment.declarations;
                        __target_obj__176["compile"]=compile;
                        __target_obj__176["evaluate"]=evaluate;
                        __target_obj__176["do_deferred_splice"]=do_deferred_splice;
                        __target_obj__176["id"]=async function() {
                             return  id
                        };
                        __target_obj__176["set_check_external_env"]=async function(state) {
                            check_external_env_default=state;
                             return  check_external_env_default
                        };
                        __target_obj__176["check_external_env"]=async function() {
                             return  check_external_env_default
                        };
                        return __target_obj__176;
                        
                    }();
                     return  Environment
                }
            };
            return __target_obj__1;
            
        }();
         return  await (async function(){
            let __targ__177=globalThis;
            if (__targ__177){
                 return(__targ__177)[symname]
            } 
        })()
    }
}
export { init_dlisp }

