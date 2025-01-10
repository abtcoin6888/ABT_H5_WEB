import{m as c,f as A,e as a,i as l,r as e,q as t,w as s,t as r,u as o,v as f,x as m,z as v,G as n,H as u}from"./index-Crl9YJuv.js";import{_ as i}from"./fui-icon.DR4EBh1k.js";import{r as d}from"./uni-app.es.DGAn-rK5.js";import{_ as p}from"./fui-nav-bar.BWTrzAGW.js";import{_ as g}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k=g({data:()=>({list:{}}),onShow(){this.getConfig()},computed:{...c(["config","userTheme"])},methods:{checkUpdate(){A({title:this.$t("about.zxbb"),icon:"none"})},copy(c){a({data:c,success(){A({title:this.$t("about.fzcg")})}})},getConfig(){l.config(5).then((c=>{this.list=c.data}))}}},[["render",function(c,A,a,l,g,k){const P=d(e("fui-icon"),i),U=d(e("fui-nav-bar"),p),b=n,Y=u,S=r;return o(),t(S,{class:"about","data-theme":c.userTheme},{default:s((()=>[f(U,{background:"var(--background-primary)",color:"var(--content-primary)",statusBar:"",isFixed:"",isOccupy:"",title:c.$t("about.us"),onLeftClick:A[0]||(A[0]=A=>c.$mroute.back())},{default:s((()=>[f(P,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),f(S,{class:"header"},{default:s((()=>[f(b,{class:"logo",src:c.config.logo},null,8,["src"]),f(Y,{class:"font-14 color-black"},{default:s((()=>[m(v(g.list.app_version),1)])),_:1})])),_:1}),f(S,{class:"container"},{default:s((()=>[f(S,{class:"cell",onClick:A[1]||(A[1]=c=>k.copy(g.list.twitter))},{default:s((()=>[f(S,{class:"cell-left"},{default:s((()=>[f(b,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABAlBMVEUAAAAcm/AcnfMcm/Acm/Acm/Ebm+4cm/Adm/Eal+4dnfQdnPMcm/EdnPIcm/IdmvEdmvAcmfAbmu8ZmvAimu4dnfMcnPMbmO0cmvAcm/EcnPMcnPEcnPIcmvEUnesdm/Adm+4gn+8cmu4gmvMcm/Ign/8dm/D///8eoPcZmvAWmPAdnPEdnPIdnvQdnvUUl/D8/v/3/P9QsvMnoPHo9f3f8f0sovHy+v6Ozfh1wvZIrvMinfCJy/dtv/Udm/Hj8/3W7fzP6vy44PoeoPmCyPdqvfVAq/LH5vuj1vljuvU6qPI1pvESlu/u9/7A4/ux3fqq2fmd1PhguPVYtfSW0Ph9xvZ3AL9SAAAAJnRSTlMA4fz1mjIf4rwd99TDt6+NhkY/PQ7+mTi+WuLVaTcN1mkQWx+bEFv/ZGYAAANxSURBVFjDtZjnduIwEIVtTOgtIUACgZTdHUs2YKrpNXTSy/u/ypoTsi6SvMRO7smvAN+ZGUlXo+HsFMxfeCO8ACDwEe9FPsg50WkyEeABpYoyaJKLJQR8IJE8/SLmKB4GhEpDMGhYQgjC8aMvYI5jAioDVWUkxI4PxJxEPagITBWRJ3pyAMaXDiEZbCWjUPrX/zjnWSIaalTZG1vMtTdVhoNUTnmvbdI6I7Ni5xfwMdc8jOALQmHGTsj4SY49KZuhxpNlcdgkPyWmYI7NYZNyRJ1OzxA4EDqzHj7vLTjSrdeyDz2yM5DsOTdtIH8JHKrk9xkTQ+BYyJDcSajoHFQM6V4QReBCKPrPx/RKO6v3p9PFELgSiu3PhnBQhbAkaX/UKgkfJyVOCQiTmO263+508e4TCVtCiu84hUuKl6nYwun1m6Km1uNCUaDW75ldLlfQQEmZjEdd1iTTP+qP4l6jweyh0rGkKCc1UILMTHoRRzXFCFqJRrVx3ZJbQgMFSNBdXxQbL3olpFrVgKlMB6sONoMCmg/xJRLU1r5fbdc/UfhZNIJa4rRuBpX4IJfxACHlXdxpsu4pHz8Yi0a12j3rqnry3BVt8bv7VJZzFSsY90Ym0OzOygF0xXmpBvIg7tV8ni/qvaYJ1JFIM/FyEdq2VhYNQyajScsEmpOgYoTjZUpqr7WBTiJUw+TB5TmBFtBMHLNB1Q0JAoEDoBebrXEdAykOqJragJ4koIEEekj3bNBcAVICtdgA0ppJaqoYaMXWlp9KWjwyyt2mZVaMMDYkVtvPywqN09hiANqGvEJAJbHK3aeWGl1oh5YO2oyonAl17cGTIWxE96AmhdPSndNiI7qxEaTtW6NqKRPhsbqx6VZLCEv1edPM6et5kVablBkYqbeemCKqvmNgaGf+hVyZTOsOq93ZxLITXyRW031ZoF+QtdXDcly1lHm1ZXEAxVlXdvfNsq3vnz7uWGBc2awmAkvq4OkzpkpzOttgybaJYLc1WMH1zeug0xm8LlRQsH1bY99oYYylnTA+sNFy3/p9UzP6+yfaY+7GbcPu/gmR/qlHDee7dPjMInTkd/bwI5Vnkdic/Hc/jsnn+q2j5zqpP+nDBwjpa/uRBn/gSOP8h4Ys7sc+7gdR7kdjToZ1Q31Yl0LD/bDOgYIZ4/gwYzs+/AvEnGZ23YNurQAAAABJRU5ErkJggg=="}),f(Y,{class:"font-14 color-black"},{default:s((()=>[m(" Twitter ")])),_:1})])),_:1}),f(S,{class:"cell-right"},{default:s((()=>[f(Y,{class:"font-14 color-gray"},{default:s((()=>[m(v(g.list.twitter),1)])),_:1}),f(P,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),f(S,{class:"cell",onClick:A[2]||(A[2]=c=>k.copy(g.list.facebook))},{default:s((()=>[f(S,{class:"cell-left"},{default:s((()=>[f(b,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA5FBMVEUAAAAAcvYAcPYAc/gAcvYAc/YAcvYAcfUAcvUAb/IAdPkAcvUAcfYAcvcAcvYAcfUAcvcAcvYAcPUAcfcAmvkAcfYAbfAAcfYAcvgAc/YAc/gAcvcAc/gAcvQAcPQAcfcAdvYAcfQAcvYAcPQAcvX///8Ab/UAdPsAdv4AbPUAc/YAc/cXf/be7f5cpfkpife21/ylzfsRe/bk8f7G3/1wsPpXo/mu0vymzvt2s/pMnPj2+v+Zx/uAufozjvfL4v272vwqhvcmh/YIdvXs9P7Y6f3Q5f2OwPpep/k+lPc9lPcMefbdrn5FAAAAJHRSTlMA4R789bmaPjcP99bDr5uGaUUzMQbkHL3+4+HU041bWg29jY1gcxl3AAACsklEQVRYw72Y6XKiQBSFm0UkRpCYqNmMWS50A2bMuMQlmnX2ef/3GSll1MjpkYHK+WeV9RV9+i59L5NJNR27rOhEulI2HLPO/kd7xUpBIc7DgOYKQs5JKVSKeykx1eYZccEDWlPABaez62oKzIGlC06J4kK3DnbEFAuaCAkqFFqhuANGNUoiIKkCUTLUf3EuTldfI/uq05b8qoxjTjuJHxt7kmNdbZ8Kn+8KHq96LiiFxDmIBPOEUyrxEzOJc1hDHEyqHSb4s485mLSvbt1XQ+aP91fvfWq8vztDSDB+9/F+MB4Pfkw6W44bm5yWFmBOe/bNXepuKwq01oZBCsecn19dF4KI19ZtsgXmPPZcGYiEveIUSzi/3vquHBSWijHnqCD5oHt3Xc9JEV44iuuYxGkaxozbfr//9D0p67S40lkCc7qxQ7MuTjprmRt6KLH6YcEZkoerk77IlKYgKH/iLjTxCUvcRJxLWZL5S6+/dDxpyl1Gd08S+Z+WTrc9kimKgArPDuIVHEQYBEKprnBJ6Yg9uu36XiSA40qdmRolq92Z62W8APV+vXQitcGfNZM5yKI7N0FTEAXcYUYq0ACBbFYO04AmwKSwzJQgBejhFYAChemUAtSDmaszQnpOAD29ERIGjUef5+ovzzSMfowGBAWOhgIScnRgNk4RaHY5TAeC12/zPEDcYE4+ICdO2owgzQRlBIJgGcmtsOVVanMr/qgdYRBuR+xGZAWJJm7ZGIRbNrNENpCw8LMGg/CzBvRIAAJBhJ9+GISffqvHKAb1MEjYbCW1hvr262w6Go6mg984zdSNwRH57fl+VHF97HQLjBApJQw41MiFh5rsY1b+g1/2UTT7cJzPuN5Q81wgZF9pXHzAkiX72if7Igqreo1WY83qByzroOqmY8TrQ9sxpQb/AQnMPfc8cWBLAAAAAElFTkSuQmCC"}),f(Y,{class:"font-14 color-black"},{default:s((()=>[m(" Facebook ")])),_:1})])),_:1}),f(S,{class:"cell-right"},{default:s((()=>[f(Y,{class:"font-14 color-gray"},{default:s((()=>[m(v(g.list.facebook),1)])),_:1}),f(P,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),f(S,{class:"cell",onClick:A[3]||(A[3]=c=>k.copy(g.list.instagram))},{default:s((()=>[f(S,{class:"cell-left"},{default:s((()=>[f(b,{src:"data:image/png;base64,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"}),f(Y,{class:"font-14 color-black"},{default:s((()=>[m(" Instagram ")])),_:1})])),_:1}),f(S,{class:"cell-right"},{default:s((()=>[f(Y,{class:"font-14 color-gray"},{default:s((()=>[m(v(g.list.instagram),1)])),_:1}),f(P,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),f(S,{class:"cell",onClick:A[4]||(A[4]=c=>k.copy(g.list.telegram))},{default:s((()=>[f(S,{class:"cell-left"},{default:s((()=>[f(b,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA9lBMVEUAAAAnqOgmpuUnpeUnpuYkpuYkpeUhpOQmpuYjpOUnp+cmpuYnqOgnpuUmpuUmpuYnpeYkpeUkpeUmpeQmpuYmp+cmpuQiouMnp+cmpuUnpuYmpuYmpeYhpeYnp+Inp+YnqegmpuUnpeMgn98ppeYmpuInpuX///8oq+0np+cgo+QkpeX7/f4oqusoqekipOXr9vxLtek9r+gvqeYqp+a+5Pdcu+v5/P71+/3V7vmBy/A2rOfx+f3d8frJ6PhSuOpEsums3fWm2vR8ye8do+Tk8/uN0PGIzvB2xu5pwu1kvuzM6fjE5vez3/Wa1fKQ0vGf1/NwxO3BuV5bAAAAJnRSTlMA/PXhuTI3D+Mc1Jr3vZtpWkU/PNaZhh7hw8KNjR8NsK/ksCAfhqflJGwAAANvSURBVFjDtZjnduIwEIWNTZyAKUkoKZCeHdsSLvSW0ENL3fd/mSUCB7BkXDbcH3AOP75zudKMpOF2KSImE5cCD8ALl1JSjHBBdJjKhgXQdFWFhVRV10AIZ1OHPjEH+Shoig6bUnVFg2juwAfm5JYnEIZ0hb858Yg5DYcUFRylKqHwqQfMlRSjMBQqlrly4xyfUxgm6vx491JlVB08SVczOxbwLE7bcTYVP3Nc86gCPqREHXaCeKSBL2lHItMP4fgkMTxF0gr4lpKmcjqME45vUty+dhLhBCBlbPswpAYDqaHjrbo40iGg9LvHDVBCgcBSEhv1HlODg9TYuheEFfgPKeGfPuYnaQPReVud7sazIYzKtVmFsnS/qg3eoyFklFrNen2O7Jb4ZaXkFW9mKrW+KctyvWZQlnLfnOu05iWZ0vC1IH/LbNPFm75egFJezHQHprxSpwK0UgtQVnM306kTRvNl8fGFgbaUddtEGEH340UmanwWm4uvIWJvpYig7zDT/lttyEu9dtsdkjUDpAsRTgw5myl+PFvJPI0rpSbJuoSBVkjkkpqDmTIxs9Jbd1RcQpvsppvkJJ1lBvfGKzPEzmd5VFsl1TeYzSTBXagMM/P3J5mosLSDRnNr+SeI2QIuOMEGwkZv0pQ3MGargtDsyXI3Z4MEjrdxen3TohBViwijacP6ySwawBLP2Quzv8YUiB0D41b9h9wsY2CKAs2sMApLO4DxuLAmVxGwZf9rgEutt1Ug5hAMwPCxmdinA4gnYVMbcfK6COW9hwBwZUAglqMZAoewL1RmO+2Op2AsOOV3ArAcNUjWzOVP6A472/h2167K8qaj5zY7a10iJcIU4XQsiJU+BqcSEUM7QOW+vO3oawRMhcSdbQQwbjW2HE1J1qw24nY6otrzyhH5KmKHM9K91aJeZ72PTIestT8emr9RHhCKrfHTzf866tL9MR5atT8gETkcR1yOhOQWFFFrxI4o7/XIRqWqTDV+6sjm7hUA96AKTo0flBsf1xqMpy/mhHAY1xpfFy2j1HPaRD6vfthwuvr9/mWUe7wLfj0+uvr1CztRJugTQtrXo4Y7C/bMiuzn4Rf8Kbqfx3Hw5/qeBwjBRxpsPXgaskgPexj7BB5E3Z74GY3lyGhs2xgZjeUP9jyscxsfStb4MOEyPvwHUBdlaf79pDsAAAAASUVORK5CYII="}),f(Y,{class:"font-14 color-black"},{default:s((()=>[m(" Telegram ")])),_:1})])),_:1}),f(S,{class:"cell-right"},{default:s((()=>[f(Y,{class:"font-14 color-gray"},{default:s((()=>[m(v(g.list.telegram),1)])),_:1}),f(P,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1})])),_:1}),f(S,{class:"footer-box"},{default:s((()=>[f(Y,{onClick:A[5]||(A[5]=c=>k.checkUpdate()),class:"font-14 color-primary"},{default:s((()=>[m(v(c.$t("about.check")),1)])),_:1}),f(S,{class:"_context"},{default:s((()=>[f(Y,{class:"font-12 color-gray"},{default:s((()=>[f(Y,{onClick:A[6]||(A[6]=A=>c.$mroute.webview(1,"gywm",c.$t("about.us")))},{default:s((()=>[m(v(c.config.site_name)+v(c.$t("about.profile"))+" | ",1)])),_:1}),f(Y,{onClick:A[7]||(A[7]=A=>c.$mroute.webview(1,"yhxys",c.$t("about.xieyi")))},{default:s((()=>[m(v(c.$t("about.xieyi"))+" | ",1)])),_:1}),f(Y,{onClick:A[8]||(A[8]=A=>c.$mroute.webview(1,"ysxy",c.$t("about.yszc")))},{default:s((()=>[m(v(c.$t("about.yszc"))+" | ",1)])),_:1}),f(Y,{onClick:A[9]||(A[9]=A=>c.$mroute.webview(1,"mzsm",c.$t("about.mzsm")))},{default:s((()=>[m(v(c.$t("about.mzsm")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["data-theme"])}],["__scopeId","data-v-156fc8dc"]]);export{k as default};
