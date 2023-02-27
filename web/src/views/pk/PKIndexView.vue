<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
</template>

<script>
import PlayGround from '../../components/PlayGround.vue';
import MatchGround from '../../components/MatchGround.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        PlayGround,
        MatchGround,
    },

    setup() {
        const store = useStore();

        let socket = null;

        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}`;
        onMounted(() => {
            store.commit("updateOpponent", {
                opponent_photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
                opponent_username: "我的对手",
            })

            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected");
                store.commit("updateSocket", socket);
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "startOK") {
                    // 匹配成功
                    store.commit("updateOpponent", {
                        opponent_username: data.opponent_username,
                        opponent_photo: data.opponent_photo,
                    });
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 2000);

                }
            }

            socket.onclose = () => {
                console.log("disconnected");

            }
        });

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching");
            console.log(store.state.pk);
        });
    }
}
</script>

<style scoped></style>