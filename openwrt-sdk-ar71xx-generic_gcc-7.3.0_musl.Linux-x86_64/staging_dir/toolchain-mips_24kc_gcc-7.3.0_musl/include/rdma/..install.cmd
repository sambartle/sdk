cmd_/home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma/.install := bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma ./include/uapi/rdma cxgb3-abi.h cxgb4-abi.h ib_user_cm.h ib_user_mad.h ib_user_sa.h ib_user_verbs.h mlx4-abi.h mlx5-abi.h mthca-abi.h nes-abi.h ocrdma-abi.h rdma_netlink.h rdma_user_cm.h rdma_user_rxe.h; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma ./include/rdma ; bash scripts/headers_install.sh /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma ./include/generated/uapi/rdma ; for F in ; do echo "\#include <asm-generic/$$F>" > /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma/$$F; done; touch /home/kyson/workspace/devlop/release/openwrt-18.06.git/build_dir/toolchain-mips_24kc_gcc-7.3.0_musl/linux-dev//include/rdma/.install
