package com.vincenzodevivo.experiments.dsl;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class ExpressionBuilder<T extends ExpressionBuilder<T>> {
    private List<Expression> subExpressions;

    public ExpressionBuilder(List<Expression> subExpressions) {
        this.subExpressions = subExpressions;
    }

    public ExpressionBuilder() {
        this.subExpressions = new ArrayList<>();
    }

    @SuppressWarnings("unchecked")
    public static ExpressionBuilder Expression() {
        return new ExpressionBuilder();
    }

    public List<Expression> getSubExpressions() {
        return subExpressions;
    }

    @SuppressWarnings("unchecked")
    public T string() {
        subExpressions.add(new Expression("#string"));
        return (T) this;
    }

    @SuppressWarnings("unchecked")
    public T integer() {
        subExpressions.add(new Expression("#integer"));
        return (T) this;
    }

    @SuppressWarnings("unchecked")
    public T or() {
        subExpressions.add(new Expression("#or"));
        return (T) this;
    }

    @SuppressWarnings("unchecked")
    public T value(String value) {
        subExpressions.add(new Expression(value));
        return (T) this;
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
