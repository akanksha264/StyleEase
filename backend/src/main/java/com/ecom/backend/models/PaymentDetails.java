package com.ecom.backend.models;

import lombok.Data;

@Data
public class PaymentDetails {

    private String paymentMethod;
    private String paymentStatus;
    private String paymentId;
    private String razorPayPaymentLinkId;
    private String razorPayPaymentLinkReferenceId;
    private String razorPayPaymentLinkStatus;
    private String razorPayPaymentId;

}
