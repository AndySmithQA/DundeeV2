package com.qa.pluto.infrastructure.security.service;

public class UserExistException extends Throwable {

    public UserExistException(final String message) {
        super(message);
    }
}
