cmd_/home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act/.install := bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act ./include/uapi/linux/tc_act tc_bpf.h tc_connmark.h tc_csum.h tc_defact.h tc_gact.h tc_ife.h tc_ipt.h tc_mirred.h tc_nat.h tc_pedit.h tc_skbedit.h tc_skbmod.h tc_tunnel_key.h tc_vlan.h; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act ./include/linux/tc_act ; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act ./include/generated/uapi/linux/tc_act ; for F in ; do echo "\#include <asm-generic/$$F>" > /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act/$$F; done; touch /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/linux/tc_act/.install
