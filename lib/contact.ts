/** Validation partagée entre le formulaire et la route /api/contact. */
export type ContactPayload = {
  name: string;
  company?: string;
  contact: string;
  branch?: string;
  message: string;
  locale?: string;
  page?: string;
};

export const LIMITS = { name: 120, company: 160, contact: 160, branch: 60, message: 4000 } as const;

export type FieldErrors = Partial<Record<'name' | 'contact' | 'message', 'required' | 'tooShort'>>;

export function validateContact(p: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  if (!p.name?.trim()) errors.name = 'required';
  if (!p.contact?.trim()) errors.contact = 'required';
  else if (p.contact.trim().length < 6) errors.contact = 'tooShort';
  if (!p.message?.trim()) errors.message = 'required';
  else if (p.message.trim().length < 10) errors.message = 'tooShort';
  return errors;
}
