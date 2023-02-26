<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
</template>

<script>
import PlayGround from '../../components/PlayGround.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        PlayGround,
    },

    setup() {
        const store = useStore();

        let socket = null;

        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}`;
        onMounted(() => {
            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected");
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                console.log(data);
            }

            socket.onclose = () => {
                console.log("disconnected");

            }
        });

        onUnmounted(() => {
            socket.close();
        })
    }
}
</script>

<style scoped></style>