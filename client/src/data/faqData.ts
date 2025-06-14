import { SupportCategory } from '../types/support';

export const faqCategories: SupportCategory[] = [
  {
    title: "Shopping",
    items: [
      {
        question: "How do I place an order?",
        answer: "You can place an order by adding items to your cart and proceeding to checkout. Follow the steps to enter your shipping and payment information.",
        category: "shopping"
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. Contact customer support for assistance.",
        category: "shopping"
      },
      // Add more shopping FAQs...
    ]
  },
  {
    title: "Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and Apple Pay.",
        category: "payment"
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption to protect your payment information.",
        category: "payment"
      },
      // Add more payment FAQs...
    ]
  },
  // Add more categories...
];