package com.qa.pluto.app.appointment.model;

/**
 * Represents a person for display purpose with minimum details to prevent information leaking
 *
 * @param id Staff or Patient ID
 * @param name Display Name
 */
public record Person(long id, String name) {
}
