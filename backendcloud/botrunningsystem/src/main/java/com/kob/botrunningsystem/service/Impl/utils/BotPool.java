package com.kob.botrunningsystem.service.Impl.utils;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class BotPool extends Thread {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private final Queue<Bot> bots = new LinkedList<>();

    public void addBot(Integer userId, String botCode, String input) {
        lock.lock();
        try {
            bots.add(new Bot(userId, botCode, input));
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    private void consume(Bot bot) {
        Consumer consumer = new Consumer();
        consumer.startTimeout(2000, bot);
    }

    @Override
    public void run() {
        while (true) {
            lock.lock();
            if (bots.isEmpty()) {
                try {
                    condition.await(); // 被阻塞的时候锁自动被释放！！！
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    break;
                } finally {
                    lock.unlock();
                }
            } else {
                Bot bot = bots.remove(); // 返回并且删除队头
                lock.unlock();

                consume(bot); // 比较消耗时间，放在unlock后面
            }
        }
    }
}
