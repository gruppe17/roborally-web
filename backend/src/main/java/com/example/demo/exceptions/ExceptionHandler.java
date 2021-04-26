package com.example.demo.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(value = {ServiceException.class})
    protected ResponseEntity<Object> serviceExceptionHandler(ServiceException exception, WebRequest request){
        return handleExceptionInternal(exception,"Service Exception: " + exception.getMessage(),new HttpHeaders(), exception.getHttpStatus(),request);
    }


    @org.springframework.web.bind.annotation.ExceptionHandler(value = {MappingException.class})
    protected ResponseEntity<Object> mappingExceptionHandler(MappingException exception, WebRequest request){
        return handleExceptionInternal(exception,"Mapping Exception: " + exception.getMessage(),new HttpHeaders(), HttpStatus.BAD_REQUEST,request);
    }

    //TODO: Add handler for DaoException
}
