package com.vincenzodevivo.experiments.camel;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.main.Main;

/**
 * Created by Vincenzo De Vivo on 21/01/2017.
 */
public class DSLMain {
    public static void main(String... args) throws Exception {
        Main main = new Main();
        main.addRouteBuilder(new RouteBuilder() {
            public void configure() {
                from("file:src/data?noop=true")
                        .choice()
                        .when(xpath("/person/city = 'London'"))
                        .log("UK message")
                        .to("file:target/messages/uk")
                        .otherwise()
                        .log("Other message")
                        .to("file:target/messages/others");
            }
        });
        main.run(args);
    }
}

