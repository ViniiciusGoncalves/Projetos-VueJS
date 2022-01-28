<template>
  <div
    class="
      absolute
      -bottom-64
      lg:-bottom-20
      flex flex-col
      lg:flex-row
      bg-white
      gap-y-4 gap-x-12
      px-8
      pt-8
      pb-15
      rounded-md
    "
  >
    <!-- Flex Item #1-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Endereço de IṔ</h3>
    </div>
    <span class="text-2xl">{{ ipInfo.address }}</span>

    <!-- Flex Item #2-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Localização</h3>
    </div>
    <span class="text-2xl">{{ ipInfo.state }}</span>

    <!-- Flex Item #3-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Fuso Horario</h3>
    </div>
    <span class="text-2xl">{{ ipInfo.timezone }}</span>

    <!-- Flex Item #4-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">ISP</h3>
    </div>
    <span class="text-2xl">{{ ipInfo.isp }}</span>
  </div>
</template>

<script>
export default {
  props: ['ipInfo'],
};
</script>
