package com.liuchen.bishe.bishe.util;

import com.liuchen.bishe.bishe.entry.Contract;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

/**
 * @program: bishe
 * @description: 合同工具类
 * @author: liuchen
 * @create: 2020-02-27 15:37
 **/
public class ContractUtil {





    public static List<Contract> overdure(List<Contract> contracts){


        for (Contract contract :
                contracts) {
            LocalDate now = LocalDate.now();
            Instant instant = contract.getEnd().toInstant();
            ZoneId zone = ZoneId.systemDefault();
            LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zone);
            LocalDate end = localDateTime.toLocalDate();
            long day1 = now.toEpochDay();
            long day2 = end.toEpochDay();
            contract.setOverdue((int) (day1-day2));
        }
        return contracts;
    }



}
