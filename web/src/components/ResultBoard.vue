<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.loser == 'all'">
            平局
        </div>
        <div class="result-board-text"
            v-else-if="$store.state.pk.loser == 'A' && $store.state.pk.a_id == $store.state.user.id">
            输了
        </div>
        <div class="result-board-text"
            v-else-if="$store.state.pk.loser == 'B' && $store.state.pk.b_id == $store.state.user.id">
            输了
        </div>
        <div class="result-board-text" v-else>
            赢了
        </div>
        <div class="result-board-btn">
            <button @click="restart" type="button" class="btn btn-warning btn-lg">
                重新匹配
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { onUnmounted } from 'vue';

export default {
    setup() {
        const store = useStore();

        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", "none");
            store.commit("updateOpponent", {
                opponent_photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
                opponent_username: "我的对手",
            });
        };

        onUnmounted(() => {
            store.commit("updateLoser", "none");
        });

        return {
            restart,
        }
    }
}
</script>

<style scoped> div.result-board {
     height: 30vh;
     width: 30vw;
     background-color: rgba(50, 50, 50, 0.5);
     position: absolute;
     top: 35vh;
     left: 35vw;
 }

 div.result-board-text {
     color: white;
     text-align: center;
     font-size: 50px;
     font-weight: 600;
     padding-top: 5vh;
 }

 div.result-board-btn {
     text-align: center;
     padding-top: 5vh;
 }
</style>