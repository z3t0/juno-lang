#!/usr/bin/env bash
# Juno Environment Build for Unix
# (c) 2023 Kina
# MIT License

if [ -f "./BUILD_DATE.txt" ]; then 
   echo "Removing Build time stamp."
   rm "./BUILD_DATE.txt"
fi
   
# Rebuild the core environment
cat <<EOI | lib/juno
(import "src/base-io.lisp")
(import "src/build-tools.lisp")
(rebuild_env)
EOI

# Run Tests
echo
echo "Running compiler tests.."
cat <<EOI | lib/juno
(import "src/base-io.lisp")
(import "tests/package.juno")
(tests/report_tests)
EOI

# Build Binary Version for the Architecture
cat <<EOI | lib/juno
(try 
  (progn
    (declare (function save_environment)
             (global save_environment))
    (import "src/base-io.lisp")
    (import "src/build-tools.lisp")
    (import "src/core-ext.lisp")
    (import "pkg/server_env.juno")
    (import "pkg/lz-string.juno")
    (import "pkg/sys.juno")
    (import "pkg/save_env.juno")
    (log "loaded: " (namespaces) *env_config*)
    (save_environment { compile: true emit_as: "bin/build.tmp" } )
    (exit 0))
  (catch Error (e)
     (progn
       (console.error e)
       (exit 1))))
EOI

if [ $? -ne 0 ];then 
  echo "Build failed"
  exit 1
fi

echo "verifying juno.js"
cat <<EOI | lib/juno js/juno.js
  *env_config*
  (write_text_file "./BUILD_DATE.txt" (prop *env_config* "build"))
EOI

SYSTEM=`uname -s|tr '[:upper:]' '[:lower:]'`
MACHINE=`uname -m|tr '[:upper:]' '[:lower:]'`

BINNAME="bin/juno.$MACHINE.$SYSTEM"


if [ -f "./BUILD_DATE.txt" ]; then    
    # lib/juno --compile -A bin/build.tmp js/juno.js
    if [ -f "bin/build.tmp" ]; then
	   mv "bin/build.tmp" $BINNAME
	   echo
	   echo "Build Completed - $BINNAME constructed"
    fi
else
    echo "Build failed"
fi
   

