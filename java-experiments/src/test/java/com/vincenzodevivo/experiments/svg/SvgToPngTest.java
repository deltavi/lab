package com.vincenzodevivo.experiments.svg;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by Vincenzo De Vivo on 13/02/2017.
 */
public class SvgToPngTest {
    private void convertFile(File input, int width) throws IOException, TranscoderException {
        int height = width;
        System.out.println("Input file: " + input);
        TranscoderInput ti = new TranscoderInput(input.toURI().toString());
        PNGTranscoder t = new PNGTranscoder();

        t.addTranscodingHint(PNGTranscoder.KEY_WIDTH, new Float(width));
        t.addTranscodingHint(PNGTranscoder.KEY_HEIGHT, new Float(height));

        File outputFile = new File(input.getParentFile().getParentFile().getParent() + "/out/" + input.getName().replace(".svg", "") + "_" + width + "x" + height + ".png");
        outputFile.getParentFile().mkdirs();
        outputFile.createNewFile();
        try (FileOutputStream outStram = new FileOutputStream(outputFile)) {
            t.transcode(ti, new TranscoderOutput(outStram));
        }
        System.out.println("Output file: " + outputFile);
    }

    @Test
    public void test() throws IOException, TranscoderException {
        convertFile(new File(SvgToPngTest.class.getResource("/svg/__base_btn_circle.svg").getFile()), 32);
    }
}
