<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Procura / Resultado -->
    <div
      class="
        z-20
        flex
        justify-center
        relative
        bg-blue-background bg-cover
        px-4
        pt-8
        pb-32
      "
    >
      <!-- Barra de pesquisa -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">
          Rastreador de endereço IP
        </h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="
              flex-1
              py-3
              px-2
              rounded-tl-md rounded-bl-md
              focus:outline-none
            "
            type="text"
            placeholder="Pesquise qualquer endereço IP ou deixe em branco para obter suas informações"
          />
          <i
            @click="getIpInfo"
            class="
              cursor-pointer
              bg-black
              text-white
              px-4
              rounded-tr-md rounded-br-md
              flex
              items-center
              fas
              fa-chevron-right
            "
          ></i>
        </div>
      </div>
      <!-- IP Info -->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo" />
    </div>
    <!-- Map -->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IPInfo from "../components/IPinfo.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "Home",
  components: { IPInfo },
  setup() {
    // create map variable
    let mymap;
    // data
    const queryIp = ref("");
    const ipInfo = ref(null);
    // mounted lifecycle hook, creates the map
    onMounted(() => {
      mymap = leaflet.map("mapid").setView([-23.5489, -46.6388], 11);
      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoidm5paWNpdXNnYzEiLCJhIjoiY2t5dW5xa3lqMXAxYzJ2bHVrZTR6NWVkNCJ9.8Xg9CLo3BMVJKVU514VA3A",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1Ijoidm5paWNpdXNnYzEiLCJhIjoiY2t5dW5xa3lqMXAxYzJ2bHVrZTR6NWVkNCJ9.8Xg9CLo3BMVJKVU514VA3A",
          }
        )
        .addTo(mymap);
    });
    // gets ip information from API
    const getIpInfo = async () => {
      try {
        const data = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_FBTi0rGPhQlKp2cRdOJV0t3Mibq6F&ipAddress=${queryIp.value}`
        );
        const result = data.data;
        ipInfo.value = {
          address: result.ip,
          state: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap);
        mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 14);
      } catch (err) {
        alert(err.message);
      }
    };
    return { queryIp, ipInfo, getIpInfo };
  },
};
</script>
