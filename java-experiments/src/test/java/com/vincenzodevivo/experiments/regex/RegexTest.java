package com.vincenzodevivo.experiments.regex;

import org.junit.Test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by vdevivo on 24/01/2017.
 */
public class RegexTest {
    @Test
    public void testNamedGroup() {
        Pattern compile = Pattern.compile("(?<n1>[a-z]*)\\s(?<n2>\\d+)");
        Matcher matcher = compile.matcher("aaaa 11111 bbbbb 2222 ccccc 1");
        while (matcher.find()) {
            System.out.println("n1: " + matcher.group("n1") + ", n2: " + matcher.group("n2"));
        }
    }

    @Test
    public void testNamedGroupEmail() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Pattern compile = Pattern.compile("(?<all>(?<localpart>[a-z]*)@(?<domain>(?<secondleveldomain>[a-z]*)\\.(?<firstleveldomain>[a-z]*)))");
        Method namedGroupsMethod = Pattern.class.getDeclaredMethod("namedGroups");
        namedGroupsMethod.setAccessible(true);
        System.out.println("namedGroups: " + namedGroupsMethod.invoke(compile).toString());

        Matcher matcher = compile.matcher("info@test.com & infob@testb.com ");

        matcher.find();
        System.out.println("\ne-mail: " + matcher.group());
        System.out.println("local part: " + matcher.group("localpart"));
        System.out.println("domain: " + matcher.group("domain"));
        System.out.println("second level domain: " + matcher.group("secondleveldomain"));
        System.out.println("first level domain: " + matcher.group("firstleveldomain"));

        matcher.find();
        System.out.println("\ne-mail: " + matcher.group("all"));
        System.out.println("local part: " + matcher.group("localpart"));
        System.out.println("domain: " + matcher.group("domain"));
        System.out.println("second level domain: " + matcher.group("secondleveldomain"));
        System.out.println("first level domain: " + matcher.group("firstleveldomain"));


    }
}
