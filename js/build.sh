#!/usr/bin/env sh
java -classpath etc/antlr/antlr.jar:etc/antlr/antlr-2.7.7.jar:etc/antlr/stringtemplate-3.1b1.jar org.antlr.Tool antlr/witty.g
mv antlr/*.js lib
