;; JUNO Simple Read Eval Print Loop (REPL)
;; Establishes a REPL mechanism that can be bound to an input and output stream
;; (requires Deno readline and streams)

(import (readline_mod) "https://deno.land/x/readline/mod.ts")
(import (streams) "https://deno.land/std/streams/conversion.ts")

(defun repl (instream outstream opts)
  (let
      ((buffer nil)
       (lines [])
       (raw_mode (either opts.raw
			 (resolve_path [ `repl `raw_mode ] *env_config*)
			 false))
       
       (use_console (or opts.use_console false))
       (generator readline_mod.readline)
       (instream (or instream Deno.stdin))
       (outstream (or outstream Deno.stdout))
       (td (new TextDecoder))
       (te (new TextEncoder))       
       (prompt_text (cond
                      (is_function? opts.prompt)
                      opts.prompt
                      (is_string? opts.prompt)
                      (function () opts.prompt)
                      else
                      (function () (+ "[" (current_namespace) "] λ-> "))))
       (prompt (fn ()
                 (-> te `encode (prompt_text))))
       (last_exception nil)
       (subprompt_text (cond
                         (is_function? opts.subprompt)
                         opts.subprompt
                         (is_string? opts.prompt)
                         (function () opts.prompt)
                         else
                         (fn () 
                             (+ "     "
				(join "" (map (fn (v) " " )  (range (+ 2 (length (current_namespace))))))
				(join "" (map (fn (v) " ") (range_inc (or last_exception.depth 1))))))))
       (subprompt (fn ()
                    (-> te `encode (subprompt_text))))
                        
       (sigint_message (-> te `encode (either opts.sigint_message "\nsigint: input canceled. type ctrl-d to exit.\n")))
       (write streams.writeAllSync)
       (sigint_handler (function ()
			         (progn
			          (write outstream sigint_message)
                                  (= lines [])
			          (write outstream prompt))))
       (output_processor (cond
			  (and opts
			       opts.output_processor
			       (is_function? opts.output_processor))
			  opts.output_processor
			  (resolve_path [ `repl `output_processor ] *env_config*)
			  (resolve_path [ `repl `output_processor ] *env_config*)
			  else
			  (fn (value)
			      (JSON.stringify value nil 2))))
       (return_stack []))
    
    (declare (function write)
	     (include not))
    
    (defglobal $ nil)
    (defglobal $$ nil)
    (defglobal $$$ nil)
    (if (== outstream Deno.stdout)
	(console.log "\nJuno" Environment.version " (c) 2022, Kina, LLC"))
    (try
      (Deno.addSignalListener `SIGINT sigint_handler)
      (catch Error (e)
	(warn "Unable to install sigint handler.")))
    (if (not raw_mode)
	(write outstream (prompt)))
    (try      
      (for_with (`l (generator instream))
	        (progn		
		 (= l (-> td `decode l))			
		 (try
		   (progn
		    (reader (join "\n" (add lines l)) { `verbose: false } ) ;; this will throw an exception if we cannot read all lines correctly
		    (= buffer (join "\n" (add lines l))) ;; ..otherwise build the buffer and present to be evaluated
		    
		    (prepend return_stack
			     (-> Environment `evaluate buffer))
					;(console.log (JSON.stringify (first return_stack) nil 4))
		    (if use_console
			(console.log (first return_stack))
		      (progn
			(write outstream (-> te `encode (output_processor (first return_stack))))
			(write outstream (-> te `encode "\n"))))
		    
		    (when (not raw_mode)
		      (write outstream (prompt)))
		    (= lines [])
		    (when (> return_stack.length 3)
		      (pop return_stack))
		    
		    (when (or (== (first return_stack) Environment)
			      (== (first return_stack) Environment.global_ctx)
			      (== (first return_stack) (prop Environment.global_ctx *namespace*))
                              (== (first return_stack) (prop (prop Environment.global_ctx *namespace*) `scope)))
		      (set_prop return_stack 0 nil))
		    
		    (= $ (first return_stack))
		    (= $$ (second return_stack))
		    (= $$$ return_stack.2))
		   (catch LispSyntaxError (e)
		     (progn                      
                      (= last_exception (JSON.parse e.message))
                      (defglobal *last_exception* last_exception)
		      (cond
                        (not (== last_exception.type "premature end"))
                        (progn
                         (warn (+ last_exception.message ", position: " last_exception.position "\n    -->" last_exception.local_text "<--"))
                         (= lines [])
                         (when (not raw_mode)
			   (write outstream (prompt))))
                        else
                        (progn                         
			  (push lines l)                         
			  (when (not raw_mode)
			    (write outstream
                                   (subprompt)))
                         ))))
		   (catch Error (e)
		     (console.error "ERROR: " e)))
	         
		 ))
      (catch Error (e)
	(console.error "REPL: " e)))))

(when (not (prop *env_config* `repl))
  (set_prop *env_config* `repl {}))

(register_feature `repl)




