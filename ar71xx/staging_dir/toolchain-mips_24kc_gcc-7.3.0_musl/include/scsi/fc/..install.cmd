cmd_/home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc/.install := bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc ./include/uapi/scsi/fc fc_els.h fc_fs.h fc_gs.h fc_ns.h; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc ./include/scsi/fc ; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc ./include/generated/uapi/scsi/fc ; for F in ; do echo "\#include <asm-generic/$$F>" > /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc/$$F; done; touch /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/scsi/fc/.install