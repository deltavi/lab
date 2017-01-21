package com.vincenzodevivo.experiments.dsl;

import java.util.List;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class GroupExpression extends Expression {
    private List<Expression> expressions;

    public GroupExpression(List<Expression> expressions) {
        this.expressions = expressions;
    }

    @Override
    public String toString() {
        StringBuilder exp = new StringBuilder();
        exp.append("(");
        for (Expression expression : expressions) {
            exp.append(expression.toString());
        }
        exp.append(")");
        return exp.toString();
    }
}
