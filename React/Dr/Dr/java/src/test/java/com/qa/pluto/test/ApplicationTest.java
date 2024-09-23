package com.qa.pluto.test;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(plugin = {"pretty"}, features = "src/test/resources/features", glue = {"com.qa.pluto.test.steps"})
@SuppressWarnings({"squid:2187"})
public class ApplicationTest {
}
