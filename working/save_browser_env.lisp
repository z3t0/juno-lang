;; Browser Environment Kickstart for Juno
;; author: anygren

;; Go to core since this is a branch-off...
(declare (namespace "core"))
       

(set_namespace "core")

;; Remove any namespaces we don't want to include 
(when (contains? "tests" (namespaces))
  (delete_namespace "tests"))

;(import "doc/help.lisp")
(import "html/logo.juno")

(defglobal core/html_package ((quote quote) (read_text_file "pkg/html.juno")))
(defglobal core/browser_repl_package ((quote quote) (reader (read_text_file "working/browser_workspace.juno"))))

;; Make sure we have the ability to produce a file..
(when (not (contains? "io" *env_config*.features))
  (import "src/base-io.lisp"))

(import "src/build-tools.lisp")
;; everything loaded above this line is what will be preserved..
(defglobal *core_symbols* (core/symbols))


;; Bring in the build tools for compiling buffers

(import "pkg/html_server.juno")

;; Set the new environments default namespace 
(set_path [ `export `default_namespace ] *env_config* "user")
(defglobal core/*env_skeleton*  (reader (read_text_file "./src/environment.lisp")))
(progn
 
  (defvar no_includes (reduce (`sym (core/symbols))
			      (if (not (contains? sym *core_symbols*))
				  sym
				nil)))
  (setq no_includes
	(conj no_includes
	      ["repl" "Deno" "read_text_file" "path" "readline" "readline_mod" "streams" "write_text_file"]))
  ;; print them out 
  (console.log "NOT INCLUDING: ")
  (console.table (sort no_includes))

  ;; save the image 
  
  (core/save_env { save_as: "js/juno_browser.js"		   
		   preserve_imports: false
                   features: [ "compiler" "repl" "core-ext" "html" "build-tools" "browser" ]
		   do_not_include: no_includes })
  
  (console.log "building standalone starter.html file..")

  
  (defglobal env {})
  
  (let
      ((js_resource (read_text_file "js/juno_browser.js"))              
       (doctext nil)                      
       (boot_up (compile
                  `(javascript ,#(read_text_file "js/browser_boot.js"))
                  { `formatted_output: true })))    
    
    (= doctext
       (html/render
         (html/html 
           (html/head { `title: "Juno Browser" }
                   (html/script { `type: "module" }
                                js_resource
                                "\n\n"                               
                                boot_up
                                "\n\n"
                                ))
                                
        (html/body { style: "height: 100vh; overflow: hidden;" }
                   (html/header { style: "max-height: 20px; height: 20px; display: flex;" }
                                )))))
   
    (write_text_file "html/starter.html"
                     doctext)
    true))


;; Notes and examples: to load p5:
;; (defglobal p5 (html/script { `src: "./p5.min.js" }))


