package com.ecom.backend.controllers;

import com.ecom.backend.config.OrderStatus;
import com.ecom.backend.config.PaymentStatus;
import com.ecom.backend.exceptions.OrderException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Order;
import com.ecom.backend.repositories.OrderRepository;
import com.ecom.backend.responses.ApiResponse;
import com.ecom.backend.responses.PaymentLinkResponse;
import com.ecom.backend.services.OrderService;
import com.ecom.backend.services.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.secret.key}")
    private String secretKey;

    private final OrderService orderService;
    private final UserService userService;
    private final OrderRepository orderRepository;

    public PaymentController(OrderService orderService, UserService userService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws UserException, OrderException, RazorpayException {

        Order order=orderService.findOrderById(orderId);

        try {

            RazorpayClient razorpayClient=new RazorpayClient(apiKey,secretKey);

            JSONObject paymentLinkRequest=new JSONObject();
            paymentLinkRequest.put("amount",order.getTotalPrice()*100);
            paymentLinkRequest.put("currency","INR");

            JSONObject customerInfo=new JSONObject();
            customerInfo.put("name",order.getUser().getFirstName());
            customerInfo.put("email",order.getUser().getEmail());
            paymentLinkRequest.put("customer",customerInfo);

            JSONObject notify=new JSONObject();
            notify.put("sms",true);
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            paymentLinkRequest.put("callback_url","http://localhost:3000/payment/"+orderId);
            paymentLinkRequest.put("callback_method","get");

            PaymentLink paymentLink=razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId=paymentLink.get("id");
            String paymentLinkUrl=paymentLink.get("short_url");

            PaymentLinkResponse response=new PaymentLinkResponse();
            response.setPaymentLinkId(paymentLinkId);
            response.setPaymentLinkUrl(paymentLinkUrl);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }

    }

    @GetMapping("")
    public ResponseEntity<ApiResponse> redirect(
//            @RequestParam(name = "payment_id") String paymentId,
            @RequestParam(name = "order_id") Long orderId
    ) throws OrderException, RazorpayException {

        Order order=orderService.findOrderById(orderId);
        RazorpayClient razorpayClient=new RazorpayClient(apiKey,secretKey);

        try {
//            Payment payment=razorpayClient.payments.fetch(paymentId);
//
//            if (payment.get("status").equals("capture")) {
//                order.getPaymentDetails().setPaymentId(paymentId);
                order.getPaymentDetails().setPaymentStatus(PaymentStatus.COMPLETED);
                order.setOrderStatus(OrderStatus.PLACED);
                orderRepository.save(order);
                System.out.println(OrderStatus.PLACED);
//            }

            ApiResponse response=new ApiResponse();
            response.setMessage("Order Placed");
            response.setStatus(true);

            return new ResponseEntity<>(response,HttpStatus.ACCEPTED);

        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

}
