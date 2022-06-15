# Solution 1: Exporting ChartJS graphs from a node back-end

This POC shows you how to export images of graphs built with ChartJS, for use when creating a report PDF.

This repository contains the front-end app and an api-server.

1- The front-end app can

- fetch a Chart JSON config from the api-server and display an interactive chart
- download an image of the chart, generated via the api-server (for this demo).

2- The api-server can

- query the DB and send back the chart JSON config
- use this JSON config to generate an image and send it back to the user

## How to run this ?

To launch both the front-end app and api-server, in two separate terminals run :

- `cd react-app && npm install && npm start`
- `cd onco-api && npm install && npm start`

- The app runs on [http://localhost:3000](http://localhost:3000)
- The api-server runs on [http://localhost:8000](http://localhost:8000)

## How to Oncofy this solution ?

1- On the front-end, add ChartJS
2- Store all chartJS JSON configs in the database
3- The front-end can query the api-server to fetch the JSON config and display an interactive chart
4- On the front-end's demand, the API can query the pdf-server to render an image for use when creating the pdf

## Export server

**Note: Currently, the pdf-server is embedded inside the api-server, below is a simplified example**

```javascript
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 600, height: 600, backgroundColour: 'white' })
const chartConfig = FETCHED_CHART_CONFIG_FROM_THE_API
const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig, 'image/png')
// do something with the buffer (image/png)
```

## Notes

- The api-server handles all communication between front-end and pdf-server. So the pdf-server should not be directly accessed by the front-end.

- The pdf-server can be either smart or dumb. (ie: fetch the chart config from the database via an ID, or receives the chart config via a POST request)

- The pdf-server's first task should be to generate the images, then combine them in one PDF

# Solution 2: Capture the page with a headless browser

Develop the report on the front-end, and generate the pdf via the API using something like this :

https://github.com/pierrecholhot/krldf

The following code will capture google.com and save the result in a PDF :

```bash
npx krldf --url="https://www.google.com/"
```

To oncofy this, we could imagine something like the following in the future :

```bash
npx krldf --url="https://app.oncodna.com/report/1234/pdf?userId=93838&token=XVVXJZI"
```
