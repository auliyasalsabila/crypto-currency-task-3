<template>
  <ion-page>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content pulling-text="Tarik untuk memuat ulang" />
      </ion-refresher>
      <main>
        <div class="refresh-area">
          <ion-button :disabled="loading" @click="loadCoins">
            {{ loading ? 'Memuat...' : 'Refresh' }}
          </ion-button>
        </div>
        <div v-if="loading && !coins.length" class="status" role="status">
          <ion-spinner name="crescent" />
          <p>Memuat data cryptocurrency...</p>
        </div>
        <div v-if="error" class="status error" role="alert">
          <p>{{ error }}</p>
          <ion-button fill="outline" :disabled="loading" @click="loadCoins">Coba lagi</ion-button>
        </div>
        <p v-if="!loading && !error && !coins.length" class="status">Belum ada data cryptocurrency.</p>
        <ion-list v-if="coins.length" aria-label="Daftar cryptocurrency" :aria-busy="loading">
          <CryptoListItem v-for="coin in coins" :key="coin.id" :coin="coin" />
        </ion-list>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonButton, IonContent, IonList, IonPage, IonRefresher, IonRefresherContent, IonSpinner } from '@ionic/vue';
import type { RefresherCustomEvent } from '@ionic/vue';
import CryptoListItem from '@/components/CryptoListItem.vue';
import { getCryptocurrencies } from '@/services/coinlore';
import type { Cryptocurrency } from '@/types/cryptocurrency';

const coins = ref<Cryptocurrency[]>([]);
const loading = ref(false);
const error = ref('');

async function loadCoins() {
  if (loading.value) return;
  loading.value = true;
  error.value = '';
  try {
    coins.value = await getCryptocurrencies();
  } catch {
    error.value = coins.value.length
      ? 'Gagal memperbarui data. Data sebelumnya masih ditampilkan. Periksa koneksi lalu coba lagi.'
      : 'Gagal memuat data. Periksa koneksi internet lalu coba lagi.';
  } finally {
    loading.value = false;
  }
}

async function refresh(event: RefresherCustomEvent) {
  try {
    await loadCoins();
  } finally {
    await event.target.complete();
  }
}

onMounted(loadCoins);
</script>

<style scoped>
main {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 12px 24px;
}
.refresh-area {
  padding: 18px 0 10px;
  text-align: center;
}
ion-list {
  padding: 0;
  background: transparent;
}
.status {
  padding: 24px 12px;
  text-align: center;
}
.error {
  color: var(--ion-color-danger);
}
</style>
