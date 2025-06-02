import * as z from "zod";

export const FORM_SCHEMA = z.object({
  plan: z.string({
    required_error: "Please select a cleaning plan",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .optional()
    .or(z.literal('')),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address1: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  address2: z.string().optional().or(z.string()),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  zipcode: z.string().min(5, {
    message: "Please enter a valid zipcode.",
  }),
  paymentMethod: z.string({
    message: "Please select a valid payment method.",
  }),
  landmark: z.string().optional().or(z.string()),
  remark: z.string().optional().or(z.string()),
});

export type FormValues = z.infer<typeof FORM_SCHEMA>;
