cmd_/home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb/.install := bash scripts/headers_install.sh /home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb ./include/uapi/linux/usb audio.h cdc-wdm.h cdc.h ch11.h ch9.h functionfs.h g_printer.h gadgetfs.h midi.h tmc.h video.h; bash scripts/headers_install.sh /home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb ./include/linux/usb ; bash scripts/headers_install.sh /home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb ./include/generated/uapi/linux/usb ; for F in ; do echo "\#include <asm-generic/$$F>" > /home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb/$$F; done; touch /home/lancer/workspace/gl-image/qsdk53/build_dir/toolchain-arm_cortex-a7_gcc-4.8-linaro_uClibc-1.0.14_eabi/linux-dev//include/linux/usb/.install