package com.kob.backend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Record {
    // 主键要加的注解 主键自增
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer aId;
    private Integer aSx; // 数据库用下划线这里一定用驼峰！！！！！
    private Integer aSy;
    private Integer bId;
    private Integer bSx; // 数据库用下划线这里一定用驼峰！！！！！
    private Integer bSy;
    private String aSteps;
    private String bSteps;
    private String map;
    private String loser;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private Date createtime;
}
