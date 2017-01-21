package com.vincenzodevivo.experiments.dsl;

import junit.framework.TestCase;

import static com.vincenzodevivo.experiments.dsl.ExpressionBuilder.Expression;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class ExpressionBuilderTest extends TestCase {
    public void test() {
        String expression = Expression()
                .group()
                    .group()
                        .string()
                        .integer()
                        .value("#value")
                    .end()
                    .or()
                    .group()
                        .string()
                    .end()
                    .string()
                .end()
                .toString();
        System.out.println("expression: " + expression);
        assertEquals("((#string#integer#value)#or(#string)#string)", expression);
    }
}