package com.vincenzodevivo.experiments.dsl;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class Expression {
    private String expression;

    public Expression() {
    }
    public Expression(String expression) {
        this.expression = expression;
    }

    @Override
    public String toString() {
        return expression;
    }
}
