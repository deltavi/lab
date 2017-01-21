package com.vincenzodevivo.experiments.dsl;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class ExpressionBuilder {
    private List<Expression> subExpressions;

    public ExpressionBuilder(List<Expression> subExpressions) {
        this.subExpressions = subExpressions;
    }

    public ExpressionBuilder() {
        this.subExpressions = new ArrayList<>();
    }

    public static ExpressionBuilder Expression() {
        return new ExpressionBuilder();
    }

    public List<Expression> getSubExpressions() {
        return subExpressions;
    }

    public ExpressionBuilder string() {
        subExpressions.add(new Expression("#string"));
        return this;
    }


    public ExpressionBuilder integer() {
        subExpressions.add(new Expression("#integer"));
        return this;
    }

    public ExpressionBuilder or() {
        subExpressions.add(new Expression("#or"));
        return this;
    }

    public ExpressionBuilder value(String value) {
        subExpressions.add(new Expression(value));
        return this;
    }
    public ExpressionBuilder end() {
        throw new RuntimeException("Cannot call end(), no opening group found!");
    }

    public GroupExpressionBuilder group() {
        GroupExpressionBuilder groupExpressionBuilder = new GroupExpressionBuilder(this);
        subExpressions.add(groupExpressionBuilder.getGroup());
        return groupExpressionBuilder;
    }

    @Override
    public String toString() {
        StringBuilder exp = new StringBuilder();
        for (Expression expression : subExpressions) {
            exp.append(expression.toString());
        }
        return exp.toString();
    }
}
