import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip,
  Legend, Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip,
  Legend, Filler
)

/**
 * SalesChart
 * Props:
 *   data     - [{ label, revenue, orders }]
 *   type     - 'line' | 'bar' (default 'line')
 *   title    - string
 */
export function SalesChart({ data = [], type = 'line', title = 'Revenue' }) {
  const labels   = data.map(d => d.label)
  const revenues = data.map(d => d.revenue)
  const orders   = data.map(d => d.orders)

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
          font: { family: 'Lato', size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        borderColor: 'rgba(201,168,76,0.3)',
        borderWidth: 1,
        titleColor: '#F5F0E8',
        bodyColor: '#9CA3AF',
        titleFont: { family: 'Lato', size: 11 },
        bodyFont:  { family: 'Lato', size: 11 },
        callbacks: {
          label: (ctx) => {
            if (ctx.dataset.label === 'Revenue') return ` GH₵ ${ctx.parsed.y.toFixed(2)}`
            return ` ${ctx.parsed.y} orders`
          }
        }
      },
    },
    scales: {
      x: {
        ticks: { color: '#6B7280', font: { family: 'Lato', size: 10 } },
        grid:  { color: 'rgba(255,255,255,0.03)' },
      },
      y: {
        ticks: { color: '#6B7280', font: { family: 'Lato', size: 10 } },
        grid:  { color: 'rgba(255,255,255,0.05)' },
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenues,
        borderColor:     '#C9A84C',
        backgroundColor: type === 'line'
          ? 'rgba(201,168,76,0.08)'
          : 'rgba(201,168,76,0.7)',
        pointBackgroundColor: '#C9A84C',
        pointRadius:    4,
        pointHoverRadius: 6,
        fill:           type === 'line',
        tension:        0.4,
        yAxisID: 'y',
      },
      {
        label: 'Orders',
        data: orders,
        borderColor:     '#60A5FA',
        backgroundColor: type === 'line'
          ? 'rgba(96,165,250,0.05)'
          : 'rgba(96,165,250,0.6)',
        pointBackgroundColor: '#60A5FA',
        pointRadius:    4,
        pointHoverRadius: 6,
        fill:           false,
        tension:        0.4,
        yAxisID: 'y',
      },
    ],
  }

  return (
    <div className="bg-surface-dark-2 border border-border-dark rounded-sm p-5">
      {title && (
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mb-4">
          {title}
        </p>
      )}
      <div className="h-64">
        {type === 'line'
          ? <Line  data={chartData} options={commonOptions} />
          : <Bar   data={chartData} options={commonOptions} />
        }
      </div>
    </div>
  )
}