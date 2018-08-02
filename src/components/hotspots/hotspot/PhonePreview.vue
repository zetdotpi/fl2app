<template>
    <div id="wrapper">
        <div class="phone view_3" id="phone_1">
            <iframe :src="previewUrl" id="frame_1"></iframe>
        </div>
    </div>
</template>
<script>
export default {
    props: ['hotspotIdentity'],
    computed: {
        previewUrl () {
            return 'https://login.feedlikes.ru/?identity=' + this.hotspotIdentity + '&preview'
        }
    },

    methods: {
        reload () {
            setTimeout(() => { document.getElementById('frame_1').src += '' }, 1500)
        }
    }
}
</script>
<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,300);

    #wrapper {
    }

    .phone {
        width: 20em;
        height: 35em;
        border: 40px solid #ddd;
        border-width: 55px 7px;
        border-radius: 40px;
        margin: 50px auto;
        overflow: hidden;
        transition: all 0.5s ease;
    }

    .phone iframe {
        border: 0;
        width: 100%;
        height: 100%;
    }

    .phone.view_1 {
        transform: rotateX(50deg) rotateY(0deg) rotateZ(-50deg);
        box-shadow: -3px 3px 0 #BBB, -6px 6px 0 #BBB, -9px 9px 0 #BBB, -12px 12px 0 #BBB, -14px 10px 20px #666;
    }

    .phone.view_2 {
        transform: rotateX(0deg) rotateY(-60deg) rotateZ(0deg);
        box-shadow: 5px 1px 0 #BBB, 9px 2px 0 #BBB, 12px 3px 0 #BBB, 15px 4px 0 #BBB, 0 7px 20px #999;
    }

    .phone.view_3 {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        box-shadow: 0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666;
    }

    @media (max-width:900px) {
        #wrapper {
          transform: scale(0.8, 0.8);
      }
    }

    @media (max-width:700px) {
        #wrapper {
          transform: scale(0.6, 0.6);
      }
    }

    @media (max-width:500px) {
        #wrapper {
          transform: scale(0.4, 0.4);
      }
    }
</style>
