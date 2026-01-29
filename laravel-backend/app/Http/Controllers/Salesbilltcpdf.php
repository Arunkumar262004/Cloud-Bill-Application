<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCPDF;
use App\Models\Sales;
use Illuminate\Support\Facades\DB;

class PdfController extends Controller
{
    public function downloadPDF($id)
    {
        // Fetch record from database
        $sale_products = DB::select("SELECT * FROM sales_items WHERE sale_id=$id");
        
        $sale = Sales::find($id);

        if (!$sale) {
            return response()->json(['error' => 'Sale not found'], 404);
        }

        // Create new PDF document
        $pdf = new TCPDF('P', 'mm', 'A5', true, 'UTF-8', false);
        $pdf->SetCreator('Laravel TCPDF');
        $pdf->SetAuthor('Your Company');
        $pdf->SetTitle('Sales Bill #' . $id);
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
        $pdf->SetFont('helvetica', 'B', 9.5);

        $y = 5;
        $pdf->MultiCell(52, 7, 'To : ', 0,  'L', false, 0, $x, $y);
        $x = 8.5;

        $pdf->MultiCell(0, 7, 'Customer Name:' . $sale->customer_name, 0,  'L', false, 0, $x, $y += 5);

        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('helvetica', 'B', 10.5);

        $pdf->SetFillColor(108, 117, 125); // info color
        $pdf->MultiCell(
            42.5,
            7,
            'SALES Bill', // text
            0,
            'C',
            true,
            0,
            100,
            5,
            true,
            0,
            false,
            true,
            0,
            'M',
            true
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
        $pdf->SetTextColor(255, 255, 255);

        $pdf->SetFont('helvetica', '', 9);
        $pdf->MultiCell(0, 7, 'Product Name  ', 0,  'L', true, 0, $x, $y += 10);
        $pdf->MultiCell(0, 7, 'Product Qty  ', 0,  'C', true, 0, $x += 15, $y);
        $pdf->MultiCell(0, 7, 'Price        ', 0,  'C', true, 0, $x += 52.5, $y);
        $pdf->MultiCell(0, 7, 'Total        ', 0,  'C', true, 0, $x += 70, $y);
        $pdf->SetTextColor(0, 0, 0);

        $y += 7;
        $x = 5;
        foreach ($sale_products as $sale_prod) {

            $pdf->SetFont('helvetica', '', 9);
            $pdf->MultiCell(0, 7,  $sale_prod->item_name . '-' . $sale_prod->item_code, 0,  'L', false, 0, $x, $y);
            $pdf->MultiCell(0, 7, $sale_prod->qty, 0,  'C', false, 0,  $x += 15, $y);
            $pdf->MultiCell(0, 7, $sale_prod->price, 0,  'C', false, 0, $x += 52.5, $y);
            $pdf->MultiCell(0, 7, $sale_prod->total, 0,  'C', false, 0, $x += 70, $y);
        }
        // Output PDF directly for download
        $pdfContent = $pdf->Output("sale-$id.pdf", 'S');

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"sale-$id.pdf\"");
    }
}
