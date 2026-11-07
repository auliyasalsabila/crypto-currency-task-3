<template>
  <ion-item lines="none" class="crypto-item">
    <div class="crypto-row">
      <div>
        <span class="caption">Rank</span>
        <span class="value">{{ coin.rank }}</span>
      </div>
      <div>
        <span class="caption">{{ coin.name }}</span>
        <span class="value">{{ coin.symbol }}</span>
      </div>
      <div>
        <span class="caption">USD</span>
        <span class="value price">{{ coin.price_usd }}</span>
      </div>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem } from '@ionic/vue';
import type { Cryptocurrency } from '@/types/cryptocurrency';

defineProps<{ coin: Cryptocurrency }>();
</script>

<style scoped>
.crypto-item {
  --background: #fff3cd;
  --color: #171717;
  --padding-start: 16px;
  --inner-padding-end: 16px;
  border: 1px solid #dfc26d;
}
.crypto-item + .crypto-item {
  border-top: 0;
}
.crypto-row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 12px;
  width: 100%;
  padding: 12px 0;
}
.caption,
.value {
  display: block;
  overflow-wrap: anywhere;
}
.caption {
  font-size: 12px;
  margin-bottom: 5px;
}
.value {
  font-size: 22px;
  line-height: 1.2;
}
.price {
  font-variant-numeric: tabular-nums;
}
</style>
