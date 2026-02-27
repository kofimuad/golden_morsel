import Input from '../ui/Input'
import Select from '../ui/Select'
import { Textarea } from '../ui/Textarea'

const CITIES = [
  { value: 'Accra',    label: 'Accra'    },
  { value: 'Kumasi',   label: 'Kumasi'   },
  { value: 'Takoradi', label: 'Takoradi' },
  { value: 'Tamale',   label: 'Tamale'   },
  { value: 'Cape Coast', label: 'Cape Coast' },
  { value: 'Sunyani',  label: 'Sunyani'  },
  { value: 'Koforidua',label: 'Koforidua'},
  { value: 'Ho',       label: 'Ho'       },
  { value: 'Other',    label: 'Other'    },
]

const REGIONS = [
  { value: 'Greater Accra', label: 'Greater Accra' },
  { value: 'Ashanti',       label: 'Ashanti'       },
  { value: 'Western',       label: 'Western'       },
  { value: 'Central',       label: 'Central'       },
  { value: 'Eastern',       label: 'Eastern'       },
  { value: 'Northern',      label: 'Northern'      },
  { value: 'Upper East',    label: 'Upper East'    },
  { value: 'Upper West',    label: 'Upper West'    },
  { value: 'Volta',         label: 'Volta'         },
  { value: 'Brong-Ahafo',   label: 'Brong-Ahafo'  },
]

export function DeliveryForm({ values, errors, onChange }) {
  return (
    <div className="space-y-5">
      <div className="pb-2 border-b border-gray-100 dark:border-border-dark">
        <h2 className="font-display text-base text-primary uppercase tracking-wider">
          Delivery Details
        </h2>
      </div>

      <Textarea
        label="Delivery Address"
        name="address"
        placeholder="House No. 123, Spintex Road"
        value={values.address}
        onChange={onChange}
        error={errors.address}
        rows={2}
        autoComplete="street-address"
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="City"
          name="city"
          options={CITIES}
          value={values.city}
          onChange={onChange}
          error={errors.city}
        />
        <Select
          label="Region"
          name="region"
          options={REGIONS}
          value={values.region}
          onChange={onChange}
          error={errors.region}
        />
      </div>

      <Textarea
        label="Order Notes (Optional)"
        name="notes"
        placeholder="Any special delivery instructions..."
        value={values.notes}
        onChange={onChange}
        rows={2}
      />
    </div>
  )
}