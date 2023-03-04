package com.kob.matchingsystem.service.impl.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.channels.MulticastChannel;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class MatchingPool extends Thread {
    private static RestTemplate restTemplate;
    private final static String startGameUrl = "http://127.0.0.1:3000/pk/start/game/";
    private static List<Player> players = new ArrayList<>();
    private final ReentrantLock lock = new ReentrantLock();

    @Autowired
    public void setRestTemplate(RestTemplate restTemplate){ MatchingPool.restTemplate = restTemplate; }

    public void addPlayer(Integer userId, Integer rating, Integer botId) {
        lock.lock();
        try {
            players.add(new Player(userId, rating, botId, 0));
        } finally {
            lock.unlock();
        }
    }

    public void removePlayer(Integer userId) {
        lock.lock();
        try {
            List<Player> newPlayers = new ArrayList<>();
            for (Player player: players) {
                if (!player.getUserId().equals(userId)) {
                    newPlayers.add(player);
                }
            }
            players = newPlayers;
        } finally {
            lock.unlock();
        }
    }

    // 所有玩家等待时间加一
    private void increaseWaitingTime() {
        for (Player player : players) {
            player.setWaitingTime(player.getWaitingTime() + 1);
        }
    }

    private void matchPlayers() {
        boolean[] used = new boolean[players.size()];

        for (int i = 0; i < players.size(); i++) {
            if (used[i]) continue;
            for (int j = i + 1; j < players.size(); j++) {
                if (used[j]) continue;
                Player a = players.get(i), b = players.get(j);
                if (checkMatched(a, b)) {
                    used[i] = used[j] = true;
                    sendResult(a, b);
                    break;
                }
            }
        }

        List<Player> newPlayers = new ArrayList<>();
        for (int i = 0; i < players.size(); i++) {
            if (!used[i]) {
                newPlayers.add(players.get(i));
            }
        }

        players = newPlayers;
    }

    // 判断两名玩家是否匹配
    private boolean checkMatched(Player a, Player b) {

        // 防止前端刷新后匹配到自己
        if (a.getUserId() == b.getUserId()) {
            List<Player> newPlayers = new ArrayList<>();
            for (int i = 0; i < players.size(); i++) {
                if (players.get(i).getUserId() == a.getUserId()) {
                    players.remove(a);
                    break;
                }
            }
            return false;
        }

        int ratingDelta = Math.abs(a.getRating() - b.getRating());
        int waitingTime = Math.min(a.getWaitingTime(), b.getWaitingTime());
        return ratingDelta <= waitingTime * 10;
    }

    private void sendResult(Player a, Player b) {
        MultiValueMap<String,String> data = new LinkedMultiValueMap<>();
        data.add("a_id", a.getUserId().toString());
        data.add("a_bot_id", a.getBotId().toString());
        data.add("b_id", b.getUserId().toString());
        data.add("b_bot_id", b.getBotId().toString());
        restTemplate.postForObject(startGameUrl, data, String.class);
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(1000);
                System.out.println(players);
                lock.lock();
                try {
                    increaseWaitingTime();
                    matchPlayers();
                } finally {
                    lock.unlock();
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }
}
