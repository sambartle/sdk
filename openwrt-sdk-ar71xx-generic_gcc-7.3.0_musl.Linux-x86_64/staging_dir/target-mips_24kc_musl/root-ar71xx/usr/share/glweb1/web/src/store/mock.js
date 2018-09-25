"use strict";

define(function () {
    return {
        "smslist": {
            "messages": [{
                "status": "read",
                "index": 0,
                "from": "10659114912",
                "time": "1506242116366",
                "body": "NZXj_.M'aGA\x0E)\x12\x18T\x7F5"
            }, {
                "status": "read",
                "index": 1,
                "from": "10659114912",
                "time": "1506252116380",
                "body": "Y,,l]1N\x7F\f\x1EzvW=#0\x10\x03"
            }, {
                "status": "read",
                "index": 2,
                "from": "1069102859272",
                "time": "1506262116111",
                "body": "0 8jb*?/s6%\x04\x13\x02X6U8\x02CjlR)G\x1Ciq5nVD"
            }, {
                "status": "read",
                "index": 3,
                "from": "10659114912",
                "time": "1506292116222",
                "body": "NZXj_.M'aGA\x0E)\x12\x18T\x7F5"
            }, {
                "status": "read",
                "index": 4,
                "from": "10659114912",
                "time": "1506272116333",
                "body": "Y,,l]1N\x7F\f\x1EzvW=#0\x10\x03"
            }, {
                "status": "read",
                "index": 5,
                "from": "1069102859272",
                "time": "1506302116222",
                "body": "0 8jb*?/s6%\x04\x13\x02X6U8\x02CjlR)G\x1Ciq5nVD"
            }],
            "success": true
        },
        "smsremove": {
            "code": 0,
            "success": true
        },
        "smssend": {
            "success": false
            // "success": true
        },
        "wifimode": {
            "success": true
        },
        "bridge": {
            "success": true
        },
        "bridge_get": {
            "success": true,
            "bridge": "ap"
        },
        "clients": {
            "clients": [{
                "name": "yao-PC",
                "ip": "192.168.8.202",
                "mac": "00:E0:4C:16:0C:33",
                "remote": false,
                "blocked": false,
                "type": "2G"
            }, {
                "name": "DESKTOP-IJLUEM3",
                "ip": "192.168.8.201",
                "mac": "1C:1B:0D:CD:5B:6F",
                "remote": true,
                "blocked": false,
                "type": "LAN"
            }, {
                "name": "*",
                "ip": "192.168.17.85",
                "mac": "00:0E:C6:D0:7C:6D",
                "remote": false,
                "blocked": false,
                "type": "2G"
            }],
            "code": 0
        },
        "wrthirdadd": {
            "code": 0
        },
        "ovpngetclientstatus": {
            code: 0,
            config: "/etc/openvpn/ovpn0/nj.ovpn",
            errormsg: "dsadsasdas21jfihakgnfsakjh142knfanfannfjqrn21jnjnkdanfanlj",
            enable: true,
            force: false,
            http_cookie: "QSESSIONID=bce9dbf17004b90000",
            installed: true,
            mode: true,
            status: "off"
        }
    };
});