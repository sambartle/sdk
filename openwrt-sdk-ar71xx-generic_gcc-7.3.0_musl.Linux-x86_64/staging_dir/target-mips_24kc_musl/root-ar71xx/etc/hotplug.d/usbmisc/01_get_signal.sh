#!/bin/sh

[ "$ACTION" = add ] || [ "$ACTION" = remove ] || exit 0
[ "${DEVNAME/[0-9]/}" = cdc-wdm ] || exit 0

[ "$ACTION" = add ] && modem_get_signal /dev/$DEVNAME  &
[ "$ACTION" = remove ] && { 
	rm /tmp/signal
	pid=$(fuser  /usr/bin/modem_get_signal)
	kill $pid 
	}

