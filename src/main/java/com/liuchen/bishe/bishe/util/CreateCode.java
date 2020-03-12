package com.liuchen.bishe.bishe.util;

import org.springframework.stereotype.Component;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @program: bishe
 * @description: 创建验证码
 * @author: liuchen
 * @create: 2020-02-09 11:50
 **/

@Component
public class CreateCode {


    public Map<String, BufferedImage> getCode(){
        BufferedImage bufferedImage  = new BufferedImage(70, 30, BufferedImage.TYPE_INT_BGR);
        Random random = new Random();
        Graphics graphics = bufferedImage.getGraphics();
        graphics.setColor(new Color(random.nextInt(256),random.nextInt(256),random.nextInt(256)));
        graphics.fillRect(0, 0, 70, 30);


        String str= "qwertyuioplkjhgfdsaxzcvbnm";

        StringBuffer message = new StringBuffer();
        graphics.setColor(new Color(random.nextInt(256),random.nextInt(256),random.nextInt(256)));
        for(int i = 0;i<4;i++){
            String   s = str.charAt(random.nextInt(str.length()))+"";
            message.append(s.trim());
        }
        graphics.setFont(new Font("宋体", Font.BOLD, 20));
        graphics.drawString(message.toString(), 20, 20);

        for (int i = 0; i < 3; i++) {
            graphics.setColor(new Color(random.nextInt(256),random.nextInt(256),random.nextInt(256)));
            graphics.drawLine(random.nextInt(70), random.nextInt(30), random.nextInt(70), random.nextInt(30));

        }

        Map<String, BufferedImage> map = new HashMap<String, BufferedImage>();
        map.put(message.toString(), bufferedImage);
        return map;
    }

}
