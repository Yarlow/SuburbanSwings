import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent
} from '@stripe/stripe-js';


@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.scss']
})
export class StripeFormComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paying = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.createPaymentIntent(this.paymentElementForm.get('amount').value)
      .subscribe(pi => {
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  pay() {
    if (true) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentElementForm.get('name').value,
              email: this.paymentElementForm.get('email').value,
              address: {
                line1: this.paymentElementForm.get('address').value || '',
                postal_code: this.paymentElementForm.get('zipcode').value || '',
                city: this.paymentElementForm.get('city').value || '',
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
    } else {
      console.log(this.paymentElementForm);
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.apiUrl}/create-payment-intent`,
      { amount }
    );
  }
}