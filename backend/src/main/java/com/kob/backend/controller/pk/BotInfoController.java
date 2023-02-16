package com.kob.backend.controller.pk;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {
    @RequestMapping("/getInfo")
    public Map<String, String> getInfo() {
        Map<String, String> bot = new HashMap<>();
        bot.put("name", "123");
        return bot;
    }
}
