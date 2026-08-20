# Study Abroad Explorer

A dashboard comparing 51 universities across the US, UK, Canada, Germany, and
Australia by ranking and tuition fee — styled as an airport departures board.

Built for the "Into the Scrape-Verse" hackathon by WeMakeDevs and Bright Data.

## What it does

- Browse and filter universities by country, ranking, tuition budget, and
  tuition-free status
- Compare countries side by side (average fare, average ranking, tuition-free
  count) before drilling into individual universities
- Split-flap "flip board" animation on key numbers, matching the departures
  board theme

## Data collection

University data (name, ranking, tuition fee) was collected using **Bright
Data Scraper Studio**, with each field described in plain language rather
than hardcoded page selectors, so the scraper can adapt if the source page's
layout changes.

Sources:
- alfabetaglobal.com/ranked-universities (US, UK, Canada, Australia)
- ardentoverseas.com/study-in-germany (Germany)

## AI tool disclosure

This project was built with the help of **Claude** (Anthropic), used for:
- Planning the project approach and data schema
- Cleaning and merging scraped JSON data into a single dataset
- Writing and debugging the React/Tailwind dashboard code

All data was reviewed for accuracy before use; a few known source-data
inconsistencies (e.g. two UK universities showing mismatched currency codes
on the original site) are flagged inline in the app rather than silently
corrected.

## Running locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Building for production

```bash
npm run build
npm run preview
```
