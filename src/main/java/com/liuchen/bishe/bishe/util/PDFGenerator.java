package com.liuchen.bishe.bishe.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.BaseFont;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.AbstractConfigurableTemplateResolver;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;
/**
 * @program: bishe
 * @description: pdf生成
 * @author: liuchen
 * @create: 2020-02-28 10:41
 **/
public class PDFGenerator {
//    private Logger logger = LoggerFactory.getLogger(PDFGenerator.class);
    private AbstractConfigurableTemplateResolver templateResolver;
    private TemplateEngine templateEngine;

    public PDFGenerator(final String templatePrefix, final String templateSuffix) {

        this(templatePrefix, templateSuffix, "html", "UTF-8");
    }

    public PDFGenerator(final String templatePrefix, final String templateSuffix, final String templateMode,
                        final String templateEncoding) {

        this(new ClassLoaderTemplateResolver());

        this.templateResolver.setPrefix(templatePrefix);
        this.templateResolver.setSuffix(templateSuffix);
        this.templateResolver.setTemplateMode(TemplateMode.HTML);
        this.templateResolver.setCharacterEncoding(templateEncoding);
    }

    public PDFGenerator(AbstractConfigurableTemplateResolver templateResolver) {
        this.templateResolver = templateResolver;
    }

    public PDFGenerator(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    private TemplateEngine getTemplateEngine() {
        if (templateEngine == null) {
            templateEngine = new TemplateEngine();
            templateEngine.setTemplateResolver(templateResolver);
        }

        return templateEngine;
    }

    /**
     * 根据模板生成一个PDF
     *
     * @param ouputPDF
     *            Target pdf file.
     * @param template
     *            Source template.
     * @param model
     *            The data for the template.
     * @throws FileNotFoundException
     * @throws DocumentException
     */
    public void generate(File ouputPDF, String template, Map<String, Object> model)
            throws FileNotFoundException, DocumentException {
        final Context ctx = new Context();
        ctx.setVariables(model);

        final TemplateEngine templateEngine = getTemplateEngine();
        String htmlContent = templateEngine.process(template, ctx);

        ITextRenderer renderer = new ITextRenderer();

        ITextFontResolver fontResolver = renderer.getFontResolver();
        try {
            //避免中文为空设置系统字体

            fontResolver.addFont("/Library/Fonts/simsun.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        } catch (IOException e) {

//            logger.error(e.getMessage(), e);
            e.printStackTrace();
        }

        // 解决图片的相对路径问题
        // renderer.getSharedContext().setBaseURL("file:/C:/Users/Administrator.WIN7-1610080938/Desktop/word2pdf/");

        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(new FileOutputStream(ouputPDF));
    }
}
