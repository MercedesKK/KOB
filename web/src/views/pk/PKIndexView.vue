<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
    <ResultBoard v-if="$store.state.pk.loser != 'none'" />
    <div class="user-color" v-if="$store.state.pk.status === 'playing' && $store.state.user.id == $store.state.pk.a_id">左下角
    </div>
    <div class="user-color" v-if="$store.state.pk.status === 'playing' && $store.state.user.id == $store.state.pk.b_id">右上角
    </div>
</template>

<script>
import PlayGround from '../../components/PlayGround.vue';
import MatchGround from '../../components/MatchGround.vue';
import ResultBoard from '../../components/ResultBoard.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        PlayGround,
        MatchGround,
        ResultBoard,
    },

    setup() {
        const store = useStore();

        let socket = null;

        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}`;
        onMounted(() => {
            store.commit("updateOpponent", {
                opponent_photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
                opponent_username: "我的对手",
            });
            store.commit("updateIsRecord", false);

            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected");
                store.commit("updateSocket", socket);
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "startOK") {                    // 匹配成功
                    store.commit("updateOpponent", {
                        opponent_username: data.opponent_username,
                        opponent_photo: data.opponent_photo,
                    });
                    //更新游戏状态
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 200);
                    //传入地图
                    store.commit("updateGame", data.game);
                } else if (data.event === "move") {
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    const [snake0, snake1] = game.snakes;

                    snake0.set_direction(data.a_direction);
                    snake1.set_direction(data.b_direction);
                } else if (data.event === "result") {
                    console.log(data);
                    const game = store.state.pk.gameObject;

                    const [snake0, snake1] = game.snakes;

                    if (data.loser === "All" || data.loser === "A") {
                        snake0.status = "die";
                    }
                    if (data.loser === "All" || data.loser === "B") {
                        snake1.status = "die";
                    }
                    store.commit("updateLoser", data.loser);
                }
            }

            socket.onclose = () => {
                console.log("disconnected");

            }
        });

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching");
        });
    }
}
</script>

<style scoped>
div.user-color {
    text-align: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
}
</style>