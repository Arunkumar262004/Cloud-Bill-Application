<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCPDF;
use App\Models\Sales;

class PdfController extends Controller
{
    public function downloadPDF($id)
    {
        // Fetch record from database
        $sale = Sales::find($id);

        if (!$sale) {
            return response()->json(['error' => 'Sale not found'], 404);
        }

        // Create new PDF document
        $pdf = new TCPDF('P', 'mm', 'A5', true, 'UTF-8', false);
        $pdf->SetCreator('Laravel TCPDF');
        $pdf->SetAuthor('Your Company');
        $pdf->SetTitle('Sales Bill #' . $sale->id);
        $pdf->SetMargins(15, 15, 15);
        $pdf->setPrintHeader(false); // removes top header line
        $pdf->setPrintFooter(false); // removes bottom footer line

        $pdf->AddPage();
        // Draw full-page border
        $pdf->SetLineWidth(0.5);
        $pdf->SetDrawColor(0, 0, 0);
        $w = $pdf->getPageWidth() - 10;
        $h = $pdf->getPageHeight() - 10;
        $pdf->Rect(5, 5, $w, $h, 'D');



        // Title
        $pdf->SetFillColor(108, 117, 125);
        $pdf->SetTextColor(0, 0, 0);
        $x = 6;
        $pdf->SetFont('helvetica', '', 9.5);

        $y = 5;
        // $pdf->MultiCell(52, 7, 'To : ', 0,  'L', false, 0, $x, $y);
        $x = 8.5;

        $pdf->MultiCell(0, 7, 'Customer ID        : ' . $sale->id, 0,  'L', false, 0, $x, $y += 5);
        $pdf->MultiCell(0, 7, 'Customer Name  : ' . $sale->customer_name, 0,  'L', false, 0, $x, $y += 5);

        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 10.5);

        $pdf->SetFillColor(64, 64, 64); // info color
        $pdf->MultiCell(
            42.7,       // width
            7,          // height
            'SALES BILL', // text
            0,          // border
            'C',        // horizontal center
            true,       // fill
            0,          // ln (0 = to right)
            100,        // x
            5,          // y
            true,       // reset height
            0,          // stretch
            false,      // is HTML
            true,       // autopadding
            0,          // max height
            'M',        // vertical align Middle
            true        // fit cell
        );
        $x = 100;
        $y = 10;
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', '', 9);

        $pdf->MultiCell(0, 7, 'Bill No : ' . $sale->id, 0,  'L', false, 0, $x, $y += 3);

        $pdf->MultiCell(0, 7, 'Bill Date : ' . $sale->created_at, 0,  'L', false, 0, $x, $y += 5);
        $pdf->SetFont('helvetica', '', 12);

        // Function to make labeled rows neatly


        $pdf->SetTextColor(0, 0, 0);
        $x = 5;
        $y += 10; // Starting Y position

$pdf->SetFillColor(64, 64, 64); // Light gray
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 9);

        // Column widths
        $w1 = 40; // Product Name
        $w2 = 30; // Product Qty
        $w3 = 30; // Price
        $w4 = 38; // Total

        // Header row
        $pdf->MultiCell($w1, 7, 'Product Name', 1, 'L', 1, 0, $x, $y);
        $pdf->MultiCell($w2, 7, 'Product Qty', 1, 'C', 1, 0, $x + $w1, $y);
        $pdf->MultiCell($w3, 7, 'Price', 1, 'L', 1, 0, $x + $w1 + $w2, $y);
        $pdf->MultiCell($w4, 7, 'Total', 1, 'C', 1, 0, $x + $w1 + $w2 + $w3, $y);

        // Move to next row
        $y += 7;
        $pdf->SetTextColor(0, 0, 0);

        // Data row
        $pdf->SetFont('helvetica', '', 9);
        $pdf->MultiCell($w1, 7, $sale->product_name . '-' . $sale->product_code, 1, 'L', 0, 0, $x, $y);
        $pdf->MultiCell($w2, 7, number_format($sale->product_qty,2), 1, 'C', 0, 0, $x + $w1, $y);
        $pdf->MultiCell($w3, 7, number_format($sale->price,2), 1, 'L', 0, 0, $x + $w1 + $w2, $y);
        $pdf->MultiCell($w4, 7, number_format($sale->product_qty*$sale->price,2), 1, 'C', 0, 0, $x + $w1 + $w2 + $w3, $y);

        $y += 9;
        $pdf->SetFont('helvetica', 'B', 9);

        $pdf->MultiCell($w1, 7, "Total Price  : ". number_format($sale->price*$sale->product_qty,2), 0, 'L', 0, 0, $x + $w1 + $w2 +20, $y);
        $y += 5;
        $pdf->MultiCell($w1, 7, "Total Qty     : ". number_format($sale->product_qty,2), 0, 'L', 0, 0, $x + $w1 + $w2 +20, $y);


        // Output PDF directly for download
        $pdfContent = $pdf->Output("sale-$id.pdf", 'S');

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"sale-$id.pdf\"");
    }
}
