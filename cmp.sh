#! /bin/bash

function check_requirement() {
    node -v
    
    if [ $? = 1 ]; then
        echo "Por favor instala nodejs para proceder"
        kill
    else
        clear
    fi
    
    npx tsc -v
    
    if [ $? = 1 ]; then
        echo "Por favor instala typescript para proceder"
        kill
    else
        clear
    fi
}

function build_server() {
    cd server
    
    rm -rv scripts
    echo "Comiplacion anterior eliminada"
    
    npx tsc
    echo "Comiplacion terminada"
    
    cd ..
}

function build_client() {
    cd client
    
    rm -rv scripts
    echo "Comiplacion anterior eliminada"
    
    npx tsc
    echo "Compilacion terminada"
    
    cd ..
}

function start_server() {
    echo -e "Deseas iniciar el servidor (s/n) ? \c"
    read start
    
    if [ "$start" = "s" ]; then
        npm start
    else
        echo "Gracias por usar el programa"
    fi
    
}

check_requirement
build_server
build_client
start_server