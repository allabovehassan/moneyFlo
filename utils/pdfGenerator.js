const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const messages = require("../utils/messages");

async function generateInvoice(invoice, products) {
  try {
    let browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    let page = await browser.newPage();

    const htmlContent = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
          .total-row {
            font-weight: bold;
          }
          .grand-total {
            color: blue;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p>User ID: ${invoice.userId}</p>
        <p>Date: ${invoice.date.toDateString()}</p>
        <h2>Products</h2>
        <table>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
          ${products
            .map(
              (product) => `
          <tr>
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>${product.rate}</td>
            <td>INR ${product.qty * product.rate}</td>
          </tr>`
            )
            .join("")}
          <tr class="total-row">
            <td colspan="3">Total</td>
            <td>INR ${products.reduce(
              (acc, product) =>
                acc + product.qty * product.rate,
              0
            )}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3">GST</td>
            <td>${18}%</td>
          </tr>
          <tr class="total-row grand-total">
            <td colspan="3">Grand Total</td>
            <td>INR ${
              products.reduce(
                (acc, product) =>
                  acc + product.qty * product.rate,
                0
              ) *
              (1 + 18 / 100)
            }</td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
      timeout: 60000
    });

    const pdfDirectory = path.join(
      __dirname,
      "../PDFs"
    );

    const imageDirectory = path.join(
      __dirname,
      "../images"
    );


    if (!fs.existsSync(pdfDirectory)) {
      fs.mkdirSync(pdfDirectory, { recursive: true });
      console.log("PDF directory created.");
    }
     if (!fs.existsSync(imageDirectory)) {
       fs.mkdirSync(imageDirectory, {
         recursive: true
       });
     }
    const pdfPath = path.join(
      pdfDirectory,
      `invoice-${invoice._id}.pdf`
    );
    await page.pdf({
      path: pdfPath,
      format: "A4",
      timeout: 60000
    });

    // Generate Image
    const imagePath = path.join(
      imageDirectory,
      `invoice-${invoice._id}.png`
    );
    await page.screenshot({
      path: imagePath,
      fullPage: true
    });

    await browser.close();
    return {
      pdfUrl: pdfPath,
      imageUrl: imagePath
    };
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
}

module.exports = { generateInvoice };
