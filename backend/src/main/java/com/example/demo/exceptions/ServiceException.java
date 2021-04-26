package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;

public class ServiceException extends Exception{
    private HttpStatus httpStatus;

    public ServiceException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }


    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
