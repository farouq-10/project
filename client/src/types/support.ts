export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SupportCategory {
  title: string;
  items: FAQItem[];
}