#!/bin/sh

# initialize defaults
export TARGET=""
export HELP=0

while [ -n "$1" ]; do
        case "$1" in
                -a) export TARGET="all";;
                -p) export TARGET="$2";;
                -h|--help) export HELP=1; break;;
                -*)
                        echo "Invalid option: $1"
                        exit 1
                ;;
                *) break;;
        esac
        shift;
done

[ -z "$TARGET" -o $HELP -gt 0 ] && {
        cat <<EOF
GL.iNet SDK tool
Usage: ./builder [OPTIONS]

upgrade-option:
        -p <ar71xx|ramips>  Build a specified image from the specified profiles
        -a                  Compile all target
EOF
        exit 1
}

[ "$TARGET" = "all" ] && {
		cd ar71xx/
		make
		cd ../ramips
		make
		exit 0
}

[ "$TARGET" = "ar71xx" ] && {
        cd $TARGET
        make
		exit 0
}

[ "$TARGET" = "ramips" ] && {
        cd $TARGET
		make
		exit 0
}

{
        cat <<EOF
GL.iNet SDK tool
Usage: ./builder [OPTIONS]

upgrade-option:
        -p <ar71xx|ramips>  Build a specified image from the specified profiles
        -a                  Compile all target
EOF
        exit 1
}
