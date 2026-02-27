import Input from '../ui/Input'

export function ContactForm({ values, errors, onChange }) {
  return (
    <div className="space-y-5">
      <div className="pb-2 border-b border-gray-100 dark:border-border-dark">
        <h2 className="font-display text-base text-primary uppercase tracking-wider">
          Contact Details
        </h2>
      </div>

      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="Kwame Mensah"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        prefix="+233"
        placeholder="XX XXX XXXX"
        value={values.phone}
        onChange={onChange}
        error={errors.phone}
        hint="Order updates & payment instructions will be sent here"
        autoComplete="tel"
      />

      <Input
        label="Email Address (Optional)"
        name="email"
        type="email"
        placeholder="kwame@example.com"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        autoComplete="email"
      />
    </div>
  )
}