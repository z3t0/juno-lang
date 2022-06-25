;; Environment - (c) 2022 Kina, LLC 
;; Author: Alex Nygren

;; **

;; The "world" that is the scope of the compiler and the compiled code.
;; Faciliates dynamic scope, lisp globals, definitions and other properties.
;; It is the interface the top level function calls into as the compiler
;; is accessed via an environment object.  

;; Use evaluate(lisp_text) to compile and evaluate lisp text and forms from
;; javascript.

;; 

(defexternal dlisp_env 
  (fn (opts)
    (progn
     
     ;; State to the compiler that we do not want to be passed an Environment
     ;; by declaring that this is toplevel.
     
     (declare (toplevel true)
              (include subtype)
              (local get_object_path get_outside_global clone))
     
     ;; Construct the environment
     (defvar
       Environment
       {
        `global_ctx:{
                     `scope:{}
                     }
        `version: (javascript DLISP_ENV_VERSION)
        `definitions: {
                       
                       }
        `declarations: { 
                        `safety: {
                                  `level: 2
                                  }
                        }
        `externs:{}
        })
     
     
     (defvar id  (get_next_environment_id))
     
     (if (eq undefined opts)
       (= opts {}))
     
     (set_prop Environment
               `context
               Environment.global_ctx)
     
     
     
     (defvar compiler (fn () true))
     
     (defvar compiler_operators (new Set))
     (defvar special_identity (fn (v)
                                v))

     
     
     (define_env 
       (MAX_SAFE_INTEGER 9007199254740991)
       (LispSyntaxError globalThis.LispSyntaxError)
       (sub_type subtype)
       (__VERBOSITY__ 0
                      { 
                       `description: "Set __VERBOSITY__ to a positive integer for verbose console output of system activity."
                       `tags: ["debug" "compiler" "environment" "global"]
                       })
       
       (int parseInt
            { `usage: "value:string|number" 
             `description: "Convenience method for parseInt, should be used in map vs. directly calling parseInt, which will not work directly"
             `tags: ["conversion" "number"]
             })
       (float parseFloat
              { `usage: "value:string|number" 
               `description: "Convenience method for parseFloat, should be used in map vs. directly calling parseFloat, which will not work directly"
               `tags: ["conversion" "number"]
               })
       
       (values (new Function "...args"
                    "{
                                let acc = [];
                                for (let _i in args) {
                                    let value = args[_i];
                                    let type = subtype(value);
                                    if (value instanceof Set)  {
                                        acc = acc.concat(Array.from(value));
                                    } else if (type==='array') {
                                        acc = acc.concat(value);
                                    } else if (type==='object') {
                                        acc = acc.concat(Object.values(value))
                                    } else {
                                        acc = acc.concat(value);
                                    }
                                }
                                return acc;
                            }"))
       
       (pairs (new Function "obj"
                   "{
                                    if (subtype(obj)==='array') {
                                        let rval = [];
                                        for (let i = 0; i < obj.length; i+=2) {
                                            rval.push([obj[i],obj[i+1]]);
                                        }
                                        return rval;
                                    } else {
                                        let keys = Object.keys(obj);
                                        let rval = keys.reduce(function(acc,x,i) {
                                            acc.push([x,obj[x]])
                                            return acc;
                                        },[]);
                                        return rval;
                                    }
                                }"))
       
       (keys (new Function "obj"
                  "{  return Object.keys(obj);  }"))
       
       (take (new Function "place" "{ return place.shift() }"))
       
       (prepend (new Function "place" "thing" "{ return place.unshift(thing) }"))
       
       (first (new Function "x" "{ return x[0] }"))
       
       (last (new Function "x" "{ return x[x.length - 1] }"))
       
       (length (new Function "obj"
                    "{
                                if(obj instanceof Array) {
                                    return obj.length;
                                } else if (obj instanceof Set) {
                                    return obj.size;
                                } else if ((obj === undefined)||(obj===null)) {
                                    return 0;
                                } else if (typeof obj==='object') {
                                    return Object.keys(obj).length;
                                } else if (typeof obj==='string') {
                                    return obj.length;
                                } 
                                return 0;
                            }"))
       
       (conj (new Function "...args"
                  "{   let list = [];
                                if (args[0] instanceof Array) {
                                    list = args[0];
                                } else {
                                    list = [args[0]];
                                }
                                args.slice(1).map(function(x) {
                                    list = list.concat(x);
                                });
                                return list;
                            }"))
       
       
       
       (reverse (new Function "container" "{ return container.slice(0).reverse }")
                { "usage": ["container:list"] 
                 "description": "Returns a copy of the passed list as reversed.  The original is not changed." 
                 `tags: ["list" "sort" "order"] 
                 })
       
       (map (new AsyncFunction "lambda" "array_values" 
                 "{ try {
                                        let rval = [],
                                                tl = array_values.length;
                                        for (let i = 0; i < array_values.length; i++) {
                                            rval.push(await lambda.apply(this,[array_values[i], i, tl]));
                                         }
                                        return rval;
                                    } catch (ex) {           
                                              if (lambda === undefined || lambda === null) {
                                                    throw new ReferenceError(\"map: lambda argument (position 0) is undefined or nil\")
                                              } else if (array_values === undefined || array_values === null) {
                                                    throw new ReferenceError(\"map: container argument (position 1) is undefined or nil\")
                                              } else if (!(lambda instanceof Function)) {
                                                    throw new ReferenceError(\"map: lambda argument must be a function: received: \"+ typeof lambda)
                                              } else if (!(array_values instanceof Array)) {
                                                    throw new ReferenceError(\"map: invalid array argument, received: \" + typeof array_values)
                                              } else {
                                                    // something else just pass on the error
                                                throw ex;
                                              }
                                    }
                              }"))
       
       (bind (new Function "func,this_arg"
                  "{ return func.bind(this_arg) }"))
       
       (to_object (new Function "array_values"
                       "{
                                      let obj={}
                                      array_values.forEach((pair)=>{
                                             obj[pair[0]]=pair[1]
                                      });
                                      return obj;
                                    }")
                  {
                   `description: (+ "Given an array of pairs in the form of [[key value] [key value] ...], constructs an "
                                    "object with the first array element of the pair as the key and the second "
                                    "element as the value. A single object is returned.")
                   `usage: ["paired_array:array"]
                   `tags: ["conversion" "object" "array" "list" "pairs"]
                   })
       
       (to_array (fn (container)
                   (cond
                     (is_array? container)
                     container
                     (is_set? container)
                     (do 
                       (defvar acc [])
                       (-> container `forEach (fn (v)
                                                (push acc v)))
                       acc)
                     (is_string? container)
                     (split_by "" container)
                     (is_object? container)
                     (pairs container)
                     else
                     [container]))
                 {
                  `description: (+ "Given a container of type Array, Set, Object, or a string, " 
                                   "it will convert the members of the container to an array form, "
                                   "and return a new array with the values of the provided container. "
                                   "In the case of an object, the keys and values will be contained in "
                                   "paired arrays in the returned array.  A string will be split into "
                                   "individual characters. If provided a different "
                                   "type other than the listed values above, the value will be placed "
                                   "in an array as a single element.")
                  `usage:["container:*"]
                  `tags: ["list" "array" "conversion" "set" "object" "string" "pairs"]
                  })
       
       (slice (function (target from to)
                        (cond
                          to
                          (-> target `slice from to)
                          from
                          (-> target `slice from)
                          else
                          (throw SyntaxError "slice requires 2 or 3 arguments"))))
       (rest (function (x)
                       (cond 
                         (instanceof x Array)
                         (-> x `slice 1)
                         (is_string? x)
                         (-> x `substr 1)
                         else
                         nil)))
       
       (second  (new Function "x" "{ return x[1] }"))
       (third (new Function "x" "{ return x[2] }"))
       
       (chop  (new Function "x" "{ if (x instanceof Array) { return x.slice(0, x.length-1) } else { return x.substr(0,x.length-1) } }"))
       
       (chomp (new Function "x" "{ return x.substr(x.length-1) }"))
       
       (not   (new Function "x" "{ if (check_true(x)) { return false } else { return true } }"))
       
       (push  (new Function "place" "thing" "{ return place.push(thing) }"))
       
       (pop   (new Function "place" "{ return place.pop() }"))
       
       (list  (fn (`& args) args))
       
       (flatten (new Function "x" "{ return x.flat(999999999999) } "))
       
       (jslambda (function (`& args)
                           (apply Function (flatten args))))
       
       (join (function (`& args)
                       (cond
                         (== args.length 1)
                         (-> args.0 `join "")
                         else
                         (-> args.1 `join args.0))))
       (lowercase (function (x)
                            (-> x `toLowerCase)))
       
       (uppercase (function (x)
                            (-> x `toUpperCase)))
       
       (log (function (`& args)
                      (apply console.log args)))
       (split (new Function "container" "token" "{ return container.split(token) }"))
       
       (split_by (new Function "token" "container" "{ return container.split(token) }"))
       
       (is_object? (new Function "x" "{ return x instanceof Object }")
                   {
                    `description: "for the given value x, returns true if x is an Javascript object type."
                    `usage: ["arg:value"]
                    `tags: ["type" "condition" "subtype" "value" "what" ]
                    })
       
       (is_array? (new Function "x" "{ return x instanceof Array }")
                  {
                   `description: "for the given value x, returns true if x is an array."
                   `usage: ["arg:value"]
                   `tags: ["type" "condition" "subtype" "value" "what" ]
                   })
       
       (is_number? (function (x)
                             (== (subtype x) "Number"))
                   {
                    `description: "for the given value x, returns true if x is a number."
                    `usage: ["arg:value"]
                    `tags: ["type" "condition" "subtype" "value" "what" "function"]
                    })
       
       (is_function? (function (x)
                               (instanceof x Function))
                     {
                      `description: "for the given value x, returns true if x is a function."
                      `usage: ["arg:value"]
                      `tags: ["type" "condition" "subtype" "value" "what" "function"]
                      })
       
       (is_set? (new Function "x" "{ return x instanceof Set }")
                {
                 `description: "for the given value x, returns true if x is a set."
                 `usage: ["arg:value"]
                 `tags: ["type" "condition" "subtype" "value" "what" ]
                 })
       
       (is_element? (new Function "x" "{ return x instanceof Element }")
                    {
                     `description: "for the given value x, returns true if x is an Element object"
                     `usage: ["arg:value"]
                     `tags: ["type" "condition" "subtype" "value" "what" ]
                     })
       
       (is_string? (function (x)
                             (or (instanceof x String) 
                                 (== (typeof x) "string")))
                   {
                    `description: "for the given value x, returns true if x is a String object"
                    `usage: ["arg:value"]
                    `tags: ["type" "condition" "subtype" "value" "what" ]
                    })
       
       (is_nil? (function (x)
                          (== x nil))
                {
                 `description: "for the given value x, returns true if x is exactly equal to nil."
                 `usage: ["arg:value"]
                 `tags: ["type" "condition" "subtype" "value" "what" ]
                 })
       
       (is_regex? (function (x)
                            (== (sub_type x) "RegExp"))
                  {
                   `description: "for the given value x, returns true if x is a Javascript regex object"
                   `usage: ["arg:value"]
                   `tags: ["type" "condition" "subtype" "value" "what" ]
                   })
       
       (is_date? (function (x)
                           (== (sub_type x) "Date"))
                 {
                  `description: "for the given value x, returns true if x is a Date object."
                  `usage: ["arg:value"]
                  `tags: ["type" "condition" "subtype" "value" "what" ]
                  })
       
       (ends_with? (new Function "val" "text" "{ if (text instanceof Array) { return text[text.length-1]===val } else if (subtype(text)=='String') { return text.endsWith(val) } else { return false }}")
                   {
                    `description: "for a given string or array, checks to see if it ends with the given start_value.  Non string args return false."
                    `usage: ["end_value:value" "collection:array|string" ]
                    `tags: ["string" "text" "list" "array" "filter" "reduce"]
                    })
       (starts_with? (new Function "val" "text" "{ if (text instanceof Array) { return text[0]===val } else if (subtype(text)=='String') { return text.startsWith(val) } else { return false }}")
                     {
                      "description": "for a given string or array, checks to see if it starts with the given start_value.  Non string args return false."
                      "usage": ["start_value:value" "collection:array|string" ]
                      "tags": ["string" "text" "list" "array" "filter" "reduce" "begin"]
                      })
       
       (blank? (function (val)
                         (or (eq val nil)
                             (and (is_string? val)
                                  (== val "")))))
       
       (contains? (function (value container)
                            (cond
                              (and (not value)
                                   (not container))
                              false
                              (eq container nil)
                              (throw TypeError "contains?: passed nil/undefined container value")
                              (is_string? container)
                              (if (is_number? value)
                                (> (-> container `indexOf (+ "" value)) -1)
                                (> (-> container `indexOf value) -1))
                              (is_array? container)
                              (-> container `includes value)
                              (is_set? container)
                              (-> container `has value)
                              else
                              (throw TypeError (+ "contains?: passed invalid container type: " (sub_type container))))))
       
       (make_set (function (vals)
                           (if (instanceof vals Array)
                             (new Set vals)
                             (let
                                 ((`vtype (sub_type vals)))
                               (cond
                                 (== vtype "Set")
                                 (new Set vals)
                                 (== vtype "object")
                                 (new Set (values vals)))))))
       
       (describe 
        (fn (quoted_symbol)
          (let
              ((not_found { `not_found: true })
               (location (cond (prop Environment.global_ctx.scope quoted_symbol)
                               "global"
                               (not (== undefined (get_outside_global quoted_symbol)))
                               "external"
                               else
                               nil))
               (result nil))
            (= result
               (+ {
                   `type: (cond
                            (== location "global")
                            (sub_type (prop Environment.global_ctx.scope quoted_symbol))
                            (== location "external")
                            (sub_type (get_outside_global quoted_symbol))
                            else
                            "undefined")
                   `location: location
                   `name: quoted_symbol
                   }                  
                  (if (prop Environment.definitions quoted_symbol)
                    (prop Environment.definitions quoted_symbol)
                    {})))
            (when result.description
              (set_prop result
                        `description
                        (-> Environment `eval result.description)))
            result)))
       
       (undefine (function (quoted_symbol)
                           (if (prop Environment.global_ctx.scope quoted_symbol)
                             (delete_prop Environment.global_ctx.scope quoted_symbol)
                             false)))
       
       (eval_exp (fn (expression)
                   (do 
                     (console.log "EVAL:",expression)
                     (expression))))
       
       (indirect_new (new Function "...args"
                          "{
                                    let targetClass = args[0];
                                    if (subtype(targetClass)===\"String\") {
                                        let tmpf=new Function(\"{ return \"+targetClass+\" }\");
                                        targetClass = tmpf();
                                    }
                                    if (args.length==1) {
                                        let f = function(Class) {
                                            return new (Function.prototype.bind.apply(Class, args));
                                        }
                                        let rval = f.apply(this,[targetClass]);
                                        return rval;
                                    } else {
                                        let f = function(Class) {
                                            return new (Function.prototype.bind.apply(Class, args));
                                        }
                                        let rval = f.apply(this,[targetClass].concat(args.slice(1)));
                                        return rval;
                                    }}"))
       
       (range (function (`& args)
                        (let
                            ((`from_to (if args.1
                                         [ (int args.0) (int args.1) ]
                                         [ 0 (int args.0) ]))
                             (`step (if args.2
                                      (float args.2)
                                      1))
                             (`idx from_to.0)
                             (`acc []))
                          (while (< idx from_to.1)
                            (do
                              (push acc idx)
                              (inc idx step)))
                          acc)))
       
       
       (add (new Function "...args"
                 "{
                                let acc;
                                if (typeof args[0]===\"number\") {
                                    acc = 0;
                                } else if (args[0] instanceof Array) {
                                    return args[0].concat(args.slice(1));
                                } else if (typeof args[0]==='object') {
                                   let rval = {};
                                   for (let i in args) {
                                        if (typeof args[i] === 'object') {
                                            for (let k in args[i]) {
                                                rval[k] = args[i][k];
                                            }
                                        }
                                   }
                                   return rval;
                                } else {
                                    acc = \"\";
                                }
                                for (let i in args) {
                                    acc += args[i];
                                }
                                return acc;
                             }"))
       
       (merge_objects (new Function "x"
                           "{
                                    let rval = {};
                                    for (let i in x) {
                                        if (typeof i === 'object') {
                                            for (let k in x[i]) {
                                                rval[k] = x[i][k];
                                            }
                                        }
                                    }
                                    return rval;
                                 }"))
       
       (index_of (new Function "value" "container"
                      (+ "{ return container.indexOf(value) }")))
       (resolve_path (new Function "path,obj" 
                          "{
                                        if (typeof path==='string') {
                                            path = path.split(\".\");
                                        }
                                        let s=obj;
                                        return path.reduce(function(prev, curr) {
                                            return prev ? prev[curr] : undefined
                                        }, obj || {})
                                    }"))
       
       
       (delete_prop (new Function "obj" "...args"
                         "{
                                        if (args.length == 1) {
                                            return delete obj[args[0]];
                                        } else {
                                            while (args.length > 0) {
                                                let prop = args.shift();
                                                delete obj[prop];
                                            }
                                        }
                                        return obj;
                                    }"))
       
       (min_value (new Function "elements" "{ return Math.min(...elements); }"))
       (max_value (new Function "elements" "{ return Math.max(...elements); }"))
       (interlace (fn (`& args)
                    (let 
                        ((min_length  (min_value (map length args)))
                         (rlength_args (range (length args)))
                         (rval []))
                      (for_each (`i (range min_length))
                                (for_each (`j rlength_args)
                                          (push rval (prop (prop args j) i))))
                      rval))
                  { `usage: ["list0:array" "list1:array" "listn?:array"] 
                    `description: "Returns a list containing a consecutive values from each list, in argument order.  I.e. list0.0 list1.0 listn.0 list0.1 list1.1 listn.1 ..." 
                    `tags: ["list","array","join" "merge"]
                   })
       
       (trim (function (x)
                       (-> x `trim)))
       
       (assert (function (assertion_form failure_message)
                         (if assertion_form
                           assertion_form
                           (throw EvalError (or failure_message "assertion failure"))))
               {
                `description: "If the evaluated assertion form is true, the result is returned, otherwise an EvalError is thrown with the optionally provided failure message."
                `usage:["form:*" "failure_message:string?"]
                `tags:["true" "error" "check" "debug" "valid" "assertion"]
                })
       
       
       (unquotify (fn (val)
                    (let
                        ((dval val))
                      (if (starts_with? "\"" dval)
                        (= dval (-> dval `substr 1 (- dval.length 2))))
                      (if (starts_with? "=:" dval)
                        (= dval (-> dval `substr 2)))
                      dval))
                  {
                   `description: "Removes binding symbols and quotes from a supplied value.  For use in compile time function such as macros."
                   `usage: ["val:string"]
                   `tags:["macro" "quote" "quotes" "desym"]
                   })
       
       (or_args (fn (argset)
                  (let
                      ((is_true false))
                    (for_each (`elem argset)
                              (if elem
                                (do
                                  (= is_true true)
                                  (break))))
                    is_true)))
       
       (special_operators (fn ()
                            (make_set (compiler [] { `special_operators: true `env: Environment }))))
       (defclog (fn (opts)
                  (let
                      ((`style (+ "padding: 5px;"
                                  (if opts.background
                                    (+ "background: " opts.background ";")
                                    "")
                                  (if opts.color
                                    (+ "color: " opts.color ";"))
                                  "")))
                    (fn (`& args)
                      (apply console.log (+ "%c" (if opts.prefix
                                                   opts.prefix
                                                   (take args)))
                             (conj [ style ]
                                   args))))))
       
       
       
       (NOT_FOUND (new ReferenceError "not found"))
       (check_external_env_default true)
       
       (set_global 
        (function (refname value meta)
                  (progn
		   (cond (not (== (typeof refname) "string"))
			 (throw TypeError "reference name must be a string type")
			 (or (== Environment value)
			     (== Environment.global_ctx value)
			     (== Environment.global_ctx.scope value))
			 (throw EvalError "cannot set the environment scope as a global value"))
		   
                                        ;(log "Environment: set_global: " refname value)
                   (set_prop Environment.global_ctx.scope 
                             refname
                             value)
                   (if (and (is_object? meta)
                            (not (is_array? meta)))
                     (set_prop Environment.definitions
                               refname
                               meta))
                   (prop Environment.global_ctx.scope refname))))
       
       (get_global 
        (function (refname value_if_not_found suppress_check_external_env)
                  (cond 
                    (not (== (typeof refname) "string"))
                    (throw TypeError "reference name must be a string type")
                    
                    (== refname "Environment")
                    Environment
                    
                    (-> compiler_operators `has refname)
                    special_identity
                    
                    else
                    (let
                        ((`comps (get_object_path refname))
                         (`refval nil)
                         
                         ;; shadow the environments scope check if the suppress_check_external_env is set to true
                         ;; this is useful when we have reference names that are not legal js reference names
                         
                         (`check_external_env (if suppress_check_external_env
                                                false
                                                check_external_env_default)))
                      
                      ;; search path is to first check the global Lisp Environment
                      ;; and if the check_external_env flag is true, then go to the
                      ;; external JS environment.
                      (= refval (prop Environment.global_ctx.scope comps.0))
                      
                      (if (and (== undefined refval)
                               check_external_env)
                        (= refval (if check_external_env
                                    (or (prop Environment.externs comps.0)
                                        (get_outside_global comps.0)
                                        NOT_FOUND)
                                    NOT_FOUND)))
                      
                      ;; based on the value of refval, return the value
                                        ;(when (== undefined (prop Environment.externs comps.0))
                                        ;  (set_prop Environment.externs
                                        ;           comps.0
                                        ;          refval))
                      
                      
                      (cond
                        (== NOT_FOUND refval)
                        (or value_if_not_found
                            NOT_FOUND)
                        
                        (== comps.length 1)
                        refval
                        
                        (> comps.length 1)
                        (do 
                          (resolve_path (rest comps) refval))
                        
                        else
                        (do
                          (console.warn "get_global: condition fall through: " comps)
                          NOT_FOUND))))))
       
       (compile (fn (json_expression opts)
                  (let
                      ((opts (+ {
                                 `env: Environment 
                                 }
                                opts
                                {
                                 `meta: false
                                 }))
                       (out nil))
                    (if (is_function? json_expression)
                      (throw SyntaxError "compile: non-JSON value (function) received as input"))
                    (= out
                       (compiler json_expression opts))
                    (cond
                      (and (is_array? out)
                           out.0.ctype
                           (== out.0.ctype "FAIL"))
                      out
                      opts.meta
                      out
                      else
                      out.1)))
                {
                 `description: (+ "Compiles the given JSON or quoted lisp and returns a string containing "
                                  "the lisp form or expression as javascript.<br>"
                                  "If passed the option { meta: true } , an array is returned containing compilation metadata "
                                  "in element 0 and the compiled code in element 1.")
                 `usage: ["json_expression:*" "opts:object"]
                 `tags:["macro" "quote" "quotes" "desym"]
                 })
       
       
       
       
       
       (env_log (defclog { `prefix: (+ "env" id) `background: "#B0F0C0" }))
       (evaluate (fn (expression ctx opts)
                   (let
                       ((opts (or opts
                                  {}))
                        (compiled nil)
                        (error_data nil)
                        (result nil))
                                        ;(env_log "-> expression: " expression) 
                                        ;(env_log "-> ctx: " (sub_type ctx) ctx)
                                        ;(debug)
                     (if opts.compiled_source
                       (= compiled expression)
                       (try 
                         (= compiled
                            (compiler (if opts.json_in
                                        expression
                                        (-> Environment `read_lisp expression { `source_name: opts.source_name }))
                                      {
                                       `env: Environment 
                                       `ctx: ctx 
                                       `formatted_output: true
                                       `source_name: opts.source_name
                                       `throw_on_error: opts.throw_on_error
                                       `error_report: (or opts.error_report nil)
                                       `quiet_mode: (or opts.quiet_mode false) }))
                         (catch Error (`e)
                           (do 
                             (when opts.throw_on_error
                               (throw e))
                             (when (instanceof e LispSyntaxError)
                               (set_prop e
                                         `message
                                         (JSON.parse e.message)))
                             (cond
                               (instanceof e LispSyntaxError)
                               (= error_data (+ { `error: "LispSyntaxError"  }
                                                e.message))
                               else
                               (= error_data  
                                  {
                                   `error: (sub_type e)
                                   `message:  e.message
                                   `stack: e.stack                                   
                                   `form: (cond 
                                            (and (is_string? expression)
                                                 (> expression.length 100))
                                            (+ (-> expression `substr 0 100) "...")
                                            else
                                            (as_lisp expression))
                                   `parent_forms: []
                                   `source_name: opts.source_name
                                   `invalid: true
                                   }))
                             (if opts.error_report
                               (opts.error_report error_data)
                               (console.error "Compilation Error: " error_data))
                             (= compiled [ { `error: true } nil  ])))))
                     
                     
                                        ;(env_log "<- compiled:" compiled)
                     (if opts.on_compilation_complete
                       (opts.on_compilation_complete compiled))
                                        ;(console.log "env: <- compiled: " (clone compiled))
                     (try
                       (do                             
                         (= result
                            (cond
                              compiled.error  ;; compiler error
                              (throw (new compiled.error compiled.message))
                              
                              (and compiled.0.ctype
                                   (or (contains? "block" compiled.0.ctype)
                                       (== compiled.0.ctype "assignment")
                                       (== compiled.0.ctype "__!NOT_FOUND!__")))
                              (if (compiled.0.has_lisp_globals)
                                (do 
                                  (set_prop compiled
                                            
                                            1
                                            (new AsyncFunction "Environment" (+ "{ " compiled.1 "}")))
                                  
                                  (compiled.1 Environment))
                                (do 
                                  (set_prop compiled
                                            1
                                            (new AsyncFunction  (+ "{" compiled.1 "}")))
                                  (compiled.1)))
                              
                              (and compiled.0.ctype
                                   (or (== "AsyncFunction" compiled.0.ctype)
                                       (== "statement" compiled.0.ctype)
                                       (== "objliteral" compiled.0.ctype)))
                              (do
                                (if (compiled.0.has_lisp_globals)
                                  (do
                                        ;(console.log "env: compiled text: " (+ "{ return " compiled.1 "} "))     
                                    (set_prop compiled
                                              1
                                              (new AsyncFunction "Environment" (+ "{ return " compiled.1 "} ")))
                                    (compiled.1 Environment))
                                  (do
                                    (set_prop compiled
                                              1
                                              (new AsyncFunction (+ "{ return " compiled.1 "}")))
                                    (compiled.1))))
                              
                              (and compiled.0.ctype
                                   (== "Function" compiled.0.ctype))
                              (do
                                (if (compiled.0.has_lisp_globals)
                                  (do
                                    (set_prop compiled
                                              1
                                              (new Function "Environment" (+ "{ return " compiled.1 "} ")))
                                    (compiled.1 Environment))
                                  (do 
                                    (set_prop compiled
                                              1
                                              (new Function (+ "{ return " compiled.1 "}")))
                                    (compiled.1))))
                              else ;; this is a simple expression
                              compiled.1)))
                       (catch Error (e)
                         (do
                           (env_log "caught error: " e.name e.message)
                           (when opts.error_report
                             (opts.error_report {
                                                 `error: e.name
                                                 `message: e.message
                                                 `form: nil
                                                 `parent_forms: nil
                                                 `invalid: true
                                                 `text: e.stack
                                                 }))
                                        ;(env_log "<- ERROR: " (-> e `toString))
                           (= result e)
                           (if (and ctx ctx.in_try)
                             (throw result)))))
                                        ;(env_log "<-" result)
                     result)))
       
       (eval_struct (fn (lisp_struct ctx opts)
                      (let
                          ((rval nil))
                                        ;(env_log "eval_struct ->" (clone lisp_struct) ctx opts)
                        (if (is_function? lisp_struct)
                          (= rval (lisp_struct))
                          (= rval (evaluate lisp_struct 
                                            ctx 
                                            (+ {
                                                `json_in: true
                                                }
                                               (or opts {})))))
                                        ;(env_log "eval_struct <-" (clone rval))
                        rval))))
     
     
     
     (defvar meta_for_symbol (fn (quoted_symbol)
                               (do
                                 (if (starts_with? (quote "=:") quoted_symbol)
                                   (prop Environment.definitions (-> quoted_symbol `substr 2))
                                   (prop Environment.definitions quoted_symbol)))))
     
     ;; This will allow us to swap out compiler functions for when we are using potentially
     ;; multiple compilers, for example in the development of the compiler.  
     
     (defvar set_compiler (fn (compiler_function)
                            (do 
                              (= compiler compiler_function)
                              (= compiler_operators
                                 (compiler [] { `special_operators: true `env: Environment }))
                              (set_prop Environment.global_ctx.scope
                                        "compiler"
                                        compiler)
	                      compiler)))	  
     
     (set_prop Environment.global_ctx.scope
	       `set_compiler
	       set_compiler)

     
     
     (set_prop Environment.global_ctx.scope
	       `clone
	       (fn (val)
		 (if (== val Environment)
		   Environment
		   (clone val 0 Environment))))
     
     ;; Expose our global setters/getters for the dynamic and top level contexts
     
     (set_prop Environment
               `get_global get_global
               `set_global set_global)
     
     
     ;; In the compiler context, we have access to the existing environment,
     ;; bring the needed functions in and rebuild them in the current scope.
     
     (declare (local lisp_writer)
              (include reader add_escape_encoding get_outside_global get_object_path
                       do_deferred_splice safe_access embed_compiled_quote))        
     
     
     (defvar as_lisp lisp_writer)
     (defvar read_lisp reader)
     
     (set_prop Environment.global_ctx.scope
               `eval eval_exp
               `reader reader
               `add_escape_encoding add_escape_encoding
               `get_outside_global get_outside_global
               `as_lisp lisp_writer
               `lisp_writer lisp_writer)
     
     
     ;; inline functions for more efficient compiled code...
     
     (defvar inlines  (+  {} 
                          (if opts.inlines
                            opts.inlines
                            {})
                          {   `pop: (fn (args)
                                      ["(" args.0 ")" "." "pop()"])
                           `push: (fn (args)
                                    ["(" args.0 ")" ".push" "(" args.1 ")"])
                           `chomp: (fn (args)
                                     ["(" args.0 ")" ".substr" "(" 0 "," "(" args.0 ".length" "-" 1 ")" ")" ])
                           `join: (fn (args)
                                    (if (== args.length 1) 
                                      ["(" args.0 ")" ".join" "('')"]
                                      ["(" args.1 ")" ".join" "(" args.0 ")" ]))
                           `take: (fn (args)
                                    ["(" args.0 ")" ".shift" "()" ])
                           `prepend: (fn (args)
                                       [ "(" args.0 ")" ".unshift" "(" args.1 ")"])
                                        
                           `trim: (fn (args)
                                    [ "(" args.0 ")" ".trim()"])

                                   
                           `lowercase: (fn (args)
                                         ["(" args.0 ")" ".toLowerCase()"])
                           `uppercase: (fn (args)
                                         ["(" args.0 ")" ".toUpperCase()"])            
                           `islice: (fn (args)
                                      (cond 
                                        (== args.length 3)
                                        [ "(" args.0 ")" ".slice(" args.1 "," args.2 ")"]
                                        (== args.length 2)
                                        [ "(" args.0 ")" ".slice(" args.1 ")"]
                                        else
                                        (throw SyntaxError "slice requires 2 or 3 arguments")))
                           `split_by: (fn (args)
                                        [ "(" args.1 ")" ".split" "(" args.0 ")"])
                           `bindf: (fn (args)
                                     [   args.0 ".bind(" args.1 ")"])
                           `is_array?: (fn (args)
                                         [ "(" args.0 " instanceof Array" ")"])
                           `is_object?: (fn (args)
                                          [ "(" args.0 " instanceof Object" ")" ])
                           `is_string?: (fn (args)
                                          [ "(" args.0 " instanceof String || typeof " args.0 "===" "'string'" ")"])
                           `is_function?: (fn (args)
                                            [ args.0 " instanceof Function"])
                           `is_element?: (fn (args)
                                           [ args.0 " instanceof Element"])
                           `log: (fn (args)
                                   ["console.log" "(" (map (fn (val idx tl)
                                                             (if (< idx (- tl 1))
                                                               [val ","]
                                                               [val]))
                                                           args) ")"])
                           `reverse: (fn (args)
                                       ["("args.0 ")" ".slice(0).reverse()"])
                           
                           `int: (fn (args)
                                   (cond
                                     (== args.length 1)
                                     ["parseInt(" args.0 ")"]
                                     (== args.length 2)
                                     ["parseInt(" args.0 "," args.1 ")"]
                                     else
                                     (throw "SyntaxError" (+ "invalid number of arguments to int: received " args.length))))
                           `float: (fn (args)
                                     ["parseFloat(" args.0 ")"])
                           
                           }))
     
     ;; Finally the interface that is exposed to compiler and the compiled code...
     
     (set_prop Environment
               `eval eval_struct
               `identify subtype
               `meta_for_symbol meta_for_symbol
               `set_compiler set_compiler
               `read_lisp reader
               `as_lisp as_lisp
               `inlines inlines
               `special_operators special_operators
               `definitions Environment.definitions
               `declarations Environment.declarations
               `compile compile
               `evaluate evaluate
               `do_deferred_splice do_deferred_splice
               `id (fn () id)
               `set_check_external_env (fn (state)
                                         (do 
                                           (= check_external_env_default
                                              state)
                                           check_external_env_default))
               `check_external_env (fn ()
                                     check_external_env_default))
                                             
     Environment)))