package com.vincenzodevivo.experiments.dsl;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class GroupExpressionBuilder extends ExpressionBuilder<GroupExpressionBuilder> {
    private final GroupExpression groupExpression;
    private final ExpressionBuilder parent;

    public GroupExpressionBuilder(ExpressionBuilder parent) {
        this.parent = parent;
        this.groupExpression = new GroupExpression(this.getSubExpressions());
    }

    public ExpressionBuilder end() {
        return parent;
    }

    public GroupExpression getGroup() {
        return groupExpression;
    }
}
