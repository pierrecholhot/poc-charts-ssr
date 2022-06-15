import React from 'react'
import './App.css'
import { Chart } from './Chart'

function App() {
  const [chartConfig, setChartConfig] = React.useState(null)

  const handleDownload = () => {
    window
      .fetch('/api/download-chart/122')
      .then((r) => r.blob())
      .then((blob) => window.open(window.URL.createObjectURL(blob)))
  }

  React.useEffect(() => {
    window
      .fetch('/api/chart-config/122')
      .then((r) => r.json())
      .then(setChartConfig)
  }, [])

  return (
    <div className="App">
      <div className="App-content">{chartConfig ? <Chart data={chartConfig} /> : 'Loading chart 122...'}</div>
      <button className="App-link" onClick={handleDownload}>
        Download chart #122
      </button>
    </div>
  )
}

export default App
