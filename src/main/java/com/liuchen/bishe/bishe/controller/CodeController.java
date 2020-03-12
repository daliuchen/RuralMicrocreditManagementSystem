package com.liuchen.bishe.bishe.controller;

import com.liuchen.bishe.bishe.util.CreateCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.Set;

/**
 * @program: bishe
 * @description: 验证码controller
 * @author: liuchen
 * @create: 2020-02-09 11:39
 **/
@Controller
public class CodeController {

    @Autowired
    private CreateCode createCode;


    @RequestMapping("/code")
    private void createCode(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Map<String, BufferedImage> code = createCode.getCode();
        ArrayList<String> keys = new ArrayList<>(code.keySet());

        request.getSession().setAttribute("code",keys.get(0));

        ImageIO.write(code.get(keys.get(0)),"JPG",response.getOutputStream());

    }







}
