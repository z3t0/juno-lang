
var { get_next_environment_id, check_true, get_outside_global, subtype, lisp_writer, clone } = await import("./lisp_writer.js");


export async function environment_boot(Environment) {
  await Environment.set_global("add_escape_encoding",async function(text) {
    if (check_true ((text instanceof String || typeof text==='string'))){
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
  });
  await Environment.set_global("get_outside_global",(await Environment.get_global("get_outside_global")));
  await Environment.set_global("true?",(await Environment.get_global("check_true")));
  await Environment.set_global("if_compile_time_defined",async function(quoted_symbol,exists_form,not_exists_form) {
    if (check_true ((await (async function(){
      let __targ__5=await (await Environment.get_global("describe"))(quoted_symbol);
      if (__targ__5){
        return(__targ__5)["location"]
      } 
    })()===null))){
      return not_exists_form
    } else {
      return exists_form
    }
  },{
    description:"If the provided quoted symbol is a defined symbol at compilation time, the exists_form will be compiled, otherwise the not_exists_form will be compiled.",tags:["compile","defined","global","symbol","reference"],usage:["quoted_symbol:string","exists_form:*","not_exists_form:*"],eval_when:{
      compile_time:true
    }
  });
  await Environment.set_global("embed_compiled_quote",async function(type,tmp_name,tval) {
    return  await async function(){
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
  });
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
      } )(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args),fn_body:await (await Environment.get_global("add_escape_encoding"))(await (await Environment.get_global("as_lisp"))(macro_body))
    };
    {
      return  await Environment.do_deferred_splice(await Environment.read_lisp('(defglobal ' + await Environment.as_lisp ( macro_name ) + ' (fn ' + await Environment.as_lisp ( macro_args ) + ' \"=$&!\" ' + await Environment.as_lisp ( macro_body ) + ') (quote ' + await Environment.as_lisp ( source_details ) + '))'))
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
          let __for_body__11=async function(v) {
            return  await strip(v)
          };
          let __array__12=[],__elements__10=val;
          let __BREAK__FLAG__=false;
          for(let __iter__9 in __elements__10) {
            __array__12.push(await __for_body__11(__elements__10[__iter__9]));
            if(__BREAK__FLAG__) {
              __array__12.pop();
              break;
              
            }
          }return __array__12;
          
        })()
      } else  {
        return val
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"desym\" \"macro\":true \"fn_args\":\"(val)\" \"fn_body\":\"((let ((strip (fn (v) (+ \\"\\" (as_lisp v))))) (cond (is_string? val) (strip val) (is_array? val) (for_each (\\"v\\" val) (strip v)) else val)))\"}')));
  await Environment.set_global("desym_ref",async function(val) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(+ \"\" (as_lisp ' + await Environment.as_lisp ( val ) + '))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"desym_ref\" \"macro\":true \"fn_args\":\"(val)\" \"fn_body\":\"((quotem (+ \\"\\" (as_lisp ,# val))))\"}')));
  await Environment.set_global("unquotify",async function(val) {
    let dval;
    dval=val;
    if (check_true (await (await Environment.get_global("starts_with?"))("\"",dval))){
      dval=await dval["substr"].call(dval,1,((dval && dval["length"])-2))
    };
    if (check_true (await (await Environment.get_global("starts_with?"))("=:",dval))){
      dval=await dval["substr"].call(dval,2)
    };
    return  dval
  },{
    description:"Removes binding symbols and quotes from a supplied value.  For use in compile time function such as macros.",usage:["val:string"],tags:["macro","quote","quotes","desym"]
  });
  await Environment.set_global("when",async function(condition,...mbody) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(if ' + await Environment.as_lisp ( condition ) + ' (do \"=$&!\" ' + await Environment.as_lisp ( mbody ) + '))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"when\" \"macro\":true \"fn_args\":\"(condition \\"&\\" mbody)\" \"fn_body\":\"((quotem (if ,# condition (do =$,@ mbody))))\"}')));
  await Environment.set_global("defexternal",async function(name,value,meta) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(let ((symname (desym \"=$&!\" ' + await Environment.as_lisp ( name ) + '))) (do (set_prop globalThis symname ' + await Environment.as_lisp ( value ) + ') (prop globalThis symname)))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"defexternal\" \"macro\":true \"fn_args\":\"(name value meta)\" \"fn_body\":\"((quotem (let ((symname (desym =$,@ name))) (do (set_prop globalThis symname ,# value) (prop globalThis symname)))))\"}')));
  await Environment.set_global("defun",async function(name,args,body,meta) {
    let fn_name;
    let fn_args;
    let fn_body;
    let source_details;
    fn_name=name;
    fn_args=args;
    fn_body=body;
    source_details=await (await Environment.get_global("add"))({
      name:await (await Environment.get_global("unquotify"))(name),fn_args:await (await Environment.get_global("as_lisp"))(fn_args),fn_body:await (await Environment.get_global("add_escape_encoding"))(await (await Environment.get_global("as_lisp"))(fn_body))
    },await (async function() {
      if (check_true (meta)){
        return meta
      } else {
        return new Object()
      } 
    } )());
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(do (defglobal ' + await Environment.as_lisp ( fn_name ) + ' (fn ' + await Environment.as_lisp ( fn_args ) + ' ' + await Environment.as_lisp ( fn_body ) + ') (quote ' + await Environment.as_lisp ( source_details ) + ')))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"defun\" \"macro\":true \"fn_args\":\"(name args body meta)\" \"fn_body\":\"((let ((fn_name name) (fn_args args) (fn_body body) (source_details (+ {\\"name\\":(unquotify name) \\"fn_args\\":(as_lisp fn_args) \\"fn_body\\":(add_escape_encoding (as_lisp fn_body))} (if meta meta {})))) (quotem (do (defglobal ,# fn_name (fn ,# fn_args ,# fn_body) (quote ,# source_details))))))\"}')));
  await Environment.set_global("macroexpand",async function(quoted_form) {
    let macro_name;
    let macro_func;
    let expansion;
    macro_name=await (quoted_form && quoted_form["0"])["substr"].call((quoted_form && quoted_form["0"]),2);
    macro_func=await Environment["get_global"].call(Environment,macro_name);
    expansion=await (async function () {
      if (check_true (macro_func instanceof Function)){
        return await (async function(){
          let __apply_args__13=await quoted_form["slice"].call(quoted_form,1);
          return ( macro_func).apply(this,__apply_args__13)
        })()
      } else {
        return quoted_form
      } 
    })();
    return  expansion
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"macroexpand\" \"fn_args\":\"(quoted_form)\" \"fn_body\":\"(let ((macro_name (-> quoted_form.0 \\"substr\\" 2)) (macro_func (-> Environment \\"get_global\\" macro_name)) (expansion (if (is_function? macro_func) (apply macro_func (-> quoted_form \\"slice\\" 1)) quoted_form))) expansion)\"}')));
  await Environment.set_global("macroexpand_nq",async function(form) {
    let macro_name;
    let macro_func;
    let expansion;
    macro_name=await (async function() {
      {
        let __call_target__=await (async function(){
          let __targ__15=form;
          if (__targ__15){
            return(__targ__15)[0]
          } 
        })(), __call_method__="substr";
        return await __call_target__[__call_method__].call(__call_target__,2)
      } 
    })();
    macro_func=await Environment["get_global"].call(Environment,macro_name);
    expansion=await (async function () {
      if (check_true (macro_func instanceof Function)){
        return await (async function(){
          let __apply_args__16=await form["slice"].call(form,1);
          return ( macro_func).apply(this,__apply_args__16)
        })()
      } else {
        return form
      } 
    })();
    return  [`=:quote`,expansion]
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"macroexpand_nq\" \"macro\":true \"fn_args\":\"(form)\" \"fn_body\":\"((let ((macro_name (-> (prop form 0) \\"substr\\" 2)) (macro_func (-> Environment \\"get_global\\" macro_name)) (expansion (if (is_function? macro_func) (apply macro_func (-> form \\"slice\\" 1)) form))) ((quote quote) expansion)))\"}')));
  await Environment.set_global("get_object_path",async function(refname) {
    let chars;
    let comps;
    let mode;
    let name_acc;
    chars=(refname).split("");
    comps=[];
    mode=0;
    name_acc=[];
    await (async function() {
      let __for_body__20=async function(c) {
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
      let __array__21=[],__elements__19=chars;
      let __BREAK__FLAG__=false;
      for(let __iter__18 in __elements__19) {
        __array__21.push(await __for_body__20(__elements__19[__iter__18]));
        if(__BREAK__FLAG__) {
          __array__21.pop();
          break;
          
        }
      }return __array__21;
      
    })();
    if (check_true ((await (await Environment.get_global("length"))(name_acc)>0))){
      (comps).push((name_acc).join(""))
    };
    return  comps
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"get_object_path\" \"fn_args\":\"(refname)\" \"fn_body\":\"(let ((\\"chars\\" (split_by \\"\\" refname)) (\\"comps\\" ()) (\\"mode\\" 0) (\\"name_acc\\" ())) (for_each (\\"c\\" chars) (do (cond (and (== c \\".\\") (== mode 0)) (do (push comps (join \\"\\" name_acc)) (= name_acc ())) (and (== mode 0) (== c \\"[\\")) (do (= mode 1) (push comps (join \\"\\" name_acc)) (= name_acc ())) (and (== mode 1) (== c \\"]\\")) (do (= mode 0) (push comps (join \\"\\" name_acc)) (= name_acc ())) else (push name_acc c)))) (if (> (length name_acc) 0) (push comps (join \\"\\" name_acc))) comps)\"}')));
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
          let __test_condition__22=async function() {
            return  (idx<(tree && tree.length))
          };
          let __body_ref__23=async function() {
            tval=await (async function(){
              let __targ__24=tree;
              if (__targ__24){
                return(__targ__24)[idx]
              } 
            })();
            if (check_true ((tval===deferred_operator))){
              idx+=1;
              tval=await (async function(){
                let __targ__25=tree;
                if (__targ__25){
                  return(__targ__25)[idx]
                } 
              })();
              rval=await rval["concat"].call(rval,await do_deferred_splice(tval))
            } else {
              (rval).push(await do_deferred_splice(tval))
            };
            return  idx+=1
          };
          let __BREAK__FLAG__=false;
          while(await __test_condition__22()) {
            await __body_ref__23();
            if(__BREAK__FLAG__) {
              break;
              
            }
          } ;
          
        })();
        return  rval
      } else if (check_true( (tree instanceof Object))) {
        rval=new Object();
        await (async function() {
          let __for_body__28=async function(pset) {
            return  await async function(){
              let __target_obj__30=rval;
              __target_obj__30[(pset && pset["0"])]=await do_deferred_splice((pset && pset["1"]));
              return __target_obj__30;
              
            }()
          };
          let __array__29=[],__elements__27=await (await Environment.get_global("pairs"))(tree);
          let __BREAK__FLAG__=false;
          for(let __iter__26 in __elements__27) {
            __array__29.push(await __for_body__28(__elements__27[__iter__26]));
            if(__BREAK__FLAG__) {
              __array__29.pop();
              break;
              
            }
          }return __array__29;
          
        })();
        return  rval
      } else  {
        return tree
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"do_deferred_splice\" \"fn_args\":\"(tree)\" \"fn_body\":\"(let ((\\"rval\\" nil) (\\"idx\\" 0) (\\"tval\\" nil) (\\"deferred_operator\\" (join \\"\\" (\\"=\\" \\"$\\" \\"&\\" \\"!\\")))) (cond (is_array? tree) (do (= rval ()) (while (< idx tree.length) (do (= tval (prop tree idx)) (if (== tval deferred_operator) (do (inc idx) (= tval (prop tree idx)) (= rval (-> rval \\"concat\\" (do_deferred_splice tval)))) (push rval (do_deferred_splice tval))) (inc idx))) rval) (is_object? tree) (do (= rval {}) (for_each (\\"pset\\" (pairs tree)) (do (set_prop rval pset.0 (do_deferred_splice pset.1)))) rval) else tree))\"}')));
  await Environment.set_global("define",async function(...defs) {
    let acc;
    let symname;
    acc=[`=:progl`];
    symname=null;
    await (async function() {
      let __for_body__33=async function(defset) {
        (acc).push([`=:defvar`,(defset && defset["0"]),(defset && defset["1"])]);
        symname=(defset && defset["0"]);
        (acc).push([`=:set_prop`,`=:Environment.global_ctx.scope`,(""+await (await Environment.get_global("as_lisp"))(symname)),symname]);
        if (check_true (((defset && defset["2"]) instanceof Object))){
          return  (acc).push([[`=:set_prop`,`=:Environment.definitions`,(""+await (await Environment.get_global("as_lisp"))(symname)+""),(defset && defset["2"])]])
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
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"define\" \"macro\":true \"fn_args\":\"(\\"&\\" defs)\" \"fn_body\":\"((let ((acc ((quote progl))) (symname nil)) (for_each (\\"defset\\" defs) (do (push acc ((quote defvar) defset.0 defset.1)) (= symname defset.0) (push acc ((quote set_prop) (quote Environment.global_ctx.scope) (+ \\"\\" (as_lisp symname)) symname)) (when (is_object? defset.2) (push acc (((quote set_prop) (quote Environment.definitions) (+ \\"\\" (as_lisp symname) \\"\\") defset.2)))))) acc))\"}')));
  await Environment.set_global("define_env",async function(...defs) {
    let acc;
    let symname;
    acc=[`=:progl`];
    symname=null;
    await (async function() {
      let __for_body__37=async function(defset) {
        (acc).push([`=:defvar`,(defset && defset["0"]),(defset && defset["1"])]);
        symname=(defset && defset["0"]);
        (acc).push([`=:set_prop`,`=:Environment.global_ctx.scope`,(""+await (await Environment.get_global("as_lisp"))(symname)),symname]);
        if (check_true (((defset && defset["2"]) instanceof Object))){
          return  (acc).push([[`=:set_prop`,`=:Environment.definitions`,(""+await (await Environment.get_global("as_lisp"))(symname)+""),(defset && defset["2"])]])
        }
      };
      let __array__38=[],__elements__36=defs;
      let __BREAK__FLAG__=false;
      for(let __iter__35 in __elements__36) {
        __array__38.push(await __for_body__37(__elements__36[__iter__35]));
        if(__BREAK__FLAG__) {
          __array__38.pop();
          break;
          
        }
      }return __array__38;
      
    })();
    return  acc
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"define_env\" \"macro\":true \"fn_args\":\"(\\"&\\" defs)\" \"fn_body\":\"((let ((acc ((quote progl))) (symname nil)) (for_each (\\"defset\\" defs) (do (push acc ((quote defvar) defset.0 defset.1)) (= symname defset.0) (push acc ((quote set_prop) (quote Environment.global_ctx.scope) (+ \\"\\" (as_lisp symname)) symname)) (when (is_object? defset.2) (push acc (((quote set_prop) (quote Environment.definitions) (+ \\"\\" (as_lisp symname) \\"\\") defset.2)))))) acc))\"}')));
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
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"type\" \"fn_args\":\"(x)\" \"fn_body\":\"(cond (== nil x) \\"null\\" (== undefined x) \\"undefined\\" (instanceof x Array) \\"array\\" else (typeof x))\" \"usage\":(\"value:*\") \"description\":\"returns the type of value that has been passed.  Deprecated, and the sub_type function should be used.\" \"tags\":(\"types\" \"value\" \"what\")}')));
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
            let __for_body__41=async function(pset) {
              return  await follow_tree((pset && pset["1"]),await (await Environment.get_global("add"))(_path_prefix,(pset && pset["0"])))
            };
            let __array__42=[],__elements__40=await (await Environment.get_global("pairs"))(elems);
            let __BREAK__FLAG__=false;
            for(let __iter__39 in __elements__40) {
              __array__42.push(await __for_body__41(__elements__40[__iter__39]));
              if(__BREAK__FLAG__) {
                __array__42.pop();
                break;
                
              }
            }return __array__42;
            
          })()
        } else  {
          return (acc).push(_path_prefix)
        }
      }()
    };
    await follow_tree(structure,[]);
    return  acc
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"destructure_list\" \"fn_args\":\"(elems)\" \"fn_body\":\"(let ((idx 0) (acc ()) (structure elems) (follow_tree (fn (elems _path_prefix) (cond (is_array? elems) (map (fn (elem idx) (follow_tree elem (+ _path_prefix idx))) elems) (is_object? elems) (for_each (\\"pset\\" (pairs elems)) (follow_tree pset.1 (+ _path_prefix pset.0))) else (push acc _path_prefix))))) (follow_tree structure ()) acc)\"}')));
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
    acc=[`=:let`];
    await (async function() {
      let __for_body__45=async function(idx) {
        return  (allocations).push([await (await Environment.get_global("resolve_path"))(await (async function(){
          let __targ__47=paths;
          if (__targ__47){
            return(__targ__47)[idx]
          } 
        })(),binding_vars),await async function(){
          if (check_true( (expression instanceof Object))) {
            return await (await Environment.get_global("resolve_path"))(await (async function(){
              let __targ__48=paths;
              if (__targ__48){
                return(__targ__48)[idx]
              } 
            })(),expression)
          } else  {
            return (await (await Environment.get_global("conj"))(await (async function(){
              let __array_op_rval__49=expression;
              if (__array_op_rval__49 instanceof Function){
                return await __array_op_rval__49() 
              } else {
                return[__array_op_rval__49]
              }
            })(),await (async function(){
              let __targ__50=paths;
              if (__targ__50){
                return(__targ__50)[idx]
              } 
            })())).join(".")
          }
        }()])
      };
      let __array__46=[],__elements__44=await (await Environment.get_global("range"))(await (await Environment.get_global("length"))(paths));
      let __BREAK__FLAG__=false;
      for(let __iter__43 in __elements__44) {
        __array__46.push(await __for_body__45(__elements__44[__iter__43]));
        if(__BREAK__FLAG__) {
          __array__46.pop();
          break;
          
        }
      }return __array__46;
      
    })();
    (acc).push(allocations);
    acc=await (await Environment.get_global("conj"))(acc,forms);
    return  acc
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"destructuring_bind\" \"macro\":true \"fn_args\":\"(bind_vars expression \\"&\\" forms)\" \"fn_body\":\"((let ((binding_vars bind_vars) (paths (destructure_list binding_vars)) (bound_expression expression) (allocations ()) (acc ((quote let)))) (for_each (\\"idx\\" (range (length paths))) (do (push allocations ((resolve_path (prop paths idx) binding_vars) (cond (is_object? expression) (resolve_path (prop paths idx) expression) else (join \\".\\" (conj (expression) (prop paths idx)))))))) (push acc allocations) (= acc (conj acc forms)) acc))\"}')));
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
      let __for_body__53=async function(elem) {
        return  (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (await Environment.get_global("destructure_list"))(elem)))>0)
      };
      let __array__54=[],__elements__52=lambda_list;
      let __BREAK__FLAG__=false;
      for(let __iter__51 in __elements__52) {
        __array__54.push(await __for_body__53(__elements__52[__iter__51]));
        if(__BREAK__FLAG__) {
          __array__54.pop();
          break;
          
        }
      }return __array__54;
      
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
      } )(),macro:true,fn_args:await (await Environment.get_global("as_lisp"))(macro_args),fn_body:await (await Environment.get_global("add_escape_encoding"))(await (await Environment.get_global("as_lisp"))(macro_body))
    },await (async function() {
      if (check_true (macro_meta)){
        return macro_meta
      } else {
        return new Object()
      } 
    } )());
    if (check_true (complex_lambda_list)){
      return await Environment.do_deferred_splice(await Environment.read_lisp('(defglobal ' + await Environment.as_lisp ( macro_name ) + ' (fn (\"&\" args) (destructuring_bind ' + await Environment.as_lisp ( macro_args ) + ' args \"=$&!\" ' + await Environment.as_lisp ( macro_body ) + ')) (quote ' + await Environment.as_lisp ( source_details ) + '))'))
    } else {
      return await Environment.do_deferred_splice(await Environment.read_lisp('(defglobal ' + await Environment.as_lisp ( macro_name ) + ' (fn ' + await Environment.as_lisp ( macro_args ) + ' \"=$&!\" ' + await Environment.as_lisp ( macro_body ) + ') (quote ' + await Environment.as_lisp ( source_details ) + '))'))
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
      let __for_body__57=async function(elem) {
        return  (await (await Environment.get_global("length"))(await (await Environment.get_global("flatten"))(await (await Environment.get_global("destructure_list"))(elem)))>0)
      };
      let __array__58=[],__elements__56=lambda_list;
      let __BREAK__FLAG__=false;
      for(let __iter__55 in __elements__56) {
        __array__58.push(await __for_body__57(__elements__56[__iter__55]));
        if(__BREAK__FLAG__) {
          __array__58.pop();
          break;
          
        }
      }return __array__58;
      
    })());
    source_details=await (await Environment.get_global("add"))({
      name:await (await Environment.get_global("unquotify"))(name),fn_args:await (await Environment.get_global("as_lisp"))(fn_args),fn_body:await (await Environment.get_global("add_escape_encoding"))(await (await Environment.get_global("as_lisp"))(fn_body))
    },await (async function() {
      if (check_true (fn_meta)){
        if (check_true ((fn_meta && fn_meta["description"]))){
          return await async function(){
            let __target_obj__59=fn_meta;
            __target_obj__59["description"]=(fn_meta && fn_meta["description"]);
            return __target_obj__59;
            
          }()
        };
        fn_meta
      } else {
        return new Object()
      } 
    } )());
    if (check_true (complex_lambda_list)){
      return await Environment.do_deferred_splice(await Environment.read_lisp('(defglobal ' + await Environment.as_lisp ( fn_name ) + ' (fn (\"&\" args) (destructuring_bind ' + await Environment.as_lisp ( fn_args ) + ' args ' + await Environment.as_lisp ( fn_body ) + ')) (quote ' + await Environment.as_lisp ( source_details ) + '))'))
    } else {
      return await Environment.do_deferred_splice(await Environment.read_lisp('(defglobal ' + await Environment.as_lisp ( fn_name ) + ' (fn ' + await Environment.as_lisp ( fn_args ) + ' ' + await Environment.as_lisp ( fn_body ) + ') (quote ' + await Environment.as_lisp ( source_details ) + '))'))
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"defun\" \"macro\":true \"fn_args\":\"(name lambda_list body meta)\" \"fn_body\":\"((let ((fn_name name) (fn_args lambda_list) (fn_body body) (fn_meta meta) (complex_lambda_list (or_args (for_each (\\"elem\\" lambda_list) (> (length (flatten (destructure_list elem))) 0)))) (source_details (+ {\\"name\\":(unquotify name) \\"fn_args\\":(as_lisp fn_args) \\"fn_body\\":(add_escape_encoding (as_lisp fn_body))} (if fn_meta (do (if fn_meta.description (set_prop fn_meta \\"description\\" fn_meta.description)) fn_meta) {})))) (if complex_lambda_list (quotem (defglobal ,# fn_name (fn (\\"&\\" args) (destructuring_bind ,# fn_args args ,# fn_body)) (quote ,# source_details))) (quotem (defglobal ,# fn_name (fn ,# fn_args ,# fn_body) (quote ,# source_details))))))\" \"description\":(+ \"Defines a top level function in the current environment.  Given a name, lambda_list,\" \"body, and a meta data description, builds, compiles and installs the function in the\" \"environment under the provided name.  The body isn\'t an explicit progn, and must be\" \"within a block structure, such as progn, let or do.\") \"usage\":(\"name:string\" \"lambda_list:array\" \"body:array\" \"meta:object\") \"tags\":(\"function\" \"lambda\" \"define\" \"environment\")}')));
  await Environment.set_global("reduce",async function(...args) {
    let elem;
    let item_list;
    let form;
    elem=(args && args["0"] && args["0"]["0"]);
    item_list=(args && args["0"] && args["0"]["1"]);
    form=(args && args["1"]);
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(let ((__collector ()) (__result nil) (__action (fn (\"=$&!\" ' + await Environment.as_lisp ( elem ) + ') ' + await Environment.as_lisp ( form ) + '))) (declare (function __action)) (for_each (__item ' + await Environment.as_lisp ( item_list ) + ') (do (= __result (__action __item)) (if __result (push __collector __result)))) __collector)'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"reduce\" \"macro\":true \"fn_args\":\"((elem item_list) form)\" \"fn_body\":\"((quotem (let ((__collector ()) (__result nil) (__action (fn (=$,@ elem) ,# form))) (declare (function __action)) (for_each (__item ,# item_list) (do (= __result (__action __item)) (if __result (push __collector __result)))) __collector)))\" \"description\":\"Provided a first argument as a list which contains a binding variable name and a list, returns a list of all non-null return values that result from the evaluation of the second list.\" \"usage\":((\"binding-elem:symbol\" \"values:list\") (\"form:list\")) \"tags\":(\"filter\" \"remove\" \"select\" \"list\" \"array\")}')));
  await Environment.set_global("is_nil?",async function(value) {
    return  (null===value)
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"is_nil?\" \"fn_args\":\"(\\"value\\")\" \"fn_body\":\"(== nil value)\" \"description\":\"for the given value x, returns true if x is exactly equal to nil.\" \"usage\":(\"arg:value\") \"tags\":(\"type\" \"condition\" \"subtype\" \"value\" \"what\")}')));
  await Environment.set_global("is_regex?",async function(x) {
    return  (await (await Environment.get_global("sub_type"))(x)==="RegExp")
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"is_regex?\" \"fn_args\":\"(x)\" \"fn_body\":\"(== (sub_type x) \\"RegExp\\")\" \"description\":\"for the given value x, returns true if x is a Javascript regex object\" \"usage\":(\"arg:value\") \"tags\":(\"type\" \"condition\" \"subtype\" \"value\" \"what\")}')));
  await Environment.set_global("bind_function",(await Environment.get_global("bind")));
  await Environment.set_global("is_reference?",async function(val) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(and (is_string? ' + await Environment.as_lisp ( val ) + ') (> (length ' + await Environment.as_lisp ( val ) + ') 2) (starts_with? (quote =:) ' + await Environment.as_lisp ( val ) + '))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"is_reference?\" \"macro\":true \"fn_args\":\"(val)\" \"fn_body\":\"((quotem (and (is_string? ,# val) (> (length ,# val) 2) (starts_with? (quote =:) ,# val))))\"}')));
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
        let __test_condition__60=async function() {
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
        let __body_ref__61=async function() {
          last_result=result;
          return  (totals).push(await (await Environment.get_global("to_object"))(await (await Environment.get_global("map"))(async function(v) {
            return  await (async function(){
              let __array_op_rval__63=v;
              if (__array_op_rval__63 instanceof Function){
                return await __array_op_rval__63(await (async function(){
                  let __targ__62=result;
                  if (__targ__62){
                    return(__targ__62)[v]
                  } 
                })()) 
              } else {
                return[__array_op_rval__63,await (async function(){
                  let __targ__62=result;
                  if (__targ__62){
                    return(__targ__62)[v]
                  } 
                })()]
              }
            })()
          },await (await Environment.get_global("keys"))(result))))
        };
        let __BREAK__FLAG__=false;
        while(await __test_condition__60()) {
          await __body_ref__61();
          if(__BREAK__FLAG__) {
            break;
            
          }
        } ;
        
      })()
    } else throw new Error(new ReferenceError(("scan_str: invalid RegExp provided: "+regex)));
    ;
    return  totals
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"scan_str\" \"fn_args\":\"(regex search_string)\" \"fn_body\":\"(let ((\\"result\\" nil) (\\"last_result\\" nil) (\\"totals\\" ()) (\\"strs\\" (+ \\"\\" search_string))) (if (is_regex? regex) (do (= regex.lastIndex 0) (while (and (do (= result (-> regex \\"exec\\" strs)) true) result (if last_result (not (== result.0 last_result.0)) true)) (do (= last_result result) (push totals (to_object (map (fn (v) (v (prop result v))) (keys result))))))) (throw (new ReferenceError (+ \\"scan_str: invalid RegExp provided: \\" regex)))) totals)\" \"description\":(+ \"Using a provided regex and a search string, performs a regex \" \"exec using the provided regex argument on the string argument. \" \"Returns an array of results or an empty array, with matched \" \"text, index, and any capture groups.\") \"usage\":(\"regex:RegExp\" \"text:string\") \"tags\":(\"regex\" \"string\" \"match\" \"exec\" \"array\")}')));
  await Environment.set_global("remove_prop",async function(obj,key) {
    if (check_true (await (await Environment.get_global("not"))((undefined===await (async function(){
      let __targ__64=obj;
      if (__targ__64){
        return(__targ__64)[key]
      } 
    })())))){
      {
        let val;
        val=await (async function(){
          let __targ__65=obj;
          if (__targ__65){
            return(__targ__65)[key]
          } 
        })();
        await (await Environment.get_global("delete_prop"))(obj,key);
        return  val
      }
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"remove_prop\" \"fn_args\":\"(obj key)\" \"fn_body\":\"(when (not (== undefined (prop obj key))) (let ((\\"val\\" (prop obj key))) (delete_prop obj key) val))\" \"usage\":(\"obj:object\" \"key:*\") \"description\":\"Similar to delete, but returns the removed value if the key exists, otherwise returned undefined.\" \"tags\":(\"object\" \"key\" \"value\" \"mutate\")}')));
  await Environment.set_global("object_methods",async function(obj) {
    let properties;
    let current_obj;
    properties=new Set();
    current_obj=obj;
    await (async function(){
      let __test_condition__66=async function() {
        return  current_obj
      };
      let __body_ref__67=async function() {
        await (await Environment.get_global("map"))(async function(item) {
          return  await properties["add"].call(properties,item)
        },await Object.getOwnPropertyNames(current_obj));
        return  current_obj=await Object.getPrototypeOf(current_obj)
      };
      let __BREAK__FLAG__=false;
      while(await __test_condition__66()) {
        await __body_ref__67();
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
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"object_methods\" \"fn_args\":\"(obj)\" \"fn_body\":\"(let ((\\"properties\\" (new Set)) (\\"current_obj\\" obj)) (while current_obj (do (map (fn (item) (-> properties \\"add\\" item)) (Object.getOwnPropertyNames current_obj)) (= current_obj (Object.getPrototypeOf current_obj)))) (-> (Array.from (-> properties \\"keys\\")) \\"filter\\" (fn (item) (is_function? item))))\" \"description\":\"Given a instantiated object, get all methods (functions) that the object and it\'s prototype chain contains.\" \"usage\":(\"obj:object\") \"tags\":(\"object\" \"methods\" \"functions\" \"introspection\" \"keys\")}')));
  await Environment.set_global("expand_dot_accessor",async function(val,ctx) {
    let comps;
    let find_in_ctx;
    let reference;
    let val_type;
    comps=(val).split(".");
    find_in_ctx=async function(the_ctx) {
      return  await async function(){
        if (check_true( await (async function(){
          let __targ__68=(the_ctx && the_ctx["scope"]);
          if (__targ__68){
            return(__targ__68)[reference]
          } 
        })())) {
          return await (async function(){
            let __targ__69=(the_ctx && the_ctx["scope"]);
            if (__targ__69){
              return(__targ__69)[reference]
            } 
          })()
        } else if (check_true((the_ctx && the_ctx["parent"]))) {
          return await find_in_ctx((the_ctx && the_ctx["parent"]))
        }
      }()
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
          let __array_op_rval__70=reference;
          if (__array_op_rval__70 instanceof Function){
            return await __array_op_rval__70() 
          } else {
            return[__array_op_rval__70]
          }
        })(),await (await Environment.get_global("flatten"))(await (async function() {
          let __for_body__73=async function(comp) {
            if (check_true (await (await Environment.get_global("is_number?"))(comp))){
              return ["[",comp,"]"]
            } else {
              return ["[\"",comp,"\"]"]
            }
          };
          let __array__74=[],__elements__72=comps;
          let __BREAK__FLAG__=false;
          for(let __iter__71 in __elements__72) {
            __array__74.push(await __for_body__73(__elements__72[__iter__71]));
            if(__BREAK__FLAG__) {
              __array__74.pop();
              break;
              
            }
          }return __array__74;
          
        })()))).join("")
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"expand_dot_accessor\" \"fn_args\":\"(val ctx)\" \"fn_body\":\"(let ((\\"comps\\" (split_by \\".\\" val)) (\\"find_in_ctx\\" (fn (the_ctx) (cond (prop the_ctx.scope reference) (prop the_ctx.scope reference) the_ctx.parent (find_in_ctx the_ctx.parent)))) (\\"reference\\" (take comps)) (\\"val_type\\" (find_in_ctx ctx))) (cond (== 0 comps.length) reference (and (is_object? val_type) (contains? comps.0 (object_methods val_type)) (not (-> val_type \\"propertyIsEnumerable\\" comps.0))) val else (join \\"\\" (conj (reference) (flatten (for_each (\\"comp\\" comps) (if (is_number? comp) (\\"[\\" comp \\"]\\") (\\"[\\"\\" comp \\"\\"]\\"))))))))\"}')));
  await Environment.set_global("getf_ctx",async function(ctx,name,_value) {
    if (check_true ((ctx&&(name instanceof String || typeof name==='string')))){
      return await async function(){
        if (check_true( await (await Environment.get_global("not"))((undefined===await (async function(){
          let __targ__75=(ctx && ctx["scope"]);
          if (__targ__75){
            return(__targ__75)[name]
          } 
        })())))) {
          if (check_true (await (await Environment.get_global("not"))((_value===undefined)))){
            await async function(){
              let __target_obj__76=(ctx && ctx["scope"]);
              __target_obj__76[name]=_value;
              return __target_obj__76;
              
            }();
            return  _value
          } else {
            return await (async function(){
              let __targ__77=(ctx && ctx["scope"]);
              if (__targ__77){
                return(__targ__77)[name]
              } 
            })()
          }
        } else if (check_true((ctx && ctx["parent"]))) {
          return await (await Environment.get_global("getf_ctx"))((ctx && ctx["parent"]),name,_value)
        } else  {
          return undefined
        }
      }()
    } else throw new Error("invalid call to get_ctx: missing argument/s");
    
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"getf_ctx\" \"fn_args\":\"(ctx name _value)\" \"fn_body\":\"(if (and ctx (is_string? name)) (cond (not (== undefined (prop ctx.scope name))) (if (not (== _value undefined)) (do (set_prop ctx.scope name _value) _value) (prop ctx.scope name)) ctx.parent (getf_ctx ctx.parent name _value) else undefined) (throw \\"invalid call to get_ctx: missing argument/s\\"))\"}')));
  await Environment.set_global("setf_ctx",async function(ctx,name,value) {
    let found_val;
    found_val=await (await Environment.get_global("getf_ctx"))(ctx,name,value);
    if (check_true ((found_val===undefined))){
      await async function(){
        let __target_obj__78=(ctx && ctx["scope"]);
        __target_obj__78[name]=value;
        return __target_obj__78;
        
      }()
    };
    return  value
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"setf_ctx\" \"fn_args\":\"(ctx name value)\" \"fn_body\":\"(let ((\\"found_val\\" (getf_ctx ctx name value))) (if (== found_val undefined) (set_prop ctx.scope name value)) value)\"}')));
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
        let __target_obj__79=target_obj;
        __target_obj__79[idx]=value;
        return __target_obj__79;
        
      }()
    } else throw new RangeError(("set_path: invalid path: "+path));
    
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"set_path\" \"fn_args\":\"(path obj value)\" \"fn_body\":\"(let ((\\"fpath\\" (clone path)) (\\"idx\\" (pop fpath)) (\\"rpath\\" fpath) (\\"target_obj\\" nil)) (= target_obj (resolve_path rpath obj)) (if target_obj (do (set_prop target_obj idx value)) (throw RangeError (+ \\"set_path: invalid path: \\" path))))\"}')));
  await Environment.set_global("minmax",async function(container) {
    let value_found;
    let smallest;
    let biggest;
    value_found=false;
    smallest=(await Environment.get_global("MAX_SAFE_INTEGER"));
    biggest=(-1*(await Environment.get_global("MAX_SAFE_INTEGER")));
    if (check_true ((container&&(container instanceof Array)&&(await (await Environment.get_global("length"))(container)>0)))){
      await (async function() {
        let __for_body__82=async function(value) {
          return  (await (await Environment.get_global("is_number?"))(value)&&await (async function ()  {
            value_found=true;
            smallest=await Math.min(value,smallest);
            return  biggest=await Math.max(value,biggest)
          } )())
        };
        let __array__83=[],__elements__81=container;
        let __BREAK__FLAG__=false;
        for(let __iter__80 in __elements__81) {
          __array__83.push(await __for_body__82(__elements__81[__iter__80]));
          if(__BREAK__FLAG__) {
            __array__83.pop();
            break;
            
          }
        }return __array__83;
        
      })();
      if (check_true (value_found)){
        return await (async function(){
          let __array_op_rval__84=smallest;
          if (__array_op_rval__84 instanceof Function){
            return await __array_op_rval__84(biggest) 
          } else {
            return[__array_op_rval__84,biggest]
          }
        })()
      } else {
        return null
      }
    } else {
      return null
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"minmax\" \"fn_args\":\"(container)\" \"fn_body\":\"(let ((value_found false) (smallest MAX_SAFE_INTEGER) (biggest (* -1 MAX_SAFE_INTEGER))) (if (and container (is_array? container) (> (length container) 0)) (do (for_each (\\"value\\" container) (and (is_number? value) (do (= value_found true) (= smallest (Math.min value smallest)) (= biggest (Math.max value biggest))))) (if value_found (smallest biggest) nil)) nil))\"}')));
  await Environment.set_global("gen_multiples",async function(len,multiple_ques_) {
    let val;
    let acc;
    let mult;
    val=100;
    acc=await (async function(){
      let __array_op_rval__85=val;
      if (__array_op_rval__85 instanceof Function){
        return await __array_op_rval__85() 
      } else {
        return[__array_op_rval__85]
      }
    })();
    mult=(multiple_ques_||10);
    await (async function() {
      let __for_body__88=async function(r) {
        return  (acc).push(val=(val*mult))
      };
      let __array__89=[],__elements__87=await (await Environment.get_global("range"))(len);
      let __BREAK__FLAG__=false;
      for(let __iter__86 in __elements__87) {
        __array__89.push(await __for_body__88(__elements__87[__iter__86]));
        if(__BREAK__FLAG__) {
          __array__89.pop();
          break;
          
        }
      }return __array__89;
      
    })();
    return  (acc).slice(0).reverse()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"gen_multiples\" \"fn_args\":\"(len multiple?)\" \"fn_body\":\"(let ((\\"val\\" 100) (\\"acc\\" (val)) (\\"mult\\" (or multiple? 10))) (for_each (\\"r\\" (range len)) (push acc (= val (* val mult)))) (reverse acc))\"}')));
  await Environment.set_global("path_multiply",async function(path,multiple_ques_) {
    let acc;
    let multiples;
    acc=0;
    multiples=await (await Environment.get_global("gen_multiples"))(await (await Environment.get_global("length"))(path),multiple_ques_);
    await (async function() {
      let __for_body__92=async function(pset) {
        return  acc=(acc+((pset && pset["0"])*(pset && pset["1"])))
      };
      let __array__93=[],__elements__91=await (await Environment.get_global("pairs"))(await (await Environment.get_global("interlace"))(path,multiples));
      let __BREAK__FLAG__=false;
      for(let __iter__90 in __elements__91) {
        __array__93.push(await __for_body__92(__elements__91[__iter__90]));
        if(__BREAK__FLAG__) {
          __array__93.pop();
          break;
          
        }
      }return __array__93;
      
    })();
    return  acc
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"path_multiply\" \"fn_args\":\"(path multiple?)\" \"fn_body\":\"(let ((\\"acc\\" 0) (\\"multiples\\" (gen_multiples (length path) multiple?))) (for_each (\\"pset\\" (pairs (interlace path multiples))) (= acc (+ acc (* pset.0 pset.1)))) acc)\"}')));
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
          let __for_body__96=async function(comp) {
            idx+=1;
            last_path=await (await Environment.get_global("conj"))(_path,await (async function(){
              let __array_op_rval__98=idx;
              if (__array_op_rval__98 instanceof Function){
                return await __array_op_rval__98() 
              } else {
                return[__array_op_rval__98]
              }
            })());
            return  await async function(){
              if (check_true( (comp instanceof Array))) {
                return (ntree).push(await (await Environment.get_global("splice_in_return_a"))(comp,_ctx,await (await Environment.get_global("add"))(_depth,1),await (await Environment.get_global("conj"))(_path,await (async function(){
                  let __array_op_rval__99=idx;
                  if (__array_op_rval__99 instanceof Function){
                    return await __array_op_rval__99() 
                  } else {
                    return[__array_op_rval__99]
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
                        let __array_op_rval__100=idx;
                        if (__array_op_rval__100 instanceof Function){
                          return await __array_op_rval__100() 
                        } else {
                          return[__array_op_rval__100]
                        }
                      })()),type:(comp && comp["mark"]),block_step:(comp && comp["block_step"]),if_id:(comp && comp["if_id"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),lambda_step:(comp && comp["lambda_step"])
                    });
                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                      let __targ__101=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                      if (__targ__101){
                        return(__targ__101)[(comp && comp["if_id"])]
                      } 
                    })())))){
                      await async function(){
                        let __target_obj__102=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        __target_obj__102[(comp && comp["if_id"])]=[];
                        return __target_obj__102;
                        
                      }()
                    };
                    if (check_true ((comp && comp["if_id"]))){
                      (await (async function(){
                        let __targ__103=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        if (__targ__103){
                          return(__targ__103)[(comp && comp["if_id"])]
                        } 
                      })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")))
                    };
                    return  (ntree).push(comp)
                  } else if (check_true( ((comp && comp["mark"])==="forced_return"))) {
                    (await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")).push({
                      path:await (await Environment.get_global("conj"))(_path,await (async function(){
                        let __array_op_rval__104=idx;
                        if (__array_op_rval__104 instanceof Function){
                          return await __array_op_rval__104() 
                        } else {
                          return[__array_op_rval__104]
                        }
                      })()),if_id:(comp && comp["if_id"]),block_step:(comp && comp["block_step"]),lambda_step:(comp && comp["lambda_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),type:(comp && comp["mark"])
                    });
                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                      let __targ__105=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                      if (__targ__105){
                        return(__targ__105)[(comp && comp["if_id"])]
                      } 
                    })())))){
                      await async function(){
                        let __target_obj__106=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        __target_obj__106[(comp && comp["if_id"])]=[];
                        return __target_obj__106;
                        
                      }()
                    };
                    if (check_true ((comp && comp["if_id"]))){
                      (await (async function(){
                        let __targ__107=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        if (__targ__107){
                          return(__targ__107)[(comp && comp["if_id"])]
                        } 
                      })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")))
                    };
                    return  (ntree).push(comp)
                  } else if (check_true( ((comp && comp["mark"])==="final-return"))) {
                    (await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")).push({
                      path:await (await Environment.get_global("conj"))(_path,await (async function(){
                        let __array_op_rval__108=idx;
                        if (__array_op_rval__108 instanceof Function){
                          return await __array_op_rval__108() 
                        } else {
                          return[__array_op_rval__108]
                        }
                      })()),type:(comp && comp["mark"]),lambda_step:(comp && comp["lambda_step"]),block_step:(comp && comp["block_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),if_id:(comp && comp["if_id"])
                    });
                    if (check_true (((comp && comp["if_id"])&&(null==await (async function(){
                      let __targ__109=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                      if (__targ__109){
                        return(__targ__109)[(comp && comp["if_id"])]
                      } 
                    })())))){
                      await async function(){
                        let __target_obj__110=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        __target_obj__110[(comp && comp["if_id"])]=[];
                        return __target_obj__110;
                        
                      }()
                    };
                    if (check_true ((comp && comp["if_id"]))){
                      (await (async function(){
                        let __targ__111=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        if (__targ__111){
                          return(__targ__111)[(comp && comp["if_id"])]
                        } 
                      })()).push(await (await Environment.get_global("last"))(await (await Environment.get_global("getf_ctx"))(_ctx,"viable_return_points")));
                      (await (await Environment.get_global("getf_ctx"))(_ctx,"potential_return_points")).push({
                        path:await (await Environment.get_global("conj"))(_path,await (async function(){
                          let __array_op_rval__112=idx;
                          if (__array_op_rval__112 instanceof Function){
                            return await __array_op_rval__112() 
                          } else {
                            return[__array_op_rval__112]
                          }
                        })()),type:(comp && comp["mark"]),lambda_step:(comp && comp["lambda_step"]),block_step:(comp && comp["block_step"]),source:await JSON.stringify(await clone(await (await Environment.get_global("slice"))(js_tree,idx))),if_id:(comp && comp["if_id"])
                      })
                    };
                    await (await Environment.get_global("setf_ctx"))(_ctx,"return_found",true);
                    return  (ntree).push(comp)
                  } else  {
                    return (ntree).push(comp)
                  }
                }()
              } else  {
                return (ntree).push(comp)
              }
            }()
          };
          let __array__97=[],__elements__95=js_tree;
          let __BREAK__FLAG__=false;
          for(let __iter__94 in __elements__95) {
            __array__97.push(await __for_body__96(__elements__95[__iter__94]));
            if(__BREAK__FLAG__) {
              __array__97.pop();
              break;
              
            }
          }return __array__97;
          
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
              let __targ__113=await (await Environment.get_global("first"))(viables);
              if (__targ__113){
                return(__targ__113)["path"]
              } 
            })());
            max_viable=0;
            plength=0;
            if_paths=[];
            max_path_segment_length=null;
            final_return_found=await (await Environment.get_global("getf_ctx"))(_ctx,"return_found");
            await (async function() {
              let __for_body__116=async function(v) {
                return  await (await Environment.get_global("set_path"))((v && v["path"]),ntree,{
                  mark:"return_point"
                })
              };
              let __array__117=[],__elements__115=viables;
              let __BREAK__FLAG__=false;
              for(let __iter__114 in __elements__115) {
                __array__117.push(await __for_body__116(__elements__115[__iter__114]));
                if(__BREAK__FLAG__) {
                  __array__117.pop();
                  break;
                  
                }
              }return __array__117;
              
            })();
            await (async function() {
              let __for_body__120=async function(p) {
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
                  let __targ__122=await (await Environment.get_global("minmax"))(ppath);
                  if (__targ__122){
                    return(__targ__122)[1]
                  } 
                })()),(1+await (async function(){
                  let __targ__123=await (await Environment.get_global("minmax"))(vpath);
                  if (__targ__123){
                    return(__targ__123)[1]
                  } 
                })()));
                if (check_true (((await (await Environment.get_global("path_multiply"))(ppath,max_path_segment_length)>await (await Environment.get_global("path_multiply"))(vpath,max_path_segment_length))||(((p && p["block_step"])===0)&&((p && p["lambda_step"])===0))||(0===await (await Environment.get_global("length"))(viables))))){
                  await (await Environment.get_global("set_path"))((p && p["path"]),ntree,{
                    mark:"return_point"
                  });
                  if (check_true (((p && p["if_id"])&&await (async function(){
                    let __targ__124=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                    if (__targ__124){
                      return(__targ__124)[(p && p["if_id"])]
                    } 
                  })()))){
                    return  await (async function() {
                      let __for_body__127=async function(pinfo) {
                        if (check_true ((undefined===await (async function(){
                          let __targ__129=if_paths;
                          if (__targ__129){
                            return(__targ__129)[await (await Environment.get_global("as_lisp"))((pinfo && pinfo["path"]))]
                          } 
                        })()))){
                          await async function(){
                            let __target_obj__130=if_paths;
                            __target_obj__130[await (await Environment.get_global("as_lisp"))((pinfo && pinfo["path"]))]=true;
                            return __target_obj__130;
                            
                          }();
                          return  await (await Environment.get_global("set_path"))((pinfo && pinfo["path"]),ntree,{
                            mark:"return_point"
                          })
                        }
                      };
                      let __array__128=[],__elements__126=await (async function(){
                        let __targ__131=await (await Environment.get_global("getf_ctx"))(_ctx,"if_links");
                        if (__targ__131){
                          return(__targ__131)[(p && p["if_id"])]
                        } 
                      })();
                      let __BREAK__FLAG__=false;
                      for(let __iter__125 in __elements__126) {
                        __array__128.push(await __for_body__127(__elements__126[__iter__125]));
                        if(__BREAK__FLAG__) {
                          __array__128.pop();
                          break;
                          
                        }
                      }return __array__128;
                      
                    })()
                  }
                } else {
                  if (check_true (((undefined===await (async function(){
                    let __targ__132=if_paths;
                    if (__targ__132){
                      return(__targ__132)[await (await Environment.get_global("as_lisp"))((p && p["path"]))]
                    } 
                  })())&&await (await Environment.get_global("not"))(((p && p["type"])==="final-return"))))){
                    return  await (await Environment.get_global("set_path"))((p && p["path"]),ntree,{
                      mark:"ignore"
                    })
                  }
                }
              };
              let __array__121=[],__elements__119=potentials;
              let __BREAK__FLAG__=false;
              for(let __iter__118 in __elements__119) {
                __array__121.push(await __for_body__120(__elements__119[__iter__118]));
                if(__BREAK__FLAG__) {
                  __array__121.pop();
                  break;
                  
                }
              }return __array__121;
              
            })()
          }
        };
        return  ntree
      } else  {
        return js_tree
      }
    }()
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
          let __for_body__135=async function(comp) {
            next_val=await (async function(){
              let __targ__137=flattened;
              if (__targ__137){
                return(__targ__137)[(idx+1)]
              } 
            })();
            await async function(){
              if (check_true( (comp instanceof Array))) {
                return (ntree).push(await (await Environment.get_global("splice_in_return_b"))(comp,_ctx,await (await Environment.get_global("add"))((_depth||0),1)))
              } else if (check_true( ((comp instanceof Object)&&((comp && comp["mark"])==="return_point")&&(await (await Environment.get_global("not"))(("return"===next_val))&&await (await Environment.get_global("not"))(("throw"===next_val))&&await (await Environment.get_global("not"))(((next_val instanceof Object)&&((next_val && next_val["ctype"]) instanceof String || typeof (next_val && next_val["ctype"])==='string')&&await (await Environment.get_global("contains?"))("block",((next_val && next_val["ctype"])||"")))))))) {
                (ntree).push(" ");
                (ntree).push("return");
                return  (ntree).push(" ")
              } else  {
                return (ntree).push(comp)
              }
            }();
            return  idx+=1
          };
          let __array__136=[],__elements__134=flattened;
          let __BREAK__FLAG__=false;
          for(let __iter__133 in __elements__134) {
            __array__136.push(await __for_body__135(__elements__134[__iter__133]));
            if(__BREAK__FLAG__) {
              __array__136.pop();
              break;
              
            }
          }return __array__136;
          
        })();
        return  ntree
      } else  {
        return js_tree
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"splice_in_return_b\" \"fn_args\":\"(js_tree _ctx _depth)\" \"fn_body\":\"(cond (is_array? js_tree) (let ((\\"idx\\" 0) (\\"ntree\\" ()) (\\"_ctx\\" (or _ctx {})) (\\"next_val\\" nil) (\\"flattened\\" (flatten js_tree))) (for_each (\\"comp\\" flattened) (do (= next_val (prop flattened (+ idx 1))) (cond (is_array? comp) (push ntree (splice_in_return_b comp _ctx (+ (or _depth 0) 1))) (and (is_object? comp) (== comp.mark \\"return_point\\") (and (not (== \\"return\\" next_val)) (not (== \\"throw\\" next_val)) (not (and (is_object? next_val) (is_string? next_val.ctype) (contains? \\"block\\" (or next_val.ctype \\"\\")))))) (do (push ntree \\" \\") (push ntree \\"return\\") (push ntree \\" \\")) else (push ntree comp)) (inc idx))) ntree) else js_tree)\"}')));
  await Environment.set_global("map_range",async function(n,from_range,to_range) {
    return  await (await Environment.get_global("add"))((to_range && to_range["0"]),(((n-(from_range && from_range["0"]))/((from_range && from_range["1"])-(from_range && from_range["0"])))*((to_range && to_range["1"])-(to_range && to_range["0"]))))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"map_range\" \"fn_args\":\"(n from_range to_range)\" \"fn_body\":\"(+ to_range.0 (* (/ (- n from_range.0) (- from_range.1 from_range.0)) (- to_range.1 to_range.0)))\" \"usage\":(\"n:number\" \"from_range:array\" \"to_range:array\") \"tags\":(\"range\" \"scale\" \"conversion\") \"description\":(+ \"Given an initial number n, and two numeric ranges, maps n from the first range \" \"to the second range, returning the value of n as scaled into the second range. \")}')));
  await Environment.set_global("HSV_to_RGB",new Function("h, s, v","{\n        var r, g, b, i, f, p, q, t;\n        if (arguments.length === 1) {\n            s = h.s, v = h.v, h = h.h;\n        }\n        i = Math.floor(h * 6);\n        f = h * 6 - i;\n        p = v * (1 - s);\n        q = v * (1 - f * s);\n        t = v * (1 - (1 - f) * s);\n        switch (i % 6) {\n            case 0: r = v, g = t, b = p; break;\n            case 1: r = q, g = v, b = p; break;\n            case 2: r = p, g = v, b = t; break;\n            case 3: r = p, g = q, b = v; break;\n            case 4: r = t, g = p, b = v; break;\n            case 5: r = v, g = p, b = q; break;\n        }\n        return {\n            r: Math.round(r * 255),\n            g: Math.round(g * 255),\n            b: Math.round(b * 255)\n        }\n    }"));
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
    v=await (async function(){
      let __targ__138=color_key;
      if (__targ__138){
        return(__targ__138)[pos]
      } 
    })();
    ;
    h=await (await Environment.get_global("map_range"))((360%(28*h)),[0,360],[0,1]);
    v=await (await Environment.get_global("map_range"))([v,[0,7],[0.92,1]]);
    rgb=[(await Environment.get_global("HSV_to_RGB")),h,saturation,brightness];
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
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"color_for_number\" \"fn_args\":\"(num saturation brightness)\" \"fn_body\":\"(let ((h (Math.abs (parseInt num))) (pos (% 8 h)) (color_key (0 4 1 5 2 6 3 7)) (rgb nil) (v (prop color_key pos))) (declare (number v h) (object rgb)) (= h (map_range (% 360 (* 28 h)) (0 360) (0 1))) (= v (map_range (v (0 7) (0.92 1)))) (= rgb (HSV_to_RGB h saturation brightness)) (+ \\"#\\" (-> (-> rgb.r \\"toString\\" 16) \\"padStart\\" 2 \\"0\\") (-> (-> rgb.g \\"toString\\" 16) \\"padStart\\" 2 \\"0\\") (-> (-> rgb.b \\"toString\\" 16) \\"padStart\\" 2 \\"0\\")))\" \"usage\":(\"number:number\" \"saturation:float\" \"brightness:float\") \"description\":\"Given an arbitrary integer, a saturation between 0 and 1 and a brightness between 0 and 1, return an RGB color string\" \"tags\":(\"ui\" \"color\" \"view\")}')));
  await Environment.set_global("flatten_ctx",async function(ctx,_var_table) {
    let var_table;
    let ctx_keys;
    var_table=(_var_table||new Object());
    ctx_keys=await (await Environment.get_global("keys"))(var_table);
    if (check_true ((ctx && ctx["scope"]))){
      await (async function() {
        let __for_body__141=async function(k) {
          if (check_true (await (await Environment.get_global("not"))(await (await Environment.get_global("contains?"))(k,ctx_keys)))){
            return  await async function(){
              let __target_obj__143=var_table;
              __target_obj__143[k]=await (async function(){
                let __targ__144=(ctx && ctx["scope"]);
                if (__targ__144){
                  return(__targ__144)[k]
                } 
              })();
              return __target_obj__143;
              
            }()
          }
        };
        let __array__142=[],__elements__140=await (await Environment.get_global("keys"))((ctx && ctx["scope"]));
        let __BREAK__FLAG__=false;
        for(let __iter__139 in __elements__140) {
          __array__142.push(await __for_body__141(__elements__140[__iter__139]));
          if(__BREAK__FLAG__) {
            __array__142.pop();
            break;
            
          }
        }return __array__142;
        
      })();
      if (check_true ((ctx && ctx["parent"]))){
        await (await Environment.get_global("flatten_ctx"))((ctx && ctx["parent"]),var_table)
      };
      return  var_table
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"flatten_ctx\" \"fn_args\":\"(ctx _var_table)\" \"fn_body\":\"(let ((\\"var_table\\" (or _var_table (new Object))) (\\"ctx_keys\\" (keys var_table))) (when ctx.scope (for_each (\\"k\\" (keys ctx.scope)) (when (not (contains? k ctx_keys)) (set_prop var_table k (prop ctx.scope k)))) (when ctx.parent (flatten_ctx ctx.parent var_table)) var_table))\"}')));
  await Environment.set_global("ifa",async function(test,thenclause,elseclause) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(let ((it ' + await Environment.as_lisp ( test ) + ')) (if it ' + await Environment.as_lisp ( thenclause ) + ' ' + await Environment.as_lisp ( elseclause ) + '))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"ifa\" \"macro\":true \"fn_args\":\"(test thenclause elseclause)\" \"fn_body\":\"((quotem (let ((it ,# test)) (if it ,# thenclause ,# elseclause))))\" \"description\":\"Similar to if, the ifa macro is anaphoric in binding, where the it value is defined as the return value of the test form. Use like if, but the it reference is bound within the bodies of the thenclause or elseclause.\" \"usage\":(\"test:*\" \"thenclause:*\" \"elseclause:*\") \"tags\":(\"cond\" \"it\" \"if\" \"anaphoric\")}')));
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
          let __for_body__147=async function(elem) {
            return  (acc).push(await (await Environment.get_global("identify_symbols"))(elem,_state))
          };
          let __array__148=[],__elements__146=quoted_form;
          let __BREAK__FLAG__=false;
          for(let __iter__145 in __elements__146) {
            __array__148.push(await __for_body__147(__elements__146[__iter__145]));
            if(__BREAK__FLAG__) {
              __array__148.pop();
              break;
              
            }
          }return __array__148;
          
        })()
      } else if (check_true( ((quoted_form instanceof String || typeof quoted_form==='string')&&await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
        return (acc).push({
          name:await (await Environment.get_global("as_lisp"))(quoted_form),where:await (await Environment.get_global("describe"))(await (await Environment.get_global("as_lisp"))(quoted_form))
        })
      } else if (check_true( (quoted_form instanceof Object))) {
        return await (async function() {
          let __for_body__151=async function(elem) {
            return  (acc).push(await (await Environment.get_global("identify_symbols"))(elem,_state))
          };
          let __array__152=[],__elements__150=await (await Environment.get_global("values"))(quoted_form);
          let __BREAK__FLAG__=false;
          for(let __iter__149 in __elements__150) {
            __array__152.push(await __for_body__151(__elements__150[__iter__149]));
            if(__BREAK__FLAG__) {
              __array__152.pop();
              break;
              
            }
          }return __array__152;
          
        })()
      }
    }();
    return  [`=:quote`,acc]
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"identify_symbols\" \"fn_args\":\"(quoted_form _state)\" \"fn_body\":\"(let ((acc ()) (_state (if _state _state {}))) (debug) (cond (is_array? quoted_form) (do (for_each (\\"elem\\" quoted_form) (push acc (identify_symbols elem _state)))) (and (is_string? quoted_form) (starts_with? =: quoted_form)) (push acc {\\"name\\":(as_lisp quoted_form) \\"where\\":(describe (as_lisp quoted_form))}) (is_object? quoted_form) (for_each (\\"elem\\" (values quoted_form)) (push acc (identify_symbols elem _state)))) ((quote quote) acc))\"}')));
  await Environment.set_global("unless",async function(condition,...forms) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(if (not ' + await Environment.as_lisp ( condition ) + ') (do \"=$&!\" ' + await Environment.as_lisp ( forms ) + '))'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"unless\" \"macro\":true \"fn_args\":\"(condition \\"&\\" forms)\" \"fn_body\":\"((quotem (if (not ,# condition) (do =$,@ forms))))\" \"description\":\"opposite of if, if the condition is false then the forms are evaluated\" \"usage\":(\"condition:array\" \"forms:array\")}')));
  await Environment.set_global("random_int",async function(...args) {
    let __top__153= async function(){
      return 0
    };
    let bottom;
    {
      let top=await __top__153();
      ;
      bottom=0;
      if (check_true ((await (await Environment.get_global("length"))(args)>1))){
        top=await parseInt((args && args["1"]));
        bottom=await parseInt((args && args["0"]))
      } else {
        top=await parseInt((args && args["0"]))
      };
      return  await parseInt(await (await Environment.get_global("add"))((await Math.random()*(top-bottom)),bottom))
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"random_int\" \"fn_args\":\"(\\"&\\" \\"args\\")\" \"fn_body\":\"(let ((\\"top\\" 0) (\\"bottom\\" 0)) (if (> (length args) 1) (do (= top (parseInt args.1)) (= bottom (parseInt args.0))) (= top (parseInt args.0))) (parseInt (+ (* (Math.random) (- top bottom)) bottom)))\" \"description\":\"Returns a random integer between 0 and the argument.  If two arguments are provided then returns an integer between the first argument and the second argument.\" \"usage\":(\"arg1:number\" \"arg2?:number\") \"tags\":(\"rand\" \"number\" \"integer\")}')));
  await Environment.set_global("symbol_tree",async function(quoted_form,_state,_current_path) {
    let acc;
    acc=[];
    _state=await (async function () {
      if (check_true (_state)){
        return _state
      } else {
        return {
          symbols:new Object()
        }
      } 
    })();
    _current_path=(_current_path||[]);
    ;
    return  await async function(){
      if (check_true( (quoted_form instanceof Array))) {
        await (await Environment.get_global("map"))(async function(elem,idx) {
          {
            let it;
            it=await (await Environment.get_global("symbol_tree"))(elem,_state,await (await Environment.get_global("add"))(_current_path,idx));
            if (check_true (it)){
              return (acc).push(it)
            } else {
              return undefined
            }
          }
        },quoted_form);
        return  acc
      } else if (check_true( ((quoted_form instanceof String || typeof quoted_form==='string')&&await (await Environment.get_global("starts_with?"))("=:",quoted_form)))) {
        return  await (await Environment.get_global("unquotify"))(quoted_form)
      } else if (check_true( (quoted_form instanceof Object))) {
        await (async function() {
          let __for_body__156=async function(pset) {
            {
              let it;
              it=await (await Environment.get_global("symbol_tree"))((pset && pset["1"]),_state,await (await Environment.get_global("add"))(_current_path,await (async function(){
                let __array_op_rval__158=(pset && pset["1"]);
                if (__array_op_rval__158 instanceof Function){
                  return await __array_op_rval__158() 
                } else {
                  return[__array_op_rval__158]
                }
              })()));
              if (check_true (it)){
                return (acc).push(it)
              } else {
                return undefined
              }
            }
          };
          let __array__157=[],__elements__155=await (await Environment.get_global("pairs"))(quoted_form);
          let __BREAK__FLAG__=false;
          for(let __iter__154 in __elements__155) {
            __array__157.push(await __for_body__156(__elements__155[__iter__154]));
            if(__BREAK__FLAG__) {
              __array__157.pop();
              break;
              
            }
          }return __array__157;
          
        })();
        return  acc
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"symbol_tree\" \"fn_args\":\"(quoted_form _state _current_path)\" \"fn_body\":\"(let ((acc ()) (_state (if _state _state {\\"symbols\\":{}})) (_current_path (or _current_path ()))) (declare (array _current_path)) (cond (is_array? quoted_form) (do (map (fn (elem idx) (do (ifa (symbol_tree elem _state (+ _current_path idx)) (push acc it)))) quoted_form) acc) (and (is_string? quoted_form) (starts_with? =: quoted_form)) (do (unquotify quoted_form)) (is_object? quoted_form) (do (for_each (\\"pset\\" (pairs quoted_form)) (ifa (symbol_tree pset.1 _state (+ _current_path (pset.1))) (push acc it))) acc)))\" \"description\":\"Given a quoted form as input, isolates the symbols of the form in a tree structure so dependencies can be seen.\" \"usage\":(\"quoted_form:quote\") \"tags\":(\"structure\" \"development\" \"analysis\")}')));
  await Environment.set_global("resolve_multi_path",async function(path,obj,not_found) {
    debugger;
    ;
    return  await async function(){
      if (check_true( (obj instanceof Object))) {
        return await async function(){
          if (check_true( ((await (await Environment.get_global("length"))(path)===1)&&("*"===await (await Environment.get_global("first"))(path))))) {
            return (obj||not_found)
          } else if (check_true( (await (await Environment.get_global("length"))(path)===1))) {
            return (await (async function(){
              let __targ__159=obj;
              if (__targ__159){
                return(__targ__159)[await (await Environment.get_global("first"))(path)]
              } 
            })()||not_found)
          } else if (check_true( ((obj instanceof Array)&&("*"===await (await Environment.get_global("first"))(path))))) {
            return await (async function() {
              let __for_body__162=async function(val) {
                return  await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
              };
              let __array__163=[],__elements__161=obj;
              let __BREAK__FLAG__=false;
              for(let __iter__160 in __elements__161) {
                __array__163.push(await __for_body__162(__elements__161[__iter__160]));
                if(__BREAK__FLAG__) {
                  __array__163.pop();
                  break;
                  
                }
              }return __array__163;
              
            })()
          } else if (check_true( ((obj instanceof Object)&&("*"===await (await Environment.get_global("first"))(path))))) {
            return await (async function() {
              let __for_body__166=async function(val) {
                return  await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),val,not_found)
              };
              let __array__167=[],__elements__165=await (await Environment.get_global("values"))(obj);
              let __BREAK__FLAG__=false;
              for(let __iter__164 in __elements__165) {
                __array__167.push(await __for_body__166(__elements__165[__iter__164]));
                if(__BREAK__FLAG__) {
                  __array__167.pop();
                  break;
                  
                }
              }return __array__167;
              
            })()
          } else if (check_true( (await (await Environment.get_global("length"))(path)>1))) {
            return await (await Environment.get_global("resolve_multi_path"))(await (await Environment.get_global("rest"))(path),await (async function(){
              let __targ__168=obj;
              if (__targ__168){
                return(__targ__168)[await (await Environment.get_global("first"))(path)]
              } 
            })(),not_found)
          }
        }()
      } else  {
        return not_found
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"resolve_multi_path\" \"fn_args\":\"(path obj not_found)\" \"fn_body\":\"(do (debug) (cond (is_object? obj) (cond (and (== (length path) 1) (== \\"*\\" (first path))) (or obj not_found) (== (length path) 1) (or (prop obj (first path)) not_found) (and (is_array? obj) (== \\"*\\" (first path))) (for_each (val obj) (resolve_multi_path (rest path) val not_found)) (and (is_object? obj) (== \\"*\\" (first path))) (for_each (val (values obj)) (resolve_multi_path (rest path) val not_found)) (> (length path) 1) (resolve_multi_path (rest path) (prop obj (first path)) not_found)) else not_found))\" \"tags\":(\"path\" \"wildcard\" \"tree\" \"structure\") \"usage\":(\"path:array\" \"obj:object\" \"not_found:?*\") \"description\":\"Given a list containing a path to a value in a nested array, return the value at the given path. If the value * is in the path, the path value is a wild card if the passed object structure at the path position is a vector or list.\"}')));
  await Environment.set_global("except_nil",async function(items) {
    let acc=[];
    ;
    if (check_true (await (await Environment.get_global("not"))((await (await Environment.get_global("sub_type"))(items)=="array")))){
      items=[items]
    };
    await (async function() {
      let __for_body__171=async function(value) {
        if (check_true (await (await Environment.get_global("not"))((null==value)))){
          return (acc).push(value)
        }
      };
      let __array__172=[],__elements__170=items;
      let __BREAK__FLAG__=false;
      for(let __iter__169 in __elements__170) {
        __array__172.push(await __for_body__171(__elements__170[__iter__169]));
        if(__BREAK__FLAG__) {
          __array__172.pop();
          break;
          
        }
      }return __array__172;
      
    })();
    return  acc
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"except_nil\" \"fn_args\":\"(\\"items\\")\" \"fn_body\":\"(do (defvar \\"acc\\" ()) (if (not (eq (sub_type items) \\"array\\")) (setq items (list items))) (for_each (\\"value\\" items) (if (not (eq nil value)) (push acc value))) acc)\" \"description\":\"Takes the passed list or set and returns a new list that doesn\'t contain any undefined or nil values.  Unlike no_empties, false values and blank strings will pass through.\" \"usage\":(\"items:list|set\") \"tags\":(\"filter\" \"nil\" \"undefined\" \"remove\" \"no_empties\")}')));
  await Environment.set_global("each",async function(items,property) {
    return  await async function(){
      if (check_true( (await (await Environment.get_global("sub_type"))(property)=="String"))) {
        return await (await Environment.get_global("except_nil"))(await (async function() {
          let __for_body__175=async function(item) {
            if (check_true (item)){
              return  await (async function(){
                let __targ__177=item;
                if (__targ__177){
                  return(__targ__177)[property]
                } 
              })()
            }
          };
          let __array__176=[],__elements__174=(items||[]);
          let __BREAK__FLAG__=false;
          for(let __iter__173 in __elements__174) {
            __array__176.push(await __for_body__175(__elements__174[__iter__173]));
            if(__BREAK__FLAG__) {
              __array__176.pop();
              break;
              
            }
          }return __array__176;
          
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
            let __for_body__180=async function(p) {
              return  await async function(){
                if (check_true( (p instanceof Array))) {
                  return (nl).push(await (await Environment.get_global("resolve_path"))(p,item))
                } else if (check_true( p instanceof Function)) {
                  return (nl).push(await (async function(){
                    let __array_op_rval__182=p;
                    if (__array_op_rval__182 instanceof Function){
                      return await __array_op_rval__182(item) 
                    } else {
                      return[__array_op_rval__182,item]
                    }
                  })())
                } else  {
                  return (nl).push(await (async function(){
                    let __targ__183=item;
                    if (__targ__183){
                      return(__targ__183)[p]
                    } 
                  })())
                }
              }()
            };
            let __array__181=[],__elements__179=property;
            let __BREAK__FLAG__=false;
            for(let __iter__178 in __elements__179) {
              __array__181.push(await __for_body__180(__elements__179[__iter__178]));
              if(__BREAK__FLAG__) {
                __array__181.pop();
                break;
                
              }
            }return __array__181;
            
          })();
          return  nl
        };
        ;
        await (async function() {
          let __for_body__186=async function(__item) {
            __result=await __action(__item);
            if (check_true (__result)){
              return (__collector).push(__result)
            }
          };
          let __array__187=[],__elements__185=items;
          let __BREAK__FLAG__=false;
          for(let __iter__184 in __elements__185) {
            __array__187.push(await __for_body__186(__elements__185[__iter__184]));
            if(__BREAK__FLAG__) {
              __array__187.pop();
              break;
              
            }
          }return __array__187;
          
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
            let __array_op_rval__188=property;
            if (__array_op_rval__188 instanceof Function){
              return await __array_op_rval__188(item) 
            } else {
              return[__array_op_rval__188,item]
            }
          })()
        };
        ;
        await (async function() {
          let __for_body__191=async function(__item) {
            __result=await __action(__item);
            if (check_true (__result)){
              return (__collector).push(__result)
            }
          };
          let __array__192=[],__elements__190=items;
          let __BREAK__FLAG__=false;
          for(let __iter__189 in __elements__190) {
            __array__192.push(await __for_body__191(__elements__190[__iter__189]));
            if(__BREAK__FLAG__) {
              __array__192.pop();
              break;
              
            }
          }return __array__192;
          
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
            let __array_op_rval__193=property;
            if (__array_op_rval__193 instanceof Function){
              return await __array_op_rval__193(item) 
            } else {
              return[__array_op_rval__193,item]
            }
          })()
        };
        ;
        await (async function() {
          let __for_body__196=async function(__item) {
            __result=await __action(__item);
            if (check_true (__result)){
              return (__collector).push(__result)
            }
          };
          let __array__197=[],__elements__195=items;
          let __BREAK__FLAG__=false;
          for(let __iter__194 in __elements__195) {
            __array__197.push(await __for_body__196(__elements__195[__iter__194]));
            if(__BREAK__FLAG__) {
              __array__197.pop();
              break;
              
            }
          }return __array__197;
          
        })();
        return  __collector
      } else  {
        throw new Error("each: strings, arrays, and functions can be provided for the property name or names to extract");
        
      }
    }()
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"each\" \"fn_args\":\"(items property)\" \"fn_body\":\"(cond (eq (sub_type property) \\"String\\") (except_nil (for_each (\\"item\\" (or items ())) (do (when item (prop item property))))) (eq (sub_type property) \\"array\\") (reduce (\\"item\\" items) (do (defvar \\"nl\\" ()) (for_each (\\"p\\" property) (cond (is_array? p) (push nl (resolve_path p item)) (is_function? p) (push nl (p item)) else (push nl (prop item p)))) nl)) (eq (sub_type property) \\"AsyncFunction\\") (reduce (\\"item\\" items) (property item)) (eq (sub_type property) \\"Function\\") (reduce (\\"item\\" items) (property item)) else (throw Error \\"each: strings, arrays, and functions can be provided for the property name or names to extract\\"))\" \"description\":(+ \"Provided a list of items, provide a property name or \" \"a list of property names to be extracted and returned from the source array as a new list.\" \"If property is an array, and contains values that are arrays, those arrays will be treated as a path.\") \"usage\":(\"items:list\" \"property:string|list|function|AsyncFunction\") \"tags\":(\"pluck\" \"element\" \"only\" \"list\" \"object\" \"property\")}')));
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
              let __for_body__201=async function(value) {
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
                      let __for_body__205=async function(elem) {
                        return  (rval).push(await (await Environment.get_global("replace"))(target,replacement,elem))
                      };
                      let __array__206=[],__elements__204=value;
                      let __BREAK__FLAG__=false;
                      for(let __iter__203 in __elements__204) {
                        __array__206.push(await __for_body__205(__elements__204[__iter__203]));
                        if(__BREAK__FLAG__) {
                          __array__206.pop();
                          break;
                          
                        }
                      }return __array__206;
                      
                    })()
                  } else if (check_true( (value_type==="object"))) {
                    sr_val=new Object();
                    await (async function() {
                      let __for_body__209=async function(k) {
                        if (check_true (await value["hasOwnProperty"].call(value,k))){
                          return  await async function(){
                            let __target_obj__211=sr_val;
                            __target_obj__211[k]=await (await Environment.get_global("replace"))(target,replacement,await (async function(){
                              let __targ__212=value;
                              if (__targ__212){
                                return(__targ__212)[k]
                              } 
                            })());
                            return __target_obj__211;
                            
                          }()
                        }
                      };
                      let __array__210=[],__elements__208=await (await Environment.get_global("keys"))(value);
                      let __BREAK__FLAG__=false;
                      for(let __iter__207 in __elements__208) {
                        __array__210.push(await __for_body__209(__elements__208[__iter__207]));
                        if(__BREAK__FLAG__) {
                          __array__210.pop();
                          break;
                          
                        }
                      }return __array__210;
                      
                    })();
                    return  rval=await rval["concat"].call(rval,sr_val)
                  }
                }()
              };
              let __array__202=[],__elements__200=work_values;
              let __BREAK__FLAG__=false;
              for(let __iter__199 in __elements__200) {
                __array__202.push(await __for_body__201(__elements__200[__iter__199]));
                if(__BREAK__FLAG__) {
                  __array__202.pop();
                  break;
                  
                }
              }return __array__202;
              
            })();
            if (check_true ((await (await Environment.get_global("not"))((arg_value_type==="array"))&&await (await Environment.get_global("not"))((arg_value_type==="object"))))){
              return await (await Environment.get_global("first"))(rval)
            } else {
              return rval
            }
          } 
        } catch(__exception__198) {
          if (__exception__198 instanceof Error) {
            let e=__exception__198;
            return await console.error(("replace: "+e))
          } 
        }
      })()
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"replace\" \"fn_args\":\"(\\"&\\" args)\" \"fn_body\":\"(if (< args.length 3) (throw SyntaxError \\"Invalid syntax for replace: requires at least three arguments, target value or regex, the replacement value, and at least one value (object list or string)\\") (try (let ((target args.0) (replacement args.1) (work_values (slice args 2)) (value_type nil) (sr_val nil) (arg_value_type (subtype args.2)) (rval ())) (for_each (value work_values) (do (= value_type (subtype value)) (when (== value_type \\"Number\\") (= value_type \\"String\\") (= value (+ \\"\\" value))) (cond (== value_type \\"String\\") (push rval (-> value \\"replace\\" target replacement)) (== value_type \\"array\\") (for_each (\\"elem\\" value) (push rval (replace target replacement elem))) (== value_type \\"object\\") (do (= sr_val {}) (for_each (\\"k\\" (keys value)) (when (-> value \\"hasOwnProperty\\" k) (set_prop sr_val k (replace target replacement (prop value k))))) (= rval (-> rval \\"concat\\" sr_val)))))) (if (and (not (== arg_value_type \\"array\\")) (not (== arg_value_type \\"object\\"))) (first rval) rval)) (catch Error (\\"e\\") (console.error (+ \\"replace: \\" e)))))\"}')));
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
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"cl_encode_string\" \"fn_args\":\"(text)\" \"fn_body\":\"(if (is_string? text) (let ((\\"escaped\\" (replace (new RegExp \\"\n\\" \\"g\\") (+ (String.fromCharCode 92) \\"n\\") text)) (\\"escaped\\" (replace (new RegExp \\"\r\\" \\"g\\") (+ (String.fromCharCode 92) \\"r\\") escaped)) (\\"nq\\" (split_by (String.fromCharCode 34) escaped)) (\\"step1\\" (join (+ (String.fromCharCode 92) (String.fromCharCode 34)) nq)) (\\"snq\\" (split_by (String.fromCharCode 39) step1))) step1) text)\"}')));
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
            }()
          }
        },comps)).join("")
      } else {
        return (comps && comps["0"])
      }
    } else throw new TypeError(("path_to_js_syntax: need array - given "+await (await Environment.get_global("sub_type"))(comps)));
    
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"path_to_js_syntax\" \"fn_args\":\"(comps)\" \"fn_body\":\"(if (is_array? comps) (if (> comps.length 1) (join \\"\\" (map (fn (comp idx) (if (== idx 0) comp (cond (and (isNaN (int comp)) (starts_with? \\"\\"\\" comp)) (+ \\"[\\" comp \\"]\\") (isNaN (int comp)) (+ \\".\\" comp) else (+ \\"[\\" \\"\'\\" comp \\"\'\\" \\"]\\")))) comps)) comps.0) (throw TypeError (+ \\"path_to_js_syntax: need array - given \\" (sub_type comps))))\"}')));
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
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"first_is_upper_case?\" \"fn_args\":\"(str_val)\" \"fn_body\":\"(progn (defvar rval (-> str_val \\"match\\" (new RegExp \\"^[A-Z]\\"))) (if (and rval rval.0) true false))\"}')));
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
        let __target_obj__213=comps;
        __target_obj__213[0]=await (async function(){
          let __array_op_rval__214=sanitizer_fn;
          if (__array_op_rval__214 instanceof Function){
            return await __array_op_rval__214((comps && comps["0"])) 
          } else {
            return[__array_op_rval__214,(comps && comps["0"])]
          }
        })();
        return __target_obj__213;
        
      }();
      await (async function(){
        let __test_condition__215=async function() {
          return  ((comps && comps.length)>0)
        };
        let __body_ref__216=async function() {
          (acc).push((comps).shift());
          return  (acc_full).push(await (await Environment.get_global("expand_dot_accessor"))((acc).join("."),ctx))
        };
        let __BREAK__FLAG__=false;
        while(await __test_condition__215()) {
          await __body_ref__216();
          if(__BREAK__FLAG__) {
            break;
            
          }
        } ;
        
      })();
      rval=await (await Environment.get_global("flatten"))(["(",(acc_full).join(" && "),")"]);
      return  rval
    }
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"name\":\"safe_access\" \"fn_args\":\"(token ctx sanitizer_fn)\" \"fn_body\":\"(let ((comps nil) (acc ()) (acc_full ()) (pos nil) (rval nil)) (= comps (split_by \\".\\" token.name)) (if (== comps.length 1) token.name (do (set_prop comps 0 (sanitizer_fn comps.0)) (while (> comps.length 0) (do (push acc (take comps)) (push acc_full (expand_dot_accessor (join \\".\\" acc) ctx)))) (= rval (flatten (\\"(\\" (join \\" && \\" acc_full) \\")\\"))) rval)))\"}')));
  await Environment.set_global("compile_to_js",async function(quoted_form) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(-> Environment \"compile\" ' + await Environment.as_lisp ( quoted_form ) + ')'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"compile_to_js\" \"macro\":true \"fn_args\":\"(quoted_form)\" \"fn_body\":\"((quotem (-> Environment \\"compile\\" ,# quoted_form)))\" \"description\":(+ \"Given a quoted form, returns an array with two elements, element 0 is the compilation metadata, \" \"and element 1 is the output Javascript as a string.\") \"usage\":(\"quoted_form:*\") \"tags\":(\"compilation\" \"source\" \"javascript\" \"environment\")}')));
  return  await Environment.set_global("evaluate_compiled_source",async function(compiled_source) {
    return  await Environment.do_deferred_splice(await Environment.read_lisp('(-> Environment \"evaluate\" ' + await Environment.as_lisp ( compiled_source ) + ' nil {\"compiled_source\":true})'))
  },await Environment.do_deferred_splice(await Environment.read_lisp('{\"eval_when\":{\"compile_time\":true} \"name\":\"evaluate_compiled_source\" \"macro\":true \"fn_args\":\"(compiled_source)\" \"fn_body\":\"((quotem (-> Environment \\"evaluate\\" ,# compiled_source nil {\\"compiled_source\\":true})))\" \"description\":(+ \"The macro evaluate_compiled_source takes the direct output of the compiler, \" \"which can be captured using the macro compile_to_js, and performs the \" \"evaluation of the compiled source, thereby handling the second half of the \" \"compile then evaluate cycle.  This call will return the results of \" \"the evaluation of the compiled code assembly.\") \"usage\":(\"compiled_souce:array\") \"tags\":(\"compilation\" \"compile\" \"eval\" \"pre-compilation\")}')))
}

