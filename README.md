# Giving Calculator

A simple embeddable JavaScript giving calculator.

## Usage

First, you'll need to upload the [`dist/embed.js` file](https://raw.githubusercontent.com/derrickreimer/giving-calculator/main/dist/embed.js) to your web host (wherever CSS, JavaScript, image, etc. live).

Then, add the following HTML on the page where you'd like to embed the calculator and replace `/path/to/embed.js` with the URL where the script file is hosted:

```html
<div id="giving-calculator" data-years="3" data-gift-levels="150000,80000,50000,35000,25000,15000,7500,5000,2500,1200"></div>
<script src="/path/to/embed.js"></script>
```

You can configure the duration of the campaign by editing the `data-years` attribute and the gift levels by editing the `data-gift-levels`. Each level represents a total commitment over the duration of the set number of years.

The calculator is unstyled by default, but you can apply CSS by targeting `#giving-calculator`:

```css
#giving-calculator table {
  /* general table styles... */
}

#giving-calculator table th {
  /* header column styles... */
}

#giving-calculator table td {
  /* body column styles... */
}

#giving-calculator .currency-input {
  /* currency input styles... */
}
```

## Development

Run the following command to rebuild the `dist/embed.js` script. For convenience, we are committing a copy of the built script to Git, so you should run the build before committing changes.

```bash
npm run build
```

Open the demo page to test things out:

```bash
open demo.html
```
