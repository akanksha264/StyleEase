package com.ecom.backend.responses;

import lombok.Data;

@Data
public class PaymentLinkResponse {

    private String paymentLinkId;
    private String paymentLinkUrl;

}
